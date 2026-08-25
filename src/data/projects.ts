export interface Project {
	key: string
	badge: string
	title: string
	tagline: string
	img: string
	desc: string
	role: string
	highlights: string[]
	stack: string[]
	live: string
	repo: string
}

export const projects: Project[] = [
	{
		key: 'pulseboard',
		badge: 'SaaS · 2025',
		title: 'Pulseboard',
		tagline: 'Real-time product analytics that stays out of your way.',
		img: '/project-pulseboard.jpg',
		desc: 'Pulseboard streams raw product events over WebSockets and renders live dashboards for product teams. I architected the ingestion pipeline, the canvas-based charting layer, and the alerting system end-to-end — then obsessively profiled it until interactions felt instant.',
		role: 'Creator & lead developer (team of 3)',
		highlights: [
			'12,000+ monthly active users across 300 teams',
			'50k events/min with sub-100ms chart updates',
			'99.2% uptime over the last 12 months',
		],
		stack: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'ClickHouse', 'AWS'],
		live: 'https://example.com',
		repo: 'https://github.com',
	},
	{
		key: 'cartwheel',
		badge: 'E-commerce · 2024',
		title: 'Cartwheel',
		tagline: 'A headless storefront that treats speed as a feature.',
		img: '/project-cartwheel.jpg',
		desc: 'Cartwheel is a headless commerce storefront built on Next.js with Stripe payments and Sanity CMS. Edge rendering, image optimization and a strict performance budget produced a 0.9s LCP on mid-tier mobile devices — and a 23% conversion lift in A/B testing.',
		role: 'Full-stack developer (client project)',
		highlights: [
			'0.9s LCP and 99 Lighthouse performance on mobile',
			'+23% checkout conversion vs. the legacy store',
			'Zero-downtime launches for 40k monthly shoppers',
		],
		stack: ['Next.js', 'Stripe', 'Sanity', 'Tailwind CSS', 'Vercel'],
		live: 'https://example.com',
		repo: 'https://github.com',
	},
	{
		key: 'devdeck',
		badge: 'Open source · 2023',
		title: 'DevDeck',
		tagline: 'Living documentation, generated from your code.',
		img: '/project-devdeck.jpg',
		desc: 'DevDeck parses your codebase and generates a searchable docs site plus a CLI for scaffolding and releases. What started as a weekend tool is now used by 150+ teams; I maintain the core, review community PRs, and write the release notes.',
		role: 'Author & maintainer',
		highlights: [
			'2,100+ GitHub stars and 40+ contributors',
			'Adopted by 150+ engineering teams',
			'Docs generated in under 2s for 100k-line repos',
		],
		stack: ['Node.js', 'TypeScript', 'MDX', 'esbuild', 'GitHub Actions'],
		live: 'https://example.com',
		repo: 'https://github.com',
	},
	{
		key: 'nomadly',
		badge: 'PWA · 2024',
		title: 'Nomadly',
		tagline: 'An offline-first travel planner that works at 30,000 ft.',
		img: '/project-nomadly.jpg',
		desc: 'Nomadly is an installable PWA with offline maps, a drag-and-drop itinerary builder and background sync. IndexedDB plus Workbox service workers keep every plan usable with zero connectivity — perfect for roaming-averse travelers.',
		role: 'Solo developer & designer',
		highlights: [
			'8,000+ installs with a 4.7-star average rating',
			'100% offline-capable itineraries and maps',
			'Featured at Austin PWA meetup 2024',
		],
		stack: ['React', 'IndexedDB', 'Workbox', 'Leaflet', 'Firebase'],
		live: 'https://example.com',
		repo: 'https://github.com',
	},
]
