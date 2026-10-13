import { ref, onMounted, onUnmounted } from 'vue'

/** True once the page has been scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number) {
	const past = ref(false)

	function onScroll() {
		past.value = window.scrollY > threshold
	}

	onMounted(() => {
		window.addEventListener('scroll', onScroll, { passive: true })
		onScroll()
	})

	onUnmounted(() => {
		window.removeEventListener('scroll', onScroll)
	})

	return past
}