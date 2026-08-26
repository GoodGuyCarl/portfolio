<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import {
	PhEnvelopeSimple,
	PhCopy,
	PhMapPin,
	PhClock,
	PhGithubLogo,
	PhLinkedinLogo,
	PhPaperPlaneTilt,
	PhCheckCircle,
} from '@phosphor-icons/vue'

declare global {
	interface Window {
		turnstile?: {
			render: (el: HTMLElement, options: Record<string, unknown>) => string
			reset: (widgetId?: string) => void
		}
	}
}

const { showToast } = useToast()

const API_URL = import.meta.env.VITE_CONTACT_API_URL
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

const formName = ref('')
const formEmail = ref('')
const formMessage = ref('')
const nameError = ref(false)
const emailError = ref(false)
const messageError = ref(false)
const sending = ref(false)
const success = ref(false)
const turnstileToken = ref('')
const captchaUnavailable = ref(false)
const turnstileEl = ref<HTMLElement | null>(null)

let turnstileLoader: Promise<void> | null = null

function loadTurnstile(): Promise<void> {
	if (window.turnstile) return Promise.resolve()
	if (turnstileLoader) return turnstileLoader
	turnstileLoader = new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.src =
			'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
		script.async = true
		script.onload = () => resolve()
		script.onerror = () => reject(new Error('Turnstile failed to load'))
		document.head.appendChild(script)
	})
	return turnstileLoader
}

function resetCaptcha() {
	turnstileToken.value = ''
	window.turnstile?.reset()
}

function validate() {
	nameError.value = formName.value.trim().length < 2
	emailError.value = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail.value.trim())
	messageError.value = formMessage.value.trim().length < 5
	return !nameError.value && !emailError.value && !messageError.value
}

async function handleSubmit() {
	success.value = false
	if (!validate()) {
		showToast('Please fix the highlighted fields', false)
		return
	}
	if (!API_URL) {
		showToast(
			'Send failed, please email sanguyocarl@gmail.com instead',
			false,
		)
		return
	}
	if (!turnstileToken.value) {
		showToast('Please complete the human verification first', false)
		return
	}

	sending.value = true
	try {
		const res = await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: formName.value.trim(),
				email: formEmail.value.trim(),
				message: formMessage.value.trim(),
				turnstileToken: turnstileToken.value,
			}),
		})

		if (res.status === 429) {
			showToast('That was a lot of messages at once, please try again later', false)
			return
		}
		if (!res.ok) throw new Error(`HTTP ${res.status}`)

		formName.value = ''
		formEmail.value = ''
		formMessage.value = ''
		success.value = true
		showToast('Message received, thank you!')
	} catch {
		showToast('Send failed, please email sanguyocarl@gmail.com instead', false)
	} finally {
		resetCaptcha()
		sending.value = false
	}
}

onMounted(async () => {
	if (!SITE_KEY || !turnstileEl.value) return
	try {
		await loadTurnstile()
		window.turnstile?.render(turnstileEl.value, {
			sitekey: SITE_KEY,
			theme: 'light',
			action: 'contact',
			callback: (token: string) => {
				turnstileToken.value = token
			},
			'expired-callback': () => {
				turnstileToken.value = ''
			},
		})
	} catch {
		captchaUnavailable.value = true
	}
})

async function copyEmail() {
	const email = 'sanguyocarl@gmail.com'
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(email)
			showToast('Email copied to clipboard')
		} else {
			throw new Error('no clipboard')
		}
	} catch {
		const ta = document.createElement('textarea')
		ta.value = email
		ta.setAttribute('readonly', '')
		ta.style.position = 'absolute'
		ta.style.left = '-9999px'
		document.body.appendChild(ta)
		ta.select()
		try {
			document.execCommand('copy')
			showToast('Email copied to clipboard')
		} catch {
			showToast('Copy not supported, email is sanguyocarl@gmail.com', false)
		}
		ta.remove()
	}
}
</script>

