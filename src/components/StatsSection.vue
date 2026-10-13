<script setup lang="ts">
import { projects } from '@/data/projects'

// The visitor count lives with the project it describes, so the two can never disagree.
const traffic = projects.find((p) => p.monthlyVisitors !== undefined)!

const readings = [
	{
		label: 'Experience',
		value: '7+ mo',
		note: 'Metaverse Holdings · OutSystems 11',
	},
	{
		label: 'Live traffic',
		value: `${traffic.monthlyVisitors}+/mo`,
		note: `${traffic.title}, last 30 days via Vercel`,
	},
	{
		label: 'Technologies',
		value: '10+',
		note: 'PHP • Vue • Next.js • SQL',
	},
	{
		label: 'Certification',
		value: '1',
		note: 'Associate Web Developer (OutSystems 11)',
	},
]
</script>

<template>
	<section aria-labelledby="stats-heading" class="container-x py-14 md:py-16">
		<h2 id="stats-heading" class="sr-only">Career highlights in numbers</h2>
		<!-- Title block: one ruled readout, like a drawing sheet -->
		<dl class="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
			<div v-for="r in readings" :key="r.label" class="bg-paper p-5 md:p-6">
				<dt class="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
					{{ r.label }}
				</dt>
				<dd class="mt-3">
					<span
						class="block font-display text-3xl font-bold leading-none tracking-tight text-ink md:text-4xl">{{
							r.value }}</span>
					<span class="mt-2 block text-xs leading-relaxed text-ink-soft">{{
						r.note
					}}</span>
				</dd>
			</div>
		</dl>
	</section>
</template>
