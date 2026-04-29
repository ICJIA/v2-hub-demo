<script setup lang="ts">
import { authorKey, authorKeySteps } from '~/utils/article-format'

interface SampleAuthor {
  canonical: string
  variants: string[]
}

interface CmsAuthorRow {
  name: string
  articleCount: number
}

const SAMPLE_CMS_AUTHORS: CmsAuthorRow[] = [
  { name: 'Riley Calder', articleCount: 3 },
  { name: 'Dr. Riley Calder', articleCount: 2 },
  { name: 'Riley Calder, Ph.D', articleCount: 2 },
  { name: 'Riley Calder, PhD', articleCount: 1 },
  { name: 'Riley Calder, M.A., M.P.A.', articleCount: 1 },
  { name: 'RILEY CALDER', articleCount: 1 },
  { name: '  Riley  Calder  ', articleCount: 1 },
  { name: 'Riley Calder, MSW, LCSW', articleCount: 1 },
  { name: 'Dr. Riley Calder, Ph.D.', articleCount: 1 },
  { name: 'Morgan Whitcomb', articleCount: 4 },
  { name: 'Morgan Whitcomb, M.D.', articleCount: 2 },
  { name: 'Morgan Whitcomb, JD, MPA', articleCount: 1 },
  { name: 'morgan whitcomb', articleCount: 1 },
  { name: 'Dr. Morgan Whitcomb', articleCount: 1 },
  { name: 'Behavioral Outcomes & Research Group', articleCount: 3 },
  { name: 'Behavioral Outcomes and Research Group', articleCount: 2 },
  { name: 'Behavioral Outcomes  &  Research Group', articleCount: 1 },
  { name: 'behavioral outcomes and research group', articleCount: 1 },
  { name: 'Center for Public Safety Research and Analysis', articleCount: 4 },
  { name: 'Center for Public Safety Research & Analysis', articleCount: 2 }
]

const totalRawEntries = SAMPLE_CMS_AUTHORS.length
const totalArticles = SAMPLE_CMS_AUTHORS.reduce((sum, r) => sum + r.articleCount, 0)

interface NormalizedGroup {
  key: string
  displayName: string
  totalArticles: number
  spellingCount: number
}

const normalizedGroups = computed<NormalizedGroup[]>(() => {
  const groups = new Map<string, { variants: Map<string, number>, totalArticles: number }>()
  for (const row of SAMPLE_CMS_AUTHORS) {
    const k = authorKey(row.name)
    if (!groups.has(k)) groups.set(k, { variants: new Map(), totalArticles: 0 })
    const g = groups.get(k)!
    g.variants.set(row.name, (g.variants.get(row.name) ?? 0) + row.articleCount)
    g.totalArticles += row.articleCount
  }
  const out: NormalizedGroup[] = []
  for (const [key, g] of groups) {
    let bestName = ''
    let bestCount = -1
    for (const [name, count] of g.variants) {
      if (count > bestCount || (count === bestCount && name.length < bestName.length)) {
        bestName = name
        bestCount = count
      }
    }
    out.push({ key, displayName: bestName, totalArticles: g.totalArticles, spellingCount: g.variants.size })
  }
  out.sort((a, b) => a.displayName.localeCompare(b.displayName))
  return out
})

const rawDropdownItems = computed(() => {
  return [...SAMPLE_CMS_AUTHORS]
    .sort((a, b) => a.name.trim().localeCompare(b.name.trim(), 'en', { sensitivity: 'base' }))
    .map(row => ({
      label: `${visibleAbnormalWhitespace(row.name)} (${row.articleCount})`,
      value: row.name
    }))
})

const normalizedDropdownItems = computed(() => {
  return normalizedGroups.value.map(g => ({
    label: `${g.displayName} (${g.totalArticles} · merged from ${g.spellingCount})`,
    value: g.key
  }))
})

const rawSelected = ref<string | undefined>(undefined)
const normalizedSelected = ref<string | undefined>(undefined)

const rawSelectedCanonical = computed(() => {
  return rawSelected.value ? authorKey(rawSelected.value) : ''
})

const normalizedSelectedDetails = computed(() => {
  if (!normalizedSelected.value) return null
  return normalizedGroups.value.find(g => g.key === normalizedSelected.value) ?? null
})

