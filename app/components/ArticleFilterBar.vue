<script setup lang="ts">
export interface Item {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  types?: Item[]
  topics: Item[]
  authors: Item[]
  years: Item[]
  centers?: Item[]
  type?: string
  topic: string
  author: string
  year: string
  center?: string
  search: string
}>(), {
  types: () => [],
  centers: () => [],
  type: '',
  center: ''
})

const emit = defineEmits<{
  'update:type': [value: string]
  'update:topic': [value: string]
  'update:author': [value: string]
  'update:year': [value: string]
  'update:center': [value: string]
  'update:search': [value: string]
  'clear-all': []
}>()

const typeModel = computed<Item | undefined>({
  get: () => props.types.find(i => i.value === props.type),
  set: v => emit('update:type', v?.value ?? '')
})
const topicModel = computed<Item | undefined>({
  get: () => props.topics.find(i => i.value === props.topic),
  set: v => emit('update:topic', v?.value ?? '')
})
const authorModel = computed<Item | undefined>({
  get: () => props.authors.find(i => i.value === props.author),
  set: v => emit('update:author', v?.value ?? '')
})
const yearModel = computed<Item | undefined>({
  get: () => props.years.find(i => i.value === props.year),
  set: v => emit('update:year', v?.value ?? '')
})
const centerModel = computed<Item | undefined>({
  get: () => props.centers.find(i => i.value === props.center),
  set: v => emit('update:center', v?.value ?? '')
})

function widthFor(items: Item[]): string {
  const longest = items.reduce((m, i) => Math.max(m, i.label.length), 0)
  const capped = Math.min(longest, 32)
  return `${Math.max(110, capped * 7 + 24)}px`
}

const localSearch = ref(props.search)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(localSearch, (v) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => emit('update:search', v), 300)
})

watch(() => props.search, (v) => {
  if (v !== localSearch.value) localSearch.value = v
})

function clearAll() {
  emit('update:type', '')
  emit('update:topic', '')
  emit('update:author', '')
  emit('update:year', '')
  emit('update:center', '')
  localSearch.value = ''
  emit('update:search', '')
  emit('clear-all')
}

const hasActiveFilters = computed(() =>
  props.type !== ''
  || props.topic !== ''
  || props.author !== ''
  || props.year !== ''
  || props.center !== ''
  || props.search.length > 0
)
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 rounded-lg border border-default bg-elevated p-3">
    <span class="text-sm font-medium text-toned">Filter by:</span>

    <USelectMenu
      v-if="types.length"
      v-model="typeModel"
      :items="types"
      placeholder="Publication Type"
      :style="{ minWidth: widthFor(types) }"
      size="sm"
    />

    <USelectMenu
      v-model="topicModel"
      :items="topics"
      placeholder="Topics"
      :style="{ minWidth: widthFor(topics) }"
      size="sm"
    />

    <USelectMenu
      v-if="centers.length"
      v-model="centerModel"
      :items="centers"
      placeholder="Centers"
      :style="{ minWidth: widthFor(centers) }"
      size="sm"
    />

    <USelectMenu
      v-model="authorModel"
      :items="authors"
      placeholder="Authors"
      :style="{ minWidth: widthFor(authors) }"
      size="sm"
    />

    <USelectMenu
      v-model="yearModel"
      :items="years"
      placeholder="Years"
      :style="{ minWidth: widthFor(years) }"
      size="sm"
    />

    <UInput
      v-model="localSearch"
      placeholder="Search title or summary…"
      icon="i-lucide-search"
      class="min-w-56"
      size="sm"
    />

    <UButton
      v-if="hasActiveFilters"
      label="Clear all"
      icon="i-lucide-x"
      color="neutral"
      variant="ghost"
      size="sm"
      @click="clearAll"
    />
  </div>
</template>
