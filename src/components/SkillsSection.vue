<script setup lang="ts">
const skillGroups = [
	{
		title: 'Frameworks',
		skills: ['Vue', 'Next.js', 'PHP', 'Tailwind CSS'],
	},
	{
		title: 'Data & platform',
		skills: ['SQL', 'API integration', 'OutSystems 11', 'Vercel'],
	},
	{
		title: 'Tooling',
		skills: ['Git', 'OpenCode'],
	},
]

const workStyle = [
	{
		title: 'Ship to learn.',
		desc: 'Side projects like Cinephile are where new skills get stress-tested.',
	},
	{
		title: 'Two worlds, one craft.',
		desc: 'Low-code delivery with OutSystems at work; hand-written Vue after hours.',
	},
	{
		title: 'Honest scope.',
		desc: 'Small commitments are kept over big promises.',
	},
	{
		title: 'Leave a trail.',
		desc: 'Clear commits and READMEs so the next dev (often me) moves fast.',
	},
]
</script>

<template>
	<section id="skills" aria-labelledby="h-skills" class="section">
		<div class="container-x">
			<header class="shead">
				<p class="shead__label">Toolkit</p>
				<div class="shead__body">
					<h2 id="h-skills" class="shead__title">The working stack.</h2>
					<p class="shead__lead">
						What I actually reach for &mdash; on the job and after hours. No buzzword soup.
					</p>
				</div>
			</header>

			<div class="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-7">
				<!-- Left: skill groups -->
				<div class="space-y-6">
					<div v-for="group in skillGroups" :key="group.title" class="card p-6">
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

				<!-- Right: principles -->
				<div class="space-y-6">
					<div class="card p-6 md:p-7">
						<h3 class="font-display text-lg font-bold text-ink">How I work</h3>
						<ul class="mt-5">
							<li v-for="item in workStyle" :key="item.title"
								class="border-t border-line py-4 first:border-0 first:pt-0">
								<strong class="block text-base font-bold text-ink">{{
									item.title
								}}</strong>
								<span class="mt-1 block text-base text-ink-soft">{{
									item.desc
								}}</span>
							</li>
						</ul>
						<p
							class="mt-6 rounded-md border border-line bg-paper px-4 py-3 font-mono text-xs font-semibold text-ink-soft">
							<span class="font-bold text-accent">currently_exploring:</span> ["Deeper Vue patterns",
							"REST API design", "SQL tuning"]
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
