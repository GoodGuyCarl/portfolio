import { ref, onMounted, onUnmounted } from 'vue'

export function useTypedText(
	phrases: string[],
	options: { typeSpeed?: number; deleteSpeed?: number; pauseMs?: number; delayMs?: number } = {},
) {
	const { typeSpeed = 60, deleteSpeed = 28, pauseMs = 1700, delayMs = 350 } = options
	const text = ref('')
	let phraseIndex = 0
	let charIndex = 0
	let deleting = false
	let timer: ReturnType<typeof setTimeout> | null = null

	function tick() {
		const phrase = phrases[phraseIndex]
		if (!phrase) return
		text.value = phrase.slice(0, charIndex)

		if (!deleting) {
			if (charIndex < phrase.length) {
				charIndex++
				timer = setTimeout(tick, typeSpeed)
			} else {
				deleting = true
				timer = setTimeout(tick, pauseMs)
			}
		} else {
			if (charIndex > 0) {
				charIndex--
				timer = setTimeout(tick, deleteSpeed)
			} else {
				deleting = false
				phraseIndex = (phraseIndex + 1) % phrases.length
				timer = setTimeout(tick, delayMs)
			}
		}
	}

	onMounted(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (reduceMotion) {
			text.value = phrases[0] ?? ''
			return
		}
		tick()
	})

	onUnmounted(() => {
		if (timer) clearTimeout(timer)
	})

	return text
}
