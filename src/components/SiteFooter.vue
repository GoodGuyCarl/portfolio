<script setup lang="ts">
import { PhGithubLogo, PhLinkedinLogo, PhEnvelopeSimple } from '@phosphor-icons/vue'

const year = new Date().getFullYear()
</script>

<template>
	<footer class="border-t border-line bg-paper py-10 md:py-12">
		<div class="container-x flex flex-col items-center justify-between gap-6 md:flex-row">
			<a
				href="#home"
				class="flex items-center gap-2.5 rounded-md font-display text-base font-bold text-ink"
			>
				<span
					class="grid h-9 w-9 place-items-center rounded-md bg-ink font-display text-xs font-bold text-paper"
					aria-hidden="true"
					>JR</span
				>
				Reyes<span class="text-accent">.</span>dev
			</a>

			<p class="text-center text-sm text-ink-soft">
				© {{ year }} Jordan Reyes · Set in Archivo &amp; Inter. Built with semantic HTML,
				Vue &amp; Tailwind.
			</p>

			<ul class="flex gap-2" aria-label="Footer social links">
				<li>
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener"
						aria-label="GitHub (opens in new tab)"
						class="icon-btn"
					>
						<PhGithubLogo :size="16" aria-hidden="true" />
					</a>
				</li>
				<li>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener"
						aria-label="LinkedIn (opens in new tab)"
						class="icon-btn"
					>
						<PhLinkedinLogo :size="16" aria-hidden="true" />
					</a>
				</li>
				<li>
					<a href="mailto:hello@jordanreyes.dev" aria-label="Send email" class="icon-btn">
						<PhEnvelopeSimple :size="16" aria-hidden="true" />
					</a>
				</li>
			</ul>
		</div>
	</footer>
</template>
