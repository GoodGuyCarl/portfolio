import test from 'node:test'
import assert from 'node:assert/strict'
import worker from './worker.ts'

/**
 * The worker is the only place in this repo with real logic, and every test here is
 * hermetic: `fetch` is stubbed, so nothing reaches Turnstile, Discord or EmailJS.
 */

const ORIGIN = 'https://goodguycarl.github.io'
const GOOD_BODY = {
	name: 'Jane Smith',
	email: 'jane@company.com',
	message: 'Hello there, this is a test.',
	turnstileToken: 'fake-captcha-token',
}

const outbound: string[] = []
let turnstilePasses = true

globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
	const url = String(input)
	if (url.includes('siteverify')) {
		return Response.json({ success: turnstilePasses })
	}
	outbound.push(url)
	void init
	return new Response('', { status: 200 })
}) as typeof fetch

function makeKv() {
	const store = new Map<string, string>()
	return {
		store,
		get: async (k: string) => store.get(k) ?? null,
		put: async (k: string, v: string) => {
			store.set(k, v)
		},
	}
}

function makeEnv(over: Record<string, string> = {}) {
	const kv = makeKv()
	const env = {
		RATE_KV: kv,
		DISCORD_WEBHOOK_URL: 'https://discord.com/api/webhooks/000/test',
		TURNSTILE_SECRET: 'test-secret',
		EMAILJS_SERVICE_ID: 'service',
		EMAILJS_TEMPLATE_ID: 'template',
		EMAILJS_PRIVATE_KEY: 'private',
		EMAILJS_PUBLIC_KEY: 'public',
		ALLOWED_ORIGINS: ORIGIN,
		MAX_PER_HOUR: '3',
		MAX_PER_DAY: '100',
		...over,
	}
	return { env, kv }
}

async function post(env: unknown, body: unknown, origin: string | null = ORIGIN) {
	const headers: Record<string, string> = { 'Content-Type': 'application/json' }
	if (origin) headers['Origin'] = origin
	const res = await worker.fetch(
		new Request('https://worker.test/', {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		}),
		env as never,
	)
	return { status: res.status, body: (await res.json()) as { error?: string } }
}

test.beforeEach(() => {
	outbound.length = 0
	turnstilePasses = true
})

test('rejects a request with no Origin header', async () => {
	const { env } = makeEnv()
	assert.equal((await post(env, GOOD_BODY, null)).status, 403)
})

test('rejects a request from an origin that is not allowed', async () => {
	const { env } = makeEnv()
	const res = await post(env, GOOD_BODY, 'https://evil.example')
	assert.equal(res.status, 403)
	assert.equal(res.body.error, 'forbidden')
	assert.deepEqual(outbound, [])
})

test('rejects a malformed email before contacting anything', async () => {
	const { env } = makeEnv()
	const res = await post(env, { ...GOOD_BODY, email: 'not-an-email' })
	assert.equal(res.status, 400)
	assert.equal(res.body.error, 'bad_request')
	assert.deepEqual(outbound, [])
})

test('accepts a good message and delivers it', async () => {
	const { env } = makeEnv()
	const res = await post(env, GOOD_BODY)
	assert.equal(res.status, 200)
	assert.equal(outbound.length, 2)
	assert.ok(outbound[0]!.includes('discord.com'))
	assert.ok(outbound[1]!.includes('emailjs.com'))
})

test('returns 429 once the hourly cap is passed', async () => {
	const { env } = makeEnv({ MAX_PER_HOUR: '2' })
	assert.equal((await post(env, GOOD_BODY)).status, 200)
	assert.equal((await post(env, GOOD_BODY)).status, 200)
	assert.equal((await post(env, GOOD_BODY)).status, 429)
})

test('a failed captcha does not spend a rate-limit slot', async () => {
	const { env, kv } = makeEnv({ MAX_PER_HOUR: '1' })
	turnstilePasses = false
	assert.equal((await post(env, GOOD_BODY)).status, 403)
	assert.equal(kv.store.size, 0)

	turnstilePasses = true
	assert.equal((await post(env, GOOD_BODY)).status, 200)
})

test('a good captcha spends exactly one slot', async () => {
	const { env, kv } = makeEnv()
	await post(env, GOOD_BODY)
	const values = [...kv.store.values()].sort()
	assert.deepEqual(values, ['1', '1'])
})