<template>
	<section id="contact" aria-labelledby="h-contact" class="section">
		<div class="container-x">
			<div class="grid overflow-hidden rounded-xl border border-line lg:grid-cols-2">
				<!-- Left: ink panel (committed field) -->
				<div class="relative bg-ink p-6 text-paper sm:p-8 md:p-12">
					<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/60">
						Contact
					</p>
					<h2 id="h-contact"
						class="mt-3 font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
						Open for the next role.
					</h2>
					<p class="mt-4 max-w-md text-base leading-relaxed text-paper/70">
						I'm open to junior web developer roles and freelance projects. I usually
						reply within 24 hours.
					</p>

					<div class="mt-8 space-y-3 text-base">
						<button type="button"
							class="flex w-full min-h-12 items-center justify-between gap-3 rounded-md bg-paper/10 px-4 py-3 text-left transition hover:bg-paper/20"
							@click="copyEmail">
							<span class="flex items-center gap-3 font-semibold">
								<PhEnvelopeSimple :size="16" class="text-accent" aria-hidden="true" />
								sanguyocarl@gmail.com
							</span>
							<span
								class="cursor-copy flex items-center gap-1.5 font-mono text-xs font-bold text-paper/60">
								<PhCopy :size="14" aria-hidden="true" /> copy
								<span class="sr-only"> email address to clipboard</span>
							</span>
						</button>
						<p class="flex items-center gap-3 rounded-md bg-paper/10 px-4 py-3 font-medium text-paper/90">
							<PhMapPin :size="16" class="shrink-0 text-accent" aria-hidden="true" />
							Nueva Ecija, PH &mdash; open to remote opportunities
						</p>
						<p class="flex items-center gap-3 rounded-md bg-paper/10 px-4 py-3 font-medium text-paper/90">
							<PhClock :size="16" class="shrink-0 text-accent" aria-hidden="true" />
							Typical response time: within a few hours
						</p>
					</div>

					<ul class="mt-8 flex gap-3" aria-label="Social profiles">
						<li>
							<a href="https://github.com/GoodGuyCarl" target="_blank" rel="noopener"
								aria-label="GitHub profile (opens in new tab)"
								class="grid h-12 w-12 place-items-center rounded-md border border-paper/30 text-paper transition hover:bg-paper hover:text-ink">
								<PhGithubLogo :size="20" aria-hidden="true" />
							</a>
						</li>
						<li>
							<a href="https://linkedin.com/in/carl-sanguyo" target="_blank" rel="noopener"
								aria-label="LinkedIn profile (opens in new tab)"
								class="grid h-12 w-12 place-items-center rounded-md border border-paper/30 text-paper transition hover:bg-paper hover:text-ink">
								<PhLinkedinLogo :size="20" aria-hidden="true" />
							</a>
						</li>
					</ul>
				</div>

				<!-- Right: form -->
				<form class="bg-surface p-6 sm:p-8 md:p-12" novalidate @submit.prevent="handleSubmit">
					<h3 class="font-display text-xl font-bold text-ink sm:text-2xl">
						Send a message
					</h3>
					<p class="mt-1 text-base text-ink-soft">
						Recruiter, founder, or fellow developer, my inbox is open.
					</p>

					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						<div>
							<label for="fName" class="mb-1.5 block text-sm font-bold text-ink">
								Name <span aria-hidden="true" class="text-accent">*</span>
							</label>
							<input id="fName" v-model="formName" name="name" required aria-required="true"
								:aria-invalid="nameError ? 'true' : 'false'" aria-describedby="errName"
								autocomplete="name" type="text" placeholder="Jane Smith"
								class="w-full rounded-md border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink-faint focus:border-accent focus:ring-4 focus:ring-accent/20"
								@input="
									nameError && formName.trim().length >= 2
										? (nameError = false)
										: null
									" />
							<p v-show="nameError" id="errName" class="mt-1.5 text-sm font-bold text-accent-deep">
								Please enter your name.
							</p>
						</div>
						<div>
							<label for="fEmail" class="mb-1.5 block text-sm font-bold text-ink">
								Email <span aria-hidden="true" class="text-accent">*</span>
							</label>
							<input id="fEmail" v-model="formEmail" name="email" required aria-required="true"
								:aria-invalid="emailError ? 'true' : 'false'" aria-describedby="errEmail"
								autocomplete="email" type="email" placeholder="jane@company.com"
								class="w-full rounded-md border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink-faint focus:border-accent focus:ring-4 focus:ring-accent/20"
								@input="
									emailError &&
										/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail.trim())
										? (emailError = false)
										: null
									" />
							<p v-show="emailError" id="errEmail" class="mt-1.5 text-sm font-bold text-accent-deep">
								Please enter a valid email address.
							</p>
						</div>
					</div>
					<div class="mt-5">
						<label for="fMessage" class="mb-1.5 block text-sm font-bold text-ink">
							Message <span aria-hidden="true" class="text-accent">*</span>
						</label>
						<textarea id="fMessage" v-model="formMessage" name="message" required aria-required="true"
							:aria-invalid="messageError ? 'true' : 'false'" aria-describedby="errMessage" rows="5"
							placeholder="Tell me about the role or project…"
							class="w-full resize-y rounded-md border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink-faint focus:border-accent focus:ring-4 focus:ring-accent/20"
							@input="
								messageError && formMessage.trim().length >= 5
									? (messageError = false)
									: null
								" />
						<p v-show="messageError" id="errMessage" class="mt-1.5 text-sm font-bold text-accent-deep">
							Please write a short message.
						</p>
					</div>

					<!-- Human verification -->
					<div class="mt-5">
						<div ref="turnstileEl"></div>
						<p v-if="captchaUnavailable" class="text-sm font-bold text-accent-deep">
							Verification couldn't load, please email me directly instead.
						</p>
					</div>

					<button type="submit" :disabled="sending" class="btn btn-accent mt-6 w-full">
						<template v-if="sending">
							<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
								aria-hidden="true">
								<path d="M21 12a9 9 0 1 1-6.219-8.56" />
							</svg>
							Sending…
						</template>
						<template v-else>
							<PhPaperPlaneTilt :size="16" aria-hidden="true" /> Send message
						</template>
					</button>

					<div v-show="success" role="status"
						class="mt-4 flex items-center gap-2 rounded-md bg-accent/10 px-4 py-3 text-base font-bold text-accent-deep">
						<PhCheckCircle :size="20" class="shrink-0" aria-hidden="true" />
						Message received, thank you for expressing interest in my work! I'll
						reply within a few hours.
					</div>
					<p class="mt-4 text-center font-mono text-xs font-semibold text-ink-faint">
						No spam, no newsletters, just a reply from me.
					</p>
				</form>
			</div>
		</div>
	</section>
</template>
