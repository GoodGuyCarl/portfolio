/** Resolve a path in /public against the deploy base (GitHub Pages subpath). */
export function asset(path: string): string {
	const base = import.meta.env.BASE_URL
	return `${base.endsWith('/') ? base : `${base}/`}${path.replace(/^\//, '')}`
}
