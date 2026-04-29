<script setup lang="ts">
import { authorKey, authorKeySteps } from '~/utils/article-format'

interface SampleAuthor {
  canonical: string
  variants: string[]
}

const SAMPLE_AUTHORS: SampleAuthor[] = [
  {
    canonical: 'Jane Carter',
    variants: [
      'Jane Carter',
      'Jane Carter, Ph.D',
      'Jane Carter, PhD',
      'Jane Carter, M.A., M.P.A.',
      'JANE CARTER',
      '  Jane  Carter  ',
      'Jane Carter, MSW, LCSW'
    ]
  },
  {
    canonical: 'Marcus Reynolds',
    variants: [
      'Marcus Reynolds',
      'Marcus Reynolds, M.D.',
      'Marcus Reynolds, JD, MPA',
      'marcus reynolds'
    ]
  },
  {
    canonical: 'Forensics & Policy Lab',
    variants: [
      'Forensics & Policy Lab',
      'Forensics and Policy Lab',
      'Forensics  &  Policy Lab',
      'forensics and policy lab'
    ]
  }
]

const PART_1_VARIANTS = SAMPLE_AUTHORS[0]!.variants

const part1CanonicalLabel = (() => {
  const counts = new Map<string, Map<string, number>>()
  for (const name of PART_1_VARIANTS) {
    const k = authorKey(name)
    const variants = counts.get(k) ?? new Map<string, number>()
    variants.set(name, (variants.get(name) ?? 0) + 1)
    counts.set(k, variants)
  }
  let bestName = ''
  let bestCount = -1
  for (const [, variants] of counts) {
    for (const [name, count] of variants) {
      if (count > bestCount || (count === bestCount && name.length < bestName.length)) {
        bestName = name
        bestCount = count
      }
    }
  }
  return bestName
})()

const selectedAuthorIndex = ref(0)
const selectedAuthor = computed(() => SAMPLE_AUTHORS[selectedAuthorIndex.value]!)
const userInput = ref(SAMPLE_AUTHORS[0]!.variants[0]!)

watch(selectedAuthorIndex, (i) => {
  userInput.value = SAMPLE_AUTHORS[i]!.variants[0]!
})

const pipeline = computed(() => authorKeySteps(userInput.value))

const collapseAssertion = computed(() => {
  const author = selectedAuthor.value
  const keys = new Set(author.variants.map(v => authorKey(v)))
  return {
    consistent: keys.size === 1,
    key: keys.size === 1 ? [...keys][0]! : '',
    count: author.variants.length
  }
})

function isVariantActive(variant: string) {
  return variant === userInput.value
}

function visibleWhitespace(s: string): string {
  return s.replaceAll(' ', '·')
}
</script>

