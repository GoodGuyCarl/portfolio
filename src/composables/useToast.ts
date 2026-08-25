import { ref } from 'vue'

interface Toast {
	id: number
	message: string
	ok: boolean
}

const toasts = ref<Toast[]>([])
let nextId = 0

export function useToast() {
	function showToast(message: string, ok = true) {
		const id = nextId++
		toasts.value.push({ id, message, ok })
		setTimeout(() => {
			toasts.value = toasts.value.filter((t) => t.id !== id)
		}, 3700)
	}

	return { toasts, showToast }
}
