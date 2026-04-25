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

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Alt View 1', to: '/alt' },
  {
    label: "What's Changed",
    icon: 'i-lucide-sparkles',
    onSelect: (e) => {
      e?.preventDefault?.()
      isWhatsChangedOpen.value = true
    }
  }
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
    body: 'The Home page uses a quick-pick chip row above the filter bar. Alt View 1 puts Publication Type in the bar instead. Same data, two UX options to compare.'
  },
  {
    title: 'Clickable tags',
    body: 'Each tag pill on a card is clickable too — selecting one filters the grid by that tag and shows a small dismiss-able pill near the result count.'
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
        <UColorModeButton />

        <UButton
          to="https://github.com/ICJIA/v2-hub-demo"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          ICJIA Publication Type Filter Demo • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
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

    <UModal v-model:open="isWhatsChangedOpen" title="What's changed in this demo">
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
