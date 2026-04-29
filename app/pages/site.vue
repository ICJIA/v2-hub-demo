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
  { name: 'Nuxt', version: '4.4.x', role: 'Vue meta-framework — pages, layouts, SSG (Static Site Generation), data fetching', tone: 'emerald' },
  { name: 'Vue', version: '3.5+', role: '<script setup lang="ts">, Composition API, reactivity', tone: 'emerald' },
  { name: 'Nuxt UI', version: '4.6.x', role: 'Headless components, theming, color modes', tone: 'emerald' },
  { name: 'Tailwind CSS', version: '4.2.x', role: 'Utility-first styling, dark mode, modern engine', tone: 'cyan' },
  { name: 'TypeScript', version: '6.0.x', role: 'Type-safe templates, composables, utils', tone: 'sky' },
  { name: 'pnpm', version: '10.33.x', role: 'Lockfile-driven install, used in CI (Continuous Integration) build', tone: 'amber' },
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
          Hub 2.0. <span class="text-primary">Built with Nuxt.</span><br>Static. Live data.
        </h1>
        <p class="mt-5 max-w-2xl text-xl font-bold leading-snug text-zinc-700 sm:text-2xl dark:text-zinc-300">
          A statically-generated Nuxt 4 SPA (Single-Page Application). Real GraphQL data. Zero server runtime.
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
                'text-violet-600 dark:text-violet-400': t.tone === 'rose'
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

        <!-- GraphQL playground link -->
        <div class="mt-6 rounded-2xl border-2 border-cyan-500/50 bg-cyan-50 p-5 dark:border-cyan-500/40 dark:bg-cyan-500/10">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">
            <UIcon
              name="i-lucide-square-terminal"
              class="size-3.5"
            />
            Run your own queries against the live Hub 2.0 backend
          </div>
          <p class="mb-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
            The Strapi 5 GraphQL endpoint is <strong class="text-cyan-700 dark:text-cyan-300">publicly readable</strong>. ICJIA hosts a custom-built playground in front of it so any developer can introspect the schema and run queries against the same backend this demo uses — no API key, no signup, no rate-limit gate.
          </p>
          <a
            href="https://playground.icjia.app/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-full border-2 border-cyan-500 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700 shadow-sm transition-all hover:bg-cyan-500 hover:text-white dark:bg-zinc-950 dark:text-cyan-300 dark:hover:bg-cyan-500 dark:hover:text-white"
          >
            <UIcon
              name="i-lucide-external-link"
              class="size-4"
            />
            playground.icjia.app
          </a>
          <p class="mt-4 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            Designed in the same family as Apollo Studio / GraphiQL — schema docs, syntax-highlighted editor, query history, response panel, variables tab. Try the <code class="rounded bg-cyan-500/15 px-1 dark:bg-cyan-500/25">AllPublishedArticles</code> query above to see exactly what this site fetches at build, or write your own to filter by type, date range, or any other field on the Article model.
          </p>
        </div>
      </div>
    </section>

    <!-- 4. DEPLOYMENT -->
    <section class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            <UIcon
              name="i-lucide-cloud-upload"
              class="size-3.5"
            />
            03 · Deployment
          </div>
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg">
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
            <span class="text-violet-600 dark:text-violet-400">Netlify.</span><br>Static-only.
          </h2>
          <p class="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">nuxt generate</code> writes pre-rendered HTML and hydration payloads to <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">dist/</code>; Netlify publishes <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">dist/</code> straight to its CDN (Content Delivery Network). There is no Nitro server, no Node runtime, no edge function — every response is a static file behind a globally-replicated CDN.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
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
                  class="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-400"
                />
                <span>Build runs <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">pnpm generate</code> on every push to <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">main</code>.</span>
              </li>
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-400"
                />
                <span>Pull requests get isolated preview URLs automatically.</span>
              </li>
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-400"
                />
                <span>Node 22 LTS (Long-Term Support), with raised heap to handle the prerender pass cleanly.</span>
              </li>
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-400"
                />
                <span>No env-secrets needed — the GraphQL endpoint is public and read-only.</span>
              </li>
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-400"
                />
                <span>Roll back is one click from the Netlify Deploys list.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Why static is right for Hub 2.0 -->
        <div class="mt-10 rounded-2xl border border-violet-500/30 bg-white p-5 dark:border-violet-500/40 dark:bg-zinc-950">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
            <UIcon
              name="i-lucide-target"
              class="size-3.5"
            />
            Why static is the correct fit for Hub 2.0
          </div>
          <p class="mb-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Hub 2.0 is, at its core, a <strong class="text-zinc-900 dark:text-white">read-mostly publishing catalog</strong>. Articles change daily-to-weekly, not per-second. There is no logged-in view, no shopping cart, no realtime feed, no per-user personalization. The page that visitor A sees is identical to the page visitor B sees. That single fact unlocks static deployment as the obvious fit — and rules out every more-complex alternative.
          </p>

          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-shield-check"
                  class="size-3.5"
                />
                No attack surface
              </div>
              <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                With no Node runtime in the request path, there's nothing to patch for runtime exploits. The CDN serves immutable files; Strapi (which is patchable) lives on a separate host that visitors never talk to directly.
              </p>
            </div>

            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-zap"
                  class="size-3.5"
                />
                Speed everywhere
              </div>
              <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                Netlify replicates <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">dist/</code> across a global CDN. First byte is local-PoP (Point-of-Presence) fast for visitors in Europe, Asia, the Americas — without ICJIA running a server in each region.
              </p>
            </div>

            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-trending-down"
                  class="size-3.5"
                />
                Cost
              </div>
              <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                Static delivery is the cheapest mode there is — pennies per million requests, often free under modest tiers. No per-invocation billing for serverless, no idle VMs, no autoscaling group, no DB read replicas.
              </p>
            </div>

            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-rotate-ccw"
                  class="size-3.5"
                />
                Atomic deploys + clean rollback
              </div>
              <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                Each build produces an immutable tagged snapshot. Promoting a bad build? One click in the Netlify dashboard and visitors are back on the previous snapshot. No DB migrations to reverse.
              </p>
            </div>

            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-git-branch"
                  class="size-3.5"
                />
                Preview deploys
              </div>
              <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                Every PR (Pull Request) gets its own live URL automatically. Stakeholders review on a real, isolated environment before merge — not a screen-share, not a localhost tunnel, not a screenshot in a slide.
              </p>
            </div>

            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-search"
                  class="size-3.5"
                />
                SEO (Search Engine Optimization) + AI crawlers
              </div>
              <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                Pre-rendered HTML means Googlebot, Bingbot, and AI crawlers (GPT, Perplexity, Anthropic, Gemini) get fully formed pages on first fetch — no JS execution required for indexing.
              </p>
            </div>

            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-server-off"
                  class="size-3.5"
                />
                No 3 a.m. pager
              </div>
              <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                There is no application server to crash, no memory leak, no PM2 restart loop, no PHP-FPM config to tune. If the static host is up, the site is up. ICJIA's runtime ops surface shrinks to: Strapi, and the build pipeline.
              </p>
            </div>

            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-database"
                  class="size-3.5"
                />
                Source-of-truth separation
              </div>
              <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                Editors work in Strapi. The frontend pulls a snapshot at build. The two are decoupled — Strapi can be upgraded, swapped, or moved to a new host, and as long as the GraphQL contract holds, the frontend is unchanged.
              </p>
            </div>

            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-archive"
                  class="size-3.5"
                />
                Long-term archivability
              </div>
              <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                The output is plain HTML/CSS/JS. Five years from now, ten, twenty — if Netlify and Strapi are gone, the <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">dist/</code> folder still opens in any browser, archives cleanly to the Wayback Machine, and survives long after this stack is retired.
              </p>
            </div>
          </div>
        </div>

        <!-- Comparison: deployment models -->
        <div class="mt-8">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
            <UIcon
              name="i-lucide-git-compare-arrows"
              class="size-3.5"
            />
            Other deployment models we considered
          </div>
          <p class="mb-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            For context, here are the main ways a Vue/Nuxt app could be deployed in 2026, what each gives you, and why each is a worse fit for a read-mostly catalog like Hub 2.0.
          </p>

          <div class="space-y-3">
            <!-- Model 1 — SSR -->
            <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div class="mb-3 flex items-start gap-3">
                <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <UIcon
                    name="i-lucide-server"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-base font-bold text-zinc-900 dark:text-white">
                    Server-Side Rendering (SSR) on a Node host
                  </div>
                  <div class="text-xs text-zinc-500 dark:text-zinc-400">
                    <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">nuxt build</code> + Nitro server on Render / Railway / Fly / AWS / a managed VPS
                  </div>
                </div>
              </div>
              <div class="grid gap-3 text-sm sm:grid-cols-2 sm:gap-4 sm:pl-12">
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    + What it gives you
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Per-request HTML rendering. Always-fresh data without rebuild. Personalization (logged-in views, A/B variants, geo-routing, request-cookie-aware UI) is straightforward.
                  </p>
                </div>
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-400">
                    − Why it's the wrong fit here
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    A live Node process to monitor, patch, autoscale, and pay for 24/7 — for a site that has no per-user state. Cold starts on serverless platforms add latency. Hub 2.0 doesn't need anything SSR gives you.
                  </p>
                </div>
              </div>
            </div>

            <!-- Model 2 — Edge SSR -->
            <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div class="mb-3 flex items-start gap-3">
                <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <UIcon
                    name="i-lucide-globe"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-base font-bold text-zinc-900 dark:text-white">
                    Edge SSR (Workers / Edge Functions)
                  </div>
                  <div class="text-xs text-zinc-500 dark:text-zinc-400">
                    Cloudflare Workers, Netlify Edge Functions, Vercel Edge — V8 isolates running close to visitors
                  </div>
                </div>
              </div>
              <div class="grid gap-3 text-sm sm:grid-cols-2 sm:gap-4 sm:pl-12">
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    + What it gives you
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Per-request rendering, but at the CDN edge — close to the visitor. Sub-50 ms response globally with personalization. No central server bottleneck.
                  </p>
                </div>
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-400">
                    − Why it's the wrong fit here
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    More complex than static. Limited Node API surface (no <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">fs</code>, no native modules, careful with bundle size). Same drawback as full SSR — Hub 2.0 doesn't need per-request anything.
                  </p>
                </div>
              </div>
            </div>

            <!-- Model 3 — Pure SPA -->
            <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div class="mb-3 flex items-start gap-3">
                <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <UIcon
                    name="i-lucide-monitor"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-base font-bold text-zinc-900 dark:text-white">
                    Pure SPA (no SSR, no SSG)
                  </div>
                  <div class="text-xs text-zinc-500 dark:text-zinc-400">
                    <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">ssr: false</code> + Vite SPA build, served as one shell HTML
                  </div>
                </div>
              </div>
              <div class="grid gap-3 text-sm sm:grid-cols-2 sm:gap-4 sm:pl-12">
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    + What it gives you
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Simplest static deploy possible — one HTML shell, plus JS bundles. The app loads once and routes client-side. No build-time data fetching to wire up.
                  </p>
                </div>
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-400">
                    − Why it's the wrong fit here
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Blank screen until JS loads + fetches data → poor first paint. Crawlers without JS execution see nothing. Search rankings and social-share previews suffer. SSG (what we use) is strictly better for read-mostly content.
                  </p>
                </div>
              </div>
            </div>

            <!-- Model 4 — ISR -->
            <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div class="mb-3 flex items-start gap-3">
                <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <UIcon
                    name="i-lucide-refresh-cw"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-base font-bold text-zinc-900 dark:text-white">
                    Incremental Static Regeneration (ISR / on-demand SSG)
                  </div>
                  <div class="text-xs text-zinc-500 dark:text-zinc-400">
                    Next.js ISR-style; Nuxt's <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">routeRules: { swr: 60 }</code> or <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">isr: true</code>
                  </div>
                </div>
              </div>
              <div class="grid gap-3 text-sm sm:grid-cols-2 sm:gap-4 sm:pl-12">
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    + What it gives you
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Static pages that revalidate in the background — fresh content without a full rebuild on every CMS save. Best of both worlds when content cadence is high.
                  </p>
                </div>
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-400">
                    − Why it's the wrong fit here
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Requires a runtime to handle the regeneration — back to having a server. Hub 2.0's content cadence is slow enough that a webhook-triggered full rebuild on Strapi save (typically &lt;60s) is simpler and gives equally fresh content.
                  </p>
                </div>
              </div>
            </div>

            <!-- Model 5 — Containerized -->
            <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div class="mb-3 flex items-start gap-3">
                <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <UIcon
                    name="i-lucide-container"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-base font-bold text-zinc-900 dark:text-white">
                    Containerized (Docker + Kubernetes / ECS — Elastic Container Service)
                  </div>
                  <div class="text-xs text-zinc-500 dark:text-zinc-400">
                    A Node image running Nuxt SSR or a custom server, behind a load balancer, in a managed cluster
                  </div>
                </div>
              </div>
              <div class="grid gap-3 text-sm sm:grid-cols-2 sm:gap-4 sm:pl-12">
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    + What it gives you
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Portable runtime, fully under your control. Mature for stateful, complex applications with internal services and SLOs. Great when you genuinely need long-running processes.
                  </p>
                </div>
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-400">
                    − Why it's the wrong fit here
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Massive ops overhead for what is fundamentally a brochure site. Cluster health, image scanning, secret management, ingress, certs, autoscaling rules — all to serve HTML that doesn't change between visitors. Wrong tool by an order of magnitude.
                  </p>
                </div>
              </div>
            </div>

            <!-- Model 6 — Traditional LAMP / VPS -->
            <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div class="mb-3 flex items-start gap-3">
                <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <UIcon
                    name="i-lucide-hard-drive"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-base font-bold text-zinc-900 dark:text-white">
                    Traditional LAMP / VPS — Linux + Apache + MySQL + PHP on a Virtual Private Server
                  </div>
                  <div class="text-xs text-zinc-500 dark:text-zinc-400">
                    NGINX/Apache + PHP-FPM (FastCGI Process Manager) + MySQL on a long-running VPS or shared host. WordPress, Drupal, custom PHP.
                  </div>
                </div>
              </div>
              <div class="grid gap-3 text-sm sm:grid-cols-2 sm:gap-4 sm:pl-12">
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    + What it gives you
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    A familiar setup. Generations of operators know it. Mature plugin ecosystem, especially for WordPress. Built-in admin / page editor without a separate CMS.
                  </p>
                </div>
                <div>
                  <div class="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-400">
                    − Why it's the wrong fit here
                  </div>
                  <p class="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Largest attack surface of any option here — public DB connection, server-side script execution per request, plugin chain to keep patched. Per-request DB queries can't compete with CDN-served HTML for speed. ICJIA already runs Strapi for editing; layering another runtime in front doesn't help.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-5 dark:bg-emerald-500/10">
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
              <UIcon
                name="i-lucide-check-circle-2"
                class="size-3.5"
              />
              Net result
            </div>
            <p class="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
              For a read-mostly catalog with build-time-fresh content, an existing CMS (Content Management System) for editors, and zero per-user state, <strong class="text-emerald-700 dark:text-emerald-300">Netlify static</strong> is the lightest, cheapest, fastest, most secure, and most maintainable option of the six. The other models all add runtime complexity in exchange for capabilities Hub 2.0 will never need.
            </p>
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
              No regex. No DOM (Document Object Model) munging. Pure segment array.
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

        <!-- Live demonstration — six rendered examples -->
        <div class="mb-4 rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div class="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
            <UIcon
              name="i-lucide-eye"
              class="size-3.5"
            />
            Live demonstration — every example below renders the actual function
          </div>

          <!-- Example 1 — Single match in title, casing preserved -->
          <div class="mb-6">
            <div class="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
              <span class="rounded bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Example 1</span>
              <span>Query <code class="rounded bg-zinc-200/60 px-1 normal-case dark:bg-zinc-800">"juvenile"</code> · single match · capital J preserved</span>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
              <div class="text-sm font-semibold leading-relaxed text-zinc-900 dark:text-white">
                Examining the Effectiveness of <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">Juvenile</mark> Diversion in Cook County
              </div>
            </div>
            <pre class="mt-2 overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 text-[11px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"><code>// returns
[
  { text: "Examining the Effectiveness of ", match: false },
  { text: "Juvenile",                       match: true  },  // ← original casing
  { text: " Diversion in Cook County",      match: false }
]</code></pre>
            <p class="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              The matched segment is sliced from the <em>original</em> text starting at the indexOf position — so the rendered <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">&lt;mark&gt;</code> shows "Juvenile" with the capital J the editor wrote, even though the comparison was on the lowercased copy.
            </p>
          </div>

          <!-- Example 2 — Multiple matches in abstract -->
          <div class="mb-6">
            <div class="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
              <span class="rounded bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Example 2</span>
              <span>Query <code class="rounded bg-zinc-200/60 px-1 normal-case dark:bg-zinc-800">"juvenile"</code> · four matches in one abstract</span>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
              <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                This study evaluates outcomes from <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juvenile</mark> diversion programs across Cook County, comparing recidivism rates among <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juvenile</mark> participants who completed diversion versus those processed through the traditional <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juvenile</mark> court system. Earlier <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juvenile</mark> intervention reduces re-arrest rates by 22%.
              </p>
            </div>
            <p class="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              The while-loop walks <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">indexOf</code> forward four times — each match wraps inline. The result array has <strong class="text-zinc-900 dark:text-white">9 segments</strong>: 4 matches + 5 inter-match runs of plain text. Vue's template <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">v-for</code>'s over them in order, picking <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">&lt;mark&gt;</code> when <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">match: true</code>, plain <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">&lt;span&gt;</code> otherwise.
            </p>
          </div>

          <!-- Example 3 — Substring match -->
          <div class="mb-6">
            <div class="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
              <span class="rounded bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Example 3</span>
              <span>Query <code class="rounded bg-zinc-200/60 px-1 normal-case dark:bg-zinc-800">"juven"</code> · substring matching · matches inside other words</span>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
              <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                The <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juven</mark>ile justice system serves <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juven</mark>iles aged 10 to 17, with re<mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juven</mark>ation programs available statewide.
              </p>
            </div>
            <p class="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              No word-boundary check — partial matches are deliberate. Type three letters and start seeing what's coming. The trade-off: "juven" inside <em>rejuvenation</em> highlights too. For a scan-fast catalog, that's the right call: it's a visual cue, not a final-truth filter (which is what the type / topic / author dropdowns are for).
            </p>
          </div>

          <!-- Example 4 — Mixed casing in source -->
          <div class="mb-6">
            <div class="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
              <span class="rounded bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Example 4</span>
              <span>Query <code class="rounded bg-zinc-200/60 px-1 normal-case dark:bg-zinc-800">"juvenile"</code> · case-insensitive · mixed casings in source</span>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
              <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">JUVENILE</mark> JUSTICE QUARTERLY is a peer-reviewed journal. <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">Juvenile</mark> diversion programs in Illinois are funded through ICJIA. State data show <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juvenile</mark> arrests are down 38% over the past decade.
              </p>
            </div>
            <p class="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              All three of <em>JUVENILE</em>, <em>Juvenile</em>, and <em>juvenile</em> match because the comparison is on the lowercased copy — but the rendered <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">&lt;mark&gt;</code> contents are sliced from the original, so each preserves the casing it had in the source.
            </p>
          </div>

          <!-- Example 5 — Empty query (passthrough) -->
          <div class="mb-6">
            <div class="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
              <span class="rounded bg-zinc-300 px-2 py-0.5 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">Example 5 · edge case</span>
              <span>Empty query — passthrough, nothing wrapped</span>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
              <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Examining the Effectiveness of Juvenile Diversion in Cook County
              </p>
            </div>
            <pre class="mt-2 overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 text-[11px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"><code>// query === "" → returns
[ { text: "Examining the Effectiveness of Juvenile Diversion in Cook County", match: false } ]</code></pre>
            <p class="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              The first <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">if (!query)</code> short-circuits — one segment, no markup, render path is identical to a regular paragraph. No "if highlighting is on" branch in the consuming component.
            </p>
          </div>

          <!-- Example 6 — No match -->
          <div>
            <div class="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
              <span class="rounded bg-zinc-300 px-2 py-0.5 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">Example 6 · edge case</span>
              <span>Query <code class="rounded bg-zinc-200/60 px-1 normal-case dark:bg-zinc-800">"recidivism"</code> · query has no occurrence</span>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
              <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Examining the Effectiveness of Juvenile Diversion in Cook County
              </p>
            </div>
            <pre class="mt-2 overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 text-[11px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"><code>// indexOf returns -1, while loop never enters → returns
[ { text: "Examining the Effectiveness of Juvenile Diversion in Cook County", match: false } ]</code></pre>
            <p class="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              The "no match" path falls through to the final <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">if (i &lt; text.length)</code>, which pushes the entire text as one non-matching segment. Vue renders it as a single plain run.
            </p>
          </div>
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
              <span><strong>Returns an array, not HTML</strong> — Vue templates render <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">v-for</code> the segments and pick <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">&lt;mark&gt;</code> vs <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">&lt;span&gt;</code> per segment. No <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-700">v-html</code>, no XSS (Cross-Site Scripting) surface.</span>
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
              Six chained string ops. One canonical key.
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
    .replace(/^(Dr|Prof|Mr|Mrs|Ms|Miss|Rev|Hon|Sir|Dame|Lord|Lady)(\.\s*|\s+)/i, '')  // 1. drop leading honorifics
    .replace(/,.*$/, '')          // 2. drop credentials after comma
    .replace(/\s*&amp;\s*/g, ' and ')  // 3. unify '&' with 'and'
    .replace(/\s+/g, ' ')         // 4. collapse runs of whitespace
    .trim()                       // 5. strip leading/trailing space
    .toLowerCase()                // 6. case-fold
}</code></pre>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
              1
            </div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white">
              Drop honorifics
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <em>"Dr. Riley Calder"</em> → <em>"Riley Calder"</em>. Handles <em>Dr., Prof., Mr., Mrs., Ms., Rev., Hon.</em>, etc.
            </div>
          </div>
          <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
              2
            </div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white">
              Drop credentials
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <em>"Riley Calder, PhD"</em> → <em>"Riley Calder"</em>
            </div>
          </div>
          <div class="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
              3
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
              4
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
              5
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
              6
            </div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white">
              Lower-case
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <em>RILEY CALDER</em>, <em>riley calder</em>, <em>Riley Calder</em> all collapse to one.
            </div>
          </div>
        </div>

        <!-- Before / after — nine raw inputs, one canonical key -->
        <div class="mt-8 rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
            <UIcon
              name="i-lucide-arrow-right-left"
              class="size-3.5"
            />
            Before / after — nine raw inputs, one canonical key
          </div>
          <p class="mb-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Nine ways the same researcher's name might appear in the CMS (Content Management System). All nine resolve to a single key — so the Authors dropdown lists "Riley Calder" once, and the article count for that author is honest.
          </p>

          <div class="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <table class="w-full border-collapse text-sm">
              <thead class="bg-zinc-50 dark:bg-zinc-900">
                <tr class="border-b border-zinc-200 dark:border-zinc-800">
                  <th class="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
                    Raw input from Strapi
                  </th>
                  <th class="px-2 py-2.5 text-center text-xs text-zinc-500" />
                  <th class="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                    authorKey() →
                  </th>
                  <th class="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
                    Step that did it
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td class="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-white">"Dr. Riley Calder"</td>
                  <td class="px-2 py-2 text-center text-zinc-400">→</td>
                  <td class="px-4 py-2 font-mono text-xs text-violet-700 dark:text-violet-300">"riley calder"</td>
                  <td class="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">1 (drop honorific) + 6 (lowercase)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-white">"Riley Calder"</td>
                  <td class="px-2 py-2 text-center text-zinc-400">→</td>
                  <td class="px-4 py-2 font-mono text-xs text-violet-700 dark:text-violet-300">"riley calder"</td>
                  <td class="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">6 only (lowercase)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-white">"riley calder"</td>
                  <td class="px-2 py-2 text-center text-zinc-400">→</td>
                  <td class="px-4 py-2 font-mono text-xs text-violet-700 dark:text-violet-300">"riley calder"</td>
                  <td class="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">no-op (already canonical)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-white">"RILEY CALDER"</td>
                  <td class="px-2 py-2 text-center text-zinc-400">→</td>
                  <td class="px-4 py-2 font-mono text-xs text-violet-700 dark:text-violet-300">"riley calder"</td>
                  <td class="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">6 (case-fold)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-white">"Riley Calder, PhD"</td>
                  <td class="px-2 py-2 text-center text-zinc-400">→</td>
                  <td class="px-4 py-2 font-mono text-xs text-violet-700 dark:text-violet-300">"riley calder"</td>
                  <td class="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">2 (drop after first comma)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-white">"Riley Calder, PhD, MA"</td>
                  <td class="px-2 py-2 text-center text-zinc-400">→</td>
                  <td class="px-4 py-2 font-mono text-xs text-violet-700 dark:text-violet-300">"riley calder"</td>
                  <td class="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">2 (still drops everything from first comma)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-white">"  Riley Calder  "</td>
                  <td class="px-2 py-2 text-center text-zinc-400">→</td>
                  <td class="px-4 py-2 font-mono text-xs text-violet-700 dark:text-violet-300">"riley calder"</td>
                  <td class="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">5 (trim ends)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-white">"Riley  Calder"</td>
                  <td class="px-2 py-2 text-center text-zinc-400">→</td>
                  <td class="px-4 py-2 font-mono text-xs text-violet-700 dark:text-violet-300">"riley calder"</td>
                  <td class="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">4 (collapse double space)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-white">"\nRiley\tCalder "</td>
                  <td class="px-2 py-2 text-center text-zinc-400">→</td>
                  <td class="px-4 py-2 font-mono text-xs text-violet-700 dark:text-violet-300">"riley calder"</td>
                  <td class="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">4 + 5 (whitespace runs include \n and \t)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Article cards still display the original-spelled name (whichever variant the editor entered). Only the dropdown dedup and the Authors filter use the key.
          </p>

          <!-- When it doesn't merge -->
          <div class="mt-6 rounded-xl border border-amber-500/40 bg-amber-50 p-4 dark:bg-amber-500/10">
            <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-shield-alert"
                class="size-3.5"
              />
              When the function does NOT merge — by design
            </div>
            <p class="text-xs leading-relaxed text-amber-900/90 dark:text-amber-100/90">
              The function is deliberately conservative. It does not strip middle initials, expand nicknames, or fuzzy-match similar names. Doing any of those risks merging two genuinely different researchers — a worse failure mode than listing one researcher twice. Anything ambiguous stays separate, and the fix lives in editorial: clean the source name in Strapi and the next build merges it automatically.
            </p>
            <div class="mt-3 overflow-x-auto rounded-lg border border-amber-500/30 bg-white dark:bg-zinc-950">
              <table class="w-full border-collapse text-xs">
                <tbody class="divide-y divide-amber-500/20">
                  <tr>
                    <td class="px-3 py-1.5 font-mono text-zinc-900 dark:text-white">"Riley Calder"</td>
                    <td class="px-2 py-1.5 text-center font-bold text-amber-700 dark:text-amber-400">≠</td>
                    <td class="px-3 py-1.5 font-mono text-zinc-900 dark:text-white">"Robin Calder"</td>
                    <td class="px-3 py-1.5 text-amber-900/80 dark:text-amber-100/80">different given name</td>
                  </tr>
                  <tr>
                    <td class="px-3 py-1.5 font-mono text-zinc-900 dark:text-white">"Riley Calder"</td>
                    <td class="px-2 py-1.5 text-center font-bold text-amber-700 dark:text-amber-400">≠</td>
                    <td class="px-3 py-1.5 font-mono text-zinc-900 dark:text-white">"Riley A. Calder"</td>
                    <td class="px-3 py-1.5 text-amber-900/80 dark:text-amber-100/80">middle initial preserved on purpose</td>
                  </tr>
                  <tr>
                    <td class="px-3 py-1.5 font-mono text-zinc-900 dark:text-white">"Riley Calder"</td>
                    <td class="px-2 py-1.5 text-center font-bold text-amber-700 dark:text-amber-400">≠</td>
                    <td class="px-3 py-1.5 font-mono text-zinc-900 dark:text-white">"R. Calder"</td>
                    <td class="px-3 py-1.5 text-amber-900/80 dark:text-amber-100/80">could be Riley, could be Robin</td>
                  </tr>
                  <tr>
                    <td class="px-3 py-1.5 font-mono text-zinc-900 dark:text-white">"Riley Calder"</td>
                    <td class="px-2 py-1.5 text-center font-bold text-amber-700 dark:text-amber-400">≠</td>
                    <td class="px-3 py-1.5 font-mono text-zinc-900 dark:text-white">"Riley Calder & Associates"</td>
                    <td class="px-3 py-1.5 text-amber-900/80 dark:text-amber-100/80">a person vs. a firm — keep separate</td>
                  </tr>
                </tbody>
              </table>
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
              Per-page JSON-LD (JSON for Linking Data)
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
