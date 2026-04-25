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

const title = 'Publication Type Demo'
const description = 'ICJIA research hub article filter POC.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Alt View', to: '/alt' }
]
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <UNavigationMenu :items="navItems" />
      </template>

      <UBadge
        label="PUBLICATION DEMO"
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
          ICJIA Publication Type Demo • © {{ new Date().getFullYear() }}
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
  </UApp>
</template>
