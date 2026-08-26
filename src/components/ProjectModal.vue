<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { projects, type Project } from '@/data/projects'
import { PhX, PhGlobe, PhGithubLogo, PhCheck } from '@phosphor-icons/vue'

const props = defineProps<{
	projectKey: string | null
}>()

const emit = defineEmits<{
	close: []
}>()

const isOpen = ref(false)
const isVisible = ref(false)
const project = ref<Project | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
let lastFocused: HTMLElement | null = null

watch(
	() => props.projectKey,
	async (key) => {
		if (key) {
			project.value = projects.find((p) => p.key === key) || null
			if (!project.value) return

			lastFocused = document.activeElement as HTMLElement
			isOpen.value = true
			document.body.style.overflow = 'hidden'

			await nextTick()
			requestAnimationFrame(() => {
				isVisible.value = true
				closeBtn.value?.focus()
			})
		} else {
			isVisible.value = false
			setTimeout(() => {
				isOpen.value = false
				document.body.style.overflow = ''
				if (lastFocused?.focus) lastFocused.focus()
			}, 300)
		}
	},
)

function handleClose() {
	emit('close')
}

function handleBackdropClick(e: MouseEvent) {
	if ((e.target as HTMLElement).id === 'modalBackdrop') {
		handleClose()
	}
}

function handleKeydown(e: KeyboardEvent) {
	if (e.key === 'Escape' && isOpen.value) {
		handleClose()
	}

	if (e.key === 'Tab' && isOpen.value) {
		const focusables = document.querySelectorAll(
			'#projectModal a[href], #projectModal button:not([disabled])',
		) as NodeListOf<HTMLElement>
		if (!focusables.length) return
		const first = focusables[0]!
		const last = focusables[focusables.length - 1]!
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault()
			last.focus()
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault()
			first.focus()
		}
	}
}

onMounted(() => {
	document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
	document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
	<Teleport to="body">
		<div
			v-if="isOpen"
			id="projectModal"
			class="no-print fixed inset-0 z-80"
			role="dialog"
			aria-modal="true"
			aria-labelledby="mTitle"
			aria-describedby="mDesc"
		>
			<!-- Backdrop -->
			<div
				id="modalBackdrop"
				class="absolute inset-0 bg-ink/70 transition-opacity duration-300"
				:class="isVisible ? 'opacity-100' : 'opacity-0'"
				@click="handleBackdropClick"
			/>

			<!-- Card -->
			<div class="relative z-10 mx-auto flex h-full max-w-2xl items-center px-3 sm:px-4">
				<div
					class="max-h-[90vh] w-full overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface shadow-pop transition-all duration-300"
					:class="
						isVisible
							? 'opacity-100 translate-y-0 scale-100'
							: 'opacity-0 translate-y-6 scale-95'
					"
				>
					<template v-if="project">
						<!-- Header image -->
						<div class="relative border-b border-line">
							<img
								v-if="project.img"
								:src="project.img"
								:alt="`${project.title} interface preview`"
								class="h-48 w-full object-cover sm:h-56 md:h-64"
							/>
							<div v-else class="grid h-48 w-full place-items-center bg-ink sm:h-56 md:h-64">
								<span
									class="font-display text-6xl font-bold tracking-tight text-paper/85"
									aria-hidden="true"
									>{{ project.title.slice(0, 2) }}</span
								>
							</div>
							<button
								ref="closeBtn"
								type="button"
								class="cursor-pointer absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-md bg-ink text-paper transition hover:bg-accent"
								aria-label="Close case study dialog"
								@click="handleClose"
							>
								<PhX :size="20" aria-hidden="true" />
							</button>
							<p class="folio absolute left-3 top-3 bg-surface/90 px-2 py-1">
								{{ project.badge }}
							</p>
						</div>

						<!-- Content -->
						<div class="p-6 sm:p-8">
							<h3 id="mTitle" class="font-display text-2xl font-bold text-ink">
								{{ project.title }}
							</h3>
							<p class="mt-1 text-base font-bold text-accent">
								{{ project.tagline }}
							</p>
							<p id="mDesc" class="mt-4 text-base leading-relaxed text-ink-soft">
								{{ project.desc }}
							</p>

							<div class="mt-6 grid gap-6 sm:grid-cols-[1fr_1.3fr]">
								<div>
									<h4
										class="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint"
									>
										My role
									</h4>
									<p class="mt-2 text-base font-bold text-ink">
										{{ project.role }}
									</p>
								</div>
								<div>
									<h4
										class="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint"
									>
										Highlights
									</h4>
									<ul class="mt-2 space-y-2 text-base text-ink-soft">
										<li
											v-for="h in project.highlights"
											:key="h"
											class="flex gap-2"
										>
											<PhCheck
												:size="15"
												weight="bold"
												class="mt-1 shrink-0 text-accent"
												aria-hidden="true"
											/>
											<span>{{ h }}</span>
										</li>
									</ul>
								</div>
							</div>

							<h4
								class="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint"
							>
								Stack
							</h4>
							<ul class="mt-2 flex flex-wrap gap-2">
								<li v-for="s in project.stack" :key="s" class="tag">{{ s }}</li>
							</ul>

							<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
								<a
									:href="project.live"
									target="_blank"
									rel="noopener"
									class="btn btn-accent"
								>
									<PhGlobe :size="16" aria-hidden="true" /> Live demo
									<span class="sr-only"> (opens in new tab)</span>
								</a>
							<a
								v-if="project.repo"
								:href="project.repo"
								target="_blank"
								rel="noopener"
								class="btn btn-outline"
							>
								<PhGithubLogo :size="16" aria-hidden="true" /> Source code
								<span class="sr-only"> (opens in new tab)</span>
							</a>
								<button
									type="button"
									class="cursor-pointer btn btn-ghost"
									@click="handleClose"
								>
									Close
								</button>
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
	</Teleport>
</template>
