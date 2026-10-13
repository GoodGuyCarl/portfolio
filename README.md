# portfolio

Personal portfolio site for Carl Sanguyo. Single page, built with Vue 3 + Vite, deployed to
GitHub Pages. The contact form posts to a Cloudflare Worker.

## Stack

Vue 3, Vite, Tailwind CSS v4, TypeScript, oxlint + ESLint. No other runtime dependencies.

## Getting started

Requires Node `^22.18.0 || >=24.12.0` (the test runner strips TypeScript types natively, which
needs those versions) and pnpm.

```sh
pnpm install
pnpm dev
```

### Environment variables

Both are public values, not secrets. Without them the contact form is dead: Vite compiles
`if (!API_URL)` to an always-true branch and deletes the whole submit and captcha code from the
bundle. For local work put them in `.env.local` (ignored by git — plain `.env` is **not**):

```sh
VITE_CONTACT_API_URL=https://portfolio-contact.<subdomain>.workers.dev
VITE_TURNSTILE_SITE_KEY=0x4AAAA...
```

- `VITE_CONTACT_API_URL` — the contact worker's public URL.
- `VITE_TURNSTILE_SITE_KEY` — Cloudflare dashboard → Turnstile → your widget → Client keys.
  Must be the widget whose secret key the worker holds in `TURNSTILE_SECRET`.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | dev server on :5173 |
| `pnpm build` | type-check + production build into `dist/` |
| `pnpm test` | worker tests (no network, no dependencies) |
| `pnpm lint` | oxlint + eslint, both with `--fix` |
| `pnpm format` | prettier over `src/` |

## Deploying the site

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub Pages at
`/<repo-name>`, which is why `vite.config.ts` sets `base: '/portfolio'`.

The workflow reads `VITE_CONTACT_API_URL` and `VITE_TURNSTILE_SITE_KEY` from **repository
variables** (Settings → Secrets and variables → Actions → Variables) and fails the build if
either is missing. Repository secrets also work if you would rather not expose them.

The site is served from a subpath, so public files must go through `asset()` in
`src/lib/utils.ts` rather than a plain `/logo.png` path.

## The contact worker

`worker/` is a standalone Cloudflare Worker, deployed by hand. It checks a Turnstile captcha,
counts requests per IP in Workers KV, forwards the message to a Discord webhook, and sends the
visitor an auto-reply through EmailJS.

```sh
cd worker
npx wrangler deploy
npx wrangler secret put DISCORD_WEBHOOK_URL
npx wrangler secret put TURNSTILE_SECRET
npx wrangler secret put EMAILJS_PRIVATE_KEY
```

Plain config (origins, rate limits, EmailJS ids) lives in `worker/wrangler.toml`. The origin
list must contain the scheme and host only, never a path.

It is type-checked by the root `pnpm type-check` and covered by `pnpm test`.

## Layout

```
src/components/     one component per section
src/composables/    useScrollSpy, useScrolledPast, useToast
src/data/           project content
src/lib/utils.ts    asset() for public files under the Pages base path
worker/src/         the contact API and its tests
```