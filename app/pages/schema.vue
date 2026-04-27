<script setup lang="ts">
import { typeLabel } from '~/utils/article-format'

const PAGE_TITLE = 'Inside the Hub — schema deep-dive'
const PAGE_DESCRIPTION = 'A faithful structural view of the Hub 2.0 catalog: three content types, fourteen named article types, one bidirectional relation. The bones the rest of the demo sits on.'
const PAGE_URL = 'https://v2-hub-demo.netlify.app/schema'

useHead({
  title: PAGE_TITLE,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': PAGE_TITLE,
        'url': PAGE_URL,
        'description': PAGE_DESCRIPTION,
        'inLanguage': 'en-US',
        'datePublished': '2026-04-15',
        'dateModified': '2026-04-27',
        'isPartOf': {
          '@type': 'WebSite',
          'name': 'ICJIA Research Hub Filter Demo',
          'url': 'https://v2-hub-demo.netlify.app'
        }
      })
    }
  ]
})

useSeoMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ogTitle: PAGE_TITLE,
  ogDescription: PAGE_DESCRIPTION
})

const schemaDiagram = `erDiagram
  ARTICLE }o--o{ APP : "cites"
  ARTICLE }o--o{ DATASET : "cites"
  APP }o--o{ DATASET : "datahub"

  ARTICLE {
    string title
    string slug
    enum type "14 fixed values"
    string abstract
    string markdown "body"
    json authors "free-form JSON"
    json categories "free-form"
    json tags "free-form"
    UploadFile splash
    UploadFile mainfile "PDF"
    string doi
    string citation
    date publishedAt
  }
  DATASET {
    string title
    string description
    json categories "free-form"
    json tags "free-form"
    json sources
    UploadFile datafile
  }
  APP {
    string title
    string description
    string url "dashboard URL"
    json categories "free-form"
    json tags "free-form"
    UploadFile image
  }
  PAGE {
    string title
    string summary
    string body
    string slug
  }`

const enumValues = [
  'researchReport',
  'annualReport',
  'programEvaluationSummary',
  'update',
  'strategicPlan',
  'evaluation',
  'process_evaluation',
  'researchAtAGlance',
  'researchBulletin',
  'toolkit',
  'newsletter',
  'article',
  'dataset',
  'general'
]
</script>

