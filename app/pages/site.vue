<script setup lang="ts">
const SITE_URL = 'https://v2-hub-demo.netlify.app'
const PAGE_URL = `${SITE_URL}/site`

const title = 'About this Demo Site — How it is built'
const description = 'How this proof-of-concept is wired together for developers: Nuxt 4 + Vue 3 + Tailwind v4 + Nuxt UI v3, statically generated and deployed on Netlify, with live data from a Strapi 5 GraphQL backend. Includes the actual TypeScript implementations of search-highlight and author-name normalization.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: PAGE_URL,
  twitterTitle: title,
  twitterDescription: description
})

useHead({
  link: [
    { rel: 'canonical', href: PAGE_URL }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#techarticle`,
        'name': title,
        'headline': 'How this demo site is built',
        'description': description,
        'url': PAGE_URL,
        'inLanguage': 'en-US',
        'isPartOf': { '@id': `${SITE_URL}/#website` },
        'about': [
          { '@type': 'Thing', 'name': 'Nuxt' },
          { '@type': 'Thing', 'name': 'Vue 3' },
          { '@type': 'Thing', 'name': 'Tailwind CSS' },
          { '@type': 'Thing', 'name': 'TypeScript' },
          { '@type': 'Thing', 'name': 'Strapi 5' },
          { '@type': 'Thing', 'name': 'Netlify' }
        ]
      })
    }
  ]
})

const appVersion = useRuntimeConfig().public.appVersion

const stack = [
  { name: 'Nuxt', version: '4.4.x', role: 'Vue meta-framework — pages, layouts, SSG, data fetching', tone: 'emerald' },
  { name: 'Vue', version: '3.5+', role: '<script setup lang="ts">, Composition API, reactivity', tone: 'emerald' },
  { name: 'Nuxt UI', version: '4.6.x', role: 'Headless components, theming, color modes', tone: 'emerald' },
  { name: 'Tailwind CSS', version: '4.2.x', role: 'Utility-first styling, dark mode, modern engine', tone: 'cyan' },
  { name: 'TypeScript', version: '6.0.x', role: 'Type-safe templates, composables, utils', tone: 'sky' },
  { name: 'pnpm', version: '10.33.x', role: 'Lockfile-driven install, used in CI build', tone: 'amber' },
  { name: 'Iconify', version: 'lucide + simple-icons', role: 'Per-icon SSR injection, no global webfont', tone: 'violet' },
  { name: 'Mermaid', version: '11.14.x', role: 'Diagrams on /schema (relational triangle, etc.)', tone: 'rose' }
]
</script>

