<script setup lang="ts">
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
				class="enter flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
				<span>Carl Sanguyo &mdash; Portfolio</span>
				<span class="hidden sm:inline">Edition 2026 &#8226; Nueva Ecija, PH</span>
			</div>

			<div class="grid gap-10 py-12 md:grid-cols-12 md:gap-10 md:py-16">
				<!-- Left: statement -->
				<div class="md:col-span-7">
					<p class="enter folio mb-5" style="--d: 0.05s">Web Developer</p>

					<h1 class="enter font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[4.5rem]"
						style="--d: 0.1s">
						Software, built to <span class="text-accent">spec.</span>
					</h1>

					<p class="enter mt-6 max-w-xl text-lg leading-relaxed text-ink-soft" style="--d: 0.16s">
						I'm Carl Sanguyo, a web developer from Nueva Ecija, Philippines. I
						cut my teeth building OutSystems apps in production, and spend my off-hours
						shipping projects like Cinephile. Clean code, honest metrics.
					</p>

					<!-- Focus readout (real data, set once) -->
					<p class="enter mt-4 font-mono text-sm text-ink-faint" style="--d: 0.2s">
						focus: <span class="font-semibold text-ink">OutSystems 11 &#8226; Vue &#8226; PHP &#8226;
							SQL</span>
					</p>

					<!-- Actions -->
					<div class="enter mt-8 flex flex-wrap items-center gap-3" style="--d: 0.24s">
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
					<dl class="enter mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line"
						style="--d: 0.28s">
						<div class="bg-surface p-4">
							<dt class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
								Role
							</dt>
							<dd class="mt-1 font-display text-sm font-bold text-ink">Web Developer</dd>
						</div>
						<div class="bg-surface p-4">
							<dt class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
								Based
							</dt>
							<dd class="mt-1 font-display text-sm font-bold text-ink">
								Nueva Ecija, PH
							</dd>
						</div>
						<div class="bg-surface p-4">
							<dt class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
								Status
							</dt>
							<dd class="mt-1 flex items-center gap-1.5 font-display text-sm font-bold text-ink">
								<span class="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
								Open
							</dd>
						</div>
					</dl>
				</div>

				<!-- Right: identity plate -->
				<div class="md:col-span-5">
					<figure class="enter plate" style="--d: 0.16s">
						<img src="/hero-image.jpg" alt="Portrait of Carl Sanguyo" width="800" height="1000"
							class="aspect-4/5 w-full rounded-md object-cover" loading="eager" fetchpriority="high"
							decoding="async" />

						<figcaption class="plate__cap">Carl Sanguyo &#8226; 2026</figcaption>
					</figure>

					<ul class="enter mt-5 flex flex-wrap gap-2.5" style="--d: 0.32s">
						<li class="tag">
							<PhMapPin :size="12" class="mr-1.5 text-accent" aria-hidden="true" />
							Remote-friendly
						</li>
						<li>
							<a href="https://github.com/GoodGuyCarl" target="_blank" rel="noopener" class="icon-btn"
								aria-label="GitHub profile (opens in new tab)">
								<PhGithubLogo :size="16" aria-hidden="true" />
							</a>
						</li>
						<li>
							<a href="https://linkedin.com/in/carl-sanguyo" target="_blank" rel="noopener"
								class="icon-btn" aria-label="LinkedIn profile (opens in new tab)">
								<PhLinkedinLogo :size="16" aria-hidden="true" />
							</a>
						</li>
						<li>
							<a href="mailto:sanguyocarl@gmail.com" class="icon-btn" aria-label="Email Carl">
								<PhEnvelopeSimple :size="16" aria-hidden="true" />
							</a>
						</li>
					</ul>

					<a href="https://github.com/GoodGuyCarl" target="_blank" rel="noopener"
						class="enter link-u mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft hover:text-accent"
						style="--d: 0.36s">
						More on GitHub
						<PhArrowUpRight :size="13" aria-hidden="true" />
						<span class="sr-only"> (opens in new tab)</span>
					</a>
				</div>
			</div>
		</div>
	</header>
</template>
