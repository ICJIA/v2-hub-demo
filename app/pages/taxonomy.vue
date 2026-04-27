<script setup lang="ts">
const PAGE_TITLE = 'How the data is organized — ICJIA Research Hub Demo'
const PAGE_DESCRIPTION = 'How Hub 2.0 organizes ICJIA research: three top-level buckets, 14 named article types, and a proposed dataset-to-dashboard datahub.'
const PAGE_URL = 'https://v2-hub-demo.netlify.app/taxonomy'
const OG_IMAGE = 'https://v2-hub-demo.netlify.app/og-image.png'

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
        'primaryImageOfPage': {
          '@type': 'ImageObject',
          'url': OG_IMAGE,
          'width': 1200,
          'height': 630
        },
        'isPartOf': {
          '@type': 'WebSite',
          'name': 'ICJIA Research Hub Filter Demo',
          'url': 'https://v2-hub-demo.netlify.app'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Illinois Criminal Justice Information Authority',
          'alternateName': 'ICJIA',
          'url': 'https://icjia.illinois.gov/'
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

const { data: rawArticles } = await useArticles({ fillRandom: true })

const articleCount = computed(() => rawArticles.value?.length ?? 0)
const articleCountLabel = computed(() => {
  const n = articleCount.value
  if (n === 0) return '—'
  const rounded = Math.round(n / 10) * 10
  return '~' + new Intl.NumberFormat('en-US').format(rounded)
})

const selectedTypeForModal = ref<string | null>(null)
const isExamplesOpen = ref(false)

type ContentTypeId = 'articles' | 'datasets' | 'apps'
const selectedContentType = ref<ContentTypeId>('articles')

function selectContentType(id: ContentTypeId) {
  selectedContentType.value = id
}

function showExamples(typeValue: string) {
  selectedTypeForModal.value = typeValue
  isExamplesOpen.value = true
}
</script>

<template>
  <div class="bg-white text-zinc-900 dark:bg-[#0a0a0a] dark:text-[#fafafa]">
    <!-- 1. HERO -->
    <section class="px-6 pt-16 pb-8 sm:px-12 lg:px-16">
      <div class="mx-auto max-w-5xl">
        <div class="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          The structure
        </div>
        <h1 class="mb-4 text-5xl font-black leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
          How Hub 2.0 organizes<br>everything it publishes.
        </h1>
        <p class="mb-7 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          Three top-level buckets. Articles holds 14 named types. <span class="font-semibold text-zinc-900 dark:text-white">Hub 2.0 inherited the shape from Hub 1.0</span> — and that's why it works.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="#types"
            label="See the 14 types"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            variant="solid"
            class="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            size="lg"
          />
          <UButton
            to="/current"
            label="Open Current"
            color="neutral"
            variant="outline"
            class="border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
            size="lg"
          />
          <UButton
            to="/view0"
            label="Open View 0"
            color="neutral"
            variant="outline"
            class="border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
            size="lg"
          />
          <UButton
            to="/view1"
            label="Open View 1"
            color="neutral"
            variant="outline"
            class="border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
            size="lg"
          />
          <UButton
            to="/view2"
            label="Open View 2"
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
      <div class="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <UPopover>
          <button
            type="button"
            class="relative w-full cursor-help rounded-2xl border-2 border-sky-500 bg-sky-50 p-5 text-left transition-shadow hover:shadow-lg hover:shadow-sky-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-sky-500/10 dark:focus-visible:ring-sky-400"
          >
            <UIcon
              name="i-lucide-info"
              class="absolute right-3 top-3 size-3.5 text-sky-600/60 dark:text-sky-400/60"
              aria-hidden="true"
            />
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
              top-level content types
            </div>
          </button>
          <template #content>
            <div class="max-w-xs p-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                <strong class="text-zinc-900 dark:text-white">Articles, Datasets, and Apps/Dashboards.</strong> Articles is the bucket for everything published as text — research reports, annual reports, evaluations, all 14 article types. The filter demo focuses on Articles.
              </p>
            </div>
          </template>
        </UPopover>
        <UPopover>
          <button
            type="button"
            class="relative w-full cursor-help rounded-2xl border-2 border-amber-500 bg-amber-50 p-5 text-left transition-shadow hover:shadow-lg hover:shadow-amber-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-amber-500/10 dark:focus-visible:ring-amber-400"
          >
            <UIcon
              name="i-lucide-info"
              class="absolute right-3 top-3 size-3.5 text-amber-600/60 dark:text-amber-400/60"
              aria-hidden="true"
            />
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
              named article types
            </div>
          </button>
          <template #content>
            <div class="max-w-xs p-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                Every article carries one of <strong class="text-zinc-900 dark:text-white">fourteen fixed type values</strong>, set by the editor at publish time: Research Report, Annual Report, Program Evaluation Summary, Update, Strategic Plan, Toolkit, Newsletter, plus seven more. The chips on each view filter by these values.
              </p>
            </div>
          </template>
        </UPopover>
        <UPopover>
          <button
            type="button"
            class="relative w-full cursor-help rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-5 text-left transition-shadow hover:shadow-lg hover:shadow-emerald-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-500/10 dark:focus-visible:ring-emerald-400"
          >
            <UIcon
              name="i-lucide-info"
              class="absolute right-3 top-3 size-3.5 text-emerald-600/60 dark:text-emerald-400/60"
              aria-hidden="true"
            />
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <UIcon
                name="i-lucide-link"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-emerald-700 sm:text-5xl dark:text-emerald-400">
              1
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              shape inherited from Hub 1.0
            </div>
          </button>
          <template #content>
            <div class="max-w-xs p-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                <strong class="text-zinc-900 dark:text-white">Hub 2.0 didn't redesign the data structure</strong> — it kept the original Hub 1.0 shape intact. Same three top-level buckets, same 14 article types. The CMS is new (Strapi 5), but the bones are the ones that already work.
              </p>
            </div>
          </template>
        </UPopover>
        <UPopover>
          <button
            type="button"
            class="relative w-full cursor-help rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 text-left transition-shadow hover:shadow-lg hover:shadow-violet-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:bg-violet-500/10 dark:focus-visible:ring-violet-400"
          >
            <UIcon
              name="i-lucide-info"
              class="absolute right-3 top-3 size-3.5 text-violet-600/60 dark:text-violet-400/60"
              aria-hidden="true"
            />
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-700 dark:text-violet-300">
              <UIcon
                name="i-lucide-share-2"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-violet-700 sm:text-5xl dark:text-violet-400">
              4
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              patterns proposed for the datahub
            </div>
          </button>
          <template #content>
            <div class="max-w-xs p-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                <strong class="text-zinc-900 dark:text-white">Future expansion</strong> linking Datasets to Apps/Dashboards. Four patterns: a dataset standing alone, a dashboard on one dataset, a dashboard on many datasets, or a dataset feeding multiple dashboards. All four are schema-supported in Strapi 5 today — the work is editorial, not engineering.
              </p>
            </div>
          </template>
        </UPopover>
      </div>
    </section>

    <!-- 3. THE ARCHITECTURE -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
          Inherited from Hub 1.0
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl dark:text-white">
          Same bones. Updated CMS. <span class="text-sky-700 dark:text-sky-400">Click the content types.</span>
        </h2>
        <p class="mb-7 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
          The hub holds three top-level buckets. Hub 2.0 swapped the CMS to <strong>Strapi 5</strong> but kept the original Hub 1.0 shape intact — because the original team got it right.
        </p>

        <!-- 3-content-type ribbon — interactive tabs -->
        <div class="mb-1 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            :class="[
              'group block w-full rounded-xl p-4 text-left transition-all focus:outline-none focus-visible:ring-2',
              selectedContentType === 'articles'
                ? 'border-2 border-amber-500 bg-amber-500/10 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400'
                : 'border border-zinc-300 bg-zinc-100/70 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/15 focus-visible:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-amber-400/60 dark:focus-visible:ring-amber-400'
            ]"
            :aria-pressed="selectedContentType === 'articles'"
            @click="selectContentType('articles')"
          >
            <div
              :class="[
                'text-[10px] font-bold uppercase tracking-[0.1em]',
                selectedContentType === 'articles' ? 'text-amber-700 dark:text-amber-400' : 'text-zinc-600 dark:text-zinc-400'
              ]"
            >
              Content type 1 of 3
            </div>
            <div
              :class="[
                'mt-1 flex items-baseline gap-2 text-base',
                selectedContentType === 'articles' ? 'font-extrabold text-zinc-900 dark:text-white' : 'font-bold text-zinc-700 dark:text-zinc-300'
              ]"
            >
              <UIcon
                name="i-lucide-library"
                :class="['size-5', selectedContentType === 'articles' ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-600 dark:text-zinc-400']"
              />
              Articles
              <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400">{{ articleCountLabel }} items</span>
            </div>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span
                :class="[
                  'rounded-full px-2.5 py-0.5 text-[10px] font-bold',
                  selectedContentType === 'articles' ? 'border border-amber-500 bg-amber-500/20 text-amber-700 dark:text-amber-300' : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                ]"
              >type</span>
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">categories</span>
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">tags</span>
            </div>
            <div class="mt-2 text-[10px] text-zinc-600 dark:text-zinc-400">
              <code :class="selectedContentType === 'articles' ? 'text-amber-700 dark:text-amber-300' : ''">type</code>: 14 fixed values · the rest: free-form
            </div>
            <div
              :class="[
                'mt-2 flex items-center gap-1 text-[10px] font-bold',
                selectedContentType === 'articles' ? 'text-amber-700 dark:text-amber-400' : 'text-zinc-500 dark:text-zinc-500 group-hover:text-amber-700 dark:group-hover:text-amber-400'
              ]"
            >
              <UIcon
                :name="selectedContentType === 'articles' ? 'i-lucide-arrow-down' : 'i-lucide-mouse-pointer-click'"
                class="size-3"
              />
              {{ selectedContentType === 'articles' ? 'Showing details below' : 'Click for details' }}
            </div>
          </button>

          <button
            type="button"
            :class="[
              'group block w-full rounded-xl p-4 text-left transition-all focus:outline-none focus-visible:ring-2',
              selectedContentType === 'datasets'
                ? 'border-2 border-sky-500 bg-sky-500/10 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400'
                : 'border border-zinc-300 bg-zinc-100/70 hover:border-sky-500/60 hover:shadow-lg hover:shadow-sky-500/15 focus-visible:ring-sky-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-sky-400/60 dark:focus-visible:ring-sky-400'
            ]"
            :aria-pressed="selectedContentType === 'datasets'"
            @click="selectContentType('datasets')"
          >
            <div
              :class="[
                'text-[10px] font-bold uppercase tracking-[0.1em]',
                selectedContentType === 'datasets' ? 'text-sky-700 dark:text-sky-400' : 'text-zinc-600 dark:text-zinc-400'
              ]"
            >
              Content type 2 of 3
            </div>
            <div
              :class="[
                'mt-1 flex items-baseline gap-2 text-base',
                selectedContentType === 'datasets' ? 'font-extrabold text-zinc-900 dark:text-white' : 'font-bold text-zinc-700 dark:text-zinc-300'
              ]"
            >
              <UIcon
                name="i-lucide-database"
                :class="['size-5', selectedContentType === 'datasets' ? 'text-sky-600 dark:text-sky-400' : 'text-zinc-600 dark:text-zinc-400']"
              />
              Datasets
            </div>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">categories</span>
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">tags</span>
            </div>
            <div class="mt-2 text-[10px] text-zinc-600 dark:text-zinc-400">
              free-form labels · no <code>type</code> enum
            </div>
            <div
              :class="[
                'mt-2 flex items-center gap-1 text-[10px] font-bold',
                selectedContentType === 'datasets' ? 'text-sky-700 dark:text-sky-400' : 'text-zinc-500 dark:text-zinc-500 group-hover:text-sky-700 dark:group-hover:text-sky-400'
              ]"
            >
              <UIcon
                :name="selectedContentType === 'datasets' ? 'i-lucide-arrow-down' : 'i-lucide-mouse-pointer-click'"
                class="size-3"
              />
              {{ selectedContentType === 'datasets' ? 'Showing details below' : 'Click for the datahub roadmap' }}
            </div>
          </button>

          <button
            type="button"
            :class="[
              'group block w-full rounded-xl p-4 text-left transition-all focus:outline-none focus-visible:ring-2',
              selectedContentType === 'apps'
                ? 'border-2 border-violet-500 bg-violet-500/10 focus-visible:ring-violet-500 dark:focus-visible:ring-violet-400'
                : 'border border-zinc-300 bg-zinc-100/70 hover:border-violet-500/60 hover:shadow-lg hover:shadow-violet-500/15 focus-visible:ring-violet-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-violet-400/60 dark:focus-visible:ring-violet-400'
            ]"
            :aria-pressed="selectedContentType === 'apps'"
            @click="selectContentType('apps')"
          >
            <div
              :class="[
                'text-[10px] font-bold uppercase tracking-[0.1em]',
                selectedContentType === 'apps' ? 'text-violet-700 dark:text-violet-400' : 'text-zinc-600 dark:text-zinc-400'
              ]"
            >
              Content type 3 of 3
            </div>
            <div
              :class="[
                'mt-1 flex items-baseline gap-2 text-base',
                selectedContentType === 'apps' ? 'font-extrabold text-zinc-900 dark:text-white' : 'font-bold text-zinc-700 dark:text-zinc-300'
              ]"
            >
              <UIcon
                name="i-lucide-layout-dashboard"
                :class="['size-5', selectedContentType === 'apps' ? 'text-violet-600 dark:text-violet-400' : 'text-zinc-600 dark:text-zinc-400']"
              />
              Apps / Dashboards
            </div>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">categories</span>
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">tags</span>
            </div>
            <div class="mt-2 text-[10px] text-zinc-600 dark:text-zinc-400">
              free-form labels · no <code>type</code> enum
            </div>
            <div
              :class="[
                'mt-2 flex items-center gap-1 text-[10px] font-bold',
                selectedContentType === 'apps' ? 'text-violet-700 dark:text-violet-400' : 'text-zinc-500 dark:text-zinc-500 group-hover:text-violet-700 dark:group-hover:text-violet-400'
              ]"
            >
              <UIcon
                :name="selectedContentType === 'apps' ? 'i-lucide-arrow-down' : 'i-lucide-mouse-pointer-click'"
                class="size-3"
              />
              {{ selectedContentType === 'apps' ? 'Showing details below' : 'Click for details (more coming soon)' }}
            </div>
          </button>
        </div>

        <!-- Inline detail panel — content swaps based on selectedContentType -->
        <div
          :class="[
            'mb-10 rounded-xl border-2 p-5 sm:p-6',
            selectedContentType === 'articles' && 'border-amber-500 bg-amber-50 dark:bg-amber-500/10',
            selectedContentType === 'datasets' && 'border-sky-500 bg-sky-50 dark:bg-sky-500/10',
            selectedContentType === 'apps' && 'border-violet-500 bg-violet-50 dark:bg-violet-500/10'
          ]"
        >
          <!-- Articles -->
          <div
            v-if="selectedContentType === 'articles'"
            class="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            <div>
              <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                What it is
              </div>
              <p>
                <strong class="text-zinc-900 dark:text-white">Articles is the umbrella for everything published as text on the hub.</strong> ~240 records, organized into <strong>14 fixed type values</strong> (Research Report, Annual Report, Program Evaluation Summary, Update, Strategic Plan, plus nine more). Every Article carries the same labeled fields: <code class="rounded bg-amber-500/10 px-1 text-amber-700 dark:text-amber-300">type</code>, <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">categories</code>, <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">tags</code>, plus title/abstract/authors/date.
              </p>
            </div>
            <div>
              <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                Why this is the bucket the demo focuses on
              </div>
              <p>
                Articles is the only content type with a fixed <code class="rounded bg-amber-500/10 px-1 text-amber-700 dark:text-amber-300">type</code> enum (the 14 named values). That's what lets the chips on every view filter in one click. Hub 1.0 has the same 14 types in the same data — Hub 2.0 just exposes them as chips at the top of the page instead of buried in a menu.
              </p>
            </div>
            <p class="text-xs text-zinc-600 dark:text-zinc-400">
              <UIcon
                name="i-lucide-arrow-down"
                class="-mt-0.5 mr-1 inline size-3.5"
              />
              All 14 types are listed and clickable in the
              <a
                href="#types"
                class="font-semibold text-amber-700 underline-offset-2 hover:underline dark:text-amber-400"
              >"Inside Articles" section</a>
              further down this page.
            </p>
          </div>

          <!-- Datasets -->
          <div
            v-else-if="selectedContentType === 'datasets'"
            class="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            <div>
              <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400">
                What it is
              </div>
              <p>
                <strong class="text-zinc-900 dark:text-white">Datasets are raw data — CSVs, structured tables, files ICJIA publishes for download or visualization.</strong> Distinct top-level content type, separate from Articles. They carry <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">categories</code> and <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">tags</code> — but no <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">type</code> enum, so no chip filter for them.
              </p>
            </div>
            <div>
              <div class="mb-1 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
                <span>Where Hub 2.0 takes them next</span>
                <UBadge
                  label="Future"
                  color="warning"
                  variant="soft"
                  size="sm"
                />
              </div>
              <p class="mb-3">
                Hub 2.0 proposes connecting Datasets to Apps/Dashboards under the <strong class="text-zinc-900 dark:text-white">"datahub"</strong> moniker. Four patterns the Strapi 5 schema already supports today:
              </p>
              <ul class="ml-1 space-y-2">
                <li class="flex items-start gap-2.5">
                  <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-sky-500/15 text-[10px] font-black text-sky-700 dark:text-sky-300">1</span>
                  <span><strong class="text-zinc-900 dark:text-white">Solo dataset.</strong> A dataset that stands on its own — raw data, no dashboard yet.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-emerald-500/15 text-[10px] font-black text-emerald-700 dark:text-emerald-300">2</span>
                  <span><strong class="text-zinc-900 dark:text-white">One app, one dataset.</strong> A dashboard built around a single dataset.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-amber-500/15 text-[10px] font-black text-amber-700 dark:text-amber-300">3</span>
                  <span><strong class="text-zinc-900 dark:text-white">One app, many datasets.</strong> A dashboard pulling in several — e.g., layered crime stats by year.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-violet-500/15 text-[10px] font-black text-violet-700 dark:text-violet-300">4</span>
                  <span><strong class="text-zinc-900 dark:text-white">Shared dataset.</strong> The same dataset feeding more than one dashboard.</span>
                </li>
              </ul>
            </div>
            <div class="rounded-lg border border-emerald-500 bg-emerald-500/10 p-3">
              <div class="flex items-start gap-2.5">
                <UIcon
                  name="i-lucide-circle-check-big"
                  class="mt-0.5 size-4 shrink-0 text-emerald-700 dark:text-emerald-300"
                />
                <div class="text-xs leading-snug">
                  <strong class="text-zinc-900 dark:text-white">All four patterns are schema-supported in Strapi 5 today.</strong>
                  <span class="block pt-0.5 font-normal text-zinc-700 dark:text-zinc-300">
                    Hub 2.0's work on Datasets is editorial — curating which datasets belong to which apps — not building anything new at the data layer.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Apps / Dashboards -->
          <div
            v-else-if="selectedContentType === 'apps'"
            class="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            <div>
              <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
                What it is
              </div>
              <p>
                <strong class="text-zinc-900 dark:text-white">Apps and Dashboards are the interactive visualizations on the hub</strong> — charts, maps, drill-downs that render one or more datasets. Distinct top-level content type, separate from Articles and Datasets. Like Datasets, they carry <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">categories</code> and <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">tags</code> but no <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">type</code> enum.
              </p>
            </div>
            <div class="rounded-lg border-2 border-amber-500 bg-amber-50 p-3 dark:border-amber-500/60 dark:bg-amber-500/10">
              <div class="flex items-start gap-2.5">
                <UIcon
                  name="i-lucide-construction"
                  class="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-300"
                />
                <div class="text-xs leading-snug">
                  <strong class="text-amber-800 dark:text-amber-200">More detail coming soon.</strong>
                  <span class="block pt-0.5 font-normal text-zinc-700 dark:text-zinc-300">
                    This proof-of-concept demo focuses on the Articles filter UX. The Apps/Dashboards story is part of the Hub 2.0 <strong class="text-zinc-900 dark:text-white">"datahub"</strong> roadmap — linking them to Datasets via the four patterns above — but the editorial details (which apps consume which datasets, browsing UX) are a separate workstream that hasn't been scoped for this POC yet.
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
                What we know so far
              </div>
              <ul class="ml-1 space-y-1.5">
                <li class="flex items-start gap-2">
                  <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-500" />
                  <span>The Strapi 5 schema treats Apps/Dashboards as a peer of Articles and Datasets, not nested under either.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-500" />
                  <span>Apps already support bidirectional relations with Datasets (<code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">App.datasets</code> and <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">Dataset.apps</code>) — so the four datahub patterns work out of the box.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-500" />
                  <span>Browsing UX for Apps/Dashboards (filters, list page, detail page) is open territory — TBD as Hub 2.0 progresses.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Equivalence visual: Hub 1.0 ≡ Hub 2.0 -->
        <div class="my-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <div class="w-full max-w-xs rounded-2xl border-2 border-zinc-300 bg-zinc-100/70 px-8 py-6 text-center sm:w-auto dark:border-zinc-800 dark:bg-zinc-900/50">
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
              Hub 1.0 shape
            </div>
            <div class="mt-2 text-3xl font-black tracking-tight text-zinc-700 sm:text-4xl dark:text-zinc-300">
              3 buckets · 14 types
            </div>
          </div>
          <div
            class="text-5xl font-black text-zinc-900 sm:text-7xl dark:text-white"
            aria-hidden="true"
          >
            ≡
          </div>
          <div class="w-full max-w-xs rounded-2xl border-2 border-sky-500 bg-sky-500/10 px-8 py-6 text-center sm:w-auto dark:border-sky-400">
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
              Hub 2.0 shape
            </div>
            <div class="mt-2 text-3xl font-black tracking-tight text-sky-700 sm:text-4xl dark:text-sky-300">
              3 buckets · 14 types
            </div>
          </div>
        </div>
        <p class="text-center text-sm text-zinc-600 dark:text-zinc-400">
          <span class="font-semibold text-zinc-900 dark:text-white">The structure is identical.</span> The CMS is new (Strapi 5). Hub 2.0 is an upgrade, not a teardown.
        </p>
      </div>
    </section>

    <!-- 4. WHY 'ARTICLES' AND NOT 'SUMMARIES' -->
    <section class="border-b border-amber-300/50 bg-amber-50 px-6 py-8 sm:px-12 lg:px-16 dark:border-amber-500/15 dark:bg-amber-500/5">
      <div class="mx-auto flex max-w-5xl gap-4">
        <UIcon
          name="i-lucide-notebook-pen"
          class="mt-1 size-5 shrink-0 text-amber-600 dark:text-amber-400"
        />
        <div>
          <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
            The naming decision
          </div>
          <h3 class="mb-2 text-base font-bold text-amber-700 dark:text-amber-400">
            Why "articles" — and not "summaries"?
          </h3>
          <div class="space-y-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              "Summaries" was on the table during Hub 1.0 planning. Over several weeks and several name changes, we kept running into the same problem: an article <em>can</em> be a summary of an attached research report or annual report — but it can also stand on its own, a standalone piece with no attached PDF at all. "Summaries" didn't fit that case.
            </p>
            <p>
              We landed on <strong class="text-amber-700 dark:text-amber-400">articles</strong> because it was both <strong>more general</strong> (a publishing platform can carry many kinds of digital pieces, including standalone articles) and <strong>more specific</strong> (an "article" is a familiar concept — exactly what you'd expect on a publishing platform).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. THE 14 ARTICLE TYPES (interactive) -->
    <section
      id="types"
      class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]"
    >
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">
          Inside Articles
        </div>
        <h2 class="mb-2 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl dark:text-white">
          Fourteen types. <span class="text-amber-700 dark:text-amber-400">Click any one.</span>
        </h2>
        <p class="mb-7 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
          These are the only valid values for an article's <code>type</code> field. Real examples open in a modal.
        </p>

        <div class="relative rounded-2xl border-2 border-amber-500 bg-white p-7 dark:bg-zinc-900">
          <div class="absolute -top-3 left-5 rounded bg-amber-500 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.06em] text-zinc-950">
            <UIcon
              name="i-lucide-library"
              class="-mt-1 mr-0.5 inline size-4"
            />
            Articles · {{ articleCountLabel }} items
          </div>

          <HubArticleTypeGrid
            :articles="rawArticles"
            variant="list"
            @select="showExamples"
          />

          <div class="mt-4 flex flex-col gap-3 border-t border-dashed border-zinc-300 pt-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
            <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <span><span class="text-amber-600 dark:text-amber-400">●</span> highlighted</span>
              <span><span class="text-sky-600 dark:text-sky-400">●</span> research / evaluation</span>
              <span><span class="text-emerald-600 dark:text-emerald-400">●</span> reports &amp; plans</span>
              <span><span class="text-violet-600 dark:text-violet-400">●</span> communications</span>
            </div>
            <div class="text-xs font-semibold text-amber-700 dark:text-amber-500">
              <UIcon
                name="i-lucide-mouse-pointer-click"
                class="-mt-0.5 mr-1 inline size-4"
              />
              Click any type for live examples
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. PROPOSED DATAHUB -->
    <section class="border-b border-zinc-200 bg-white px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">
          <span>What's next</span>
          <UBadge
            label="Future"
            color="warning"
            variant="soft"
            size="sm"
          />
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl dark:text-white">
          Connecting datasets to dashboards. <span class="text-violet-700 dark:text-violet-400">Four patterns.</span>
        </h2>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Right now Datasets and Apps live as separate islands. The team wants them connected. The Strapi 5 schema already supports all four shapes today — the work for Hub 2.0 is editorial.
        </p>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Card 1: Solo dataset (sky) -->
          <div class="rounded-2xl border-2 border-sky-500 bg-sky-50 p-5 dark:bg-sky-500/10">
            <div class="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
              Pattern 1
            </div>
            <div class="mb-4 flex items-center justify-center gap-2 py-3">
              <UIcon
                name="i-lucide-database"
                class="size-12 text-sky-600 dark:text-sky-300"
              />
            </div>
            <div class="text-base font-bold text-zinc-900 dark:text-white">
              Solo dataset
            </div>
            <p class="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              A dataset that stands on its own — raw data, no dashboard yet.
            </p>
          </div>

          <!-- Card 2: One app, one dataset (emerald) -->
          <div class="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-5 dark:bg-emerald-500/10">
            <div class="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
              Pattern 2
            </div>
            <div class="mb-4 flex items-center justify-center gap-2 py-3">
              <UIcon
                name="i-lucide-layout-dashboard"
                class="size-10 text-emerald-600 dark:text-emerald-300"
              />
              <UIcon
                name="i-lucide-arrow-right"
                class="size-5 text-emerald-600 dark:text-emerald-300"
              />
              <UIcon
                name="i-lucide-database"
                class="size-10 text-emerald-600 dark:text-emerald-300"
              />
            </div>
            <div class="text-base font-bold text-zinc-900 dark:text-white">
              One app, one dataset
            </div>
            <p class="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              A dashboard built around a single dataset.
            </p>
          </div>

          <!-- Card 3: One app, many datasets (amber) -->
          <div class="rounded-2xl border-2 border-amber-500 bg-amber-50 p-5 dark:bg-amber-500/10">
            <div class="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
              Pattern 3
            </div>
            <div class="mb-4 flex items-center justify-center gap-1.5 py-3">
              <UIcon
                name="i-lucide-layout-dashboard"
                class="size-10 text-amber-600 dark:text-amber-300"
              />
              <UIcon
                name="i-lucide-arrow-right"
                class="size-5 text-amber-600 dark:text-amber-300"
              />
              <div class="flex flex-col gap-0.5">
                <UIcon
                  name="i-lucide-database"
                  class="size-5 text-amber-600 dark:text-amber-300"
                />
                <UIcon
                  name="i-lucide-database"
                  class="size-5 text-amber-600 dark:text-amber-300"
                />
                <UIcon
                  name="i-lucide-database"
                  class="size-5 text-amber-600 dark:text-amber-300"
                />
              </div>
            </div>
            <div class="text-base font-bold text-zinc-900 dark:text-white">
              One app, many datasets
            </div>
            <p class="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              A dashboard pulling in several datasets — e.g., layered crime stats by year.
            </p>
          </div>

          <!-- Card 4: Shared dataset (violet) -->
          <div class="rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 dark:bg-violet-500/10">
            <div class="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
              Pattern 4
            </div>
            <div class="mb-4 flex items-center justify-center gap-1.5 py-3">
              <div class="flex flex-col gap-0.5">
                <UIcon
                  name="i-lucide-layout-dashboard"
                  class="size-7 text-violet-600 dark:text-violet-300"
                />
                <UIcon
                  name="i-lucide-layout-dashboard"
                  class="size-7 text-violet-600 dark:text-violet-300"
                />
              </div>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-5 text-violet-600 dark:text-violet-300"
              />
              <UIcon
                name="i-lucide-database"
                class="size-10 text-violet-600 dark:text-violet-300"
              />
            </div>
            <div class="text-base font-bold text-zinc-900 dark:text-white">
              Shared dataset
            </div>
            <p class="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              The same dataset feeding more than one dashboard.
            </p>
          </div>
        </div>

        <!-- Schema-supported tile -->
        <div class="mt-6 rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 p-5">
          <div class="flex items-start gap-3">
            <UIcon
              name="i-lucide-circle-check-big"
              class="mt-0.5 size-6 shrink-0 text-emerald-700 dark:text-emerald-300"
            />
            <p class="text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              All four patterns: schema-supported in Strapi 5 today.
              <span class="block pt-1 text-sm font-normal text-zinc-700 dark:text-zinc-300">
                The work for Hub 2.0 is editorial — curating which datasets belong to which apps, not building anything new at the data layer.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. TL;DR -->
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
            The point
          </span>
        </div>
        <h2 class="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          Hub 2.0 inherited the structure that <span class="text-sky-700 dark:text-sky-400">already works.</span>
        </h2>
        <p class="text-xl leading-relaxed text-zinc-700 sm:text-2xl dark:text-zinc-300">
          This demo exposes the shape so visitors can filter by it. <strong class="text-zinc-900 dark:text-white">"Works"</strong> isn't abstract — it's measurable: <strong class="text-zinc-900 dark:text-white">36,800 hub visitors and 232K pageviews</strong> in the last twelve months, top articles ranking on Google for years, plus citations now coming in from ChatGPT and external sites. Hub 2.0 keeps every URL, every ranking, and every citation intact — and streamlines the path to all of it.
        </p>
      </div>
    </section>

    <!-- 7.5 HUB 1.0 BY THE NUMBERS — proof of the 'works' claim above -->
    <section class="border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:from-[#0a0a0a] dark:to-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
          <span>Hub 1.0 by the numbers</span>
          <span class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-emerald-700 dark:text-emerald-300">last 12 months · Plausible analytics</span>
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Don't just say it <span class="text-emerald-700 dark:text-emerald-400">works</span>. Show it.
        </h2>
        <p class="mb-8 max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          The TL;DR above claims the structure works. Here's the receipt — twelve months of live traffic on <code class="text-emerald-700 dark:text-emerald-400">/researchhub/</code>, pulled straight from Plausible analytics on icjia.illinois.gov.
        </p>

        <!-- 4-tile stat strip -->
        <div class="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <div class="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-5 dark:bg-emerald-500/10">
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <UIcon
                name="i-lucide-eye"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-emerald-700 sm:text-5xl dark:text-emerald-400">
              232K
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              pageviews on hub articles
            </div>
          </div>
          <div class="rounded-2xl border-2 border-sky-500 bg-sky-50 p-5 dark:bg-sky-500/10">
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-700 dark:text-sky-300">
              <UIcon
                name="i-lucide-users"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-sky-700 sm:text-5xl dark:text-sky-400">
              36.8K
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              unique visitors to the hub
            </div>
          </div>
          <div class="rounded-2xl border-2 border-amber-500 bg-amber-50 p-5 dark:bg-amber-500/10">
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300">
              <UIcon
                name="i-lucide-pie-chart"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-amber-700 sm:text-5xl dark:text-amber-400">
              ~70%
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              of all icjia.illinois.gov visitors land on the hub
            </div>
          </div>
          <div class="rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 dark:bg-violet-500/10">
            <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-700 dark:text-violet-300">
              <UIcon
                name="i-lucide-clock"
                class="size-5"
              />
            </div>
            <div class="text-4xl font-black tracking-tight text-violet-700 sm:text-5xl dark:text-violet-400">
              16 min
            </div>
            <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              average time spent reading on the hub
            </div>
          </div>
        </div>

        <!-- Top 5 articles -->
        <div class="mb-8 rounded-2xl border-2 border-emerald-500 bg-white p-7 dark:bg-zinc-900">
          <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
            The hub's evergreen hits
          </div>
          <h3 class="mb-1 text-lg font-bold text-zinc-900 sm:text-xl dark:text-white">
            Five most-read articles, last 12 months
          </h3>
          <p class="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
            Each one is exactly the kind of article a manager would search for as a "summary" or "research report" — and each one's bounce rate (60–67%) is in line with the hub-wide average, meaning these readers come, read, and leave satisfied.
          </p>

          <ol class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-emerald-700 dark:text-emerald-300">1</span>
              <div class="flex-1">
                <div class="flex items-start justify-between gap-3">
                  <a
                    href="https://icjia.illinois.gov/researchhub/articles/the-effectiveness-and-implications-of-police-reform-a-review-of-the-literature/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-semibold text-zinc-900 hover:text-emerald-700 hover:underline dark:text-white dark:hover:text-emerald-400"
                  >
                    The Effectiveness and Implications of Police Reform
                  </a>
                  <div class="shrink-0 text-right">
                    <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      6,400 readers
                    </div>
                    <div class="text-[10px] text-zinc-600 dark:text-zinc-400">
                      62% bounce
                    </div>
                  </div>
                </div>
                <div
                  class="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                  aria-hidden="true"
                >
                  <div
                    class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                    style="width: 100%"
                  />
                </div>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-emerald-700 dark:text-emerald-300">2</span>
              <div class="flex-1">
                <div class="flex items-start justify-between gap-3">
                  <a
                    href="https://icjia.illinois.gov/researchhub/articles/understanding-police-officer-stress-a-review-of-the-literature/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-semibold text-zinc-900 hover:text-emerald-700 hover:underline dark:text-white dark:hover:text-emerald-400"
                  >
                    Understanding Police Officer Stress
                  </a>
                  <div class="shrink-0 text-right">
                    <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      6,200 readers
                    </div>
                    <div class="text-[10px] text-zinc-600 dark:text-zinc-400">
                      62% bounce
                    </div>
                  </div>
                </div>
                <div
                  class="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                  aria-hidden="true"
                >
                  <div
                    class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                    style="width: 97%"
                  />
                </div>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-emerald-700 dark:text-emerald-300">3</span>
              <div class="flex-1">
                <div class="flex items-start justify-between gap-3">
                  <a
                    href="https://icjia.illinois.gov/researchhub/articles/the-victim-offender-overlap-examining-the-relationship-between-victimization-and-offending/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-semibold text-zinc-900 hover:text-emerald-700 hover:underline dark:text-white dark:hover:text-emerald-400"
                  >
                    The Victim-Offender Overlap
                  </a>
                  <div class="shrink-0 text-right">
                    <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      5,900 readers
                    </div>
                    <div class="text-[10px] text-zinc-600 dark:text-zinc-400">
                      67% bounce
                    </div>
                  </div>
                </div>
                <div
                  class="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                  aria-hidden="true"
                >
                  <div
                    class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                    style="width: 92%"
                  />
                </div>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-emerald-700 dark:text-emerald-300">4</span>
              <div class="flex-1">
                <div class="flex items-start justify-between gap-3">
                  <a
                    href="https://icjia.illinois.gov/researchhub/articles/the-2021-safe-t-act-icjia-roles-and-responsibilities/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-semibold text-zinc-900 hover:text-emerald-700 hover:underline dark:text-white dark:hover:text-emerald-400"
                  >
                    The 2021 SAFE-T Act: ICJIA Roles and Responsibilities
                  </a>
                  <div class="shrink-0 text-right">
                    <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      5,800 readers
                    </div>
                    <div class="text-[10px] text-zinc-600 dark:text-zinc-400">
                      64% bounce
                    </div>
                  </div>
                </div>
                <div
                  class="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                  aria-hidden="true"
                >
                  <div
                    class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                    style="width: 91%"
                  />
                </div>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-emerald-700 dark:text-emerald-300">5</span>
              <div class="flex-1">
                <div class="flex items-start justify-between gap-3">
                  <a
                    href="https://icjia.illinois.gov/researchhub/articles/mental-illness-and-violence-is-there-a-link/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-semibold text-zinc-900 hover:text-emerald-700 hover:underline dark:text-white dark:hover:text-emerald-400"
                  >
                    Mental Illness and Violence: Is There a Link?
                  </a>
                  <div class="shrink-0 text-right">
                    <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      4,300 readers
                    </div>
                    <div class="text-[10px] text-zinc-600 dark:text-zinc-400">
                      62% bounce
                    </div>
                  </div>
                </div>
                <div
                  class="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                  aria-hidden="true"
                >
                  <div
                    class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                    style="width: 67%"
                  />
                </div>
              </div>
            </li>
          </ol>

          <p class="mt-5 text-xs text-zinc-600 dark:text-zinc-400">
            <UIcon
              name="i-lucide-external-link"
              class="-mt-0.5 mr-1 inline size-3.5"
            />
            Each title links to the live article on the production hub. Reader counts are unique visitors over the last 12 months.
          </p>
        </div>

        <!-- Closing — back to the point -->
        <div class="rounded-2xl border-2 border-sky-500 bg-sky-500/10 p-5">
          <div class="flex items-start gap-3">
            <UIcon
              name="i-lucide-target"
              class="mt-0.5 size-6 shrink-0 text-sky-700 dark:text-sky-300"
            />
            <p class="text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              That's what "already works" looks like.
              <span class="block pt-1 text-sm font-normal text-zinc-700 dark:text-zinc-300">
                Real visitors. Real reading time. Real Google rankings. Real AI citations. Hub 2.0 keeps the entire stack — URLs, rankings, citations, content — and just streamlines the path to it.
                <NuxtLink
                  to="/"
                  class="ml-1 inline-block font-semibold text-sky-700 underline-offset-2 hover:underline dark:text-sky-400"
                >
                  More traffic context on the home page →
                </NuxtLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. DEEP DIVES -->
    <section class="bg-white px-6 py-14 sm:px-12 lg:px-16 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          Deeper look
        </div>
        <h2 class="mb-7 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          More to explore.
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
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
                What else this demo shows
              </div>
            </div>
            <p class="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Search highlighting, click-to-filter authors, additive tags, the five ICJIA Centers — seven small upgrades that make the catalog easier to navigate.
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
                Back to the home page
              </div>
            </div>
            <p class="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The visual orientation: articles ≡ summaries, the 14-type bucket, and three filter layouts to try.
            </p>
            <div class="text-xs font-semibold uppercase tracking-[0.04em] text-amber-600 group-hover:underline dark:text-amber-500">
              / →
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ArticleTypeExamplesModal
      v-model:open="isExamplesOpen"
      :type-value="selectedTypeForModal"
      :articles="rawArticles"
      illustrative-fill
    />
  </div>
</template>
