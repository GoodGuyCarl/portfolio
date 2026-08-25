<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useToast } from '@/composables/useToast'
import { PhList, PhX, PhDownloadSimple, PhArrowRight } from '@phosphor-icons/vue'

const { showToast } = useToast()
const activeId = useScrollSpy(['experience', 'projects', 'skills', 'education', 'contact'])
const isScrolled = ref(false)
const menuOpen = ref(false)

const navLinks = [
	{ href: '#experience', label: 'Experience' },
	{ href: '#projects', label: 'Work' },
	{ href: '#skills', label: 'Skills' },
	{ href: '#education', label: 'Education' },
	{ href: '#contact', label: 'Contact' },
]

function onScroll() {
	isScrolled.value = window.scrollY > 10
}

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true })
	onScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
})

function toggleMenu() {
	menuOpen.value = !menuOpen.value
}

function closeMenu() {
	menuOpen.value = false
}

function handleResume() {
	showToast('Tip: choose "Save as PDF" in the print dialog')
	setTimeout(() => window.print(), 650)
}
</script>

<template>
	<nav
		aria-label="Primary"
		class="site-nav fixed inset-x-0 top-0 z-50 bg-paper/80"
		:class="{ 'nav-scrolled': isScrolled }"
	>
		<div class="container-x flex h-16 items-center justify-between md:h-18">
			<!-- Wordmark -->
			<a
				href="#home"
				class="flex items-center gap-2.5 rounded-md font-display text-lg font-bold text-ink"
			>
				<span
					aria-hidden="true"
					class="grid h-9 w-9 place-items-center rounded-md bg-ink font-display text-sm font-bold text-paper"
					>JR</span
				>
				<span>Reyes<span class="text-accent">.</span>dev</span>
			</a>

			<!-- Desktop links -->
			<div class="hidden items-center gap-1 text-sm font-semibold text-ink-soft md:flex">
				<a
					v-for="link in navLinks"
					:key="link.href"
					:href="link.href"
					class="nav-link px-3 py-2 hover:text-ink"
					:class="{ active: activeId === link.href.slice(1) }"
					:aria-current="activeId === link.href.slice(1) ? 'true' : undefined"
					>{{ link.label }}</a
				>
			</div>

			<!-- Desktop CTAs -->
			<div class="hidden items-center gap-3 md:flex">
				<button
					type="button"
					class="btn btn-outline"
					title="Print or save as PDF"
					@click="handleResume"
				>
					<PhDownloadSimple :size="16" aria-hidden="true" /> Résumé
				</button>
				<a href="#contact" class="btn btn-accent">
					Hire me
					<PhArrowRight :size="16" aria-hidden="true" />
				</a>
			</div>

			<!-- Mobile toggle -->
			<button
				type="button"
				:aria-expanded="menuOpen ? 'true' : 'false'"
				aria-controls="mobileMenu"
				:aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
				class="icon-btn md:hidden"
				@click="toggleMenu"
			>
				<PhX v-if="menuOpen" :size="20" aria-hidden="true" />
				<PhList v-else :size="20" aria-hidden="true" />
			</button>
		</div>

		<!-- Mobile menu -->
		<div v-show="menuOpen" id="mobileMenu" class="border-t border-line bg-paper md:hidden">
			<div class="container-x flex flex-col gap-1 py-4 text-base font-semibold text-ink-soft">
				<a
					v-for="link in navLinks"
					:key="link.href"
					:href="link.href"
					class="rounded-md px-3 py-3 hover:bg-surface hover:text-ink"
					@click="closeMenu"
					>{{ link.label }}</a
				>
				<div class="mt-2 flex flex-col gap-2 sm:flex-row">
					<button type="button" class="btn btn-outline flex-1" @click="handleResume">
						<PhDownloadSimple :size="16" aria-hidden="true" /> Save résumé (PDF)
					</button>
					<a href="#contact" class="btn btn-accent flex-1" @click="closeMenu">Hire me</a>
				</div>
			</div>
		</div>
	</nav>
</template>
