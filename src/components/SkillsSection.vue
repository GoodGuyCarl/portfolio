<script setup lang="ts">
import { onMounted } from 'vue'

const skillGroups = [
	{
		title: 'Frontend',
		skills: [
			'React',
			'Next.js',
			'TypeScript',
			'Vue',
			'Tailwind CSS',
			'Framer Motion',
			'Zustand / Redux',
		],
	},
	{
		title: 'Backend',
		skills: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Redis', 'Prisma', 'WebSockets'],
		delay: '0.08s',
	},
	{
		title: 'Cloud & Tooling',
		skills: ['AWS', 'Docker', 'GitHub Actions', 'Jest', 'Playwright', 'Vite', 'Figma'],
		delay: '0.16s',
	},
]

const proficiency = [
	{ label: 'TypeScript / React', level: 95 },
	{ label: 'Node.js & APIs', level: 90 },
	{ label: 'CSS / Design systems', level: 88 },
	{ label: 'Testing & CI', level: 85 },
	{ label: 'AWS / DevOps', level: 80 },
]

const workStyle = [
	{
		title: 'Performance-first.',
		desc: 'Budgets in CI, Core Web Vitals monitored in production.',
	},
	{ title: 'Accessible by default.', desc: 'WCAG 2.1 AA is the floor, not the ceiling.' },
	{ title: 'Test-driven where it counts.', desc: 'E2E for journeys, unit tests for logic.' },
	{ title: 'Documented & kind DX.', desc: 'READMEs, ADRs, and code reviews that teach.' },
]

onMounted(() => {
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	const bars = document.querySelectorAll('.meter-fill') as NodeListOf<HTMLElement>

	if (reduceMotion || !('IntersectionObserver' in window)) {
		bars.forEach((b) => {
			b.style.transform = 'scaleX(1)'
		})
		return
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					const target = e.target as HTMLElement
					target.style.transform = `scaleX(${Number(target.dataset.level) / 100})`
					observer.unobserve(target)
				}
			})
		},
		{ threshold: 0.4 },
	)
	bars.forEach((b) => observer.observe(b))
})
</script>

<template>
	<section id="skills" aria-labelledby="h-skills" class="section">
		<div class="container-x">
			<header class="shead reveal">
				<p class="shead__label">Toolkit</p>
				<div class="shead__body">
					<h2 id="h-skills" class="shead__title">Skills, at a glance.</h2>
					<p class="shead__lead">
						The tools I reach for daily — and the principles behind them. Honest
						proficiency levels, no buzzword soup.
					</p>
				</div>
			</header>

			<div class="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-7">
				<!-- Left: skill groups -->
				<div class="space-y-6">
					<div
						v-for="group in skillGroups"
						:key="group.title"
						class="card reveal p-6"
						:style="group.delay ? { '--d': group.delay } : {}"
					>
						<div class="flex items-center gap-3">
							<span class="h-2.5 w-2.5 bg-accent" aria-hidden="true" />
							<h3 class="font-display text-lg font-bold text-ink">
								{{ group.title }}
							</h3>
						</div>
						<ul class="mt-4 flex flex-wrap gap-2">
							<li v-for="skill in group.skills" :key="skill" class="tag">
								{{ skill }}
							</li>
						</ul>
					</div>
				</div>

				<!-- Right: proficiency + principles -->
				<div class="space-y-6">
					<div class="card reveal p-6 md:p-7">
						<h3 class="font-display text-lg font-bold text-ink">Proficiency</h3>
						<div class="mt-5 space-y-5">
							<div v-for="skill in proficiency" :key="skill.label">
								<div class="mb-2 flex items-center justify-between text-sm">
									<span class="font-bold text-ink">{{ skill.label }}</span>
									<span class="font-mono text-xs font-bold text-ink-faint"
										>{{ skill.level }}%</span
									>
								</div>
								<div
									class="h-1.5 rounded-full bg-line"
									role="img"
									:aria-label="`${skill.label} proficiency: ${skill.level} percent`"
								>
									<div
										class="meter-fill h-full w-full rounded-full bg-accent"
										:data-level="skill.level"
									/>
								</div>
							</div>
						</div>
					</div>

					<div class="card reveal p-6 md:p-7" style="--d: 0.08s">
						<h3 class="font-display text-lg font-bold text-ink">How I work</h3>
						<ul class="mt-5">
							<li
								v-for="item in workStyle"
								:key="item.title"
								class="border-t border-line py-4 first:border-0 first:pt-0"
							>
								<strong class="block text-base font-bold text-ink">{{
									item.title
								}}</strong>
								<span class="mt-1 block text-base text-ink-soft">{{
									item.desc
								}}</span>
							</li>
						</ul>
						<p
							class="mt-6 rounded-md border border-line bg-paper px-4 py-3 font-mono text-xs font-semibold text-ink-soft"
						>
							<span class="font-bold text-accent">currently_exploring:</span> ["Rust",
							"WebGPU", "AI-assisted dev tooling"]
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
