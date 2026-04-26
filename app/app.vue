<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/favicon.ico' }
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

const version = useRuntimeConfig().public.appVersion
const currentYear = useState('currentYear', () => new Date().getFullYear())

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'View 0', to: '/view0' },
  { label: 'View 1', to: '/view1' },
  { label: 'View 2', to: '/view2' }
]
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <UNavigationMenu
          :items="navItems"
          aria-label="View navigation"
        />
      </template>

      <NuxtLink
        to="/"
        class="rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <UBadge
          label="PUBLICATION TYPE FILTER DEMO"
          color="primary"
          variant="solid"
          size="md"
          class="cursor-pointer font-semibold tracking-wider"
        />
      </NuxtLink>

      <template #right>
        <UButton
          to="/about"
          label="What This Demo Shows"
          icon="i-lucide-sparkles"
          color="primary"
          variant="ghost"
          size="sm"
        />

        <UButton
          to="/taxonomy"
          label="Hub Taxonomy"
          icon="i-lucide-network"
          color="neutral"
          variant="ghost"
          size="sm"
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
          ICJIA Publication Type Filter Demo • v{{ version }} • © {{ currentYear }}
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
  </UApp>
</template>
