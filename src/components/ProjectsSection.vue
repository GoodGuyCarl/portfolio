<script setup lang="ts">
import { projects } from '@/data/projects'
import { PhArrowUpRight, PhGithubLogo, PhArrowSquareOut } from '@phosphor-icons/vue'

const emit = defineEmits<{
	openProject: [key: string]
}>()
</script>

<template>
	<section id="projects" aria-labelledby="h-projects" class="section section--band">
		<div class="container-x">
			<header class="shead reveal">
				<p class="shead__label">Selected Work</p>
				<div class="shead__body">
					<h2 id="h-projects" class="shead__title">Projects with proof.</h2>
					<p class="shead__lead">
						A few favorites — each with real users, real metrics, and code I'm proud of.
						Select any project for the full case study.
					</p>
				</div>
			</header>

			<div class="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-7">
				<article
					v-for="(project, i) in projects"
					:key="project.key"
					class="card reveal group relative flex flex-col overflow-hidden"
					:style="{ '--d': i % 2 === 1 ? '0.08s' : '0s' }"
				>
					<!-- Image plate -->
					<div class="relative aspect-16/10 overflow-hidden border-b border-line">
						<img
							:src="project.img"
							:alt="`${project.title} interface preview`"
							class="h-full w-full object-cover transition duration-700 motion-safe:group-hover:scale-[1.03]"
						/>
						<span
							class="folio absolute left-3 top-3 bg-paper/90 px-2 py-1"
							aria-hidden="true"
						>
							Nº&nbsp;{{ String(i + 1).padStart(2, '0') }}
						</span>
					</div>

					<!-- Content -->
					<div class="flex flex-1 flex-col p-6">
						<p
							class="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint"
						>
							{{ project.badge }}
						</p>
						<h3 class="mt-2 font-display text-2xl font-bold text-ink">
							<button
								type="button"
								class="cursor-pointer stretched block rounded-md text-left"
								@click="emit('openProject', project.key)"
							>
								{{ project.title }}
								<span
									class="mt-2 flex items-center gap-1.5 text-sm font-bold text-accent"
								>
									View case study
									<PhArrowUpRight :size="14" aria-hidden="true" />
								</span>
							</button>
						</h3>
						<p class="mt-3 text-base leading-relaxed text-ink-soft">
							{{ project.tagline }}
						</p>

						<ul class="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
							<li v-for="tech in project.stack.slice(0, 4)" :key="tech" class="tag">
								{{ tech }}
							</li>
						</ul>

						<!-- Action buttons (above stretched link) -->
						<div class="above-stretch mt-auto flex items-center gap-2 pt-5">
							<a
								:href="project.repo"
								target="_blank"
								rel="noopener"
								:aria-label="`${project.title} source code on GitHub (opens in new tab)`"
								class="icon-btn"
							>
								<PhGithubLogo :size="16" aria-hidden="true" />
							</a>
							<a
								:href="project.live"
								target="_blank"
								rel="noopener"
								:aria-label="`${project.title} live demo (opens in new tab)`"
								class="icon-btn"
							>
								<PhArrowSquareOut :size="16" aria-hidden="true" />
							</a>
						</div>
					</div>
				</article>
			</div>
		</div>
	</section>
</template>
