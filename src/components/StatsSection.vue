<script setup lang="ts">
import { PhBriefcase, PhStack, PhGauge, PhUsers } from '@phosphor-icons/vue'

const stats = [
	{
		icon: PhBriefcase,
		value: '6+',
		label: 'Years of experience',
		description: 'Full-stack product development',
		delay: '0s',
	},
	{
		icon: PhStack,
		value: '40+',
		label: 'Projects shipped',
		description: 'From MVPs to enterprise scale',
		delay: '0.08s',
	},
	{
		icon: PhGauge,
		value: '99',
		label: 'Avg. Lighthouse score',
		description: 'Performance & accessibility first',
		delay: '0.16s',
	},
	{
		icon: PhUsers,
		value: '12',
		label: 'Developers mentored',
		description: 'Workshops, reviews & guilds',
		delay: '0.24s',
	},
]
</script>

<template>
	<section aria-labelledby="stats-heading" class="container-x py-14 md:py-16">
		<h2 id="stats-heading" class="sr-only">Career highlights in numbers</h2>
		<div
			class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4"
		>
			<div
				v-for="stat in stats"
				:key="stat.label"
				class="reveal bg-paper p-6 md:p-7"
				:style="{ '--d': stat.delay }"
			>
				<span class="inline-grid h-9 w-9 place-items-center text-accent" aria-hidden="true">
					<component :is="stat.icon" :size="20" weight="bold" />
				</span>
				<p class="figure mt-4">{{ stat.value }}</p>
				<p class="mt-2 text-sm font-bold text-ink">{{ stat.label }}</p>
				<p class="mt-1 text-sm text-ink-soft">{{ stat.description }}</p>
			</div>
		</div>
	</section>
</template>
