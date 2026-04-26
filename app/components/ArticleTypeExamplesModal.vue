<script setup lang="ts">
import type { Article } from '~/composables/useArticles'
import { formatDate, imageUrl, typeLabel } from '~/utils/article-format'

const props = withDefaults(defineProps<{
  open: boolean
  typeValue: string | null
  articles: Article[] | null | undefined
  illustrativeFill?: boolean
}>(), {
  illustrativeFill: false
})

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const isOpen = computed({
  get: () => props.open,
  set: (v: boolean) => emit('update:open', v)
})

const examplesByType = computed(() => {
  const map = new Map<string, Article[]>()
  for (const a of props.articles ?? []) {
    if (!a.type) continue
    const list = map.get(a.type) ?? []
    list.push(a)
    map.set(a.type, list)
  }
  for (const list of map.values()) {
    list.sort((a, b) => {
      const ka = a.date ?? a.publishedAt ?? ''
      const kb = b.date ?? b.publishedAt ?? ''
      return kb.localeCompare(ka)
    })
  }
  return map
})

const modalTitle = computed(() => {
  if (!props.typeValue) return ''
  return `Examples — ${typeLabel(props.typeValue)}`
})

const modalExamples = computed(() => {
  if (!props.typeValue) return []
  return (examplesByType.value.get(props.typeValue) ?? []).slice(0, 2)
})

const modalTotalCount = computed(() => {
  if (!props.typeValue) return 0
  return examplesByType.value.get(props.typeValue)?.length ?? 0
})
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="modalTitle"
  >
    <template #body>
      <div class="space-y-4">
        <p
          v-if="illustrativeFill"
          class="rounded-lg border border-amber-300/40 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-200"
        >
          <UIcon
            name="i-lucide-info"
            class="mr-1 inline size-4"
          />
          <strong>POC demo — examples are illustrative.</strong> Most articles in the live CMS aren't yet tagged with a <code>type</code>. For those, the demo assigns a placeholder type client-side so every pill has examples to show. Once editorial curation is complete, only real tagged articles will appear here.
        </p>
        <p
          v-else
          class="rounded-lg border border-amber-300/40 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-200"
        >
          <UIcon
            name="i-lucide-info"
            class="mr-1 inline size-4"
          />
          <strong>For this proof-of-concept, these examples still need curation.</strong> They're pulled directly from articles that already carry this <code>type</code> tag in the CMS. Many articles aren't tagged yet — once editorial curation is complete, every type will have richer, more representative examples.
        </p>

        <div
          v-if="!modalExamples.length"
          class="rounded-lg border border-dashed border-default p-6 text-center text-sm text-muted"
        >
          No tagged examples for this type in the live data yet.
        </div>

        <div
          v-else
          class="space-y-3"
        >
          <p class="text-xs text-muted">
            Top {{ modalExamples.length }} most-recent of {{ modalTotalCount }} tagged article(s):
          </p>
          <NuxtLink
            v-for="ex in modalExamples"
            :key="ex.documentId"
            :to="`/articles/${ex.slug}`"
            class="block rounded-lg border border-default bg-elevated p-4 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            @click="isOpen = false"
          >
            <div class="flex gap-4">
              <div class="aspect-[16/9] w-32 shrink-0 overflow-hidden rounded bg-default">
                <img
                  v-if="ex.splash?.url"
                  :src="imageUrl(ex.splash.url)"
                  :alt="ex.splash.alternativeText ?? ex.title"
                  class="h-full w-full object-cover"
                >
              </div>
              <div class="min-w-0 flex-1 space-y-1">
                <h4 class="line-clamp-2 font-semibold text-highlighted">
                  {{ ex.title }}
                </h4>
                <p class="text-xs text-muted">
                  {{ formatDate(ex.date ?? ex.publishedAt) }}
                </p>
                <p
                  v-if="ex.abstract"
                  class="line-clamp-2 text-sm text-toned"
                >
                  {{ ex.abstract }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </template>
  </UModal>
</template>
