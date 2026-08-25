<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import SiteNav from '@/components/SiteNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import TechMarquee from '@/components/TechMarquee.vue'
import StatsSection from '@/components/StatsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import BackToTop from '@/components/BackToTop.vue'

useReveal()

const activeProjectKey = ref<string | null>(null)

function openProject(key: string) {
	activeProjectKey.value = key
}

function closeProject() {
	activeProjectKey.value = null
}
</script>

<template>
	<!-- Skip links -->
	<a
		href="#main"
		class="skip-link rounded-md bg-ink px-5 py-3 text-sm font-bold text-paper shadow-xl focus:not-sr-only"
		>Skip to main content</a
	>
	<a
		href="#contact"
		class="skip-link ml-44 rounded-md bg-accent px-5 py-3 text-sm font-bold text-white shadow-xl focus:not-sr-only"
		>Skip to contact</a
	>

	<SiteNav />
	<HeroSection />

	<main id="main" tabindex="-1">
		<TechMarquee />
		<StatsSection />
		<ExperienceSection />
		<ProjectsSection @open-project="openProject" />
		<SkillsSection />
		<EducationSection />
		<ContactSection />
	</main>

	<SiteFooter />

	<ProjectModal :project-key="activeProjectKey" @close="closeProject" />
	<ToastContainer />
	<BackToTop />
</template>
