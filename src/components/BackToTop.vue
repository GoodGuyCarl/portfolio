<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { PhCaretUp } from '@phosphor-icons/vue'

const show = ref(false)

function onScroll() {
	show.value = window.scrollY > 600
}

function scrollToTop() {
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
}

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true })
	onScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
})
</script>

<template>
	<button
		type="button"
		class="back-top-btn no-print fixed bottom-5 right-4 z-70 grid h-12 w-12 place-items-center rounded-md bg-ink text-paper shadow-pop transition hover:bg-accent sm:right-6 cursor-pointer"
		:class="{ show }"
		aria-label="Back to top"
		@click="scrollToTop"
	>
		<PhCaretUp :size="20" weight="bold" aria-hidden="true" />
	</button>
</template>
