<script setup lang="ts">
import { highlightSegments } from '~/utils/article-format'

const SAMPLE_ARTICLE = {
  title: 'Examining the Effectiveness of Juvenile Diversion in Cook County',
  byline: 'By Riley Calder · Sept 2024',
  abstract: 'This study evaluates outcomes from juvenile diversion programs across Cook County, comparing recidivism rates among juvenile participants who completed diversion versus those processed through the traditional juvenile court system. Researchers tracked 1,200 first-time offenders over thirty months, controlling for offense severity, age at first contact, and prior school attendance. Findings indicate that juveniles who completed diversion were 43 percent less likely to reoffend within twelve months compared to peers routed through traditional adjudication. The recidivism gap widened over the full thirty-month window. Cook County\'s diversion model — combining a structured intake assessment, restorative-justice conferences, and community-based mentoring — delivered the largest benefit to younger juveniles with no prior contacts.'
}

const CHIPS = ['juvenile', 'Cook County', 'diversion', 'recidivism']

const searchQuery = ref('juvenile')

const titleSegments = computed(() => highlightSegments(SAMPLE_ARTICLE.title, searchQuery.value))
const abstractSegments = computed(() => highlightSegments(SAMPLE_ARTICLE.abstract, searchQuery.value))

const matchCount = computed(() => {
  const t = titleSegments.value.filter(s => s.match).length
  const a = abstractSegments.value.filter(s => s.match).length
  return t + a
})

const matchLabel = computed(() => {
  if (!searchQuery.value) return 'type to highlight'
  const n = matchCount.value
  if (n === 0) return 'no matches'
  if (n === 1) return '1 match'
  return `${n} matches`
})

function isChipActive(chip: string) {
  return chip.toLowerCase() === searchQuery.value.toLowerCase()
}
</script>

<template>
  <div class="mt-6 rounded-2xl border-2 border-dashed border-emerald-500 bg-emerald-500/5 p-5">
    <div class="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
      <span class="inline-flex items-center gap-1.5">
        <span class="size-2 animate-pulse rounded-full bg-emerald-500" />
        Live
      </span>
      <span class="text-zinc-400 dark:text-zinc-600">·</span>
      <span>Try it yourself</span>
      <span class="ml-auto whitespace-normal text-[10px] font-normal normal-case tracking-normal text-zinc-500 dark:text-zinc-500">
        Running <code class="font-mono text-emerald-700 dark:text-emerald-300">highlightSegments()</code> from <code class="font-mono">~/utils/article-format</code>
      </span>
    </div>

    <div class="mb-3 flex flex-wrap items-stretch gap-2">
      <div class="relative min-w-[200px] flex-1">
        <UIcon
          name="i-lucide-search"
          class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
        />
        <input
          v-model="searchQuery"
          type="text"
          aria-label="Search highlight demo"
          placeholder="type any word…"
          class="w-full rounded-lg border border-emerald-500/40 bg-white py-2 pl-10 pr-9 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:bg-zinc-950 dark:text-white"
        >
        <button
          v-if="searchQuery"
          type="button"
          aria-label="Clear search"
          class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          @click="searchQuery = ''"
        >
          <UIcon
            name="i-lucide-x"
            class="size-4"
          />
        </button>
      </div>
      <div
        aria-live="polite"
        class="flex items-center rounded-lg px-3 text-xs font-bold uppercase tracking-[0.12em]"
        :class="matchCount > 0
          ? 'bg-emerald-500 text-white'
          : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'"
      >
        {{ matchLabel }}
      </div>
    </div>

    <div class="mb-4 flex flex-wrap items-center gap-2 text-xs">
      <span class="font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
        Try one:
      </span>
      <button
        v-for="chip in CHIPS"
        :key="chip"
        type="button"
        :aria-pressed="isChipActive(chip)"
        class="rounded-full border px-2.5 py-1 transition-colors"
        :class="isChipActive(chip)
          ? 'border-emerald-500 bg-emerald-500 text-white'
          : 'border-zinc-300 bg-white text-zinc-700 hover:border-emerald-500/60 hover:bg-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'"
        @click="searchQuery = chip"
      >
        {{ chip }}
      </button>
    </div>

    <article class="rounded-xl border border-emerald-500/40 bg-white p-5 shadow-sm dark:bg-zinc-900">
      <h3 class="text-base font-semibold leading-snug text-zinc-900 dark:text-white">
        <template
          v-for="(seg, i) in titleSegments"
          :key="`t-${i}`"
        >
          <mark
            v-if="seg.match"
            class="rounded-sm bg-primary/40 px-0.5 text-inherit"
          >{{ seg.text }}</mark>
          <span v-else>{{ seg.text }}</span>
        </template>
      </h3>
      <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
        {{ SAMPLE_ARTICLE.byline }}
      </p>
      <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <template
          v-for="(seg, i) in abstractSegments"
          :key="`a-${i}`"
        >
          <mark
            v-if="seg.match"
            class="rounded-sm bg-primary/40 px-0.5 text-inherit"
          >{{ seg.text }}</mark>
          <span v-else>{{ seg.text }}</span>
        </template>
      </p>
    </article>
  </div>
</template>
