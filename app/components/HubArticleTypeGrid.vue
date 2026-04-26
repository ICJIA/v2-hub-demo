<script setup lang="ts">
import type { Article } from '~/composables/useArticles'

interface ArticleTypeRow {
  value: string
  label: string
  note?: string
}

const COLOR_FAMILY: Record<string, 'sky' | 'emerald' | 'violet'> = {
  researchReport: 'emerald',
  researchAtAGlance: 'sky',
  evaluation: 'sky',
  process_evaluation: 'sky',
  programEvaluationSummary: 'sky',
  researchBulletin: 'sky',
  annualReport: 'emerald',
  strategicPlan: 'emerald',
  article: 'violet',
  newsletter: 'violet',
  update: 'violet',
  toolkit: 'violet',
  general: 'violet',
  dataset: 'violet'
}

const ICON: Record<string, string> = {
  researchReport: 'i-lucide-file-text',
  researchAtAGlance: 'i-lucide-search',
  evaluation: 'i-lucide-flask-conical',
  process_evaluation: 'i-lucide-cog',
  programEvaluationSummary: 'i-lucide-bar-chart-3',
  researchBulletin: 'i-lucide-newspaper',
  annualReport: 'i-lucide-calendar',
  strategicPlan: 'i-lucide-target',
  article: 'i-lucide-pen-line',
  newsletter: 'i-lucide-mail',
  update: 'i-lucide-bell',
  toolkit: 'i-lucide-wrench',
  general: 'i-lucide-folder',
  dataset: 'i-lucide-package'
}

const ARTICLE_TYPES: ArticleTypeRow[] = [
  { value: 'researchReport', label: 'Research Report' },
  { value: 'annualReport', label: 'Annual Report' },
  { value: 'article', label: 'Article' },
  { value: 'dataset', label: 'Dataset', note: 'Naming collision: there is also a separate Datasets top-level content type. The /taxonomy page explains.' },
  { value: 'evaluation', label: 'Evaluation' },
  { value: 'general', label: 'General' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'process_evaluation', label: 'Process Evaluation' },
  { value: 'programEvaluationSummary', label: 'Program Evaluation Summary' },
  { value: 'researchAtAGlance', label: 'Research At A Glance' },
  { value: 'researchBulletin', label: 'Research Bulletin' },
  { value: 'strategicPlan', label: 'Strategic Plan' },
  { value: 'toolkit', label: 'Toolkit' },
  { value: 'update', label: 'Update' }
]

const props = withDefaults(defineProps<{
  articles: Article[] | null | undefined
  variant?: 'list' | 'compact'
  highlight?: string
  colorFamily?: 'auto' | 'none'
}>(), {
  variant: 'list',
  colorFamily: 'none',
  highlight: ''
})

const emit = defineEmits<{ select: [typeValue: string] }>()

const counts = computed(() => {
  const map = new Map<string, number>()
  for (const a of props.articles ?? []) {
    if (!a.type) continue
    map.set(a.type, (map.get(a.type) ?? 0) + 1)
  }
  return map
})

function familyClass(typeValue: string): string {
  if (props.colorFamily !== 'auto') return ''
  if (typeValue === props.highlight) return ''
  const family = COLOR_FAMILY[typeValue] ?? 'violet'
  if (family === 'sky') return 'border-sky-400/20 bg-sky-400/5 text-sky-200 hover:border-sky-400/40'
  if (family === 'emerald') return 'border-emerald-400/20 bg-emerald-400/5 text-emerald-200 hover:border-emerald-400/40'
  return 'border-violet-400/20 bg-violet-400/5 text-violet-200 hover:border-violet-400/40'
}

function highlightClass(typeValue: string): string {
  if (typeValue !== props.highlight) return ''
  return 'border-amber-500 bg-amber-500/15 text-amber-300 ring-4 ring-amber-500/10 hover:border-amber-400'
}
</script>

<template>
  <div
    v-if="variant === 'compact'"
    class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4"
  >
    <button
      v-for="t in ARTICLE_TYPES"
      :key="t.value"
      type="button"
      class="flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      :class="[
        highlightClass(t.value) || familyClass(t.value) || 'border-default bg-default text-toned hover:border-primary/60',
        t.value === highlight ? 'shadow-sm' : ''
      ]"
      @click="emit('select', t.value)"
    >
      <UIcon
        :name="ICON[t.value] ?? 'i-lucide-tag'"
        class="size-4 shrink-0"
      />
      <span class="flex-1 truncate">{{ t.label }}</span>
      <UIcon
        name="i-lucide-chevron-right"
        class="size-3 shrink-0 opacity-60"
      />
    </button>
  </div>

  <div
    v-else
    class="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2"
  >
    <button
      v-for="t in ARTICLE_TYPES"
      :key="t.value"
      type="button"
      class="flex w-full items-start gap-2 rounded border border-default bg-default px-3 py-2 text-left transition-all hover:border-primary/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      @click="emit('select', t.value)"
    >
      <UIcon
        name="i-lucide-tag"
        class="mt-0.5 size-4 shrink-0 text-muted"
      />
      <div class="flex-1">
        <div class="text-toned">
          {{ t.label }}
          <span class="ml-1 text-xs font-normal text-muted">({{ counts.get(t.value) ?? 0 }})</span>
        </div>
        <div class="text-xs text-muted">
          <code>{{ t.value }}</code>
        </div>
        <div
          v-if="t.note"
          class="mt-1 text-xs text-muted"
        >
          {{ t.note }}
        </div>
      </div>
      <UIcon
        name="i-lucide-chevron-right"
        class="mt-1 size-4 shrink-0 text-muted"
      />
    </button>
  </div>
</template>
