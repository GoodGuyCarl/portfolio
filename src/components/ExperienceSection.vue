<script setup lang="ts">
interface Job {
	period: string
	location: string
	isCurrent: boolean
	title: string
	company: string
	bullets: string[]
	tech: string[]
}

const jobs: Job[] = [
	{
		period: 'Nov 2025 - Jun 2026',
		location: 'Philippines',
		isCurrent: false,
		title: 'Junior Web Developer',
		company: 'Metaverse Holdings Corporation',
		bullets: [
			'Developed and maintained application modules in <strong class="text-ink">OutSystems 11</strong>.',
			'Refactored the sorting logic of a module <strong class="text-ink">widely used across the company\'s web application</strong>.',
			'Extended existing UIs to accommodate <strong class="text-ink">new entity/table fields</strong> without disrupting live workflows.',
		],
		tech: ['OutSystems 11', 'SQL'],
	},
]
</script>

<template>
	<section id="experience" aria-labelledby="h-experience" class="section">
		<div class="container-x">
			<header class="shead">
				<p class="shead__label">Career</p>
				<div class="shead__body">
					<h2 id="h-experience" class="shead__title">Employment record.</h2>
					<p class="shead__lead">
						Early-career, real production work. Every line below shipped.
					</p>
				</div>
			</header>

			<div class="relative mt-12 md:mt-16">
				<!-- Timeline line -->
				<div class="absolute bottom-2 left-1.25 top-2 w-px bg-line md:left-57.75" aria-hidden="true" />

				<article v-for="(job, i) in jobs" :key="job.company" class="relative pl-8 md:pl-0"
					:class="i < jobs.length - 1 ? 'pb-12 md:pb-14' : 'pb-2 md:pb-0'">
					<!-- Timeline marker -->
					<span class="absolute left-px top-2 h-2.25 w-2.25 rounded-full ring-4 ring-paper md:left-56.75"
						:class="job.isCurrent ? 'bg-accent ring-accent/15' : 'bg-ink-faint ring-paper'
							" aria-hidden="true" />

					<!-- Date sidebar -->
					<div class="mb-4 md:absolute md:left-0 md:top-1 md:mb-0 md:w-52.5 md:pr-10 md:text-right">
						<p class="font-mono text-sm font-bold text-ink">{{ job.period }}</p>
						<p class="mt-1 text-xs font-semibold text-ink-soft">{{ job.location }}</p>
						<p v-if="job.isCurrent"
							class="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent md:flex md:justify-end">
							<span class="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
							Current role
						</p>
					</div>

					<!-- Job card -->
					<div class="card p-6 transition-shadow hover:shadow-card md:ml-66 md:p-7">
						<h3 class="font-display text-xl font-bold text-ink">{{ job.title }}</h3>
						<p class="mt-0.5 text-sm font-bold text-accent">
							{{ job.company }}
						</p>

						<ul class="mt-4 space-y-2.5 text-base leading-relaxed text-ink-soft">
							<li v-for="(bullet, bi) in job.bullets" :key="bi" class="flex gap-3">
								<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
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
