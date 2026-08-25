<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { PhCheck, PhWarning } from '@phosphor-icons/vue'

const { toasts } = useToast()
</script>

<template>
	<Teleport to="body">
		<div
			role="status"
			aria-live="polite"
			class="toast-wrap no-print pointer-events-none fixed bottom-5 left-1/2 z-90 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col items-center gap-2"
		>
			<TransitionGroup name="toast">
				<div
					v-for="t in toasts"
					:key="t.id"
					class="toast pointer-events-auto flex w-full items-center gap-2.5 rounded-md border border-line bg-ink px-4 py-3.5 text-sm font-semibold text-paper shadow-pop"
				>
					<PhCheck
						v-if="t.ok"
						:size="16"
						class="shrink-0 text-accent"
						aria-hidden="true"
					/>
					<PhWarning v-else :size="16" class="shrink-0 text-accent" aria-hidden="true" />
					<span>{{ t.message }}</span>
				</div>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<style scoped>
.toast-enter-active {
	animation: toastIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.toast-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.toast-leave-to {
	opacity: 0;
	transform: translateY(8px);
}
</style>
