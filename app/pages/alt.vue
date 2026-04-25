<script setup lang="ts">
import type { Article } from '~/composables/useArticles'
import type { TypeOption } from '~/components/ArticleTypeChips.vue'
import { articleAuthorNames, authorKey, typeLabel } from '~/utils/article-format'

useHead({ title: 'Research Hub — View 1' })

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
const selectedTags = ref<string[]>([])
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

const filtered = computed<Article[]>(() => {
  let r = articles.value
  if (selectedType.value) r = r.filter(a => a.type === selectedType.value)
  if (selectedTopic.value) r = r.filter(a => asStrings(a.categories).includes(selectedTopic.value))
  if (selectedAuthor.value) r = r.filter(a => articleAuthorNames(a).some(n => authorKey(n) === selectedAuthor.value))
  if (selectedYear.value) r = r.filter(a => articleYear(a) === selectedYear.value)
  if (selectedTags.value.length) {
    r = r.filter(a => {
      const tags = asStrings(a.tags)
      return selectedTags.value.some(t => tags.includes(t))
    })
  }
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

watch([selectedType, selectedTopic, selectedAuthor, selectedYear, selectedTags, searchQuery], () => {
  currentPage.value = 1
})

watch(searchQuery, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    selectedType.value = ''
    selectedTopic.value = ''
    selectedAuthor.value = ''
    selectedYear.value = ''
    selectedTags.value = []
  }
})

function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function applyTypeFilter(t: string) {
  selectedType.value = t
  scrollToTop()
}

function applyTagFilter(t: string) {
  if (selectedTags.value.includes(t)) {
    selectedTags.value = selectedTags.value.filter(x => x !== t)
  } else {
    selectedTags.value = [...selectedTags.value, t]
  }
  scrollToTop()
}

function removeTag(t: string) {
  selectedTags.value = selectedTags.value.filter(x => x !== t)
}

function applyAuthorFilter(key: string) {
  selectedAuthor.value = key
  scrollToTop()
}
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-6 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight text-highlighted">
        Research Hub — View 1
      </h1>
      <p class="text-sm text-muted">
        Pure-dropdown alternative: Publication Type lives in the filter bar, no chip row, no Centers. Centers were removed from this view.
      </p>
    </div>

    <div v-if="pending" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
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
        class="mb-4"
        v-model:type="selectedType"
        v-model:topic="selectedTopic"
        v-model:author="selectedAuthor"
        v-model:year="selectedYear"
        v-model:search="searchQuery"
        :types="typeItems"
        :topics="topicItems"
        :authors="authorItems"
        :years="yearItems"
        @clear-all="selectedTags = []"
      />

      <p class="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>
          Showing <span class="font-semibold text-highlighted">{{ filtered.length }}</span>
          of <span class="font-semibold text-highlighted">{{ articles.length }}</span> articles
        </span>
        <UButton
          v-for="t in selectedTags"
          :key="t"
          :label="`Tag: ${t}`"
          trailing-icon="i-lucide-x"
          color="primary"
          variant="soft"
          size="xs"
          @click="removeTag(t)"
        />
      </p>

      <div
        v-if="pageItems.length"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        <ArticleCard
          v-for="article in pageItems"
          :key="article.documentId"
          :article="article"
          :search-query="searchQuery"
          @select-type="applyTypeFilter"
          @select-tag="applyTagFilter"
          @select-author="applyAuthorFilter"
        />
      </div>

      <div
        v-else
        class="rounded-lg border border-dashed border-default p-12 text-center text-muted"
      >
        No articles match your filters.
      </div>

      <div v-if="filtered.length > pageSize" class="mt-8 flex justify-center">
        <UPagination
          v-model:page="currentPage"
          :total="filtered.length"
          :items-per-page="pageSize"
        />
      </div>
    </template>
  </UContainer>
</template>
