<script setup lang="ts">
import type { Article } from '~/composables/useArticles'
import { KNOWN_CENTERS, articleAuthorNames, authorKey, typeLabel } from '~/utils/article-format'

useHead({ title: 'Research Hub — Current view (Hub 2.0, work in progress)' })

const { data, pending, error, refresh } = await useArticles()

const articles = computed<Article[]>(() => {
  const list = data.value ?? []
  return [...list].sort((a, b) => {
    const ka = a.date ?? a.publishedAt ?? ''
    const kb = b.date ?? b.publishedAt ?? ''
    return kb.localeCompare(ka)
  })
})

const selectedType = ref('')
const selectedTopic = ref('')
const selectedAuthor = ref('')
const selectedYear = ref('')
const selectedCenter = ref('')
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 12

function articleYear(a: Article): string {
  const dt = a.date ?? a.publishedAt
  if (!dt) return ''
  const d = new Date(dt)
  return Number.isNaN(d.getTime()) ? '' : d.getFullYear().toString()
}

function asStrings(arr: unknown): string[] {
  if (!Array.isArray(arr)) return []
  return arr.filter((v): v is string => typeof v === 'string' && v.length > 0)
}

const typeItems = computed(() => {
  const counts = new Map<string, number>()
  for (const a of articles.value) {
    if (!a.type) continue
    counts.set(a.type, (counts.get(a.type) ?? 0) + 1)
  }
  const items = Array.from(counts.entries())
    .map(([value, count]) => ({ value, label: `${typeLabel(value)} (${count})` }))
    .sort((a, b) => a.label.localeCompare(b.label))
  return [{ label: `All Publication Types (${articles.value.length})`, value: '' }, ...items]
})

const topicItems = computed(() => {
  const items = Array.from(new Set(articles.value.flatMap(a => asStrings(a.categories))))
    .sort((a, b) => a.localeCompare(b))
    .map(t => ({ label: t, value: t }))
  return [{ label: 'All Topics', value: '' }, ...items]
})

const authorItems = computed(() => {
  const groups = new Map<string, Map<string, number>>()
  for (const a of articles.value) {
    for (const name of articleAuthorNames(a)) {
      const key = authorKey(name)
      if (!key) continue
      const variants = groups.get(key) ?? new Map<string, number>()
      variants.set(name, (variants.get(name) ?? 0) + 1)
      groups.set(key, variants)
    }
  }
  const items: { label: string, value: string }[] = []
  for (const [key, variants] of groups) {
    let bestName = ''
    let bestCount = -1
    for (const [name, count] of variants) {
      if (count > bestCount || (count === bestCount && name.length < bestName.length)) {
        bestName = name
        bestCount = count
      }
    }
    items.push({ label: bestName, value: key })
  }
  items.sort((a, b) => a.label.localeCompare(b.label))
  return [{ label: 'All Authors', value: '' }, ...items]
})

const yearItems = computed(() => {
  const yrs = new Set<string>()
  for (const a of articles.value) {
    const y = articleYear(a)
    if (y) yrs.add(y)
  }
  const items = Array.from(yrs)
    .sort((a, b) => b.localeCompare(a))
    .map(y => ({ label: y, value: y }))
  return [{ label: 'All Years', value: '' }, ...items]
})

