<script setup lang="ts">
import type { Article } from '~/composables/useArticles'
import { articleAuthorNames, authorKey, formatDate, highlightSegments, imageUrl, typeLabel } from '~/utils/article-format'

const props = withDefaults(defineProps<{
  article: Article
  searchQuery?: string
  priority?: boolean
}>(), {
  searchQuery: '',
  priority: false
})

const emit = defineEmits<{
  'select-type': [value: string]
  'select-tag': [value: string]
  'select-author': [key: string]
}>()

const href = computed(() => `/articles/${props.article.slug}`)
const splashSrc = computed(() => imageUrl(props.article.splash?.url))
const splashAlt = computed(() => props.article.splash?.alternativeText ?? props.article.title)
const authorNames = computed(() => articleAuthorNames(props.article))

const titleSegments = computed(() => highlightSegments(props.article.title, props.searchQuery))
const abstractSegments = computed(() => highlightSegments(props.article.abstract, props.searchQuery))

function separatorBefore(idx: number, total: number): string {
  if (total === 2) return ' and '
  if (idx === total - 1) return ', and '
  return ', '
}
</script>

<template>
  <NuxtLink
    :to="href"
    class="group block overflow-hidden rounded-lg border border-default bg-default transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    <div class="aspect-[16/9] w-full overflow-hidden bg-elevated">
      <img
        v-if="splashSrc"
        :src="splashSrc"
        :alt="splashAlt"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        decoding="async"
        width="640"
        height="360"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      >
    </div>

    <div class="space-y-3 p-4">
      <button
        type="button"
        class="cursor-pointer rounded-full transition-opacity hover:opacity-80"
        :aria-label="`Filter by ${typeLabel(article.type)}`"
        @click.stop.prevent="emit('select-type', article.type)"
      >
        <UBadge
          :label="typeLabel(article.type)"
          color="primary"
          variant="solid"
          size="sm"
        />
      </button>

      <h2 class="line-clamp-2 text-lg font-semibold leading-snug text-highlighted">
        <template v-for="(seg, i) in titleSegments" :key="`t-${i}`">
          <mark v-if="seg.match" class="rounded-sm bg-primary/40 px-0.5 text-inherit">{{ seg.text }}</mark>
          <span v-else>{{ seg.text }}</span>
        </template>
      </h2>

      <p v-if="authorNames.length" class="line-clamp-2 text-xs text-toned">
        <span>By </span>
        <template v-for="(name, idx) in authorNames" :key="idx">
          <span v-if="idx > 0">{{ separatorBefore(idx, authorNames.length) }}</span>
          <button
            type="button"
            class="cursor-pointer hover:underline"
            :aria-label="`Filter by author ${name}`"
            @click.stop.prevent="emit('select-author', authorKey(name))"
          >{{ name }}</button>
        </template>
      </p>

      <p class="text-xs text-muted">
        {{ formatDate(article.date ?? article.publishedAt) }}
      </p>

      <p v-if="article.abstract" class="line-clamp-5 min-h-[6.25rem] text-sm text-toned">
        <template v-for="(seg, i) in abstractSegments" :key="`a-${i}`">
          <mark v-if="seg.match" class="rounded-sm bg-primary/40 px-0.5 text-inherit">{{ seg.text }}</mark>
          <span v-else>{{ seg.text }}</span>
        </template>
      </p>

      <div v-if="article.tags?.length" class="flex flex-wrap gap-1.5 pt-1">
        <button
          v-for="tag in article.tags"
          :key="tag"
          type="button"
          class="inline-flex min-h-6 min-w-6 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80"
          :aria-label="`Filter by tag ${tag}`"
          @click.stop.prevent="emit('select-tag', tag)"
        >
          <UBadge
            :label="tag"
            color="neutral"
            variant="subtle"
            size="xs"
          />
        </button>
      </div>
    </div>
  </NuxtLink>
</template>
