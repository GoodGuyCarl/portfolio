import { ref, onMounted, onUnmounted } from 'vue'

export function useReveal(threshold = 0.12) {
	const revealObserver = ref<IntersectionObserver | null>(null)

	onMounted(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

		if (reduceMotion || !('IntersectionObserver' in window)) {
			document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
			return
		}

		revealObserver.value = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in')
						revealObserver.value?.unobserve(entry.target)
					}
				})
			},
			{ threshold },
		)

		document.querySelectorAll('.reveal').forEach((el) => {
			revealObserver.value?.observe(el)
		})
	})

	onUnmounted(() => {
		revealObserver.value?.disconnect()
	})

	return revealObserver
}
