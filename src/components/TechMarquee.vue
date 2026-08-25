<template>
	<!-- Tech ticker (decorative; list provided for screen readers) -->
	<div class="marquee no-print border-y border-line bg-surface py-3" aria-hidden="true">
		<div class="marquee-track">
			<ul v-for="i in 2" :key="i" class="flex items-center">
				<li
					v-for="tech in techs"
					:key="`${i}-${tech}`"
					class="flex items-center gap-6 pr-6 md:pr-10"
				>
					<span
						class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint"
						>{{ tech }}</span
					>
					<span class="text-accent" aria-hidden="true">/</span>
				</li>
			</ul>
		</div>
	</div>
	<p class="sr-only">Core technologies: {{ techs.join(', ') }}.</p>
</template>

<script setup lang="ts">
const techs = [
	'React',
	'TypeScript',
	'Next.js',
	'Node.js',
	'GraphQL',
	'PostgreSQL',
	'AWS',
	'Docker',
	'Tailwind CSS',
	'Playwright',
	'Accessibility',
	'Web Performance',
]
</script>
