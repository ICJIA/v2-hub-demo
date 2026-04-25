<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Publication Type Filter Demo'
const description = 'ICJIA research hub article filter POC.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const isWhatsChangedOpen = ref(false)
const version = useRuntimeConfig().public.appVersion

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Alt 1', to: '/alt' },
  { label: 'Alt 2', to: '/alt2' }
]

const changes = [
  {
    title: 'Filterable publication types',
    body: 'Pick a publication type and the grid narrows in real time. Try the chips on the home page or the Publication Type dropdown on Alt View 1.'
  },
  {
    title: 'Clickable author names',
    body: 'Each author in a card byline is a button. Click a name and the list filters to everything that author worked on.'
  },
  {
    title: 'Normalized author names',
    body: 'The same person credited differently across articles (e.g. "Anne Kirkner" vs "Anne Kirkner, Ph.D" vs "Anne Kirkner, PhD") collapses into one filter entry, so a click matches every variant.'
  },
  {
    title: 'Several views for publication types',
    body: 'The Home page starts as chips only and reveals the full filter bar via an Advanced toggle. Alt 1 puts Publication Type in the bar instead (no chips). Alt 2 shows chips with the full filter bar always visible. Same data, three UX options to compare.'
  },
  {
    title: 'Clickable, additive tags',
    body: 'Each tag pill on a card is clickable. Click one and it filters; click another and the results union — articles with any of the selected tags show. Each selected tag becomes a dismiss-able pill near the result count.'
  }
]
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <UNavigationMenu :items="navItems" />
      </template>

      <UBadge
        label="PUBLICATION TYPE FILTER DEMO"
        color="primary"
        variant="subtle"
        size="sm"
        class="font-semibold tracking-wider"
      />

      <template #right>
        <UButton
          label="What This Demo Shows"
          icon="i-lucide-sparkles"
          color="primary"
          variant="ghost"
          size="sm"
          @click="isWhatsChangedOpen = true"
        />

        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          ICJIA Publication Type Filter Demo • v{{ version }} • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/ICJIA/v2-hub-demo/blob/main/CHANGELOG.md"
          target="_blank"
          label="Changelog"
          icon="i-lucide-list"
          color="neutral"
          variant="ghost"
          size="sm"
        />
        <UButton
          to="https://github.com/ICJIA/v2-hub-demo"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>

    <UModal v-model:open="isWhatsChangedOpen" title="What this demo shows">
      <template #body>
        <div class="space-y-5 text-sm">
          <p class="text-toned">
            This proof-of-concept layers a handful of improvements on top of the current research hub list. Each one is meant to make finding the right article faster:
          </p>

          <ul class="space-y-4">
            <li
              v-for="c in changes"
              :key="c.title"
              class="flex gap-3"
            >
              <UIcon name="i-lucide-check-circle-2" class="size-5 shrink-0 text-primary" />
              <div>
                <p class="font-semibold text-highlighted">
                  {{ c.title }}
                </p>
                <p class="text-toned">
                  {{ c.body }}
                </p>
              </div>
            </li>
          </ul>

          <p class="text-xs text-muted">
            More highlights will be added here as the POC evolves.
          </p>
        </div>
      </template>
    </UModal>
  </UApp>
</template>