const centerItems = computed(() => {
  const counts = new Map<string, number>()
  for (const center of KNOWN_CENTERS) {
    counts.set(authorKey(center), 0)
  }
  for (const a of articles.value) {
    for (const name of articleAuthorNames(a)) {
      const key = authorKey(name)
      if (counts.has(key)) {
        counts.set(key, counts.get(key)! + 1)
      }
    }
  }
  const items = KNOWN_CENTERS
    .map(center => ({
      label: `${center} (${counts.get(authorKey(center)) ?? 0})`,
      value: authorKey(center)
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
  return [{ label: 'All Centers', value: '' }, ...items]
})

const filtered = computed<Article[]>(() => {
  let r = articles.value
  if (selectedType.value) r = r.filter(a => a.type === selectedType.value)
  if (selectedTopic.value) r = r.filter(a => asStrings(a.categories).includes(selectedTopic.value))
  if (selectedAuthor.value) r = r.filter(a => articleAuthorNames(a).some(n => authorKey(n) === selectedAuthor.value))
  if (selectedYear.value) r = r.filter(a => articleYear(a) === selectedYear.value)
  if (selectedCenter.value) r = r.filter(a => articleAuthorNames(a).some(n => authorKey(n) === selectedCenter.value))
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    r = r.filter(a =>
      a.title.toLowerCase().includes(q)
      || (a.abstract ?? '').toLowerCase().includes(q)
    )
  }
  return r
})

const pageItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

watch([selectedType, selectedTopic, selectedAuthor, selectedYear, selectedCenter, searchQuery], () => {
  currentPage.value = 1
})
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-6 space-y-3">
      <div class="text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
        Hub 2.0 · current state · work in progress
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-highlighted">
        Research Hub — current view
      </h1>
      <p class="max-w-3xl text-sm leading-relaxed text-muted">
        This is what Hub 2.0 looks like as it stands today — a filter bar with dropdowns, no chips, no shortcuts. The same baseline visitors get on Hub 1.0 in production. Visitors search by typing or by selecting from <strong>Publication Type</strong>, <strong>Topic</strong>, <strong>Author</strong>, <strong>Year</strong>, or <strong>ICJIA Center</strong>. Use this as your starting point — then jump to the views below to see the proposed friction-reducing tweaks.
      </p>
      <div class="flex flex-wrap items-center gap-2 pt-2 text-xs">
        <span class="font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
          Proposed tweaks:
        </span>
        <UButton
          to="/view0"
          label="View 0 (chips + advanced)"
          color="neutral"
          variant="outline"
          size="xs"
        />
        <UButton
          to="/view1"
          label="View 1 (dropdowns)"
          color="neutral"
          variant="outline"
          size="xs"
        />
        <UButton
          to="/view2"
          label="View 2 (chips + always-on)"
          color="neutral"
          variant="outline"
          size="xs"
        />
      </div>
    </div>

    <div class="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-50 p-4 dark:bg-amber-500/10">
      <UIcon
        name="i-lucide-flask-conical"
        class="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-amber-400"
      />
      <div class="space-y-1 text-sm">
        <div class="font-bold text-amber-900 dark:text-amber-200">
          Demo only — publication types are not officially curated
        </div>
        <p class="text-amber-900/90 dark:text-amber-100/90">
          This is a proof-of-concept built to show how the filter UI behaves. The <strong>Publication Type</strong> on each article (Research Report, Annual Report, etc.) is a sample mapping for demo purposes — not ICJIA's officially reviewed, approved, or curated categorization.
        </p>
      </div>
    </div>

    <div
      v-if="pending"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="overflow-hidden rounded-lg border border-default bg-default"
      >
        <div class="aspect-[16/9] w-full animate-pulse bg-elevated" />
        <div class="space-y-3 p-4">
          <div class="h-4 w-2/3 animate-pulse rounded bg-elevated" />
          <div class="h-3 w-1/3 animate-pulse rounded bg-elevated" />
          <div class="h-3 w-full animate-pulse rounded bg-elevated" />
          <div class="h-3 w-5/6 animate-pulse rounded bg-elevated" />
        </div>
      </div>
    </div>

    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      title="Failed to load articles"
      :description="String(error)"
      :actions="[{ label: 'Retry', onClick: () => refresh() }]"
    />

    <template v-else>
      <ArticleFilterBar
        v-model:type="selectedType"
        v-model:topic="selectedTopic"
        v-model:author="selectedAuthor"
        v-model:year="selectedYear"
        v-model:center="selectedCenter"
        v-model:search="searchQuery"
        class="mb-4"
        :types="typeItems"
        :topics="topicItems"
        :authors="authorItems"
        :years="yearItems"
        :centers="centerItems"
      />

      <p class="mb-4 text-sm text-muted">
        Showing <span class="font-semibold text-highlighted">{{ filtered.length }}</span>
        of <span class="font-semibold text-highlighted">{{ articles.length }}</span> articles
      </p>

      <div
        v-if="pageItems.length"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        <ArticleCard
          v-for="(article, i) in pageItems"
          :key="article.documentId"
          :article="article"
          :priority="i === 0"
          from="current"
        />
      </div>

      <div
        v-else
        class="rounded-lg border border-dashed border-default p-12 text-center text-muted"
      >
        No articles match your filters.
      </div>

      <div
        v-if="filtered.length > pageSize"
        class="mt-8 flex justify-center"
      >
        <UPagination
          v-model:page="currentPage"
          :total="filtered.length"
          :items-per-page="pageSize"
          aria-label="Article pagination"
        />
      </div>
    </template>
  </UContainer>
</template>
