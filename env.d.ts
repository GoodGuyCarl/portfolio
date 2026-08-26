/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** Cloudflare Worker endpoint that receives contact-form submissions. */
	readonly VITE_CONTACT_API_URL?: string
	/** Cloudflare Turnstile site key (public). */
	readonly VITE_TURNSTILE_SITE_KEY?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
