import { asset } from '@/lib/utils'

export interface Project {
	key: string
	badge: string
	title: string
	tagline: string
	img?: string
	desc: string
	role: string
	highlights: string[]
	stack: string[]
	live: string
	repo?: string
}

export const projects: Project[] = [
	{
		key: 'cinephile',
		badge: 'Side project · Live',
		title: 'Cinephile',
		tagline: 'A home-grown streaming site for movie and series lovers.',
		img: asset('cinephile.jpg'),
		desc: 'Cinephile is my hobby project: a movie and series streaming site built with Vue and deployed on Vercel. It started as a way to practice component architecture and API integration end-to-end and it now welcomes real visitors every month.',
		role: 'Solo developer & maintainer',
		highlights: [
			'140+ monthly visitors over the last 30 days (Vercel)',
			'Designed, built and deployed entirely solo',
			'Hands-on practice across Vue, APIs and deployment',
		],
		stack: ['Vue', 'Vercel'],
		live: 'https://cinephile.tech',
	},
]