<template>
  <div>
    <!-- 1. HERO -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-700/40 bg-zinc-900/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 dark:border-zinc-300/30 dark:bg-zinc-100/10 dark:text-zinc-300">
          <UIcon
            name="i-lucide-code-2"
            class="size-3.5"
          />
          For developers · v{{ appVersion }}
        </div>
        <div class="mb-3 flex items-center gap-3">
          <div class="flex size-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg dark:bg-white dark:text-zinc-950">
            <UIcon
              name="i-lucide-terminal"
              class="size-6"
            />
          </div>
          <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
            Under the hood, for the dev reviewing the work.
          </span>
        </div>
        <h1 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
          <span class="text-primary">Built with Nuxt.</span><br>Static. Live data.
        </h1>
        <p class="mt-5 max-w-2xl text-xl font-bold leading-snug text-zinc-700 sm:text-2xl dark:text-zinc-300">
          A statically-generated Nuxt 4 SPA. Real GraphQL data. Zero server runtime.
        </p>
        <p class="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Every page on this demo is prerendered to static HTML at build time, then hydrates into a fully reactive Vue app. The <strong class="text-zinc-900 dark:text-white">four filter views are live</strong> — they pull <span class="text-primary">PUBLISHED</span> articles from a Strapi 5 GraphQL endpoint at build, render with the data baked in, then run all filtering, sorting, search, and highlighting on the client. Nothing on this page is a screenshot or a mock.
        </p>
        <div class="mt-7 flex flex-wrap items-center gap-2">
          <a
            href="https://github.com/ICJIA/v2-hub-demo"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-800 shadow-sm transition-colors hover:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-400"
          >
            <UIcon
              name="i-simple-icons-github"
              class="size-4"
            />
            github.com/ICJIA/v2-hub-demo
          </a>
          <a
            href="https://github.com/ICJIA/v2-hub-demo/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-800 shadow-sm transition-colors hover:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-400"
          >
            <UIcon
              name="i-lucide-list"
              class="size-4"
            />
            CHANGELOG.md
          </a>
        </div>
      </div>
    </section>

    <!-- 2. TECH STACK -->
    <section class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <UIcon
              name="i-lucide-layers"
              class="size-3.5"
            />
            01 · The stack
          </div>
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-package"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              Modern Vue, current minor versions.
            </span>
          </div>
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-emerald-600 dark:text-emerald-400">The Stack.</span><br>All current.
          </h2>
          <p class="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Nothing exotic, nothing legacy. Every dependency is on a current minor; the toolchain is the one Nuxt's own docs ship with today.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="t in stack"
            :key="t.name"
            class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div
              class="mb-2 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]"
              :class="{
                'text-emerald-600 dark:text-emerald-400': t.tone === 'emerald',
                'text-cyan-600 dark:text-cyan-400': t.tone === 'cyan',
                'text-sky-600 dark:text-sky-400': t.tone === 'sky',
                'text-amber-600 dark:text-amber-400': t.tone === 'amber',
                'text-violet-600 dark:text-violet-400': t.tone === 'violet',
                'text-rose-600 dark:text-rose-400': t.tone === 'rose'
              }"
            >
              <UIcon
                name="i-lucide-box"
                class="size-3.5"
              />
              {{ t.version }}
            </div>
            <div class="mb-1 text-lg font-bold text-zinc-900 dark:text-white">
              {{ t.name }}
            </div>
            <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {{ t.role }}
            </p>
          </div>
        </div>

        <p class="mt-6 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          Source of truth: <code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">package.json</code> + <code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">pnpm-lock.yaml</code> in the repo. Versions above are pinned to current minor at the time of writing — see the lockfile for exact patch.
        </p>
      </div>
    </section>

    <!-- 3. DATA / BACKEND -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
            <UIcon
              name="i-lucide-database"
              class="size-3.5"
            />
            02 · The data
          </div>
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-server"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              GraphQL → Strapi 5, fetched at build.
            </span>
          </div>
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-cyan-600 dark:text-cyan-400">Strapi 5.</span><br>GraphQL only.
          </h2>
          <p class="mt-5 max-w-2xl text-xl font-bold leading-snug text-zinc-700 sm:text-2xl dark:text-zinc-300">
            One typed <span class="text-cyan-600 dark:text-cyan-400">composable.</span> One query. Every page.
          </p>
          <p class="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            All four filter views (Current, View 0, View 1, View 2) share <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">useArticles()</code>. The fetch happens during prerender on Netlify; the resulting payload is inlined into each route's static HTML.
          </p>
        </div>

        <div class="mb-6 rounded-2xl border border-zinc-300 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
            <UIcon
              name="i-lucide-link"
              class="size-3.5"
            />
            Endpoint
          </div>
          <code class="block break-all text-sm text-cyan-700 dark:text-cyan-300">https://v2.hub.icjia-api.cloud/graphql</code>
        </div>

        <div class="rounded-2xl border border-zinc-300 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
            <UIcon
              name="i-lucide-code-2"
              class="size-3.5"
            />
            The query — <code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">app/composables/useArticles.ts</code>
          </div>
          <pre class="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"><code>query AllPublishedArticles {
  articles(
    status: PUBLISHED,
    sort: ["publishedAt:desc"],
    pagination: { limit: 1000 }
  ) {
    documentId
    title
    slug
    abstract
    type
    date
    publishedAt
    tags
    categories
    authors { title description }
    splash { url alternativeText }
  }
}</code></pre>
          <p class="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            <strong class="text-zinc-900 dark:text-white">PUBLISHED</strong> only. Sorted newest first. Cap of 1000 — comfortably above the current article count, no pagination overhead at the demo's scale. The <code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">type</code> field is a Strapi enum (one of fourteen values — see <NuxtLink
              to="/schema"
              class="text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
            >/schema</NuxtLink>).
          </p>
        </div>
      </div>
    </section>

    <!-- 4. DEPLOYMENT -->
    <section class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
            <UIcon
              name="i-lucide-cloud-upload"
              class="size-3.5"
            />
            03 · Deployment
          </div>
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-cloud"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              Static. CDN-edge. No server runtime.
            </span>
          </div>
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-rose-600 dark:text-rose-400">Netlify.</span><br>Static-only.
          </h2>
          <p class="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">nuxt generate</code> writes pre-rendered HTML and hydration payloads to <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">dist/</code>; Netlify publishes <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">dist/</code> straight to its CDN. There is no Nitro server, no Node runtime, no edge function — every response is a static file behind a global CDN.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-rose-700 dark:text-rose-300">
              <UIcon
                name="i-lucide-file-cog"
                class="size-3.5"
              />
              netlify.toml
            </div>
            <pre class="overflow-x-auto rounded-xl border border-zinc-200 bg-white p-4 text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"><code>[build]
  command = "pnpm generate"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
  NODE_OPTIONS = "--max-old-space-size=4096"</code></pre>
          </div>

          <div class="rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
              <UIcon
                name="i-lucide-list-checks"
                class="size-3.5"
              />
              What that means
            </div>
            <ul class="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-rose-600 dark:text-rose-400"
                />
                <span>Build runs <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">pnpm generate</code> on every push to <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">main</code>.</span>
              </li>
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-rose-600 dark:text-rose-400"
                />
                <span>Pull requests get isolated preview URLs automatically.</span>
              </li>
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-rose-600 dark:text-rose-400"
                />
                <span>Node 22 LTS, with raised heap to handle the prerender pass cleanly.</span>
              </li>
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-rose-600 dark:text-rose-400"
                />
                <span>No env-secrets needed — the GraphQL endpoint is public and read-only.</span>
              </li>
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-rose-600 dark:text-rose-400"
                />
                <span>Roll back is one click from the Netlify Deploys list.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. LIVE VIEWS -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
            <UIcon
              name="i-lucide-zap"
              class="size-3.5"
            />
            04 · Live, not slides
          </div>
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-layout-grid"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              All four views render real data, all the time.
            </span>
          </div>
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-sky-600 dark:text-sky-400">Live views.</span><br>Real data.
          </h2>
          <p class="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <NuxtLink
              to="/current"
              class="font-semibold text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
            >/current</NuxtLink>,
            <NuxtLink
              to="/view0"
              class="font-semibold text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
            >/view0</NuxtLink>,
            <NuxtLink
              to="/view1"
              class="font-semibold text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
            >/view1</NuxtLink>, and
            <NuxtLink
              to="/view2"
              class="font-semibold text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
            >/view2</NuxtLink>
            all hit the same composable; the difference between them is purely UI choreography. Filtering, sorting, search, and the highlight pass run client-side on a reactive <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">computed</code> chain.
          </p>
        </div>

        <div class="rounded-2xl border border-zinc-300 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
            <UIcon
              name="i-lucide-code-2"
              class="size-3.5"
            />
            The reactive filter chain — same shape across all four views
          </div>
          <pre class="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"><code>const filtered = computed&lt;Article[]&gt;(() =&gt; {
  let r = articles.value
  if (selectedType.value)   r = r.filter(a =&gt; a.type === selectedType.value)
  if (selectedTopic.value)  r = r.filter(a =&gt; asStrings(a.categories).includes(selectedTopic.value))
  if (selectedAuthor.value) r = r.filter(a =&gt; articleAuthorNames(a).some(n =&gt; authorKey(n) === selectedAuthor.value))
  if (selectedYear.value)   r = r.filter(a =&gt; articleYear(a) === selectedYear.value)
  if (query.value) {
    r = r.filter(a =&gt; matchesQuery(a, query.value))
  }
  return r
})</code></pre>
          <p class="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            One <code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">computed</code> recomputes whenever any input ref changes. Vue's reactivity handles the rest — no manual subscriptions, no <code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">watch</code> chains. Pagination slices the result downstream.
          </p>
        </div>
      </div>
    </section>

    <!-- 6. SEARCH HIGHLIGHTING IMPLEMENTATION -->
    <section class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <UIcon
              name="i-lucide-highlighter"
              class="size-3.5"
            />
            05 · Search highlighting
          </div>
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-function-square"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              No regex. No DOM munging. Pure segment array.
            </span>
          </div>
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-emerald-600 dark:text-emerald-400">highlightSegments()</span><br>under the hood.
          </h2>
          <p class="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Lives in <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">app/utils/article-format.ts</code>. Returns an array of <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">{ text, match }</code> segments — the template wraps the matching ones in <code class="rounded bg-emerald-500/10 px-1 text-emerald-700 dark:text-emerald-300">&lt;mark&gt;</code>. Case-insensitive, original casing preserved, every occurrence wrapped, no regex compilation per result.
          </p>
        </div>

        <div class="mb-4 rounded-2xl border-2 border-emerald-500/50 bg-white p-5 shadow-sm dark:bg-zinc-950">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
            <UIcon
              name="i-lucide-code-2"
              class="size-3.5"
            />
            The function — verbatim
          </div>
          <pre class="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"><code>export interface HighlightSegment {
  text: string
  match: boolean
}

