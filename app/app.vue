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
  { label: 'Alt 0', to: '/' },
  { label: 'Alt 1', to: '/alt' },
  { label: 'Alt 2', to: '/alt2' }
]

const changes = [
  {
    title: 'Find research reports in one click',
    body: 'Click "Research Reports" at the top of the home page and the list narrows to just research reports. Same one-click filter for Annual Reports, Program Evaluation Summaries, Updates, and Strategic Plans. No scrolling, no menus.'
  },
  {
    title: 'Search highlights what it matched',
    body: 'Type a word in the search box (try "opioid") and articles mentioning it appear, with the word highlighted in their title and summary. Easy to see at a glance why each article was included.'
  },
  {
    title: 'Click an author\'s name to see their other work',
    body: 'Every author name in a card is clickable. One click filters the list to every article that person worked on.'
  },
  {
    title: 'One entry per author, even when their name varies',
    body: 'Articles sometimes credit the same person three or four different ways — "Riley Calder", "Riley Calder, Ph.D", "Riley Calder, PhD". The current site shows three different entries. This demo shows one, and clicking it matches every variant.'
  },
  {
    title: 'Click any tag — and stack them',
    body: 'Tags on cards are clickable. Click one and the list filters; click another and the results widen to articles with either tag. Each active tag shows as a removable pill near the result count.'
  },
  {
    title: 'Filter by ICJIA Center',
    body: 'On the Home page and Alt 2, narrow articles to a specific ICJIA division — Center for Justice Research and Evaluation, Center for Victim Studies, and the rest. All five divisions are always listed.'
  },
  {
    title: 'Three layouts to compare',
    body: 'Same articles, three filter UX flavors so the team can pick a winner. Home: chips with an "Advanced filters" toggle that reveals the full bar. Alt 1: pure dropdown menus (closest to the live site today). Alt 2: chips and the full bar always visible side by side.'
  }
]
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <UNavigationMenu :items="navItems" />
      </template>

      <NuxtLink
        to="/"
        class="rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Go to Alt 0 (home)"
      >
        <UBadge
          label="PUBLICATION TYPE FILTER DEMO"
          color="primary"
          variant="subtle"
          size="sm"
          class="cursor-pointer font-semibold tracking-wider"
        />
      </NuxtLink>

      <template #right>
        <UButton
          to="/taxonomy"
          label="Hub Taxonomy"
          icon="i-lucide-network"
          color="neutral"
          variant="ghost"
          size="sm"
        />

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
            This demo adds a handful of small improvements over the current research hub list. The goal: anyone — staff, partners, the public — can find the article they're looking for in one or two clicks. Highlights:
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
