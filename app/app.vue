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
    { rel: 'canonical', href: SITE_URL }
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
const description = 'How Hub 2.0 organizes ICJIA research. "Articles" is the umbrella for fourteen publication types — research reports, annual reports, program evaluations, and more. Three filter layouts to compare; every type one click away.'

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
  { label: 'View 0', to: '/view0' },
  { label: 'View 1', to: '/view1' },
  { label: 'View 2', to: '/view2' }
]

// POC banner is dismissable per session/tab via sessionStorage
// (new session or new tab shows it again).
const SESSION_KEY = 'poc-banner-dismissed'
const pocBannerVisible = ref(true)

onMounted(() => {
  if (sessionStorage.getItem(SESSION_KEY) === '1') {
    pocBannerVisible.value = false
  }
})

function dismissPocBanner() {
  pocBannerVisible.value = false
  sessionStorage.setItem(SESSION_KEY, '1')
}
</script>

<template>
  <UApp>
    <ClientOnly>
      <div
        v-if="pocBannerVisible"
        class="border-b-2 border-amber-300 bg-amber-50 px-6 py-5 text-amber-900 dark:border-amber-600/40 dark:bg-amber-950/40 dark:text-amber-100"
      >
        <div class="mx-auto flex max-w-5xl items-start gap-3 sm:items-center sm:gap-4">
          <div class="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">
            <UIcon
              name="i-lucide-construction"
              class="size-5"
            />
          </div>
          <div class="flex-1 text-sm leading-relaxed sm:text-base">
            <strong class="font-bold">Proof-of-Concept demo.</strong>
            Examples are <em>illustrative</em>. Many articles in the live CMS aren't yet tagged with a type, so the demo fills placeholders client-side so every filter has examples to show.
            <strong>Full accuracy requires Hub 2.0 editorial curation.</strong>
            <NuxtLink
              to="/taxonomy"
              class="ml-1 inline-block font-semibold underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-50"
            >
              How the data is organized →
            </NuxtLink>
          </div>
          <button
            type="button"
            aria-label="Dismiss this banner for the session"
            class="flex size-8 shrink-0 items-center justify-center rounded-full text-amber-900 transition-colors hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 dark:text-amber-100 dark:hover:bg-amber-500/20"
            @click="dismissPocBanner"
          >
            <UIcon
              name="i-lucide-x"
              class="size-5"
            />
          </button>
        </div>
      </div>
    </ClientOnly>

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
