<script setup lang="ts">
import type { Article } from '~/composables/useArticles'
import { articleAuthorNames, formatDate, imageUrl, typeLabel } from '~/utils/article-format'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data, pending, error } = await useArticles()

const article = computed<Article | null>(() => {
  const list = data.value ?? []
  return list.find(a => a.slug === slug.value) ?? null
})

useHead(() => ({
  title: article.value ? `${article.value.title} — Research Hub` : 'Article — Research Hub'
}))

const splashSrc = computed(() => imageUrl(article.value?.splash?.url))
const splashAlt = computed(() => article.value?.splash?.alternativeText ?? article.value?.title ?? '')

const authorList = computed(() => {
  if (!article.value) return ''
  const names = articleAuthorNames(article.value)
  if (names.length === 0) return ''
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`
})
</script>

<template>
  <UContainer class="py-8">
    <UButton
      to="/"
      label="Back to articles"
      icon="i-lucide-arrow-left"
      variant="ghost"
      size="sm"
      class="mb-4"
    />

    <div v-if="pending" class="space-y-4">
      <div class="aspect-[16/9] w-full animate-pulse rounded-lg bg-elevated" />
      <div class="h-8 w-2/3 animate-pulse rounded bg-elevated" />
      <div class="h-4 w-1/3 animate-pulse rounded bg-elevated" />
    </div>

    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      title="Failed to load article"
      :description="String(error)"
    />

    <div
      v-else-if="!article"
      class="rounded-lg border border-dashed border-default p-12 text-center text-muted"
    >
      Article not found.
    </div>

    <article v-else class="space-y-6">
      <div class="overflow-hidden rounded-lg border border-default">
        <div class="aspect-[16/9] w-full overflow-hidden bg-elevated">
          <img
            v-if="splashSrc"
            :src="splashSrc"
            :alt="splashAlt"
            class="h-full w-full object-cover"
          >
        </div>
      </div>

      <div class="space-y-3">
        <UBadge
          :label="typeLabel(article.type)"
          color="primary"
          variant="subtle"
          size="sm"
        />

        <h1 class="text-3xl font-bold tracking-tight text-highlighted">
          {{ article.title }}
        </h1>

        <p v-if="authorList" class="text-sm text-toned">
          By {{ authorList }}
        </p>

        <p class="text-sm text-muted">
          {{ formatDate(article.date ?? article.publishedAt) }}
        </p>
      </div>

      <p v-if="article.abstract" class="text-base leading-relaxed text-toned">
        {{ article.abstract }}
      </p>

      <div v-if="article.tags?.length" class="flex flex-wrap gap-1.5 pt-2">
        <UBadge
          v-for="tag in article.tags"
          :key="tag"
          :label="tag"
          color="neutral"
          variant="subtle"
          size="xs"
        />
      </div>

      <div class="rounded-lg border border-dashed border-default bg-elevated p-6 text-sm text-muted">
        <p class="font-semibold text-highlighted">
          Demo stub
        </p>
        <p>
          This is a placeholder article detail page for this proof-of-concept app. The real article body would render here in production.
        </p>
      </div>
    </article>
  </UContainer>
</template>