const SAMPLE_AUTHORS: SampleAuthor[] = [
  {
    canonical: 'Riley Calder',
    variants: [
      'Riley Calder',
      'Dr. Riley Calder',
      'Riley Calder, Ph.D',
      'Riley Calder, PhD',
      'Riley Calder, M.A., M.P.A.',
      'RILEY CALDER',
      '  Riley  Calder  ',
      'Riley Calder, MSW, LCSW',
      'Dr. Riley Calder, Ph.D.'
    ]
  },
  {
    canonical: 'Morgan Whitcomb',
    variants: [
      'Morgan Whitcomb',
      'Dr. Morgan Whitcomb',
      'Morgan Whitcomb, M.D.',
      'Morgan Whitcomb, JD, MPA',
      'morgan whitcomb'
    ]
  },
  {
    canonical: 'Behavioral Outcomes & Research Group',
    variants: [
      'Behavioral Outcomes & Research Group',
      'Behavioral Outcomes and Research Group',
      'Behavioral Outcomes  &  Research Group',
      'behavioral outcomes and research group'
    ]
  }
]

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

function visibleAbnormalWhitespace(s: string): string {
  return s
    .replace(/^\s+/, m => '·'.repeat(m.length))
    .replace(/\s+$/, m => '·'.repeat(m.length))
    .replace(/  +/g, m => '·'.repeat(m.length))
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
      Part 1 — Same Authors dropdown, before vs. after normalization
    </div>
    <p class="mb-4 max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      Same dataset — <strong class="text-zinc-900 dark:text-white">{{ totalArticles }} articles</strong> by 4 distinct authors — typed into the CMS with messy spellings. Open both dropdowns. Same {{ totalArticles }} articles. Without normalization, that's <strong class="text-zinc-900 dark:text-white">{{ totalRawEntries }} entries</strong> to scroll through. With normalization, it's <strong class="text-violet-700 dark:text-violet-400">{{ normalizedGroups.length }} entries</strong>.
    </p>

    <div class="mb-8 grid gap-4 sm:grid-cols-2">
      <div>
        <div class="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-300">
          Dropdown — without normalization
        </div>
        <USelect
          v-model="rawSelected"
          :items="rawDropdownItems"
          :placeholder="`All authors (${totalRawEntries} entries) ▾`"
          class="w-full"
        />
        <div class="mt-2 text-[11px] text-zinc-600 dark:text-zinc-400">
          <strong class="text-zinc-900 dark:text-white">{{ totalRawEntries }} raw entries</strong> · {{ totalArticles }} articles · same author appears multiple times 😕
        </div>
        <div
          v-if="rawSelected"
          aria-live="polite"
          class="mt-2 rounded-md border border-zinc-200 bg-white p-2 text-[11px] dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div class="text-zinc-500 dark:text-zinc-500">
            You picked the raw spelling:
          </div>
          <code class="mt-0.5 block whitespace-pre rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">"{{ visibleAbnormalWhitespace(rawSelected) }}"</code>
          <div class="mt-1 text-zinc-500 dark:text-zinc-500">
            Its canonical key →
            <code class="rounded bg-violet-500/15 px-1.5 py-0.5 font-mono text-violet-700 dark:text-violet-300">{{ rawSelectedCanonical }}</code>
          </div>
        </div>
      </div>

      <div>
        <div class="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300">
          Dropdown — with normalization
        </div>
        <USelect
          v-model="normalizedSelected"
          :items="normalizedDropdownItems"
          :placeholder="`All authors (${normalizedGroups.length} entries) ▾`"
          class="w-full"
        />
        <div class="mt-2 text-[11px] text-violet-700 dark:text-violet-400">
          <strong class="text-violet-900 dark:text-white">{{ normalizedGroups.length }} canonical entries</strong> · {{ totalArticles }} articles · ✓ one row per author
        </div>
        <div
          v-if="normalizedSelectedDetails"
          aria-live="polite"
          class="mt-2 rounded-md border border-violet-300/60 bg-white p-2 text-[11px] dark:border-violet-500/40 dark:bg-zinc-900"
        >
          <div class="text-violet-700 dark:text-violet-400">
            You picked: <strong class="text-zinc-900 dark:text-white">{{ normalizedSelectedDetails.displayName }}</strong>
          </div>
          <div class="mt-1 text-zinc-600 dark:text-zinc-400">
            <strong class="text-zinc-900 dark:text-white">{{ normalizedSelectedDetails.totalArticles }} articles</strong> · merged from {{ normalizedSelectedDetails.spellingCount }} raw spellings · canonical key:
            <code class="rounded bg-violet-500/15 px-1.5 py-0.5 font-mono text-violet-700 dark:text-violet-300">{{ normalizedSelectedDetails.key }}</code>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
      Part 2 — Type any name, watch the 6 steps
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
        {{ visibleAbnormalWhitespace(variant) }}
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
