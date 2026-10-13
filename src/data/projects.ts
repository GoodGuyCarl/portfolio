import { asset } from '@/lib/utils'

export interface Project {
	key: string
	badge?: string
	title: string
	tagline: string
	img?: string
	desc: string
	role?: string
	highlights?: string[]
	stack?: string[]
	live?: string
	repo?: string
	/** Kept here so the stats strip cannot quote a different number. */
	monthlyVisitors?: number
}

/** Stated once: the stats strip and the case study both quote this. */
const cinephileVisitors = 140

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
			`${cinephileVisitors}+ monthly visitors over the last 30 days (Vercel)`,
			'Designed, built and deployed entirely solo',
			'Hands-on practice across Vue, APIs and deployment',
		],
		stack: ['Vue', 'Vercel'],
		live: 'https://cinephile.tech',
		monthlyVisitors: cinephileVisitors,
	},
	{
		key: 'verdant',
		badge: 'Shopify Theme',
		title: 'Verdant',
		tagline: 'A Shopify theme for a premium quality storefront.',
		img: asset('verdant.png'),
		desc: 'Verdant is a Shopify theme made in a span of 3 days learning from scratch on how to quickly develop a Shopify theme. From learning Liquid basics to deploying it in my dev store (I also had to learn to create a dev store). This was a take-home task for a job application that I did not pass.',
		role: 'Solo developer',
		highlights: [

		],
		stack: ['Liquid', 'Shopify'],
		live: 'https://verdant-il4rhgv0.myshopify.com/',
		repo: 'https://github.com/GoodGuyCarl/verdant'
	}
]
