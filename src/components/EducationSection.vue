<script setup lang="ts">
import { PhGraduationCap, PhMedal, PhCheck, PhQuotes } from '@phosphor-icons/vue'

const certifications = [
	{ name: 'AWS Certified Developer — Associate', year: '2024' },
	{ name: 'Meta Front-End Developer Professional', year: '2022' },
	{ name: 'Google UX Design Certificate', year: '2021' },
]

const testimonials = [
	{
		quote: '"Jordan is the rare engineer who cares equally about users, business goals and clean code. The dashboard redesign measurably moved our activation numbers."',
		initials: 'MC',
		name: 'Maya Chen',
		role: 'Product Lead, Nova Labs',
		delay: '0s',
	},
	{
		quote: '"Handed Jordan a vague idea and received a fast, tested, documented product. Communication was flawless from kickoff to launch."',
		initials: 'DO',
		name: 'Daniel Ortiz',
		role: 'CTO, Brightline Commerce',
		delay: '0.08s',
	},
	{
		quote: '"One of the best code reviewers I\'ve ever worked with — kind, thorough, and always teaching. Juniors level up fast on Jordan\'s team."',
		initials: 'PN',
		name: 'Priya Nair',
		role: 'Senior Engineer, Nova Labs',
		delay: '0.16s',
	},
]
</script>

<template>
	<section id="education" aria-labelledby="h-education" class="section section--band">
		<div class="container-x">
			<header class="shead reveal">
				<p class="shead__label">Foundations</p>
				<div class="shead__body">
					<h2 id="h-education" class="shead__title">Education &amp; certifications.</h2>
				</div>
			</header>

			<div class="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-7">
				<!-- Degree -->
				<div class="card reveal p-6 md:p-7">
					<div class="flex items-center gap-3">
						<span
							class="inline-grid h-11 w-11 shrink-0 place-items-center bg-ink text-paper"
							aria-hidden="true"
						>
							<PhGraduationCap :size="20" />
						</span>
						<div>
							<h3 class="font-display text-lg font-bold text-ink">
								B.S. Computer Science
							</h3>
							<p class="text-sm font-bold text-accent">
								University of Texas at Austin
							</p>
						</div>
					</div>
					<p
						class="mt-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-faint"
					>
						2015 — 2019 · GPA 3.8 / 4.0
					</p>
					<ul class="mt-4 space-y-2 text-base text-ink-soft">
						<li class="flex gap-2">
							<PhCheck
								:size="16"
								weight="bold"
								class="mt-1 shrink-0 text-accent"
								aria-hidden="true"
							/>
							Focus on web systems, databases &amp; HCI
						</li>
						<li class="flex gap-2">
							<PhCheck
								:size="16"
								weight="bold"
								class="mt-1 shrink-0 text-accent"
								aria-hidden="true"
							/>
							Lead of the ACM student chapter
						</li>
						<li class="flex gap-2">
							<PhCheck
								:size="16"
								weight="bold"
								class="mt-1 shrink-0 text-accent"
								aria-hidden="true"
							/>
							Graduated with High Honors
						</li>
					</ul>
				</div>

				<!-- Certifications -->
				<div class="card reveal p-6 md:p-7" style="--d: 0.08s">
					<div class="flex items-center gap-3">
						<span
							class="inline-grid h-11 w-11 shrink-0 place-items-center bg-accent text-white"
							aria-hidden="true"
						>
							<PhMedal :size="20" />
						</span>
						<div>
							<h3 class="font-display text-lg font-bold text-ink">Certifications</h3>
							<p class="text-sm font-bold text-ink-soft">Continuous learning</p>
						</div>
					</div>
					<ul class="mt-5 space-y-3 text-base">
						<li
							v-for="cert in certifications"
							:key="cert.name"
							class="flex items-center justify-between gap-3 rounded-md border border-line bg-paper px-4 py-3"
						>
							<span class="font-semibold text-ink">{{ cert.name }}</span>
							<span class="font-mono text-xs font-bold text-ink-faint">{{
								cert.year
							}}</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- Testimonials -->
			<div class="mt-14 md:mt-16">
				<h3 class="reveal font-display text-2xl font-bold tracking-tight text-ink">
					What colleagues say
				</h3>
				<div class="mt-6 grid gap-5 md:grid-cols-3 md:gap-6">
					<figure
						v-for="t in testimonials"
						:key="t.name"
						class="card reveal p-6"
						:style="t.delay ? { '--d': t.delay } : {}"
					>
						<PhQuotes :size="22" class="text-accent" aria-hidden="true" />
						<blockquote class="mt-3 text-base leading-relaxed text-ink-soft">
							{{ t.quote }}
						</blockquote>
						<figcaption class="mt-5 flex items-center gap-3 border-t border-line pt-4">
							<span
								class="grid h-11 w-11 place-items-center rounded-md border border-ink/20 font-display text-sm font-bold text-ink"
								aria-hidden="true"
								>{{ t.initials }}</span
							>
							<span>
								<span class="block text-sm font-bold text-ink">{{ t.name }}</span>
								<span class="block text-xs font-semibold text-ink-soft">{{
									t.role
								}}</span>
							</span>
						</figcaption>
					</figure>
				</div>
			</div>
		</div>
	</section>
</template>
