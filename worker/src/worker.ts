/**
 * Portfolio contact API — Cloudflare Worker.
 *
 * Pipeline: Turnstile check → IP rate limit → coarse geo context
 *           → Discord webhook (private) → EmailJS auto-reply to visitor.
 */

interface KVNamespace {
	get(key: string): Promise<string | null>
	put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}

interface CfGeo {
	country?: string
	city?: string
}

interface ContactEnv {
	RATE_KV: KVNamespace
	DISCORD_WEBHOOK_URL: string
	TURNSTILE_SECRET: string
	EMAILJS_PRIVATE_KEY: string
	EMAILJS_SERVICE_ID: string
	EMAILJS_TEMPLATE_ID: string
	EMAILJS_PUBLIC_KEY: string
	ALLOWED_ORIGINS: string
	MAX_PER_HOUR: string
	MAX_PER_DAY: string
}

interface ContactBody {
	name?: unknown
	email?: unknown
	message?: unknown
	turnstileToken?: unknown
}

function corsHeaders(origin: string): Record<string, string> {
	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		Vary: 'Origin',
	}
}

function json(data: unknown, status: number, origin: string): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
	})
}

const asStr = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')
const clamp = (s: string, max: number) => s.slice(0, max)

function allowedOrigin(request: Request, env: ContactEnv): string | null {
	const origins = (env.ALLOWED_ORIGINS ?? '')
		.split(',')
		.map((o) => o.trim())
		.filter(Boolean)
	const origin = request.headers.get('Origin')
	return origin && origins.includes(origin) ? origin : null
}

function limitKeys(ip: string): { hour: string; day: string } {
	const now = Math.floor(Date.now() / 1000)
	return { hour: `rl:h:${Math.floor(now / 3600)}:${ip}`, day: `rl:d:${Math.floor(now / 86400)}:${ip}` }
}

async function overLimit(env: ContactEnv, ip: string): Promise<boolean> {
	const { hour, day } = limitKeys(ip)
	const [hourCount, dayCount] = await Promise.all([
		env.RATE_KV.get(hour),
		env.RATE_KV.get(day),
	])
	return (
		Number(hourCount ?? 0) >= Number(env.MAX_PER_HOUR || 10) ||
		Number(dayCount ?? 0) >= Number(env.MAX_PER_DAY || 30)
	)
}

/** Called only after the captcha passes, so a failed check never costs the visitor a slot. */
async function recordHit(env: ContactEnv, ip: string): Promise<void> {
	const { hour, day } = limitKeys(ip)
	const [hourCount, dayCount] = await Promise.all([
		env.RATE_KV.get(hour),
		env.RATE_KV.get(day),
	])
	await Promise.all([
		env.RATE_KV.put(hour, String(Number(hourCount ?? 0) + 1), { expirationTtl: 3700 }),
		env.RATE_KV.put(day, String(Number(dayCount ?? 0) + 1), { expirationTtl: 86500 }),
	])
}

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
	try {
		const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			body: new URLSearchParams({ secret, response: token, remoteip: ip }),
		})
		const data = (await res.json()) as { success?: boolean }
		return data.success === true
	} catch {
		return false
	}
}

async function sendToDiscord(
	env: ContactEnv,
	request: Request,
	name: string,
	email: string,
	message: string,
): Promise<boolean> {
	const cf = (request as Request & { cf?: CfGeo }).cf ?? {}
	const location = [cf.city, cf.country].filter(Boolean).join(', ') || 'Unknown'
	const ua = clamp(request.headers.get('User-Agent') ?? 'Unknown', 200)
	const lang = request.headers.get('Accept-Language')?.split(',')[0]?.trim() || 'Unknown'
	const utcTime = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
	// Discord caps a field at 1024 chars. Say the message was cut, never lose the rest quietly.
	const shownMessage = message.length > 1000 ? `${clamp(message, 1000)}… (truncated)` : message

	try {
		const res = await fetch(env.DISCORD_WEBHOOK_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: 'Portfolio',
				embeds: [
					{
						title: 'New portfolio message',
						color: 0xd23e10,
						fields: [
							{ name: 'Name', value: clamp(name, 100), inline: true },
							{ name: 'Email', value: clamp(email, 200), inline: true },
							{ name: 'Message', value: shownMessage },
							{
								name: 'Context',
								value: `${location} • ${lang}\n${utcTime}\n\`${ua}\``,
							},
						],
					},
				],
			}),
		})
		return res.ok
	} catch {
		return false
	}
}

async function sendAutoReply(env: ContactEnv, name: string, email: string): Promise<boolean> {
	try {
		const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				service_id: env.EMAILJS_SERVICE_ID,
				template_id: env.EMAILJS_TEMPLATE_ID,
				user_id: env.EMAILJS_PUBLIC_KEY,
				accessToken: env.EMAILJS_PRIVATE_KEY,
				template_params: { name, email },
			}),
		})
		if (!res.ok) {
			const detail = await res.text()
			console.error(`[emailjs] HTTP ${res.status}: ${detail}`)
			return false
		}
		console.log(`[emailjs] auto-reply sent to ${clamp(email, 100)}`)
		return true
	} catch (err) {
		console.error('[emailjs] request threw:', err)
		return false
	}
}

export default {
	async fetch(request: Request, env: ContactEnv): Promise<Response> {
		const origin = allowedOrigin(request, env)

		if (request.method === 'OPTIONS') {
			if (!origin) return new Response(null, { status: 403 })
			return new Response(null, { status: 204, headers: corsHeaders(origin) })
		}

		if (request.method !== 'POST' || !origin) {
			return json({ error: 'forbidden' }, 403, origin ?? 'null')
		}

		let body: ContactBody
		try {
			body = (await request.json()) as ContactBody
		} catch {
			return json({ error: 'bad_request' }, 400, origin)
		}

		const name = asStr(body.name)
		const email = asStr(body.email)
		const message = asStr(body.message)
		const token = asStr(body.turnstileToken)

		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
		if (
			name.length < 2 ||
			name.length > 120 ||
			email.length > 254 ||
			!emailOk ||
			message.length < 5 ||
			message.length > 5000 ||
			token.length < 10
		) {
			return json({ error: 'bad_request' }, 400, origin)
		}

		const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
		if (await overLimit(env, ip)) {
			return json({ error: 'rate_limited' }, 429, origin)
		}

		if (!(await verifyTurnstile(token, ip, env.TURNSTILE_SECRET))) {
			return json({ error: 'captcha_failed' }, 403, origin)
		}

		await recordHit(env, ip)

		const delivered = await sendToDiscord(env, request, name, email, message)
		if (!delivered) {
			return json({ error: 'delivery_failed' }, 502, origin)
		}

		const emailed = await sendAutoReply(env, name, email)

		return json({ ok: true, emailed }, 200, origin)
	},
}
