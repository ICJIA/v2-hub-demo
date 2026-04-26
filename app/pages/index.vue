<script setup lang="ts">
const PAGE_TITLE = 'ICJIA Research Hub — Filter Demo'
// Short description for the <meta name="description"> tag — kept under
// 160 chars for SEO/social-preview tools. The richer prose for AI
// summarizers lives in the JSON-LD WebPage block below.
const PAGE_DESCRIPTION = 'How Hub 2.0 organizes ICJIA research: "Articles" is the umbrella for fourteen publication types — including research reports. Three filter layouts to try.'
const PAGE_DESCRIPTION_LONG = 'How Hub 2.0 organizes ICJIA research: "Articles" is the umbrella for fourteen publication types — research reports, annual reports, program evaluations, updates, strategic plans, and more. Three filter UX layouts compare against the same dataset; every type is one click away.'
const PAGE_URL = 'https://v2-hub-demo.netlify.app/'
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
        'description': PAGE_DESCRIPTION_LONG,
        'inLanguage': 'en-US',
        'datePublished': '2026-04-15',
        'dateModified': '2026-04-26',
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
        },
        'about': {
          '@type': 'Thing',
          'name': 'ICJIA Research Hub data taxonomy and publication-type filter UX'
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

// Home uses fillRandom so every type pill in the diagram has examples to show
// in the modal — this is a POC demo and most articles in the live CMS aren't
// yet tagged with a type.
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
          A short orientation
        </div>
        <h1 class="mb-4 text-5xl font-black leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
          How Hub 2.0 organizes<br>ICJIA research.
        </h1>
        <p class="mb-7 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          "Articles" is the umbrella for everything published on the hub — research reports, annual reports, program evaluations, and ten more types. <span class="font-semibold text-zinc-900 dark:text-white">The Hub 2.0 migration carried Hub 1.0's structure forward intact</span>, so all of it is already here. This demo just shows how to pull out exactly what you need in one click.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="#views"
            label="See it filtered"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            variant="solid"
            class="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            size="lg"
          />
          <UButton
            to="/taxonomy"
            label="How the data is organized"
            color="neutral"
            variant="outline"
            class="border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
            size="lg"
          />
        </div>
      </div>
    </section>

    <!-- 2. WHY THIS DEMO -->
    <section class="border-y border-zinc-200 bg-gradient-to-b from-white to-zinc-50 px-6 py-12 sm:px-12 lg:px-16 dark:border-zinc-800 dark:from-[#0a0a0a] dark:to-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">
          Why this demo
        </div>
        <h2 class="mb-6 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          Every research report on the hub is already an article.
        </h2>

        <!-- Equivalence visual -->
        <div class="my-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <div class="w-full max-w-xs rounded-2xl border-2 border-amber-500 bg-amber-500/10 px-8 py-6 text-center sm:w-auto">
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
              Database term
            </div>
            <div class="mt-2 text-4xl font-black tracking-tight text-amber-600 sm:text-5xl dark:text-amber-400">
              articles
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
              Plain English
            </div>
            <div class="mt-2 text-4xl font-black tracking-tight text-sky-700 sm:text-5xl dark:text-sky-300">
              summaries
            </div>
          </div>
        </div>
        <p class="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          That equivalence was the original mission of Hub 1.0.
        </p>

        <div class="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            This demo exists because of a fair question raised at a recent ICJIA staff meeting. Staff said, reasonably: <strong class="text-zinc-900 dark:text-white">"Hey, I just want to find research reports."</strong> That's exactly what the hub should let them do.
          </p>
          <p>
            A small misunderstanding came up next. The assumption was that <em>"articles"</em> and <em>"research reports"</em> are two separate kinds of things in the database — and that the research reports were somehow missing.
          </p>
          <p class="rounded-2xl border-2 border-amber-400 bg-amber-50 px-5 py-4 text-xl font-extrabold leading-snug text-zinc-900 sm:text-2xl dark:border-amber-500/60 dark:bg-amber-500/10 dark:text-white">
            They're not missing. <span class="text-amber-700 dark:text-amber-400">Research reports <em>are</em> articles.</span>
          </p>
          <p>
            "Articles" is the database's umbrella term for everything published on the hub. "Research Report" is just <strong class="text-zinc-900 dark:text-white">one of fourteen types of article</strong> — alongside annual reports, program evaluations, updates, strategic plans, and nine more. A research report is an article that happens to be tagged with the type "Research Report." Same goes for annual reports, evaluations, and the rest.
          </p>
          <p>
            So the fix is already in place. Click <strong class="text-zinc-900 dark:text-white">Research Reports</strong> on any view below and the list narrows to exactly those. The database has supported this since Hub 1.0 — the demo just exposes it. (See <em>Why "articles" and not "summaries"?</em> below for the naming history.)
          </p>
        </div>
      </div>
    </section>

    <!-- 3. STAT STRIP -->
    <section class="border-b border-zinc-200 bg-white px-6 py-10 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <UIcon
              name="i-lucide-newspaper"
              class="size-5"
            />
          </div>
          <div class="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            {{ articleCountLabel }}
          </div>
          <div class="mt-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            articles in the catalog
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
            types inside Articles
          </div>
        </div>
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
            filter layouts to compare
          </div>
        </div>
        <div class="rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 dark:bg-violet-500/10">
          <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-700 dark:text-violet-300">
            <UIcon
              name="i-lucide-mouse-pointer-click"
              class="size-5"
            />
          </div>
          <div class="text-4xl font-black tracking-tight text-violet-700 sm:text-5xl dark:text-violet-400">
            1
          </div>
          <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            click to find what you need
          </div>
        </div>
      </div>
    </section>

    <!-- 4. THE DIAGRAM -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          The hub at a glance
        </div>
        <h2 class="mb-2 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          Three top-level content types. We're zooming into Articles.
        </h2>
        <p class="mb-7 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
          The hub holds three peer buckets. Datasets and Apps/Dashboards are out of scope for this filter demo — but they exist alongside Articles, not inside it.
        </p>

        <!-- 3-content-type ribbon -->
        <div class="mb-4 grid gap-3 sm:grid-cols-3">
          <div class="rounded-xl border-2 border-amber-500 bg-amber-500/10 p-4">
            <div class="text-[10px] font-bold uppercase tracking-[0.1em] text-amber-700 dark:text-amber-400">
              Content type 1 of 3
            </div>
            <div class="mt-1 flex items-baseline gap-2 text-base font-extrabold text-zinc-900 dark:text-white">
              <UIcon
                name="i-lucide-library"
                class="size-5 text-amber-600 dark:text-amber-400"
              />
              Articles
              <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400">{{ articleCountLabel }} items</span>
            </div>
            <div class="mt-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
              ↓ filter demo focuses here
            </div>
          </div>
          <div class="rounded-xl border border-zinc-300 bg-zinc-100/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div class="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-600 dark:text-zinc-400">
              Content type 2 of 3
            </div>
            <div class="mt-1 flex items-baseline gap-2 text-base font-bold text-zinc-700 dark:text-zinc-300">
              <UIcon
                name="i-lucide-database"
                class="size-5 text-zinc-600 dark:text-zinc-400"
              />
              Datasets
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              separate top-level type
            </div>
          </div>
          <div class="rounded-xl border border-zinc-300 bg-zinc-100/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div class="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-600 dark:text-zinc-400">
              Content type 3 of 3
            </div>
            <div class="mt-1 flex items-baseline gap-2 text-base font-bold text-zinc-700 dark:text-zinc-300">
              <UIcon
                name="i-lucide-layout-dashboard"
                class="size-5 text-zinc-600 dark:text-zinc-400"
              />
              Apps / Dashboards
            </div>
            <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              separate top-level type
            </div>
          </div>
        </div>

        <!-- Zoom cue -->
        <div class="mb-2 text-center text-amber-600 dark:text-amber-500">
          <UIcon
            name="i-lucide-chevron-down"
            class="size-6"
          />
        </div>

        <h3 class="mb-4 text-lg font-bold leading-tight text-zinc-900 sm:text-xl dark:text-white">
          Inside Articles: 14 types of summaries. <span class="font-medium text-zinc-600 dark:text-zinc-400">Go ahead. Try it. Click.</span>
        </h3>

        <!-- Articles bucket with type grid -->
        <div class="relative rounded-2xl border-2 border-amber-500 bg-white p-7 dark:bg-zinc-900">
          <div class="absolute -top-3 left-5 rounded bg-amber-500 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.06em] text-zinc-950">
            <UIcon
              name="i-lucide-library"
              class="-mt-1 mr-0.5 inline size-4"
            />
            Articles
          </div>

          <HubArticleTypeGrid
            :articles="rawArticles"
            variant="compact"
            highlight="researchReport"
            color-family="auto"
            @select="showExamples"
          />

          <div class="mt-4 flex flex-col gap-3 border-t border-dashed border-zinc-300 pt-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
            <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <span><span class="text-amber-600 dark:text-amber-400">●</span> chip on every view</span>
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

        <p class="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
          All fourteen are in here. The chip row on every view filters to whichever one you need — pick "Research Report," click it, you're done. Same goes for any other type.
        </p>
      </div>
    </section>

    <!-- 5. NAMING NOTE -->
    <section class="border-b border-amber-300/50 bg-amber-50 px-6 py-8 sm:px-12 lg:px-16 dark:border-amber-500/15 dark:bg-amber-500/5">
      <div class="mx-auto flex max-w-5xl gap-4">
        <UIcon
          name="i-lucide-notebook-pen"
          class="mt-1 size-5 shrink-0 text-amber-600 dark:text-amber-400"
        />
        <div>
          <h3 class="mb-2 text-base font-bold text-amber-700 dark:text-amber-400">
            Why "articles" — and not "summaries"?
          </h3>
          <div class="space-y-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              "Summaries" was on the table during Hub 1.0 planning. Over several weeks and several name changes, we kept running into the same problem: an article <em>can</em> be a summary of an attached research report or annual report — but it can also stand on its own, a standalone piece with no attached PDF at all. "Summaries" didn't fit that case.
            </p>
            <p>
              We landed on <strong class="text-amber-700 dark:text-amber-400">articles</strong> because it was both <strong>more general</strong> (a publishing platform can carry many kinds of digital pieces, including standalone articles) and <strong>more specific</strong> (an "article" is a familiar concept — exactly what you'd expect on a publishing platform). The hub was always meant to be a publishing platform first; "articles" was the umbrella that fit that identity.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5.5 TL;DR — the point, in one breath -->
    <section class="border-y-4 border-amber-500 bg-amber-100/40 px-6 py-16 sm:px-12 lg:px-16 dark:border-amber-500/80 dark:bg-amber-500/10">
      <div class="mx-auto max-w-4xl">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex size-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg">
            <UIcon
              name="i-lucide-zap"
              class="size-6"
            />
          </div>
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-amber-800 sm:text-sm dark:text-amber-300">
            This is a lot. What's the point?
          </span>
        </div>
        <h2 class="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          Every research report on the hub is <span class="text-amber-700 dark:text-amber-400">one click</span> away.
        </h2>
        <p class="text-xl leading-relaxed text-zinc-700 sm:text-2xl dark:text-zinc-300">
          They're filed under <strong class="text-amber-700 dark:text-amber-400">"Articles"</strong> alongside thirteen other publication types. Click <strong class="text-zinc-900 dark:text-white">Research Reports</strong> on any of the three layouts below. Done.
        </p>
      </div>
    </section>

    <!-- 5.7 TAKEAWAYS — for the busy manager -->
    <section class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
            <UIcon
              name="i-lucide-list-checks"
              class="size-6"
            />
          </div>
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm dark:text-emerald-300">
            Got other meetings?
          </span>
        </div>
        <h2 class="mb-8 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Five takeaways. <span class="text-emerald-700 dark:text-emerald-400">Skim and go.</span>
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <span class="text-lg font-black">1</span>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              All research reports are already on the hub.
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              They're filed under "Articles" — the database's umbrella label for everything published.
            </p>
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <span class="text-lg font-black">2</span>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              "Articles" holds 14 publication types.
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Research reports, annual reports, program evaluations, updates, strategic plans, plus nine more.
            </p>
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <span class="text-lg font-black">3</span>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              Click any type to filter.
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              The chip row on every view ("Research Reports," "Annual Reports," etc.) is the one-click answer.
            </p>
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <span class="text-lg font-black">4</span>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              Three layouts to compare.
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              View 0 (chips + advanced toggle), View 1 (dropdowns only), View 2 (chips + always-on bar). Pick a winner.
            </p>
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:col-span-2 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <span class="text-lg font-black">5</span>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              Hub 2.0 inherited Hub 1.0's data structure intact.
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Nothing's missing — the demo just exposes what's already there.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. THREE VIEWS -->
    <section
      id="views"
      class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]"
    >
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          Try it yourself
        </div>
        <h2 class="mb-2 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          Here are three layouts. Same data behind all of them. <span class="font-medium text-zinc-600 dark:text-zinc-400">Go ahead. Click.</span>
        </h2>
        <p class="mb-7 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
          They differ only in how much filter machinery sits on screen at any given moment. Click any one and try filtering to "Research Report" — that's the test.
        </p>

        <div class="grid gap-4 md:grid-cols-3">
          <NuxtLink
            to="/view0"
            class="group block overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-sky-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-400/60 dark:focus-visible:ring-sky-400"
          >
            <div class="h-1 bg-sky-500 dark:bg-sky-400" />
            <div class="p-4">
              <div class="text-[10px] font-bold uppercase tracking-[0.1em] text-sky-600 dark:text-sky-400">
                View 0 · /view0
              </div>
              <div class="my-2 text-lg font-bold text-zinc-900 dark:text-white">
                Chips + Advanced
              </div>
              <div class="my-3 flex flex-wrap gap-1.5">
                <span class="rounded-full bg-zinc-900 px-2.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-950">All</span>
                <span class="rounded-full border border-amber-500 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">Research Reports</span>
                <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">Annual</span>
              </div>
              <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Quick chips at the top. Full filter bar hidden behind a toggle. Friendliest first impression.
              </p>
              <div class="mt-3 text-xs font-semibold text-sky-600 group-hover:underline dark:text-sky-400">
                Open View 0 →
              </div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/view1"
            class="group block overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-emerald-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-400/60 dark:focus-visible:ring-emerald-400"
          >
            <div class="h-1 bg-emerald-500 dark:bg-emerald-400" />
            <div class="p-4">
              <div class="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-600 dark:text-emerald-400">
                View 1 · /view1
              </div>
              <div class="my-2 text-lg font-bold text-zinc-900 dark:text-white">
                Dropdowns only
              </div>
              <div class="my-3 flex flex-col gap-1">
                <span class="rounded border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Type ▾</span>
                <span class="rounded border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Topic ▾</span>
                <span class="rounded border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Year ▾</span>
              </div>
              <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                All filtering in dropdowns. Closest to the live site today.
              </p>
              <div class="mt-3 text-xs font-semibold text-emerald-600 group-hover:underline dark:text-emerald-400">
                Open View 1 →
              </div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/view2"
            class="group block overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-violet-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-400/60 dark:focus-visible:ring-violet-400"
          >
            <div class="h-1 bg-violet-500 dark:bg-violet-400" />
            <div class="p-4">
              <div class="text-[10px] font-bold uppercase tracking-[0.1em] text-violet-600 dark:text-violet-400">
                View 2 · /view2
              </div>
              <div class="my-2 text-lg font-bold text-zinc-900 dark:text-white">
                Chips + always-on bar
              </div>
              <div class="my-3 flex flex-wrap gap-1.5">
                <span class="rounded-full bg-zinc-900 px-2.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-950">All</span>
                <span class="rounded-full border border-amber-500 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">Research</span>
              </div>
              <div class="my-3 flex gap-1.5">
                <span class="rounded border border-zinc-300 bg-zinc-100 px-2 py-0.5 text-[9px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Topic ▾</span>
                <span class="rounded border border-zinc-300 bg-zinc-100 px-2 py-0.5 text-[9px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Years ▾</span>
              </div>
              <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Both at once. Maximum flexibility, more visual weight.
              </p>
              <div class="mt-3 text-xs font-semibold text-violet-600 group-hover:underline dark:text-violet-400">
                Open View 2 →
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 6.5 AUTHOR NORMALIZATION — one more under-the-hood fix -->
    <section class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex size-12 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg">
            <UIcon
              name="i-lucide-merge"
              class="size-6"
            />
          </div>
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 sm:text-sm dark:text-violet-300">
            One more thing we fixed
          </span>
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Same person, listed <span class="text-violet-700 dark:text-violet-400">seven different ways.</span>
        </h2>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          Authors come out of the CMS under multiple labels — credentials, casing, stray whitespace, "&" versus "and." Without a fix, the Authors dropdown would list one person seven times. The demo merges every variant onto a single canonical key.
        </p>

        <div class="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <!-- BEFORE -->
          <div class="rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
              What the CMS delivers
            </div>
            <ul class="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li class="rounded border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950">
                Jane Carter
              </li>
              <li class="rounded border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950">
                Jane Carter, Ph.D
              </li>
              <li class="rounded border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950">
                Jane Carter, PhD
              </li>
              <li class="rounded border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950">
                Jane Carter, M.A., M.P.A.
              </li>
              <li class="rounded border border-zinc-200 bg-white px-3 py-2 font-bold dark:border-zinc-700 dark:bg-zinc-950">
                JANE CARTER
              </li>
              <li class="rounded border border-zinc-200 bg-white px-3 py-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-950">
                ··Jane  Carter··
              </li>
              <li class="rounded border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950">
                Jane Carter, MSW, LCSW
              </li>
            </ul>
          </div>

          <!-- ARROW + label -->
          <div class="flex items-center justify-center py-2">
            <div class="flex flex-col items-center gap-2 md:gap-3">
              <UIcon
                name="i-lucide-arrow-down"
                class="size-10 text-violet-500 md:hidden"
              />
              <UIcon
                name="i-lucide-arrow-right"
                class="hidden size-12 text-violet-500 md:block"
              />
              <code class="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-700 dark:text-violet-300">
                authorKey()
              </code>
            </div>
          </div>

          <!-- AFTER -->
          <div class="rounded-2xl border-2 border-violet-500 bg-violet-500/10 p-5">
            <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
              What the filter shows
            </div>
            <div class="rounded-xl border border-violet-500/40 bg-white p-5 shadow-sm dark:bg-zinc-900">
              <div class="flex items-center justify-between gap-3">
                <span class="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Jane Carter</span>
                <span class="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-bold text-violet-700 dark:text-violet-300">7 articles</span>
              </div>
              <div class="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                canonical key: <code class="text-violet-700 dark:text-violet-300">jane carter</code>
              </div>
            </div>
            <p class="mt-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              One entry. One click. Every variant on every article matches.
            </p>
          </div>
        </div>

        <!-- The five steps -->
        <div class="mt-12">
          <div class="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
            <UIcon
              name="i-lucide-list-ordered"
              class="size-4"
            />
            Five normalization steps, in order
          </div>
          <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
                1
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Drop credentials
              </div>
              <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Cut everything after the first comma. <em>Jane Carter, PhD</em> → <em>Jane Carter</em>.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
                2
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Unify ampersands
              </div>
              <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                <em>Forensics &amp; Policy Lab</em> → <em>Forensics and Policy Lab</em>.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
                3
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Collapse spaces
              </div>
              <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                <em>Jane &nbsp;&nbsp;Carter</em> (double space) → <em>Jane Carter</em>.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
                4
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Trim whitespace
              </div>
              <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                <em>"  Jane Carter "</em> → <em>"Jane Carter"</em>.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-700 dark:text-violet-300">
                5
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Lowercase
              </div>
              <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                <em>JANE CARTER</em> → <em>jane carter</em>.
              </div>
            </div>
          </div>
          <p class="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            The display name shown in the dropdown is the most-frequent variant in the dataset (ties go to the shortest, which usually means the clean form without credentials). The same approach merges the five canonical ICJIA Centers across the "&" / "and" split.
          </p>
        </div>
      </div>
    </section>

    <!-- 7. DEEP DIVES -->
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
                How the data is organized
              </div>
            </div>
            <p class="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              A plain-language tour of the underlying data model. Two diagrams. The fourteen article types as clickable cards with real examples from the catalog.
            </p>
            <div class="text-xs font-semibold uppercase tracking-[0.04em] text-sky-600 group-hover:underline dark:text-sky-400">
              /taxonomy →
            </div>
          </NuxtLink>

          <NuxtLink
            to="/about"
            class="group block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-amber-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div class="mb-2 flex items-center gap-2.5">
              <div class="flex size-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-500">
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
              Search highlighting, click-to-filter authors, additive tags, the five ICJIA centers — seven small upgrades that make the catalog easier to navigate.
            </p>
            <div class="text-xs font-semibold uppercase tracking-[0.04em] text-amber-600 group-hover:underline dark:text-amber-500">
              /about →
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
