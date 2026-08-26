<script setup lang="ts">
import { PhGraduationCap, PhMedal } from '@phosphor-icons/vue'

const certifications = [
	{ name: 'Associate Web Developer (OutSystems 11)', year: 'Dec 2025' },
]
</script>

<template>
	<section id="education" aria-labelledby="h-education" class="section section--band">
		<div class="container-x">
			<header class="shead">
				<p class="shead__label">Foundations</p>
				<div class="shead__body">
					<h2 id="h-education" class="shead__title">Education &amp; certifications.</h2>
				</div>
			</header>

			<div class="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-7">
				<!-- Degree -->
				<div class="card p-6 md:p-7">
					<div class="flex items-center gap-3">
						<span class="inline-grid h-11 w-11 shrink-0 place-items-center bg-ink text-paper"
							aria-hidden="true">
							<PhGraduationCap :size="20" />
						</span>
						<div>
							<h3 class="font-display text-lg font-bold text-ink">
								B.S. Information Technology
							</h3>
							<p class="text-sm font-bold text-accent">
								Central Luzon State University
							</p>
						</div>
					</div>
					<p class="mt-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">
						2020 &mdash; 2025
					</p>
				</div>

				<!-- Certifications -->
				<div class="card p-6 md:p-7">
					<div class="flex items-center gap-3">
						<span class="inline-grid h-11 w-11 shrink-0 place-items-center bg-accent text-white"
							aria-hidden="true">
							<PhMedal :size="20" />
						</span>
						<div>
							<h3 class="font-display text-lg font-bold text-ink">Certifications</h3>
						</div>
					</div>
					<ul class="mt-5 space-y-3 text-base">
						<li v-for="cert in certifications" :key="cert.name"
							class="flex items-center justify-between gap-3 rounded-md border border-line bg-paper px-4 py-3">
							<span class="font-semibold text-ink">{{ cert.name }}</span>
							<span class="font-mono text-xs font-bold text-ink-faint">{{
								cert.year
							}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>