<template>
  <div class="bg-white text-zinc-900 dark:bg-[#0a0a0a] dark:text-[#fafafa]">
    <!-- 1. HERO -->
    <section class="px-6 pt-16 pb-8 sm:px-12 lg:px-16">
      <div class="mx-auto max-w-5xl">
        <div class="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          The bones — in one diagram
        </div>
        <h1 class="mb-4 text-5xl font-black leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
          Inside the Hub.
        </h1>
        <p class="mb-7 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          A faithful structural view of the hub: <strong class="text-zinc-900 dark:text-white">three core catalog content types interconnected as a triangle</strong>, fourteen named article types, plus a fourth <code>Page</code> bucket — the catch-all for everything the hub publishes that isn't a catalog item (the live hub homepage, landing pages, etc.). The plain-English shape the rest of the demo sits on.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="/taxonomy"
            label="How is the Hub organized?"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            variant="solid"
            class="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            size="lg"
          />
          <UButton
            to="/"
            label="Home"
            color="neutral"
            variant="outline"
            class="border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
            size="lg"
          />
        </div>
      </div>
    </section>

    <!-- 2. STAT STRIP -->
    <section class="border-y border-zinc-200 bg-white px-6 py-10 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
          The schema, in counts
        </div>
        <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <div class="rounded-2xl border-2 border-sky-500 bg-sky-50 p-5 dark:bg-sky-500/10">
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-700 dark:text-sky-300">
              <UIcon
                name="i-lucide-layout-grid"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-sky-700 sm:text-5xl dark:text-sky-400">
              3
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              core catalog content types
            </div>
          </div>
          <div class="rounded-2xl border-2 border-amber-500 bg-amber-50 p-5 dark:bg-amber-500/10">
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-tags"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-amber-700 sm:text-5xl dark:text-amber-400">
              14
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              fixed article-type values
            </div>
          </div>
          <div class="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-5 dark:bg-emerald-500/10">
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <UIcon
                name="i-lucide-shield-check"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-emerald-700 sm:text-5xl dark:text-emerald-400">
              1
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              enum field — and only one
            </div>
          </div>
          <div class="rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 dark:bg-violet-500/10">
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-700 dark:text-violet-300">
              <UIcon
                name="i-lucide-share-2"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-violet-700 sm:text-5xl dark:text-violet-400">
              3
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              bidirectional relations (Article ↔ App ↔ Dataset)
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. THE PLAIN-ENGLISH SHAPE — manager bridge -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
          Before the diagram
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          The plain-English shape.
        </h2>
        <p class="mb-8 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          Three core catalog boxes interconnected as a triangle. A fourth catch-all box for everything else the hub publishes (homepage, landing pages, etc.). <strong class="text-zinc-900 dark:text-white">That's the whole picture.</strong>
        </p>

        <div class="grid gap-3 md:grid-cols-3">
          <div class="rounded-2xl border-2 border-zinc-300 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <span class="text-base font-black">1</span>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              The core boxes are the catalog content types
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Article, Dataset, App (apps and dashboards). Three buckets of browseable / filterable content, one of which (Article) is the focus of this demo. A fourth, <code class="rounded bg-zinc-200/60 px-1 text-xs dark:bg-zinc-800">Page</code>, is the catch-all for everything else the hub publishes — the homepage, landing pages, anything that isn't an Article, Dataset, or App.
            </p>
          </div>
          <div class="rounded-2xl border-2 border-zinc-300 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <span class="text-base font-black">2</span>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              The triangle is three relations, not one
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Article ↔ App, Article ↔ Dataset, and App ↔ Dataset are <strong class="text-zinc-900 dark:text-white">all bidirectional</strong> in the schema. Articles cite apps and datasets; apps and datasets show up in the articles that cite them; and the App ↔ Dataset edge is the proposed Hub 2.0 datahub.
            </p>
          </div>
          <div class="rounded-2xl border-2 border-zinc-300 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <span class="text-base font-black">3</span>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              The fields are what each record carries
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Inside each box: title, abstract, type, categories, tags, etc. <code class="rounded bg-zinc-200/60 px-1 text-xs dark:bg-zinc-800">json</code> means free-form structured data — categories, tags, and authors are all stored this way.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. THE DIAGRAM -->
    <section class="border-b border-zinc-200 bg-white px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          The diagram
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          The Hub 2.0 schema, <span class="text-sky-700 dark:text-sky-400">in one picture.</span>
        </h2>
        <p class="mb-8 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          Drawn with the standard "entity-relationship" notation databases use to describe themselves. The fork-shaped end of a line means "many of these"; the bar means "exactly one"; the circle means "zero or one." You don't have to memorize that — just look at the boxes.
        </p>

        <ClientOnly>
          <MermaidDiagram :source="schemaDiagram" />
          <template #fallback>
            <div class="rounded-lg border border-default bg-elevated p-8 text-center text-sm text-muted">
              Loading diagram…
            </div>
          </template>
        </ClientOnly>

        <p class="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          <UIcon
            name="i-lucide-info"
            class="-mt-0.5 mr-1 inline size-3.5"
          />
          The diagram simplifies a few internal Strapi details (system timestamps, locale fields, component primitives) so the shape stays legible. Field types are shown in plain language — Strapi's actual API uses <code>enumeration</code>, <code>component</code>, <code>relation</code>, and <code>media</code> as the underlying primitives.
        </p>
      </div>
    </section>

    <!-- 5. THREE THINGS THAT MATTER -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">
          What to notice
        </div>
        <h2 class="mb-8 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Three things that matter.
        </h2>

        <div class="grid gap-4 md:grid-cols-3">
          <!-- 1: type enum -->
          <div class="rounded-2xl border-2 border-amber-500 bg-amber-50 p-6 dark:bg-amber-500/10">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-tags"
                class="size-6"
              />
            </div>
            <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
              Thing #1 — The only enum
            </div>
            <h3 class="mb-3 text-2xl font-black leading-tight text-zinc-900 sm:text-3xl dark:text-white">
              <span class="text-amber-700 dark:text-amber-400">Article.type</span> is the only fixed enum.
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
              Editors pick from a closed list of <strong class="text-zinc-900 dark:text-white">14 values</strong> at publish time. That's why the chip filter on every view is a single click — a fixed enum lets the chips be guaranteed-correct labels. Datasets and Apps don't have an equivalent field, so they don't get chips.
            </p>
          </div>

          <!-- 2: relational triangle -->
          <div class="rounded-2xl border-2 border-violet-500 bg-violet-50 p-6 dark:bg-violet-500/10">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-700 dark:text-violet-300">
              <UIcon
                name="i-lucide-share-2"
                class="size-6"
              />
            </div>
            <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
              Thing #2 — The relational triangle
            </div>
            <h3 class="mb-3 text-2xl font-black leading-tight text-zinc-900 sm:text-3xl dark:text-white">
              <span class="text-violet-700 dark:text-violet-400">Article ↔ App ↔ Dataset</span> — all three ways.
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
              Articles cite apps. Apps visualize datasets. Datasets are referenced by both articles and apps — and every one of those connections is bidirectional. <strong class="text-zinc-900 dark:text-white">All three relationships are already wired in the schema.</strong> The proposed Hub 2.0 datahub specifically curates the App ↔ Dataset edge; the Article-side connections work today.
            </p>
          </div>

          <!-- 3: authors as JSON -->
          <div class="rounded-2xl border-2 border-sky-500 bg-sky-50 p-6 dark:bg-sky-500/10">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-700 dark:text-sky-300">
              <UIcon
                name="i-lucide-users"
                class="size-6"
              />
            </div>
            <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400">
              Thing #3 — Authors live in free-form JSON
            </div>
            <h3 class="mb-3 text-2xl font-black leading-tight text-zinc-900 sm:text-3xl dark:text-white">
              <span class="text-sky-700 dark:text-sky-400">Authors</span> aren't a relation. They're typed in.
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
              <code class="rounded bg-sky-500/15 px-1 text-sky-700 dark:text-sky-300">Article.authors</code> is a <code class="rounded bg-sky-500/15 px-1 text-sky-700 dark:text-sky-300">json</code> field — not a Strapi component, not a relation to a separate Author table. Editors type names in by hand, which is exactly why "Riley Calder," "Riley Calder, Ph.D," and "RILEY CARTER" can all appear for the same person — and why the demo needs the canonical-key trick to merge variants. (Same applies to <code>categories</code> and <code>tags</code>: free-form, no central taxonomy.)
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. THE 14 ARTICLE TYPES — visual grid -->
    <section class="border-b border-zinc-200 bg-white px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">
          The 14 fixed values
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Every article carries <span class="text-amber-700 dark:text-amber-400">one of these.</span>
        </h2>
        <p class="mb-8 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          The full <code class="rounded bg-zinc-100 px-1 text-sm dark:bg-zinc-900">ENUM_ARTICLE_TYPE</code>. Human-readable label on the left, technical value on the right. Adding a new value is a code change — not a content change — which is what makes the chip set stable.
        </p>

        <div class="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          <div
            v-for="(value, i) in enumValues"
            :key="value"
            class="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-xs font-black text-amber-700 dark:text-amber-300">
              {{ i + 1 }}
            </span>
            <div class="min-w-0 flex-1">
              <div class="truncate text-sm font-bold text-zinc-900 dark:text-white">
                {{ typeLabel(value) }}
              </div>
              <code class="block truncate text-[11px] text-zinc-600 dark:text-zinc-400">
                {{ value }}
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. THE RELATIONAL TRIANGLE — visual -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">
          The triangle, visually
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Three relations. <span class="text-violet-700 dark:text-violet-400">All bidirectional.</span>
        </h2>
        <p class="mb-8 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          Same `manyToMany` mechanism, three different semantic purposes. Articles cite apps and datasets; apps visualize datasets. Each side of every line knows about the other.
        </p>

        <div class="space-y-3">
          <!-- Article ↔ App -->
          <div class="rounded-2xl border-2 border-amber-500 bg-amber-50 p-5 dark:bg-amber-500/10">
            <div class="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div class="flex items-center gap-3">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  <UIcon
                    name="i-lucide-file-text"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                    Article.apps
                  </div>
                  <div class="text-sm font-bold text-zinc-900 dark:text-white">
                    "Apps cited by this article"
                  </div>
                </div>
              </div>
              <UIcon
                name="i-lucide-arrow-left-right"
                class="mx-auto size-7 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              <div class="flex items-center gap-3">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-700 dark:text-violet-300">
                  <UIcon
                    name="i-lucide-layout-dashboard"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
                    App.articles
                  </div>
                  <div class="text-sm font-bold text-zinc-900 dark:text-white">
                    "Articles citing this app"
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Article ↔ Dataset -->
          <div class="rounded-2xl border-2 border-amber-500 bg-amber-50 p-5 dark:bg-amber-500/10">
            <div class="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div class="flex items-center gap-3">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  <UIcon
                    name="i-lucide-file-text"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                    Article.datasets
                  </div>
                  <div class="text-sm font-bold text-zinc-900 dark:text-white">
                    "Datasets cited by this article"
                  </div>
                </div>
              </div>
              <UIcon
                name="i-lucide-arrow-left-right"
                class="mx-auto size-7 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              <div class="flex items-center gap-3">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-700 dark:text-sky-300">
                  <UIcon
                    name="i-lucide-database"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400">
                    Dataset.articles
                  </div>
                  <div class="text-sm font-bold text-zinc-900 dark:text-white">
                    "Articles citing this dataset"
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- App ↔ Dataset (the datahub) -->
          <div class="rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 dark:bg-violet-500/10">
            <div class="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div class="flex items-center gap-3">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-700 dark:text-violet-300">
                  <UIcon
                    name="i-lucide-layout-dashboard"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
                    App.datasets
                  </div>
                  <div class="text-sm font-bold text-zinc-900 dark:text-white">
                    "Datasets this app pulls from"
                  </div>
                </div>
              </div>
              <div class="mx-auto flex flex-col items-center gap-1">
                <UIcon
                  name="i-lucide-arrow-left-right"
                  class="size-7 text-violet-600 dark:text-violet-400"
                  aria-hidden="true"
                />
                <code class="rounded border border-violet-500/30 bg-violet-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                  the datahub
                </code>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-700 dark:text-sky-300">
                  <UIcon
                    name="i-lucide-database"
                    class="size-5"
                  />
                </div>
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400">
                    Dataset.apps
                  </div>
                  <div class="text-sm font-bold text-zinc-900 dark:text-white">
                    "Apps that consume this dataset"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 p-5">
          <div class="flex items-start gap-3">
            <UIcon
              name="i-lucide-circle-check-big"
              class="mt-0.5 size-6 shrink-0 text-emerald-700 dark:text-emerald-300"
            />
            <p class="text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              All three relations are <code class="rounded bg-emerald-500/15 px-1 text-emerald-700 dark:text-emerald-300">manyToMany</code> in Strapi 5 — schema-supported today.
              <span class="block pt-1 text-sm font-normal text-zinc-700 dark:text-zinc-300">
                The Article ↔ App and Article ↔ Dataset edges work without curation. The proposed Hub 2.0 datahub specifically curates the App ↔ Dataset edge — picking which datasets belong to which apps. Four patterns: solo dataset · one app, one dataset · one app, many datasets · shared dataset.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. TL;DR -->
    <section class="border-y-4 border-sky-500 bg-sky-100/40 px-6 py-16 sm:px-12 lg:px-16 dark:border-sky-500/80 dark:bg-sky-500/10">
      <div class="mx-auto max-w-4xl">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex size-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg">
            <UIcon
              name="i-lucide-zap"
              class="size-6"
            />
          </div>
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-sky-800 sm:text-sm dark:text-sky-300">
            The bones, in one breath
          </span>
        </div>
        <h2 class="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          Three core boxes. <span class="text-sky-700 dark:text-sky-400">Fourteen named types.</span> A relational triangle.
        </h2>
        <p class="text-xl leading-relaxed text-zinc-700 sm:text-2xl dark:text-zinc-300">
          That's the whole shape. Hub 1.0 designed it; Hub 2.0 carried it forward intact. Every chip, every dropdown, every datahub pattern in this demo lives on top of those three sentences.
        </p>
      </div>
    </section>

    <!-- 9. SMALL DEV NOTE — collapsible feel -->
    <section class="border-b border-zinc-200 bg-white px-6 py-12 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-4xl">
        <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
            <UIcon
              name="i-lucide-code-2"
              class="size-3.5"
            />
            Small print for developers
          </div>
          <div class="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              Strapi names: <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">api::article.article</code>, <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">api::dataset.dataset</code>, <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">api::app.app</code>, <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">api::page.page</code> — all collection types with draft &amp; publish enabled. Standard Strapi metadata (<code>createdAt</code>, <code>updatedAt</code>, <code>publishedAt</code>, <code>locale</code>, <code>documentId</code>) lives on every record but is omitted from the diagram for clarity.
            </p>
            <p>
              <strong class="text-zinc-900 dark:text-white">Authors</strong> on Article is a single <code>json</code> field — <em>not</em> a relation, <em>not</em> a Strapi component. Editors type names directly into a JSON list. There is no schema-enforced structure: a name like "Riley Calder, Ph.D" is just a string, and "Riley Calder, PhD" beside it is another string. The demo's <code>authorKey()</code> in <code>app/utils/article-format.ts</code> normalizes credential / casing / whitespace differences at query time. <strong class="text-zinc-900 dark:text-white">categories</strong> and <strong class="text-zinc-900 dark:text-white">tags</strong> are also <code>json</code> fields on every entity, free-form.
            </p>
            <p>
              <strong class="text-zinc-900 dark:text-white">Three bidirectional <code>manyToMany</code> relations</strong> form the schema's relational triangle: <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">Article.apps</code> ↔ <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">App.articles</code>, <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">Article.datasets</code> ↔ <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">Dataset.articles</code>, and <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">App.datasets</code> ↔ <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">Dataset.apps</code>. Each accepts any cardinality on either side.
            </p>
            <p>
              <strong class="text-zinc-900 dark:text-white">Beyond what the diagram shows</strong>, every record carries additional fields not used by the filter demo: Article has <code>markdown</code> (body), <code>mainfile</code> / <code>extrafile</code> (PDF attachments), <code>doi</code>, <code>citation</code>, <code>funding</code>, <code>thumbnail</code>, <code>images</code>, <code>legacyId</code> (Hub 1.0 migration tracker), <code>external</code>, <code>hideFromBanner</code>; Dataset has <code>project</code> (boolean), <code>sources</code>, <code>unit</code>, <code>timeperiod</code>, <code>variables</code>, <code>notes</code>, <code>datafile</code>, <code>funding</code>, <code>citation</code>; App has <code>contributors</code>, <code>url</code>, <code>image</code>, <code>funding</code>, <code>citation</code>. The GraphQL endpoint is at <code>https://v2.hub.icjia-api.cloud/graphql</code> — see <code>app/composables/useArticles.ts</code> for the full query.
            </p>
            <p>
              <strong class="text-zinc-900 dark:text-white">Page</strong> (<code>api::page.page</code>) is a fourth content type — <code>title</code>, <code>summary</code>, <code>body</code>, <code>slug</code>. The <strong class="text-zinc-900 dark:text-white">catch-all</strong> for everything the hub publishes that isn't a catalog item: the live hub homepage, landing pages, anything that's not an Article / Dataset / App. Not part of the filter demo's data model — but a real top-level Strapi collection type with its own draft / publish lifecycle.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 10. DEEP DIVES -->
    <section class="bg-white px-6 py-14 sm:px-12 lg:px-16 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          More to explore
        </div>
        <h2 class="mb-7 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          Back to the surface.
        </h2>
        <div class="grid gap-4 md:grid-cols-3">
          <NuxtLink
            to="/taxonomy"
            class="group block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-sky-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-400/60 dark:focus-visible:ring-sky-400"
          >
            <div class="mb-2 flex items-center gap-2.5">
              <div class="flex size-7 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-400">
                <UIcon
                  name="i-lucide-network"
                  class="size-4"
                />
              </div>
              <div class="text-base font-bold text-zinc-900 dark:text-white">
                How is the Hub organized?
              </div>
            </div>
            <p class="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The narrative tour — interactive content-type tabs, the 14 article types as clickable cards with real examples, "Hub 1.0 by the numbers" proof.
            </p>
            <div class="text-xs font-semibold uppercase tracking-[0.04em] text-sky-600 group-hover:underline dark:text-sky-400">
              /taxonomy →
            </div>
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="group block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-emerald-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-400/60 dark:focus-visible:ring-emerald-400"
          >
            <div class="mb-2 flex items-center gap-2.5">
              <div class="flex size-7 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-400">
                <UIcon
                  name="i-lucide-sparkles"
                  class="size-4"
                />
              </div>
              <div class="text-base font-bold text-zinc-900 dark:text-white">
                Why this demo app?
              </div>
            </div>
            <p class="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Seven friction-reducers Hub 2.0 brings to Hub 1.0's existing catalog — search highlighting, author normalization, three layouts to compare.
            </p>
            <div class="text-xs font-semibold uppercase tracking-[0.04em] text-emerald-600 group-hover:underline dark:text-emerald-400">
              /about →
            </div>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="group block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-amber-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-400/60 dark:focus-visible:ring-amber-400"
          >
            <div class="mb-2 flex items-center gap-2.5">
              <div class="flex size-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-500">
                <UIcon
                  name="i-lucide-home"
                  class="size-4"
                />
              </div>
              <div class="text-base font-bold text-zinc-900 dark:text-white">
                Home
              </div>
            </div>
            <p class="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Articles ≡ summaries, live Plausible traffic, URL stability, and three filter layouts to try.
            </p>
            <div class="text-xs font-semibold uppercase tracking-[0.04em] text-amber-600 group-hover:underline dark:text-amber-500">
              / →
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
