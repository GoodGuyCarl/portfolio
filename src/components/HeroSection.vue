<script setup lang="ts">
import { useTypedText } from '@/composables/useTypedText'
import { useToast } from '@/composables/useToast'
import {
	PhArrowDownRight,
	PhEnvelopeSimple,
	PhFileText,
	PhMapPin,
	PhGithubLogo,
	PhLinkedinLogo,
	PhArrowUpRight,
} from '@phosphor-icons/vue'

const { showToast } = useToast()

const typedText = useTypedText([
	'performance budgets',
	'design systems',
	'accessibility',
	'Node.js APIs',
	'web fundamentals',
])

function handleResume() {
	showToast('Tip: choose "Save as PDF" in the print dialog')
	setTimeout(() => window.print(), 650)
}
</script>

<template>
	<header id="home" class="relative pt-24 md:pt-32">
		<div class="container-x">
			<!-- Masthead meta rule -->
			<div
				class="reveal flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint"
			>
				<span>Jordan Reyes — Portfolio</span>
				<span class="hidden sm:inline">Edition 2025 · Austin, TX</span>
			</div>

			<div class="grid gap-10 py-12 md:grid-cols-12 md:gap-10 md:py-16">
				<!-- Left: statement -->
				<div class="md:col-span-7">
					<p class="reveal folio mb-5">Senior Full-Stack Engineer</p>

					<h1
						class="reveal font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[4.5rem]"
						style="--d: 0.05s"
					>
						Software that feels <span class="text-accent">inevitable.</span>
					</h1>

					<p
						class="reveal mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
						style="--d: 0.1s"
					>
						I'm Jordan Reyes — six years turning ambiguous problems into production
						software people actually use. Performance budgets, accessibility, and craft
						are non-negotiable, not features.
					</p>

					<!-- Cycling line (real signal, not a code comment) -->
					<p class="reveal mt-4 font-mono text-sm text-ink-faint" style="--d: 0.14s">
						Currently focused on
						<span class="font-semibold text-ink">{{ typedText }}</span
						><span class="caret" />
					</p>

					<!-- Actions -->
					<div class="reveal mt-8 flex flex-wrap items-center gap-3" style="--d: 0.18s">
						<a href="#projects" class="btn btn-accent">
							View work
							<PhArrowDownRight :size="16" aria-hidden="true" />
						</a>
						<a href="#contact" class="btn btn-outline"> Get in touch </a>
						<button type="button" class="btn btn-ghost" @click="handleResume">
							<PhFileText :size="16" aria-hidden="true" />
							<span class="link-u">Résumé (PDF)</span>
						</button>
					</div>

					<!-- Spec strip -->
					<dl
						class="reveal mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line"
						style="--d: 0.22s"
					>
						<div class="bg-surface p-4">
							<dt
								class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint"
							>
								Role
							</dt>
							<dd class="mt-1 font-display text-sm font-bold text-ink">Full-Stack</dd>
						</div>
						<div class="bg-surface p-4">
							<dt
								class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint"
							>
								Based
							</dt>
							<dd class="mt-1 font-display text-sm font-bold text-ink">Austin, TX</dd>
						</div>
						<div class="bg-surface p-4">
							<dt
								class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint"
							>
								Status
							</dt>
							<dd
								class="mt-1 flex items-center gap-1.5 font-display text-sm font-bold text-ink"
							>
								<span
									class="h-2 w-2 shrink-0 rounded-full bg-accent"
									aria-hidden="true"
								/>
								Open
							</dd>
						</div>
					</dl>
				</div>

				<!-- Right: portrait plate -->
				<div class="md:col-span-5">
					<figure class="reveal plate" style="--d: 0.12s">
						<img
							src="/hero-portrait.jpg"
							alt="Portrait of Jordan Reyes at a workstation"
							class="aspect-4/5 w-full rounded-md object-cover"
						/>
						<figcaption class="plate__cap">Jordan Reyes · 2025</figcaption>
					</figure>

					<ul class="reveal mt-5 flex flex-wrap gap-2.5" style="--d: 0.18s">
						<li class="tag">
							<PhMapPin :size="12" class="mr-1.5 text-accent" aria-hidden="true" />
							Remote-friendly
						</li>
						<li>
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener"
								class="icon-btn"
								aria-label="GitHub profile (opens in new tab)"
							>
								<PhGithubLogo :size="16" aria-hidden="true" />
							</a>
						</li>
						<li>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener"
								class="icon-btn"
								aria-label="LinkedIn profile (opens in new tab)"
							>
								<PhLinkedinLogo :size="16" aria-hidden="true" />
							</a>
						</li>
						<li>
							<a
								href="mailto:hello@jordanreyes.dev"
								class="icon-btn"
								aria-label="Email Jordan"
							>
								<PhEnvelopeSimple :size="16" aria-hidden="true" />
							</a>
						</li>
					</ul>

					<a
						href="https://github.com"
						target="_blank"
						rel="noopener"
						class="reveal link-u mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft hover:text-accent"
						style="--d: 0.2s"
					>
						More on GitHub
						<PhArrowUpRight :size="13" aria-hidden="true" />
						<span class="sr-only"> (opens in new tab)</span>
					</a>
				</div>
			</div>
		</div>
	</header>
</template>
