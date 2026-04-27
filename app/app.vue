<script setup>
const SITE_URL = 'https://v2-hub-demo.netlify.app'
const OG_IMAGE = `${SITE_URL}/og-image.png`
const PUBLISHED_DATE = '2026-04-15T00:00:00Z'
const MODIFIED_DATE = '2026-04-26T00:00:00Z'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0a0a0a' },
    { name: 'color-scheme', content: 'dark light' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Illinois Criminal Justice Information Authority (ICJIA)' },
    // Content freshness for AI / SEO crawlers
    { property: 'article:published_time', content: PUBLISHED_DATE },
    { property: 'article:modified_time', content: MODIFIED_DATE }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: SITE_URL },
    // Preconnect to the Strapi origin — every article splash image is
    // fetched from there, so warming the TLS handshake early shaves
    // perceptible time off the View 0/1/2 grid render.
    { rel: 'preconnect', href: 'https://v2.hub.icjia-api.cloud', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://v2.hub.icjia-api.cloud' }
  ],
  script: [
    {
      // Site-wide WebSite + Organization schema for AI / search crawlers.
      // Per-page WebPage schema is emitted by individual pages (e.g. index.vue).
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            'name': 'ICJIA Research Hub — Publication Type Filter Demo',
            'alternateName': 'ICJIA Research Hub Filter Demo',
            'url': SITE_URL,
            'description': 'Proof-of-concept demonstrating how the ICJIA Research Hub article list could be filtered by publication type, topic, author, year, and tags. Three filter UX flavors compared side-by-side, plus a plain-language explainer of the Hub 2.0 / Strapi 5 taxonomy.',
            'inLanguage': 'en-US',
            'datePublished': PUBLISHED_DATE,
            'dateModified': MODIFIED_DATE,
            'publisher': { '@id': `${SITE_URL}/#organization` },
            'image': { '@id': `${SITE_URL}/#og-image` }
          },
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            'name': 'Illinois Criminal Justice Information Authority',
            'alternateName': 'ICJIA',
            'url': 'https://icjia.illinois.gov/'
          },
          {
            '@type': 'ImageObject',
            '@id': `${SITE_URL}/#og-image`,
            'url': OG_IMAGE,
            'width': 1200,
            'height': 630,
            'caption': 'ICJIA Research Hub Filter Demo — articles ≡ summaries equivalence visual on a dark background'
          }
        ]
      })
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'ICJIA Research Hub — Publication Type Filter Demo'
// Kept under 160 chars for SEO/social-preview tools. Longer prose for
// AI summarizers lives in the JSON-LD WebSite description above.
const description = 'How Hub 2.0 organizes ICJIA research: "Articles" is the umbrella for fourteen publication types. Three filter layouts compared side-by-side.'

useSeoMeta({
  title,
  description,
  // OpenGraph
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: SITE_URL,
  ogSiteName: 'ICJIA Research Hub Filter Demo',
  ogLocale: 'en_US',
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'ICJIA Research Hub Filter Demo — articles ≡ summaries equivalence visual on a dark background',
  ogImageType: 'image/png',
  // Twitter / X
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: OG_IMAGE,
  twitterImageAlt: 'ICJIA Research Hub Filter Demo — articles ≡ summaries equivalence visual on a dark background'
})

const version = useRuntimeConfig().public.appVersion
const currentYear = useState('currentYear', () => new Date().getFullYear())

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Current', to: '/current' },
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
