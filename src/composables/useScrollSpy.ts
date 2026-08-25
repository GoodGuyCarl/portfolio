import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollSpy(sectionIds: string[], offset = '-35% 0px -60% 0px') {
	const activeId = ref('')

	onMounted(() => {
		if (!('IntersectionObserver' in window)) return

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId.value = entry.target.id
					}
				})
			},
			{ rootMargin: offset },
		)

		sectionIds.forEach((id) => {
			const el = document.getElementById(id)
			if (el) observer.observe(el)
		})

		onUnmounted(() => observer.disconnect())
	})

	return activeId
}