<template>
  <div class="mt-6 rounded-2xl border-2 border-dashed border-violet-500 bg-violet-500/5 p-5">
    <div class="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
      <span class="inline-flex items-center gap-1.5">
        <span class="size-2 animate-pulse rounded-full bg-violet-500" />
        Live
      </span>
      <span class="text-zinc-400 dark:text-zinc-600">·</span>
      <span>Try it yourself</span>
      <span class="ml-auto whitespace-normal text-[10px] font-normal normal-case tracking-normal text-zinc-500 dark:text-zinc-500">
        Running <code class="font-mono text-violet-700 dark:text-violet-300">authorKey()</code> from <code class="font-mono">~/utils/article-format</code>
      </span>
    </div>

    <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
      Part 1 — Same dropdown, two different worlds
    </div>
    <div class="mb-8 grid gap-3 sm:grid-cols-2">
      <details
        open
        class="group rounded-xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
      >
        <summary class="flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-700 [&::-webkit-details-marker]:hidden dark:text-zinc-300">
          <span>Author — raw CMS</span>
          <UIcon
            name="i-lucide-chevron-down"
            class="size-4 transition-transform group-open:rotate-180"
          />
        </summary>
        <ul class="border-t border-zinc-200 dark:border-zinc-700">
          <li
            v-for="(v, i) in PART_1_VARIANTS"
            :key="i"
            class="border-b border-zinc-100 px-4 py-2 font-mono text-xs text-zinc-700 last:border-b-0 dark:border-zinc-800 dark:text-zinc-300"
          >
            {{ visibleWhitespace(v) }}
          </li>
        </ul>
        <div class="border-t border-zinc-200 px-4 py-2 text-[11px] text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
          7 entries · same person 😕
        </div>
      </details>

      <details
        open
        class="group rounded-xl border border-violet-500 bg-white dark:bg-zinc-900"
      >
        <summary class="flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm font-semibold text-violet-700 [&::-webkit-details-marker]:hidden dark:text-violet-300">
          <span>Author — normalized</span>
          <UIcon
            name="i-lucide-chevron-down"
            class="size-4 transition-transform group-open:rotate-180"
          />
        </summary>
        <ul class="border-t border-violet-500/30">
          <li class="flex items-center justify-between gap-3 px-4 py-2 text-sm">
            <span class="font-semibold text-zinc-900 dark:text-white">
              {{ part1CanonicalLabel }}
            </span>
            <span class="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:text-violet-300">
              7 articles
            </span>
          </li>
        </ul>
        <div class="border-t border-violet-500/30 px-4 py-2 text-[11px] text-violet-600 dark:text-violet-400">
          1 entry · ✓ canonical
        </div>
      </details>
    </div>

    <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
      Part 2 — Type any name, watch the 5 steps
    </div>

    <div class="mb-3 flex flex-wrap items-center gap-2 text-xs">
      <span class="font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
        Pick an author:
      </span>
      <button
        v-for="(author, i) in SAMPLE_AUTHORS"
        :key="i"
        type="button"
        :aria-pressed="selectedAuthorIndex === i"
        class="rounded-full border px-3 py-1 font-semibold transition-colors"
        :class="selectedAuthorIndex === i
          ? 'border-violet-500 bg-violet-500 text-white'
          : 'border-zinc-300 bg-white text-zinc-700 hover:border-violet-500/60 hover:bg-violet-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'"
        @click="selectedAuthorIndex = i"
      >
        {{ author.canonical }}
      </button>
    </div>

    <div class="mb-3 flex flex-wrap items-center gap-2 text-xs">
      <span class="font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
        Variants of "{{ selectedAuthor.canonical }}":
      </span>
      <button
        v-for="variant in selectedAuthor.variants"
        :key="variant"
        type="button"
        :aria-pressed="isVariantActive(variant)"
        class="rounded-full border px-2.5 py-1 font-mono transition-colors"
        :class="isVariantActive(variant)
          ? 'border-violet-500 bg-violet-500 text-white'
          : 'border-zinc-300 bg-white text-zinc-700 hover:border-violet-500/60 hover:bg-violet-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'"
        @click="userInput = variant"
      >
        {{ visibleWhitespace(variant) }}
      </button>
    </div>

    <div class="relative mb-3">
      <UIcon
        name="i-lucide-user"
        class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
      />
      <input
        v-model="userInput"
        type="text"
        aria-label="Author normalization demo"
        placeholder="type any author name…"
        class="w-full rounded-lg border border-violet-500/40 bg-white py-2 pl-10 pr-3 font-mono text-sm text-zinc-900 placeholder-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 dark:bg-zinc-950 dark:text-white"
      >
    </div>

    <ol class="rounded-xl border border-violet-500/40 bg-white p-4 dark:bg-zinc-900">
      <li class="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
        <span class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-500">
          Input
        </span>
        <code class="whitespace-pre rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">"{{ visibleWhitespace(userInput) }}"</code>
      </li>
      <li
        v-for="(step, i) in pipeline.steps"
        :key="i"
        class="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-zinc-100 py-2 text-sm dark:border-zinc-800"
      >
        <span class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-violet-700 dark:text-violet-300">
          Step {{ i + 1 }}
        </span>
        <code class="whitespace-pre rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">"{{ visibleWhitespace(step.value) }}"</code>
        <span class="text-xs text-zinc-500 dark:text-zinc-500">
          {{ step.label }}
        </span>
      </li>
      <li
        aria-live="polite"
        class="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t-2 border-violet-500/40 pt-3 text-sm"
      >
        <span class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-violet-700 dark:text-violet-300">
          Canonical key
        </span>
        <code class="whitespace-pre rounded bg-violet-500/15 px-2 py-0.5 font-mono font-bold text-violet-700 dark:text-violet-300">{{ pipeline.key }}</code>
      </li>
    </ol>

    <p
      v-if="collapseAssertion.consistent"
      class="mt-3 text-xs text-zinc-600 dark:text-zinc-400"
    >
      All <strong class="text-zinc-900 dark:text-white">{{ collapseAssertion.count }} variants</strong> of "{{ selectedAuthor.canonical }}" collapse to <code class="rounded bg-violet-500/15 px-1.5 py-0.5 font-mono text-violet-700 dark:text-violet-300">{{ collapseAssertion.key }}</code> ✓
    </p>
    <p
      v-else
      class="mt-3 text-xs text-red-600 dark:text-red-400"
    >
      ⚠ Variants of "{{ selectedAuthor.canonical }}" produce more than one canonical key. The sample data and the function disagree — check the variant list.
    </p>
  </div>
</template>
