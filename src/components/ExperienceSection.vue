<script setup lang="ts">
interface Job {
	period: string
	location: string
	isCurrent: boolean
	title: string
	company: string
	companyDesc: string
	bullets: string[]
	tech: string[]
}

const jobs: Job[] = [
	{
		period: 'Mar 2023 — Present',
		location: 'Austin, TX · Hybrid',
		isCurrent: true,
		title: 'Senior Frontend Engineer',
		company: 'Nova Labs',
		companyDesc: 'B2B analytics SaaS',
		bullets: [
			'Lead a 5-person squad building the real-time analytics dashboard used by <strong class="text-ink">30k+ monthly users</strong>.',
			'Cut Largest Contentful Paint by <strong class="text-ink">43%</strong> (3.1s → 1.8s) via code-splitting, edge caching and a new image pipeline.',
			'Designed and shipped "Nova UI", an internal design system of <strong class="text-ink">45+ components</strong> adopted by 5 product squads.',
			'Mentor 3 junior engineers and run the fortnightly frontend guild.',
		],
		tech: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Playwright'],
	},
	{
		period: 'Jun 2021 — Feb 2023',
		location: 'Remote',
		isCurrent: false,
		title: 'Full-Stack Developer',
		company: 'Brightline Commerce',
		companyDesc: 'E-commerce platform',
		bullets: [
			'Built checkout & payments flows (Stripe) processing <strong class="text-ink">$2M+ monthly</strong>; conversion up <strong class="text-ink">18%</strong> post-launch.',
			'Designed Node.js REST + GraphQL APIs serving 400 req/s at <strong class="text-ink">p99 &lt; 120ms</strong>.',
			'Migrated a legacy monolith to containerized services on AWS — deploys went from <strong class="text-ink">45 min to 8 min</strong>.',
		],
		tech: ['Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Stripe'],
	},
	{
		period: 'Jul 2019 — May 2021',
		location: 'Portland, OR',
		isCurrent: false,
		title: 'Web Developer',
		company: 'Pixel & Co',
		companyDesc: 'Digital agency',
		bullets: [
			'Delivered <strong class="text-ink">20+ marketing & e-commerce sites</strong> for retail, healthcare and education clients.',
			'Raised average Lighthouse scores from 71 → <strong class="text-ink">95</strong>; introduced automated audits in CI.',
			'Led accessibility remediation to <strong class="text-ink">WCAG 2.1 AA</strong> across 8 public-sector sites.',
		],
		tech: ['JavaScript', 'Vue', 'SCSS', 'SEO', 'Figma'],
	},
]
</script>

<template>
	<section id="experience" aria-labelledby="h-experience" class="section">
		<div class="container-x">
			<header class="shead reveal">
				<p class="shead__label">Career</p>
				<div class="shead__body">
					<h2 id="h-experience" class="shead__title">Experience that ships.</h2>
					<p class="shead__lead">
						Six years of turning ambiguous problems into measurable product outcomes.
						Newest first, with the impact that mattered most.
					</p>
				</div>
			</header>

			<div class="relative mt-12 md:mt-16">
				<!-- Timeline line -->
				<div
					class="absolute bottom-2 left-1.25 top-2 w-px bg-line md:left-57.75"
					aria-hidden="true"
				/>

				<article
					v-for="(job, i) in jobs"
					:key="job.company"
					class="reveal relative pl-8 md:pl-0"
					:class="i < jobs.length - 1 ? 'pb-12 md:pb-14' : 'pb-2 md:pb-0'"
				>
					<!-- Timeline marker -->
					<span
						class="absolute left-px top-2 h-2.25 w-2.25 rounded-full ring-4 ring-paper md:left-56.75"
						:class="
							job.isCurrent ? 'bg-accent ring-accent/15' : 'bg-ink-faint ring-paper'
						"
						aria-hidden="true"
					/>

					<!-- Date sidebar -->
					<div
						class="mb-4 md:absolute md:left-0 md:top-1 md:mb-0 md:w-52.5 md:pr-10 md:text-right"
					>
						<p class="font-mono text-sm font-bold text-ink">{{ job.period }}</p>
						<p class="mt-1 text-xs font-semibold text-ink-soft">{{ job.location }}</p>
						<p
							v-if="job.isCurrent"
							class="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent md:flex md:justify-end"
						>
							<span class="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
							Current role
						</p>
					</div>

					<!-- Job card -->
					<div class="card p-6 transition-shadow hover:shadow-card md:ml-66 md:p-7">
						<h3 class="font-display text-xl font-bold text-ink">{{ job.title }}</h3>
						<p class="mt-0.5 text-sm font-bold text-accent">
							{{ job.company }} · {{ job.companyDesc }}
						</p>

						<ul class="mt-4 space-y-2.5 text-base leading-relaxed text-ink-soft">
							<li v-for="(bullet, bi) in job.bullets" :key="bi" class="flex gap-3">
								<span
									class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
									aria-hidden="true"
								/>
								<span v-html="bullet" />
							</li>
						</ul>

						<ul class="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
							<li v-for="t in job.tech" :key="t" class="tag">{{ t }}</li>
						</ul>
					</div>
				</article>
			</div>
		</div>
	</section>
</template>