export function highlightSegments(
  text: string | null | undefined,
  query: string
): HighlightSegment[] {
  if (!text) return []
  if (!query) return [{ text, match: false }]

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const out: HighlightSegment[] = []
  let i = 0
  let next = lowerText.indexOf(lowerQuery)

  while (next !== -1) {
    if (next &gt; i) out.push({ text: text.slice(i, next), match: false })
    out.push({ text: text.slice(next, next + query.length), match: true })
    i = next + query.length
    next = lowerText.indexOf(lowerQuery, i)
  }
  if (i &lt; text.length) out.push({ text: text.slice(i), match: false })

  return out
}</code></pre>
        </div>

        <div class="rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
            <UIcon
              name="i-lucide-list-checks"
              class="size-3.5"
            />
            Why this shape
          </div>
          <ul class="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li class="flex gap-2">
              <span class="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-black text-emerald-700 dark:text-emerald-300">1</span>
              <span><strong>Two lower-cased copies</strong> for matching, but slicing always uses the original — the <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">&lt;mark&gt;</code> displays whatever casing the source had.</span>
            </li>
            <li class="flex gap-2">
              <span class="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-black text-emerald-700 dark:text-emerald-300">2</span>
              <span><strong>indexOf in a loop</strong> beats <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">String.prototype.matchAll</code> with a <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">RegExp</code> here — query is user-typed, no regex escaping headaches, no per-result regex compile.</span>
            </li>
            <li class="flex gap-2">
              <span class="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-black text-emerald-700 dark:text-emerald-300">3</span>
              <span><strong>Returns an array, not HTML</strong> — Vue templates render <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">v-for</code> the segments and pick <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">&lt;mark&gt;</code> vs <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">&lt;span&gt;</code> per segment. No <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">v-html</code>, no XSS surface.</span>
            </li>
            <li class="flex gap-2">
              <span class="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-black text-emerald-700 dark:text-emerald-300">4</span>
              <span><strong>Stateless and pure</strong> — same input always yields same output, easy to memoize on the call site if a hot list ever becomes a problem.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 7. AUTHOR NORMALIZATION IMPLEMENTATION -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            <UIcon
              name="i-lucide-merge"
              class="size-3.5"
            />
            06 · Author name normalization
          </div>
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-function-square"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              Five chained string ops. One canonical key.
            </span>
          </div>
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-violet-700 dark:text-violet-400">authorKey()</span><br>under the hood.
          </h2>
          <p class="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Same file as <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">highlightSegments()</code>. Takes a raw author name and returns a stable lookup key. Used for deduping the Authors dropdown and for filtering by selected author.
          </p>
        </div>

        <div class="mb-4 rounded-2xl border-2 border-violet-500/50 bg-white p-5 shadow-sm dark:bg-zinc-950">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
            <UIcon
              name="i-lucide-code-2"
              class="size-3.5"
            />
            The function — verbatim
          </div>
          <pre class="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"><code>export function authorKey(name: string): string {
  return name
    .replace(/,.*$/, '')          // 1. drop credentials after comma
    .replace(/\s*&amp;\s*/g, ' and ')  // 2. unify '&' with 'and'
    .replace(/\s+/g, ' ')         // 3. collapse runs of whitespace
    .trim()                       // 4. strip leading/trailing space
    .toLowerCase()                // 5. case-fold
}</code></pre>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
          <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
              1
            </div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white">
              Drop credentials
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <em>"Jane Doe, PhD"</em> → <em>"Jane Doe"</em>
            </div>
          </div>
          <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
              2
            </div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white">
              Unify <code class="rounded bg-zinc-200/60 px-1 text-xs dark:bg-zinc-800">&amp;</code> ↔ <em>and</em>
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <em>"A &amp; B"</em> → <em>"A and B"</em>
            </div>
          </div>
          <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
              3
            </div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white">
              Collapse whitespace
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Runs of spaces / tabs / newlines → single space.
            </div>
          </div>
          <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
              4
            </div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white">
              Trim
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Leading and trailing whitespace gone.
            </div>
          </div>
          <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
              5
            </div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white">
              Lower-case
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <em>JANE DOE</em>, <em>jane doe</em>, <em>Jane Doe</em> all collapse to one.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. PERFORMANCE / TUNING -->
    <section class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
            <UIcon
              name="i-lucide-gauge"
              class="size-3.5"
            />
            07 · Performance + UX details
          </div>
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-rocket"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              Tuned for static, with niceties.
            </span>
          </div>
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-amber-600 dark:text-amber-400">Tuned</span><br>for static.
          </h2>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-zap"
                class="size-3.5"
              />
              Prerender
            </div>
            <div class="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
              <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">routeRules['/'] = { prerender: true }</code>
            </div>
            <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Home is force-prerendered. With <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">nuxt generate</code>, every other route follows by default.
            </p>
          </div>

          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-link"
                class="size-3.5"
              />
              Preconnect
            </div>
            <div class="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
              Strapi origin warmed early
            </div>
            <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">&lt;link rel="preconnect"&gt;</code> + <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">dns-prefetch</code> for the splash-image origin shave perceptible time off the View 0/1/2 grid render.
            </p>
          </div>

          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-arrow-left-right"
                class="size-3.5"
              />
              Page transition
            </div>
            <div class="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
              150 ms <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">opacity</code> fade, mode: out-in
            </div>
            <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Wired via <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">app.pageTransition</code>. Honors <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">prefers-reduced-motion: reduce</code>.
            </p>
          </div>

          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-mouse-pointer-2"
                class="size-3.5"
              />
              Smooth scroll
            </div>
            <div class="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
              <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">html.scroll-smooth</code>
            </div>
            <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              In-page anchors glide instead of teleport. Set globally via <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">useHead({ htmlAttrs })</code>.
            </p>
          </div>

          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-moon"
                class="size-3.5"
              />
              Color mode
            </div>
            <div class="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
              Dark by default
            </div>
            <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">colorMode.preference = 'dark'</code>; <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">UColorModeButton</code> in the header lets visitors flip.
            </p>
          </div>

          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-bot"
                class="size-3.5"
              />
              SEO + AI crawlers
            </div>
            <div class="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
              Per-page JSON-LD
            </div>
            <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Site-wide WebSite + Organization graph in <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">app.vue</code>; per-page WebPage / TechArticle blocks emitted from each route.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. MORE TO EXPLORE -->
    <section class="bg-zinc-50 px-6 py-16 sm:px-12 lg:px-16 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <h2 class="mb-7 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          More to explore.
        </h2>
        <div class="grid gap-4 md:grid-cols-3">
          <NuxtLink
            to="/"
            class="group block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary"
          >
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <UIcon
                name="i-lucide-home"
                class="size-3.5"
              />
              Home
            </div>
            <div class="mb-1 text-base font-bold text-zinc-900 dark:text-white">
              The three concerns
            </div>
            <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Recent meetings → three solutions, hands-on.
            </p>
          </NuxtLink>

          <NuxtLink
            to="/schema"
            class="group block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary"
          >
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <UIcon
                name="i-lucide-database"
                class="size-3.5"
              />
              Hub 2.0 Deep Dive
            </div>
            <div class="mb-1 text-base font-bold text-zinc-900 dark:text-white">
              The data structure
            </div>
            <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Relational triangle, the 14-value enum, bidirectional connections.
            </p>
          </NuxtLink>

          <NuxtLink
            to="/about"
            class="group block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary"
          >
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <UIcon
                name="i-lucide-sparkles"
                class="size-3.5"
              />
              Additional Upgrades
            </div>
            <div class="mb-1 text-base font-bold text-zinc-900 dark:text-white">
              Seven small fixes
            </div>
            <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The four upgrades that didn't make the homepage.
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
