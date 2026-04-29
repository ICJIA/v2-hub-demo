<script setup lang="ts">
const PAGE_TITLE = 'ICJIA Research Hub — Filter Demo'
// Short description for the <meta name="description"> tag — kept under
// 160 chars for SEO/social-preview tools. The richer prose for AI
// summarizers lives in the JSON-LD WebPage block below.
const PAGE_DESCRIPTION = 'How Hub 2.0 organizes ICJIA research: "Articles" is the umbrella for fourteen publication types — including research reports. Current + three proposed UX views to try.'
const PAGE_DESCRIPTION_LONG = 'How Hub 2.0 organizes ICJIA research: "Articles" is the umbrella for fourteen publication types — research reports, annual reports, program evaluations, updates, strategic plans, and more. Current + three proposed UX views compare against the same dataset; every type is one click away.'
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
const morePlausibleOpen = ref(false)

type ContentTypeId = 'articles' | 'datasets' | 'apps'
const selectedContentType = ref<ContentTypeId | null>(null)
const isContentTypeOpen = ref(false)

function openContentType(id: ContentTypeId) {
  selectedContentType.value = id
  isContentTypeOpen.value = true
}

function showExamples(typeValue: string) {
  selectedTypeForModal.value = typeValue
  isExamplesOpen.value = true
}
</script>

<template>
  <div class="bg-white text-zinc-900 dark:bg-[#0a0a0a] dark:text-[#fafafa]">
    <!-- 0. FROM RECENT MEETINGS — page anchor (first section, edge-to-edge) -->
    <section
      id="from-meetings"
      class="border-b-2 border-zinc-200 bg-gradient-to-b from-zinc-100 to-zinc-50 px-6 pt-20 pb-20 sm:px-12 sm:pt-28 sm:pb-24 lg:px-16 dark:border-zinc-800 dark:from-[#101013] dark:to-[#0a0a0a]"
    >
      <div class="mx-auto max-w-7xl">
        <div class="mb-8 flex items-center gap-3">
          <div class="flex size-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl dark:bg-zinc-100 dark:text-zinc-900">
            <UIcon
              name="i-lucide-message-square-quote"
              class="size-7"
            />
          </div>
          <span class="text-sm font-bold uppercase tracking-[0.2em] text-zinc-700 sm:text-base dark:text-zinc-300">
            From recent meetings
          </span>
        </div>
        <h1 class="mb-6 text-5xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
          Three concerns came up in recent Hub 2.0 meetings.
          <br><span class="text-zinc-400 dark:text-zinc-500">Here are three proposed solutions.</span>
        </h1>
        <p class="mb-4 max-w-3xl text-lg leading-relaxed text-zinc-700 sm:text-xl dark:text-zinc-300">
          Each one has a hands-on demo on this page — built and clickable, not slides. Click a card to jump straight to its solution, or read on for the orientation that motivated each fix.
        </p>
        <p class="mb-12 rounded-2xl border-2 border-emerald-500 bg-emerald-50 px-5 py-4 text-base font-semibold leading-relaxed text-zinc-900 sm:text-lg dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-white">
          <span class="text-emerald-700 dark:text-emerald-400">The good news:</span> all three are either already built into the Hub or straightforward to add. <span class="mt-2 block text-sm font-normal text-zinc-700 sm:text-base dark:text-zinc-300">That's what this site is for — <em>answering these three questions (plus several others raised during meetings),</em> and offering a working glimpse of the ICJIA Research Hub publishing platform itself.</span>
        </p>

        <div class="grid gap-5 md:grid-cols-3">
          <!-- Concern 1 — Research Reports (sky) -->
          <a
            href="#views"
            class="group block rounded-2xl border-2 border-sky-500 bg-white p-6 transition-colors hover:bg-sky-500/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-zinc-900 dark:hover:bg-sky-500/10"
          >
            <div class="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
              <UIcon
                name="i-lucide-message-circle"
                class="size-3"
              />
              Concern 1
            </div>
            <p class="mb-4 text-lg font-bold italic leading-snug text-zinc-900 dark:text-white">
              "I can't find the research reports."
            </p>
            <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400">
              Solution 1 — Research Reports in one click
            </div>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              They're filed under <strong class="text-zinc-900 dark:text-white">Articles</strong> alongside thirteen other types. The proposed views surface them as a one-click chip.
            </p>
            <div class="mt-3 text-xs font-semibold text-sky-700 group-hover:underline dark:text-sky-400">
              Jump to the three layouts ↓
            </div>
          </a>

          <!-- Concern 2 — Search Highlighting (emerald) -->
          <a
            href="#search-highlighting"
            class="group block rounded-2xl border-2 border-emerald-500 bg-white p-6 transition-colors hover:bg-emerald-500/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-zinc-900 dark:hover:bg-emerald-500/10"
          >
            <div class="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
              <UIcon
                name="i-lucide-message-circle"
                class="size-3"
              />
              Concern 2
            </div>
            <p class="mb-4 text-lg font-bold italic leading-snug text-zinc-900 dark:text-white">
              "Search returns results, but I can't see why they matched."
            </p>
            <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
              Solution 2 — Search Highlighting
            </div>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Every occurrence of the query gets wrapped inline in a <code class="rounded bg-zinc-100 px-1 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">&lt;mark&gt;</code> — title and abstract, every match.
            </p>
            <div class="mt-3 text-xs font-semibold text-emerald-700 group-hover:underline dark:text-emerald-400">
              Jump to highlighting ↓
            </div>
          </a>

          <!-- Concern 3 — Author Names (violet) -->
          <a
            href="#author-normalization"
            class="group block rounded-2xl border-2 border-violet-500 bg-white p-6 transition-colors hover:bg-violet-500/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:bg-zinc-900 dark:hover:bg-violet-500/10"
          >
            <div class="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
              <UIcon
                name="i-lucide-message-circle"
                class="size-3"
              />
              Concern 3
            </div>
            <p class="mb-4 text-lg font-bold italic leading-snug text-zinc-900 dark:text-white">
              "The same author shows up seven different ways."
            </p>
            <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
              Solution 3 — Author Names
            </div>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Five small text-cleaning steps merge every spelling variant onto a single matched-up entry. One author, one count, one click.
            </p>
            <div class="mt-3 text-xs font-semibold text-violet-700 group-hover:underline dark:text-violet-400">
              Jump to author names ↓
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 0.5 WHAT HUB 2.0 IS — Hub 1.0 was the original publishing platform; Hub 2.0 refines it -->
    <section
      id="what-hub-2-is"
      class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]"
    >
      <div class="mx-auto max-w-5xl">
        <div class="mb-4 flex items-center gap-3">
          <div class="flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
            <UIcon
              name="i-lucide-book-open-text"
              class="size-6"
            />
          </div>
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm dark:text-emerald-300">
            The publishing platform
          </span>
        </div>
        <h2 class="mb-3 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          Hub 1.0 was the original <span class="text-emerald-700 dark:text-emerald-400">publishing platform.</span>
        </h2>
        <p class="mb-6 max-w-3xl text-2xl font-bold leading-snug text-zinc-700 sm:text-3xl dark:text-zinc-300">
          Hub 2.0 <span class="text-emerald-700 dark:text-emerald-400">refines</span> it.
        </p>
        <div class="max-w-3xl space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            It started with a question that's followed the agency for years — <em class="text-zinc-900 dark:text-white">"What, exactly, does ICJIA do?"</em>
          </p>
          <p>
            <strong class="text-zinc-900 dark:text-white">Hub 1.0's mission was simple:</strong> give R&amp;A authors a platform to publish their work digitally — research reports, evaluations, summaries, the whole catalog of what the agency produces. One place. Public. Citable. Searchable.
          </p>
          <p class="rounded-2xl border-2 border-emerald-500 bg-emerald-50 px-5 py-4 text-xl font-bold leading-snug text-zinc-900 sm:text-2xl dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-white">
            And it worked. <span class="text-emerald-700 dark:text-emerald-400">Hub 1.0 is a success.</span>
          </p>
          <p>
            The numbers below are the proof — over the last twelve months, the hub pulled more traffic than any other part of <code class="rounded bg-zinc-200/60 px-1 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">icjia.illinois.gov</code>. <strong class="text-zinc-900 dark:text-white">Hub 2.0 doesn't change what the platform is.</strong> It refines the look and feel — and how visitors move through the catalog — on top of Hub 1.0's existing content. Same authors, same articles, just easier to find what you're looking for in one or two clicks.
          </p>
        </div>
      </div>
    </section>

    <!-- 3. HUB 1.0 IN NUMBERS — Plausible analytics, last 12 months (proof first) -->
    <section class="border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:from-[#0a0a0a] dark:to-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
          <span>Proof — the hub already works</span>
          <span class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-emerald-700 dark:text-emerald-300">last 12 months (May 2025 – Apr 2026) · Plausible analytics</span>
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          The hub is the <span class="text-emerald-700 dark:text-emerald-400">busiest part</span> of icjia.illinois.gov.
        </h2>
        <p class="mb-7 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          Real visitors. Real reading. Over the last <strong class="text-zinc-900 dark:text-white">twelve months</strong>, the live research hub pulled more traffic than any other part of the agency website — and it's not close. <span class="text-sm">(Numbers from <strong class="text-zinc-900 dark:text-white">Plausible</strong>, a privacy-friendly traffic-measurement tool.)</span>
        </p>

        <!-- 4-tile stat strip: hub-specific traffic -->
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

        <!-- Top 5 articles — bar chart list -->
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
            Each title links to the live article on the production hub. Reader counts are unique visitors over the last 12 months. Bounce rates explained in the callout below.
          </p>
        </div>

        <!-- What's a bounce rate? plain-English callout -->
        <div class="mb-6 rounded-2xl border border-amber-300/60 bg-amber-50 px-6 py-5 dark:border-amber-500/20 dark:bg-amber-500/5">
          <div class="flex gap-3">
            <UIcon
              name="i-lucide-help-circle"
              class="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400"
            />
            <div>
              <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                Background you might want
              </div>
              <h3 class="mb-3 text-base font-bold text-zinc-900 sm:text-lg dark:text-white">
                What's a "bounce"?
              </h3>
              <div class="space-y-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                <p>
                  A <strong class="text-zinc-900 dark:text-white">bounce</strong> is when someone visits a single page on a website and leaves without clicking anything else. The percentage of visits that do that is called the <strong class="text-zinc-900 dark:text-white">bounce rate</strong> — a standard, normal way to analyze website interaction. Plausible reports it on every page.
                </p>
                <p>
                  <strong class="text-zinc-900 dark:text-white">High bounce isn't always bad.</strong> For a research catalog, a visitor who Googles a specific article, reads it carefully, and leaves satisfied counts as a bounce — and that's a successful visit. Low bounce on a content site is the unusual signal, not high bounce.
                </p>
                <p>
                  Last 12 months: the hub's overall bounce is <strong class="text-amber-700 dark:text-amber-400">63%</strong> — typical for content sites and consistent year over year. The more telling number is the hub's homepage at <code class="text-amber-700 dark:text-amber-300">/researchhub/</code>: only <strong class="text-emerald-700 dark:text-emerald-400">27% bounce</strong>. <em>When visitors land at the hub root instead of a specific article, nearly three out of four navigate further.</em> That's exactly the audience the chips below are built for — people looking around for the right thing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- More from Plausible — expandable -->
        <div class="mb-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:bg-zinc-800/50 dark:focus-visible:ring-emerald-400"
            :aria-expanded="morePlausibleOpen"
            @click="morePlausibleOpen = !morePlausibleOpen"
          >
            <div class="flex flex-1 flex-wrap items-center gap-x-2.5 gap-y-1">
              <UIcon
                name="i-lucide-bar-chart-3"
                class="size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
              />
              <span class="text-sm font-bold text-zinc-900 dark:text-white">
                Click here for more from Plausible
              </span>
              <span class="text-xs text-zinc-600 dark:text-zinc-400">
                — traffic sources, devices, monthly trend (same 12-month period)
              </span>
            </div>
            <UIcon
              :name="morePlausibleOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
              class="size-5 shrink-0 text-zinc-500 dark:text-zinc-400"
            />
          </button>
          <div
            v-show="morePlausibleOpen"
            class="border-t border-zinc-200 px-5 py-6 dark:border-zinc-800"
          >
            <div class="space-y-7">
              <!-- Traffic sources -->
              <div>
                <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                  <UIcon
                    name="i-lucide-globe"
                    class="size-3.5"
                  />
                  Where visitors come from
                </div>
                <h4 class="mb-3 text-sm font-bold text-zinc-900 dark:text-white">
                  Top traffic sources to the hub
                </h4>
                <ol class="space-y-2.5">
                  <li>
                    <div class="flex items-baseline justify-between gap-3 text-xs">
                      <span class="font-semibold text-zinc-900 dark:text-white">Google</span>
                      <span class="font-bold text-emerald-700 dark:text-emerald-400">24,100 visits</span>
                    </div>
                    <div
                      class="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                      aria-hidden="true"
                    >
                      <div
                        class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                        style="width: 100%"
                      />
                    </div>
                  </li>
                  <li>
                    <div class="flex items-baseline justify-between gap-3 text-xs">
                      <span class="font-semibold text-zinc-900 dark:text-white">Direct (typed URL or bookmark)</span>
                      <span class="font-bold text-emerald-700 dark:text-emerald-400">17,100 visits</span>
                    </div>
                    <div
                      class="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                      aria-hidden="true"
                    >
                      <div
                        class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                        style="width: 71%"
                      />
                    </div>
                  </li>
                  <li>
                    <div class="flex items-baseline justify-between gap-3 text-xs">
                      <span class="font-semibold text-zinc-900 dark:text-white">ChatGPT.com</span>
                      <span class="font-bold text-emerald-700 dark:text-emerald-400">2,600 visits</span>
                    </div>
                    <div
                      class="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                      aria-hidden="true"
                    >
                      <div
                        class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                        style="width: 11%"
                      />
                    </div>
                  </li>
                  <li>
                    <div class="flex items-baseline justify-between gap-3 text-xs">
                      <span class="font-semibold text-zinc-900 dark:text-white">Bing</span>
                      <span class="font-bold text-emerald-700 dark:text-emerald-400">860 visits</span>
                    </div>
                    <div
                      class="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                      aria-hidden="true"
                    >
                      <div
                        class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                        style="width: 4%"
                      />
                    </div>
                  </li>
                  <li>
                    <div class="flex items-baseline justify-between gap-3 text-xs">
                      <span class="font-semibold text-zinc-900 dark:text-white">Facebook</span>
                      <span class="font-bold text-emerald-700 dark:text-emerald-400">587 visits</span>
                    </div>
                    <div
                      class="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                      aria-hidden="true"
                    >
                      <div
                        class="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                        style="width: 2%"
                      />
                    </div>
                  </li>
                </ol>
                <p class="mt-3 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Worth noting: <strong class="text-zinc-900 dark:text-white">ChatGPT.com sends 2,600 visits</strong> over 12 months — measurable AI-search traffic. Hub articles are showing up as citations in AI assistants and driving real readers back to the catalog.
                </p>
              </div>

              <!-- Devices -->
              <div>
                <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
                  <UIcon
                    name="i-lucide-monitor"
                    class="size-3.5"
                  />
                  How they read it
                </div>
                <h4 class="mb-3 text-sm font-bold text-zinc-900 dark:text-white">
                  Device breakdown
                </h4>
                <div class="grid gap-2.5 sm:grid-cols-3">
                  <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
                    <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
                      Desktop
                    </div>
                    <div class="mt-1 text-2xl font-black tracking-tight text-sky-700 dark:text-sky-400">
                      65%
                    </div>
                    <div class="text-[10px] text-zinc-600 dark:text-zinc-400">
                      23,800 visitors
                    </div>
                  </div>
                  <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
                    <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
                      Mobile
                    </div>
                    <div class="mt-1 text-2xl font-black tracking-tight text-sky-700 dark:text-sky-400">
                      31%
                    </div>
                    <div class="text-[10px] text-zinc-600 dark:text-zinc-400">
                      11,500 visitors
                    </div>
                  </div>
                  <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
                    <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
                      Tablet
                    </div>
                    <div class="mt-1 text-2xl font-black tracking-tight text-sky-700 dark:text-sky-400">
                      4%
                    </div>
                    <div class="text-[10px] text-zinc-600 dark:text-zinc-400">
                      1,300 visitors
                    </div>
                  </div>
                </div>
              </div>

              <!-- Monthly trend -->
              <div>
                <div class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">
                  <UIcon
                    name="i-lucide-trending-up"
                    class="size-3.5"
                  />
                  Monthly trend
                </div>
                <h4 class="mb-3 text-sm font-bold text-zinc-900 dark:text-white">
                  Hub visitors per month, last 12 months
                </h4>
                <div class="grid grid-cols-4 gap-1.5 sm:grid-cols-6 md:grid-cols-12">
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 91%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      3.2K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      May
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 77%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      2.7K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Jun
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 80%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      2.8K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Jul
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 86%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      3.0K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Aug
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 100%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      3.5K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Sep
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 94%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      3.3K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Oct
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 100%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      3.5K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Nov
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 83%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      2.9K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Dec
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 74%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      2.6K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Jan
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 86%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      3.0K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Feb
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 91%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      3.2K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Mar
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="mb-1 flex h-20 items-end"
                      aria-hidden="true"
                    >
                      <div
                        class="w-full rounded-t-md bg-violet-500/80 dark:bg-violet-400/80"
                        style="height: 91%"
                      />
                    </div>
                    <div class="text-[10px] font-bold text-zinc-900 dark:text-white">
                      3.2K
                    </div>
                    <div class="text-[9px] text-zinc-600 dark:text-zinc-400">
                      Apr
                    </div>
                  </div>
                </div>
                <p class="mt-3 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Steady traffic across the full year — mid-2.6K to 3.5K visitors a month. The Jan dip and recovery is the typical seasonal pattern for state-government sites; the Sep/Nov peaks line up with the start of academic and budget cycles. Stable demand is exactly what you want for a content catalog.
                </p>
              </div>

              <p class="border-t border-zinc-200 pt-4 text-[11px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                <UIcon
                  name="i-lucide-database"
                  class="-mt-0.5 mr-1 inline size-3"
                />
                Source: Plausible analytics on icjia.illinois.gov, filtered to <code>/researchhub/*</code>, period May 2025 – Apr 2026.
              </p>
            </div>
          </div>
        </div>

        <!-- Why these matter -->
        <div class="rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 p-5">
          <div class="flex items-start gap-3">
            <UIcon
              name="i-lucide-target"
              class="mt-0.5 size-6 shrink-0 text-emerald-700 dark:text-emerald-300"
            />
            <p class="text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              Hub 2.0 builds on Hub 1.0's success.
              <span class="block pt-1 text-sm font-normal text-zinc-700 dark:text-zinc-300">
                <strong class="text-zinc-900 dark:text-white">36,800 Illinois research-seekers</strong> came to Hub 1.0 in the last twelve months — and the most-read articles are exactly the kind of "summary" managers ask for. Hub 2.0 streamlines the UI/UX so they find what they want faster, on the same catalog. The chips below are the difference between two clicks and ten, for every one of them.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3.5 WHY REFINE IT NOW? — the case for Hub 2.0, in plain English -->
    <section
      id="why-refine-now"
      class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]"
    >
      <div class="mx-auto max-w-5xl">
        <div class="mb-4 flex items-center gap-3">
          <div class="flex size-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg">
            <UIcon
              name="i-lucide-wrench"
              class="size-6"
            />
          </div>
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-amber-700 sm:text-sm dark:text-amber-300">
            Why refine it now?
          </span>
        </div>
        <h2 class="mb-3 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          Hub 1.0 works. <br><span class="text-zinc-500 dark:text-zinc-400">The pieces underneath are showing their age.</span>
        </h2>
        <p class="mb-10 max-w-3xl text-lg leading-relaxed text-zinc-700 sm:text-xl dark:text-zinc-300">
          Hub 1.0 has been quietly powering all that traffic — the busiest part of the agency website, year after year. But the foundation it sits on (the database, the framework, the security model, the look and feel) has aged. <strong class="text-zinc-900 dark:text-white">Hub 2.0 is the chance to refresh the foundation without losing what already works.</strong>
        </p>

        <!-- Where Hub 1.0 is straining -->
        <div class="mb-10">
          <div class="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
            <UIcon
              name="i-lucide-alert-triangle"
              class="size-4"
            />
            Where Hub 1.0 is starting to strain
          </div>
          <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <UIcon
                  name="i-lucide-package"
                  class="size-5"
                />
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Aging framework
              </div>
              <div class="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                The framework underneath Hub 1.0 has been superseded. Maintenance is harder, and security patches are getting rarer.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <UIcon
                  name="i-lucide-clock"
                  class="size-5"
                />
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Slow under load
              </div>
              <div class="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Database response times stretch as the catalog grows. Pages and searches don't feel as snappy as they used to.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <UIcon
                  name="i-lucide-key-round"
                  class="size-5"
                />
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Yesterday's security
              </div>
              <div class="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Web security standards keep moving. Hub 1.0 was built to its day's expectations — not today's.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <UIcon
                  name="i-lucide-folder"
                  class="size-5"
                />
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Less flexibility
              </div>
              <div class="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Datasets, dashboards, apps — new content types need to slot in alongside articles. Hub 1.0 wasn't built for the mix.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <UIcon
                  name="i-lucide-monitor"
                  class="size-5"
                />
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Dated look &amp; feel
              </div>
              <div class="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                What felt clean five years ago feels heavy now. Mobile, accessibility, and design expectations have all shifted.
              </div>
            </div>
          </div>
        </div>

        <!-- Hub 2.0 keeps what works — preservation guarantees -->
        <div class="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-6 sm:p-8 dark:border-emerald-500/60 dark:bg-emerald-500/10">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
            <UIcon
              name="i-lucide-circle-check-big"
              class="size-3.5"
            />
            Hub 2.0 keeps what works
          </div>
          <h3 class="mb-3 text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl dark:text-white">
            Refresh the foundation. <span class="text-emerald-700 dark:text-emerald-400">Keep the success.</span>
          </h3>
          <p class="mb-6 max-w-3xl text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
            The migration is built around three commitments — none of them break the experience that's been working all this time.
          </p>
          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-xl border border-emerald-500/40 bg-white p-5 dark:bg-zinc-900">
              <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                <UIcon
                  name="i-lucide-library"
                  class="size-5"
                />
              </div>
              <div class="text-base font-bold text-zinc-900 dark:text-white">
                Same content
              </div>
              <div class="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Every article published on Hub 1.0 carries forward to Hub 2.0. Nothing dropped, nothing rewritten.
              </div>
            </div>
            <div class="rounded-xl border border-emerald-500/40 bg-white p-5 dark:bg-zinc-900">
              <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                <UIcon
                  name="i-lucide-link"
                  class="size-5"
                />
              </div>
              <div class="text-base font-bold text-zinc-900 dark:text-white">
                Same URLs
              </div>
              <div class="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Every existing link still works — years of search rankings, citations, and shared links stay intact.
              </div>
            </div>
            <div class="rounded-xl border border-emerald-500/40 bg-white p-5 dark:bg-zinc-900">
              <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                <UIcon
                  name="i-lucide-pen-line"
                  class="size-5"
                />
              </div>
              <div class="text-base font-bold text-zinc-900 dark:text-white">
                R&amp;A authors stay the focus
              </div>
              <div class="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                The mission hasn't changed: give Research &amp; Analysis authors a digital home for their work. Hub 2.0 sharpens how readers find it.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 1. HERO -->
    <section class="px-6 pt-16 pb-8 sm:px-12 lg:px-16">
      <div class="mx-auto max-w-5xl">
        <div class="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          A short orientation
        </div>
        <h2 class="mb-4 text-5xl font-black leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
          How Hub 2.0 organizes<br>ICJIA research.
        </h2>
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
          Want a summary?
        </div>
        <h2 class="mb-6 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          On the hub, "summary" and "article" mean the same thing.
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
          Same content. Two different words for it.
        </p>

        <div class="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            This demo exists because of a fair question at a recent ICJIA staff meeting. Someone said, reasonably: <strong class="text-zinc-900 dark:text-white">"I don't want articles. I want a summary."</strong>
          </p>
          <p class="rounded-2xl border-2 border-amber-400 bg-amber-50 px-5 py-4 text-xl font-extrabold leading-snug text-zinc-900 sm:text-2xl dark:border-amber-500/60 dark:bg-amber-500/10 dark:text-white">
            That's exactly the right thing to ask. <span class="text-amber-700 dark:text-amber-400">Summary === article.</span> Same thing.
          </p>
          <p>
            Every summary on the hub <strong class="text-zinc-900 dark:text-white">is</strong> an article. Every article <strong class="text-zinc-900 dark:text-white">is</strong> a summary of something published by ICJIA. "Article" is the database's word for what's stored; "summary" is the plain English word for what's in it. Same content, two labels. Click <strong class="text-zinc-900 dark:text-white">Research Reports</strong> on any view below and the list narrows to exactly those summaries — same goes for Annual Reports, Program Evaluations, Updates, Strategic Plans, and nine more. Fourteen flavors of summary, all in the same bucket.
          </p>
          <p>
            <strong class="text-zinc-900 dark:text-white">Why "articles" and not just "summaries"?</strong> "Summaries" was on the table during Hub 1.0 planning. The team rejected it because some articles stand on their own — pieces with no attached source PDF — and "summaries" didn't fit those edge cases. "Articles" was both more general (covers standalone pieces too) and more specific (a familiar word for a publishing platform). The label stuck through Hub 2.0. <em>Functionally, it doesn't matter:</em> when you ask for a summary, you're asking for an article.
          </p>
        </div>
      </div>
    </section>

    <!-- 4. URL STABILITY / SEO — why we keep the same URLs -->
    <section class="border-b border-zinc-200 bg-white px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">
          Why the URLs stay the same
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Stable URLs = <span class="text-amber-700 dark:text-amber-400">preserved SEO.</span> That's the point.
        </h2>
        <p class="mb-7 max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          Hub 1.0's article URLs at <code class="text-amber-700 dark:text-amber-400">/researchhub/articles/…</code> carry years of Google ranking signal, AI-assistant citations (ChatGPT, Bing), external backlinks, and bookmarks. <strong class="text-zinc-900 dark:text-white">Hub 2.0 keeps every URL intact</strong> — that's not laziness, it's how you protect a content catalog's traffic.
        </p>

        <!-- URL stability examples -->
        <div class="mb-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div class="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
            These URLs already work — and they keep working
          </div>
          <div class="space-y-2">
            <div class="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
              <code class="block break-all text-xs text-zinc-700 sm:text-sm dark:text-zinc-300">
                icjia.illinois.gov/researchhub/articles/<span class="font-bold text-zinc-900 dark:text-white">understanding-police-officer-stress…</span>
              </code>
              <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                <span class="flex items-center gap-1">
                  <UIcon
                    name="i-lucide-search"
                    class="size-3"
                  />
                  Indexed by Google
                </span>
                <span class="flex items-center gap-1">
                  <UIcon
                    name="i-lucide-bot"
                    class="size-3"
                  />
                  Cited by ChatGPT
                </span>
                <span class="flex items-center gap-1">
                  <UIcon
                    name="i-lucide-eye"
                    class="size-3"
                  />
                  6,200 readers / 12 mo
                </span>
              </div>
            </div>
            <div class="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
              <code class="block break-all text-xs text-zinc-700 sm:text-sm dark:text-zinc-300">
                icjia.illinois.gov/researchhub/articles/<span class="font-bold text-zinc-900 dark:text-white">the-2021-safe-t-act-icjia-roles-and-responsibilities</span>
              </code>
              <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                <span class="flex items-center gap-1">
                  <UIcon
                    name="i-lucide-search"
                    class="size-3"
                  />
                  Indexed by Google
                </span>
                <span class="flex items-center gap-1">
                  <UIcon
                    name="i-lucide-link"
                    class="size-3"
                  />
                  External backlinks
                </span>
                <span class="flex items-center gap-1">
                  <UIcon
                    name="i-lucide-eye"
                    class="size-3"
                  />
                  5,800 readers / 12 mo
                </span>
              </div>
            </div>
            <div class="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
              <code class="block break-all text-xs text-zinc-700 sm:text-sm dark:text-zinc-300">
                icjia.illinois.gov/researchhub/articles/<span class="font-bold text-zinc-900 dark:text-white">mental-illness-and-violence-is-there-a-link</span>
              </code>
              <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                <span class="flex items-center gap-1">
                  <UIcon
                    name="i-lucide-search"
                    class="size-3"
                  />
                  Indexed by Google
                </span>
                <span class="flex items-center gap-1">
                  <UIcon
                    name="i-lucide-bot"
                    class="size-3"
                  />
                  Cited by ChatGPT
                </span>
                <span class="flex items-center gap-1">
                  <UIcon
                    name="i-lucide-eye"
                    class="size-3"
                  />
                  4,300 readers / 12 mo
                </span>
              </div>
            </div>
          </div>
          <p class="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
            These three articles alone pulled <strong class="text-zinc-900 dark:text-white">16,300 readers</strong> in the last 12 months because Google has been ranking them on these exact URLs for years. Renaming the path resets that signal.
          </p>
        </div>

        <!-- Why URL stability matters — 3 cards -->
        <div class="mb-8 grid gap-3 sm:grid-cols-3">
          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
              <UIcon
                name="i-lucide-search"
                class="size-5"
              />
            </div>
            <h3 class="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
              Google rankings stay
            </h3>
            <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Search-ranking signals attach to specific URLs over time. Move the URL, the signal restarts — even with 301 redirects, equity leaks.
            </p>
          </div>
          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-9 items-center justify-center rounded-lg bg-sky-500/15 text-sky-700 dark:text-sky-300">
              <UIcon
                name="i-lucide-bot"
                class="size-5"
              />
            </div>
            <h3 class="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
              AI citations stay
            </h3>
            <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              ChatGPT, Bing, and other assistants cite specific URLs. The hub already gets 2,600 visits over twelve months from ChatGPT — real readers reaching specific articles via specific links.
            </p>
          </div>
          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-2 flex size-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-700 dark:text-violet-300">
              <UIcon
                name="i-lucide-link"
                class="size-5"
              />
            </div>
            <h3 class="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
              Backlinks stay
            </h3>
            <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Government and academic sites link to specific Hub 1.0 article URLs. Rename the path and those links break (or 301-redirect with equity loss).
            </p>
          </div>
        </div>

        <!-- The summary===article connection -->
        <div class="rounded-2xl border border-amber-300/60 bg-amber-50 px-6 py-5 dark:border-amber-500/20 dark:bg-amber-500/5">
          <div class="flex gap-3">
            <UIcon
              name="i-lucide-key-round"
              class="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400"
            />
            <div>
              <div class="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                Why "summary === article" matters here too
              </div>
              <h3 class="mb-3 text-base font-bold text-zinc-900 sm:text-lg dark:text-white">
                Renaming URLs to "fix" the labels would cost more than it solves.
              </h3>
              <div class="space-y-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                <p>
                  We <em>could</em> map certain articles to <code class="text-amber-700 dark:text-amber-300">/researchhub/summaries/…</code> URLs based on which ones "feel like" summaries. But that introduces a fragile mapping layer: someone has to decide which article is a summary, the database has to track the decision, the redirect rules have to keep up. Every editorial change becomes an SEO landmine.
                </p>
                <p>
                  The cleaner answer: <strong class="text-zinc-900 dark:text-white">accept that the database label is "article" and let the UI use "summary" where it makes sense.</strong> Hub 2.0's chip filter surfaces research reports in one click without changing a single URL. The taxonomy is correct; the language is plain. No mapping, no redirects, no broken citations.
                </p>
                <p class="rounded-xl border-2 border-amber-400 bg-amber-100/60 px-4 py-3 text-base font-extrabold leading-snug text-zinc-900 dark:border-amber-500/60 dark:bg-amber-500/10 dark:text-white">
                  <span class="text-amber-700 dark:text-amber-400">URL stability matters.</span> Confusion doesn't. Fragile mapping doesn't.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. THE DIAGRAM — the structure that powers all that traffic -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          The structure underneath all that traffic
        </div>
        <h2 class="mb-2 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          Three core catalog content types. In this web demo, we're zooming into Articles.
        </h2>
        <p class="mb-7 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
          The hub holds three peer buckets. Datasets and Apps/Dashboards are out of scope for this filter demo — but they exist alongside Articles, not inside it.
        </p>

        <!-- 3-content-type ribbon -->
        <div class="mb-4 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            class="group block w-full rounded-xl border-2 border-amber-500 bg-amber-500/10 p-4 text-left transition-shadow hover:shadow-lg hover:shadow-amber-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400"
            @click="openContentType('articles')"
          >
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
            <div class="mt-2 flex items-center gap-1 text-[10px] font-bold text-amber-700 group-hover:underline dark:text-amber-400">
              <UIcon
                name="i-lucide-mouse-pointer-click"
                class="size-3"
              />
              Click for details
            </div>
          </button>
          <button
            type="button"
            class="group block w-full rounded-xl border border-zinc-300 bg-zinc-100/70 p-4 text-left transition-shadow hover:shadow-lg hover:shadow-sky-500/15 hover:border-sky-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-sky-400/60 dark:focus-visible:ring-sky-400"
            @click="openContentType('datasets')"
          >
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
            <div class="mt-2 flex items-center gap-1 text-[10px] font-bold text-sky-700 group-hover:underline dark:text-sky-400">
              <UIcon
                name="i-lucide-mouse-pointer-click"
                class="size-3"
              />
              Click for the datahub roadmap
            </div>
          </button>
          <button
            type="button"
            class="group block w-full rounded-xl border border-zinc-300 bg-zinc-100/70 p-4 text-left transition-shadow hover:shadow-lg hover:shadow-violet-500/15 hover:border-violet-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-violet-400/60 dark:focus-visible:ring-violet-400"
            @click="openContentType('apps')"
          >
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
            <div class="mt-2 flex items-center gap-1 text-[10px] font-bold text-violet-700 group-hover:underline dark:text-violet-400">
              <UIcon
                name="i-lucide-mouse-pointer-click"
                class="size-3"
              />
              Click for details (more coming soon)
            </div>
          </button>
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

    <!-- 6. STAT STRIP — what this demo adds -->
    <section class="border-b border-zinc-200 bg-white px-6 py-10 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
          What this demo adds
        </div>
        <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
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
      </div>
    </section>

    <!-- 7. TL;DR — the point, in one breath -->
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
          They're filed under <strong class="text-amber-700 dark:text-amber-400">"Articles"</strong> alongside thirteen other publication types. Click <strong class="text-zinc-900 dark:text-white">Research Reports</strong> on any of the three layouts below. Done. <em class="text-zinc-600 dark:text-zinc-400">(Remember — articles <strong class="text-zinc-900 dark:text-white">are</strong> summaries.)</em>
        </p>
      </div>
    </section>

    <!-- 8. TAKEAWAYS — for the busy manager -->
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
              "Articles" holds 14 publication types, including Research Reports.
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
              Current + three proposed views.
            </h3>
            <p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Current (Hub 2.0 today: filter bar baseline), then View 0 (chips + advanced toggle), View 1 (dropdowns only), View 2 (chips + always-on bar). Pick a winner.
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
              Nothing's missing — this proof-of-concept demo just exposes what's already there.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8.5 SOLUTIONS DIVIDER — context ends, proposed solutions begin -->
    <section
      id="solutions"
      class="border-y border-zinc-200 bg-gradient-to-b from-white to-zinc-100 px-6 py-20 sm:px-12 lg:px-16 dark:border-zinc-800 dark:from-[#0a0a0a] dark:to-[#101014]"
    >
      <div class="mx-auto max-w-5xl text-center">
        <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          <UIcon
            name="i-lucide-arrow-down"
            class="size-3.5"
          />
          Now, the proposals
        </div>
        <h2 class="mb-5 text-5xl font-black leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
          The <span class="text-primary">3 proposed</span><br>
          Solutions.
        </h2>
        <p class="mx-auto max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          Three concerns from recent meetings. Three working answers — in order. Each one is hands-on: click a layout, try the search bar, watch the author names normalize.
        </p>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.14em]">
          <span class="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">1 · Research reports in one click</span>
          <UIcon
            name="i-lucide-arrow-right"
            class="size-3.5 text-zinc-400"
          />
          <span class="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">2 · Search highlighting</span>
          <UIcon
            name="i-lucide-arrow-right"
            class="size-3.5 text-zinc-400"
          />
          <span class="rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">3 · Author names</span>
        </div>
      </div>
    </section>

    <!-- 9. THREE VIEWS -->
    <section
      id="views"
      class="border-b border-zinc-200 bg-zinc-50 px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]"
    >
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
            <UIcon
              name="i-lucide-circle-check-big"
              class="size-3.5"
            />
            Solution 1 of 3 · Research Reports in one click
          </div>
          <!-- Icon + reveal phrase -->
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-layout-grid"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              Try it yourself. Click any layout.
            </span>
          </div>
          <!-- BIG INFOGRAPHIC TITLE -->
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-sky-600 dark:text-sky-400">Three views.</span>
            <br>Same data.
          </h2>
          <p class="mt-5 max-w-2xl text-xl font-bold leading-snug text-zinc-700 sm:text-2xl dark:text-zinc-300">
            Same articles, <span class="text-sky-600 dark:text-sky-400">four different layouts.</span>
          </p>
          <p class="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <strong class="text-zinc-900 dark:text-white">Start with Current</strong> — Hub 2.0 as it stands today. Then jump into the three proposed views below to see the small clicks-saving fixes layered on top. <strong class="text-zinc-900 dark:text-white">These proposed views are live.</strong> Not boring, static PowerPoint slides. They come in real-time from Hub 2.0's new design.
          </p>
        </div>

        <!-- Current view (baseline) — full-width starting point -->
        <NuxtLink
          to="/current"
          class="group mb-4 block overflow-hidden rounded-xl border-2 border-zinc-400 bg-white transition-colors hover:border-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:border-zinc-400 dark:focus-visible:ring-zinc-400"
        >
          <div class="h-1 bg-zinc-500 dark:bg-zinc-400" />
          <div class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5">
            <div class="shrink-0">
              <div class="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-600 dark:text-zinc-400">
                Start here · /current
              </div>
              <div class="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                Current — Hub 2.0 today
              </div>
            </div>
            <div class="flex flex-1 flex-wrap gap-1.5">
              <span class="rounded border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Search</span>
              <span class="rounded border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Type ▾</span>
              <span class="rounded border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Topic ▾</span>
              <span class="rounded border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Author ▾</span>
              <span class="rounded border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[10px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Year ▾</span>
            </div>
            <div class="shrink-0 sm:max-w-[14rem]">
              <p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Filter bar with dropdowns. No chips. Hub 2.0's current state — the baseline the views below build on.
              </p>
              <div class="mt-2 text-xs font-semibold text-zinc-700 group-hover:underline dark:text-zinc-300">
                Open Current →
              </div>
            </div>
          </div>
        </NuxtLink>

        <div class="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-sky-700 dark:text-sky-400">
          ↓ Three proposed clicks-saving fixes
        </div>

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

    <!-- 9.5 SEARCH HIGHLIGHTING — the search bar, smarter -->
    <section
      id="search-highlighting"
      class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]"
    >
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <UIcon
              name="i-lucide-circle-check-big"
              class="size-3.5"
            />
            Solution 2 of 3 · Search Highlighting
          </div>
          <!-- Icon + reveal phrase -->
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-highlighter"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              The Hub 2.0 Search Bar, smarter
            </span>
          </div>
          <!-- BIG INFOGRAPHIC TITLE -->
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-emerald-600 dark:text-emerald-400">Searching Hub 2.0.</span>
            <br>Visual Matching.
          </h2>
          <p class="mt-5 max-w-2xl text-xl font-bold leading-snug text-zinc-700 sm:text-2xl dark:text-zinc-300">
            Every match, <span class="text-emerald-600 dark:text-emerald-400">highlighted in place.</span>
          </p>
          <p class="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <strong class="text-zinc-900 dark:text-white">Searches return long lists.</strong> Without highlighting, you have to read every result top-to-bottom to figure out why it matched. Below: how this demo wraps the matched substring inline — across title and abstract, every occurrence.
          </p>
        </div>

        <!-- THE PROBLEM -->
        <div class="mb-6">
          <div class="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <UIcon
              name="i-lucide-alert-triangle"
              class="size-3.5"
            />
            The problem
          </div>
          <p class="mb-5 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
            A user types <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">juvenile</code> into the search box. They get back thirty articles. Without highlighting, every result looks identical — they have to scan each card line by line to find their term.
          </p>
          <div class="rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
              <UIcon
                name="i-lucide-search"
                class="size-3.5"
              />
              Search: "juvenile" — without highlighting
            </div>
            <article class="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 class="text-base font-semibold leading-snug text-zinc-900 dark:text-white">
                Examining the Effectiveness of Juvenile Diversion in Cook County
              </h3>
              <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                By Jane Carter · Sept 2024
              </p>
              <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                This study evaluates outcomes from juvenile diversion programs across Cook County, comparing recidivism rates among juvenile participants who completed diversion versus those processed through the traditional juvenile court system.
              </p>
            </article>
            <p class="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Where did "juvenile" appear? You have to read the whole card to find out.
            </p>
          </div>
        </div>

        <!-- Transition -->
        <div class="my-6 flex items-center justify-center gap-3">
          <UIcon
            name="i-lucide-arrow-down"
            class="size-8 text-emerald-500"
          />
          <code class="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            highlightSegments()
          </code>
          <UIcon
            name="i-lucide-arrow-down"
            class="size-8 text-emerald-500"
          />
        </div>

        <!-- THE SOLUTION -->
        <div class="mb-2">
          <div class="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
            <UIcon
              name="i-lucide-check-circle-2"
              class="size-3.5"
            />
            The solution
          </div>
          <p class="mb-5 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
            Every occurrence of the query gets wrapped inline in a <code class="rounded bg-emerald-500/10 px-1 text-emerald-700 dark:text-emerald-300">&lt;mark&gt;</code> tag — same green tint as the demo's primary accent. Title, abstract, every match.
          </p>
          <div class="rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 p-5">
            <div class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
              <UIcon
                name="i-lucide-search"
                class="size-3.5"
              />
              Search: "juvenile" — with highlighting
            </div>
            <article class="rounded-xl border border-emerald-500/40 bg-white p-5 shadow-sm dark:bg-zinc-900">
              <h3 class="text-base font-semibold leading-snug text-zinc-900 dark:text-white">
                Examining the Effectiveness of <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">Juvenile</mark> Diversion in Cook County
              </h3>
              <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                By Jane Carter · Sept 2024
              </p>
              <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                This study evaluates outcomes from <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juvenile</mark> diversion programs across Cook County, comparing recidivism rates among <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juvenile</mark> participants who completed diversion versus those processed through the traditional <mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">juvenile</mark> court system.
              </p>
            </article>
            <p class="mt-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Four matches in one card. The eye finds them in milliseconds.
            </p>
          </div>
        </div>

        <HighlightSandbox />

        <!-- Four properties of the highlight -->
        <div class="mt-12">
          <div class="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
            <UIcon
              name="i-lucide-list-checks"
              class="size-4"
            />
            Four properties of the highlight
          </div>
          <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-emerald-700 dark:text-emerald-300">
                1
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Case-insensitive
              </div>
              <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                <em>Juvenile</em>, <em>juvenile</em>, <em>JUVENILE</em> — all match the same search.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-emerald-700 dark:text-emerald-300">
                2
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Every occurrence
              </div>
              <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Not just the first hit — every instance, in title and in abstract.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-emerald-700 dark:text-emerald-300">
                3
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Substring match
              </div>
              <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                <em>juven</em> highlights <em>juvenile</em>. Partial typing still lights up.
              </div>
            </div>
            <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div class="mb-2 flex size-7 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-emerald-700 dark:text-emerald-300">
                4
              </div>
              <div class="text-sm font-bold text-zinc-900 dark:text-white">
                Original casing kept
              </div>
              <div class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                The match is rendered as the source wrote it — only the comparison was lowered.
              </div>
            </div>
          </div>
          <p class="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            One small UI affordance, four properties working together. The user sees <em>why</em> each result is in their list — without reading any of it.
          </p>

          <!-- PSEUDOCODE — for developers (collapsible, default hidden) -->
          <details class="group mt-10">
            <summary class="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 transition-colors hover:bg-zinc-200 [&::-webkit-details-marker]:hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              <UIcon
                name="i-lucide-code-2"
                class="size-3.5"
              />
              Pseudocode for developers
              <UIcon
                name="i-lucide-chevron-down"
                class="size-3.5 transition-transform group-open:rotate-180"
              />
            </summary>
            <div class="mt-4">
            <p class="mb-4 max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Walk the source string, find every occurrence of the query (case-insensitive), and emit segments tagged <code class="rounded bg-zinc-200/60 px-1 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">match</code> or not. The renderer wraps every <code class="rounded bg-zinc-200/60 px-1 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">match</code> in a <code class="rounded bg-zinc-200/60 px-1 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">&lt;mark&gt;</code>.
            </p>
            <pre class="overflow-x-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-xs leading-relaxed text-zinc-100 sm:text-sm"><code><span class="text-emerald-300">function</span> <span class="text-sky-300">highlightSegments</span>(text, query):
    <span class="text-zinc-500"># Bail out fast on empty input or empty query</span>
    <span class="text-violet-300">if</span> not text:  <span class="text-violet-300">return</span> []
    <span class="text-violet-300">if</span> not query: <span class="text-violet-300">return</span> [{ text, match: <span class="text-amber-300">false</span> }]

    <span class="text-zinc-500"># Lowercase only for the *comparison* — original casing is preserved</span>
    <span class="text-zinc-500"># in the segments returned to the renderer.</span>
    lowerText  ← lowercase(text)
    lowerQuery ← lowercase(query)

    segments ← []
    cursor   ← 0
    next     ← indexOf(lowerText, lowerQuery)

    <span class="text-violet-300">while</span> next ≠ -1:
        <span class="text-zinc-500"># Plain text between the previous match and this one</span>
        <span class="text-violet-300">if</span> next &gt; cursor:
            segments.push({ text: text[cursor..next], match: <span class="text-amber-300">false</span> })

        <span class="text-zinc-500"># The match itself — keep original casing from `text`, not `lowerText`</span>
        segments.push({ text: text[next..next + length(query)], match: <span class="text-amber-300">true</span> })

        cursor ← next + length(query)
        next   ← indexOf(lowerText, lowerQuery, from: cursor)

    <span class="text-zinc-500"># Tail after the last match (or the whole string if no match)</span>
    <span class="text-violet-300">if</span> cursor &lt; length(text):
        segments.push({ text: text[cursor..end], match: <span class="text-amber-300">false</span> })

    <span class="text-violet-300">return</span> segments
</code></pre>
            <p class="mt-3 max-w-3xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              The renderer iterates the returned segments: <code class="rounded bg-zinc-200/60 px-1 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">match: true</code> → wrap in <code class="rounded bg-zinc-200/60 px-1 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">&lt;mark&gt;</code> with a green tint, otherwise plain text. Same routine runs over every searchable field on the card.
            </p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- 10. AUTHOR NORMALIZATION — one more under-the-hood fix -->
    <section
      id="author-normalization"
      class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]"
    >
      <div class="mx-auto max-w-5xl">
        <div class="mb-8">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            <UIcon
              name="i-lucide-circle-check-big"
              class="size-3.5"
            />
            Solution 3 of 3 · Author Names
          </div>
          <!-- "One more thing..." Steve Jobs reveal -->
          <div class="mb-3 flex items-center gap-3">
            <div class="flex size-12 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg">
              <UIcon
                name="i-lucide-merge"
                class="size-6"
              />
            </div>
            <span class="text-base font-medium italic text-zinc-600 sm:text-lg dark:text-zinc-400">
              And one more thing…
            </span>
          </div>
          <!-- BIG INFOGRAPHIC TITLE -->
          <h2 class="text-6xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-violet-700 dark:text-violet-400">Author</span>
            <br>names.
          </h2>
          <p class="mt-5 max-w-2xl text-xl font-bold leading-snug text-zinc-700 sm:text-2xl dark:text-zinc-300">
            Same person, listed <span class="text-violet-700 dark:text-violet-400">seven different ways.</span>
          </p>
          <p class="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <strong class="text-zinc-900 dark:text-white">This came up in a meeting.</strong> An author's name shows up in the dropdown three or four different ways, the same person fragments across entries, the count looks wrong. Below: how we fixed it, and why the fix works.
          </p>
        </div>
        <!-- THE PROBLEM -->
        <div class="mb-6">
          <div class="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <UIcon
              name="i-lucide-alert-triangle"
              class="size-3.5"
            />
            The problem
          </div>
          <p class="mb-5 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
            Authors come out of the CMS under multiple labels — credentials, casing, stray whitespace, "&" versus "and." Without a fix, the Authors dropdown would list <strong class="text-zinc-900 dark:text-white">one person seven times</strong>.
          </p>
          <div class="rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
              What the CMS delivers — seven entries, one researcher
            </div>
            <ul class="grid gap-2 text-sm text-zinc-700 sm:grid-cols-2 dark:text-zinc-300">
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
        </div>

        <!-- Transition -->
        <div class="my-6 flex items-center justify-center gap-3">
          <UIcon
            name="i-lucide-arrow-down"
            class="size-8 text-violet-500"
          />
          <code class="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-700 dark:text-violet-300">
            authorKey()
          </code>
          <UIcon
            name="i-lucide-arrow-down"
            class="size-8 text-violet-500"
          />
        </div>

        <!-- THE SOLUTION -->
        <div class="mb-2">
          <div class="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
            <UIcon
              name="i-lucide-check-circle-2"
              class="size-3.5"
            />
            The solution
          </div>
          <p class="mb-5 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
            This demo merges every variant onto a <strong class="text-zinc-900 dark:text-white">single canonical key</strong> — one author, one count, one click.
          </p>
          <div class="rounded-2xl border-2 border-violet-500 bg-violet-500/10 p-5">
            <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
              What the filter shows — one entry, all seven variants matched
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

        <AuthorNormalizationSandbox />

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

          <!-- PSEUDOCODE — for developers (collapsible, default hidden) -->
          <details class="group mt-10">
            <summary class="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 transition-colors hover:bg-zinc-200 [&::-webkit-details-marker]:hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              <UIcon
                name="i-lucide-code-2"
                class="size-3.5"
              />
              Pseudocode for developers
              <UIcon
                name="i-lucide-chevron-down"
                class="size-3.5 transition-transform group-open:rotate-180"
              />
            </summary>
            <div class="mt-4">
            <p class="mb-4 max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Five chained string operations, applied in order. Same input → same canonical key. Two authors collide on the same key only if they'd already collide as humans reading the rendered name.
            </p>
            <pre class="overflow-x-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-xs leading-relaxed text-zinc-100 sm:text-sm"><code><span class="text-violet-300">function</span> <span class="text-sky-300">authorKey</span>(name):
    <span class="text-zinc-500"># 1. Drop credentials — cut everything after the first comma</span>
    <span class="text-zinc-500">#    "Jane Carter, Ph.D" → "Jane Carter"</span>
    name ← regex_replace(name, <span class="text-amber-300">/,.*$/</span>, <span class="text-emerald-300">""</span>)

    <span class="text-zinc-500"># 2. Unify ampersands — "&amp;" (with any spaces around it) becomes " and "</span>
    <span class="text-zinc-500">#    "Forensics &amp; Policy Lab" → "Forensics and Policy Lab"</span>
    name ← regex_replace(name, <span class="text-amber-300">/\s*&amp;\s*/g</span>, <span class="text-emerald-300">" and "</span>)

    <span class="text-zinc-500"># 3. Collapse runs of internal whitespace into a single space</span>
    <span class="text-zinc-500">#    "Jane   Carter" → "Jane Carter"</span>
    name ← regex_replace(name, <span class="text-amber-300">/\s+/g</span>, <span class="text-emerald-300">" "</span>)

    <span class="text-zinc-500"># 4. Trim leading and trailing whitespace</span>
    <span class="text-zinc-500">#    "  Jane Carter  " → "Jane Carter"</span>
    name ← trim(name)

    <span class="text-zinc-500"># 5. Lowercase for case-insensitive matching</span>
    <span class="text-zinc-500">#    "JANE CARTER" → "jane carter"</span>
    name ← lowercase(name)

    <span class="text-violet-300">return</span> name   <span class="text-zinc-500">// the canonical key</span>
</code></pre>
            <p class="mt-3 max-w-3xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Steps 1 and 2 normalize <em>meaning</em> (credentials are noise; "&amp;" and "and" are the same word). Steps 3 and 4 normalize <em>spacing</em>. Step 5 normalizes <em>case</em>. Order matters: dropping credentials before lowercasing keeps the comma-cut deterministic regardless of input casing.
            </p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- 11. DEEP DIVES -->
    <section class="bg-white px-6 py-14 sm:px-12 lg:px-16 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          Deeper look
        </div>
        <h2 class="mb-7 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          More to explore.
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
              A plain-language tour of the underlying data model. Two diagrams. The fourteen article types as clickable cards with real examples from the catalog.
            </p>
            <div class="text-xs font-semibold uppercase tracking-[0.04em] text-sky-600 group-hover:underline dark:text-sky-400">
              /taxonomy →
            </div>
          </NuxtLink>

          <NuxtLink
            to="/schema"
            class="group block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-violet-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-400/60 dark:focus-visible:ring-violet-400"
          >
            <div class="mb-2 flex items-center gap-2.5">
              <div class="flex size-7 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-400">
                <UIcon
                  name="i-lucide-database"
                  class="size-4"
                />
              </div>
              <div class="text-base font-bold text-zinc-900 dark:text-white">
                Hub 2.0 Deep Dive
              </div>
            </div>
            <p class="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The data structure under the hood — the relational triangle, the 14-value enum, the bidirectional connections, with manager-friendly footnotes.
            </p>
            <div class="text-xs font-semibold uppercase tracking-[0.04em] text-violet-600 group-hover:underline dark:text-violet-400">
              /schema →
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
                Additional Upgrades
              </div>
            </div>
            <p class="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The other four upgrades not on this page — click-to-filter authors, additive tag stacking, the five ICJIA Centers filter, and the four UX layouts compared side-by-side.
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

    <!-- Content-type detail modal — shared by Articles / Datasets / Apps cards -->
    <UModal v-model:open="isContentTypeOpen">
      <template #content>
        <div class="bg-white p-6 sm:p-8 dark:bg-zinc-950">
          <!-- Articles -->
          <div v-if="selectedContentType === 'articles'">
            <div class="mb-5 flex items-start gap-4">
              <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <UIcon
                  name="i-lucide-library"
                  class="size-6"
                />
              </div>
              <div class="flex-1">
                <div class="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                  Content type 1 of 3
                </div>
                <h3 class="text-xl font-extrabold leading-tight text-zinc-900 sm:text-2xl dark:text-white">
                  Articles
                  <span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">{{ articleCountLabel }} items</span>
                </h3>
              </div>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="sm"
                aria-label="Close"
                @click="isContentTypeOpen = false"
              />
            </div>

            <div class="space-y-5 text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
              <div>
                <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                  What it is
                </div>
                <p>
                  <strong class="text-zinc-900 dark:text-white">Articles is the umbrella for everything published as text on the hub.</strong> It's the bucket that holds research reports, annual reports, program evaluations, summaries, newsletters, and ten more publication types — fourteen in all. Every Article record carries the same labeled fields: <code class="rounded bg-amber-500/10 px-1 text-amber-700 dark:text-amber-300">type</code>, <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">categories</code>, <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">tags</code>, plus title/abstract/authors/date.
                </p>
              </div>
              <div>
                <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                  Why the demo focuses here
                </div>
                <p>
                  Articles is the only content type with a fixed <code class="rounded bg-amber-500/10 px-1 text-amber-700 dark:text-amber-300">type</code> enum (the 14 named values). That's what lets the chips on every view filter in one click. Hub 1.0 has the same 14 types in the same data — Hub 2.0 just exposes them as chips at the top instead of buried in a menu.
                </p>
              </div>
              <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p class="text-sm">
                  <UIcon
                    name="i-lucide-tags"
                    class="-mt-0.5 mr-1 inline size-4 text-amber-600 dark:text-amber-400"
                  />
                  <strong class="text-zinc-900 dark:text-white">All 14 article types</strong> are listed and clickable on the <NuxtLink
                    to="/taxonomy#types"
                    class="font-semibold text-amber-700 underline-offset-2 hover:underline dark:text-amber-400"
                    @click="isContentTypeOpen = false"
                  >
                    /taxonomy page
                  </NuxtLink>. Each opens a modal with real examples from the live catalog.
                </p>
              </div>
            </div>
          </div>

          <!-- Datasets -->
          <div v-else-if="selectedContentType === 'datasets'">
            <div class="mb-5 flex items-start gap-4">
              <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-700 dark:text-sky-300">
                <UIcon
                  name="i-lucide-database"
                  class="size-6"
                />
              </div>
              <div class="flex-1">
                <div class="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400">
                  Content type 2 of 3
                </div>
                <h3 class="text-xl font-extrabold leading-tight text-zinc-900 sm:text-2xl dark:text-white">
                  Datasets
                </h3>
              </div>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="sm"
                aria-label="Close"
                @click="isContentTypeOpen = false"
              />
            </div>

            <div class="space-y-5 text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
              <div>
                <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400">
                  What it is
                </div>
                <p>
                  <strong class="text-zinc-900 dark:text-white">Datasets are raw data — CSVs, structured tables, files ICJIA publishes for download or visualization.</strong> Distinct top-level content type, separate from Articles. They carry <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">categories</code> and <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">tags</code> — but no <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">type</code> enum, so no chip filter for them.
                </p>
              </div>
              <div>
                <div class="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
                  <span>Where Hub 2.0 takes them next</span>
                  <UBadge
                    label="Future"
                    color="warning"
                    variant="soft"
                    size="sm"
                  />
                </div>
                <p class="mb-3">
                  The Strapi 5 schema already wires Apps to Datasets bidirectionally (and to Articles too — see the <NuxtLink
                    to="/schema"
                    class="font-semibold text-violet-700 underline-offset-2 hover:underline dark:text-violet-400"
                  >
                    Hub 2.0 Deep Dive
                  </NuxtLink>). The proposed <strong class="text-zinc-900 dark:text-white">"datahub"</strong> is the editorial work of curating which dataset belongs to which app, across four patterns:
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
              <div class="rounded-xl border-2 border-emerald-500 bg-emerald-500/10 p-4">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-circle-check-big"
                    class="mt-0.5 size-5 shrink-0 text-emerald-700 dark:text-emerald-300"
                  />
                  <div class="text-sm leading-snug">
                    <strong class="text-zinc-900 dark:text-white">All four patterns are already built into the structure today.</strong>
                    <span class="block pt-1 font-normal text-zinc-700 dark:text-zinc-300">
                      Hub 2.0's work on Datasets is editorial — curating which datasets belong to which apps — not building anything new at the data layer.
                    </span>
                  </div>
                </div>
              </div>
              <p class="text-xs text-zinc-600 dark:text-zinc-400">
                <UIcon
                  name="i-lucide-arrow-right"
                  class="-mt-0.5 mr-1 inline size-3.5"
                />
                See the full datahub roadmap on
                <NuxtLink
                  to="/taxonomy"
                  class="font-semibold text-sky-700 underline-offset-2 hover:underline dark:text-sky-400"
                  @click="isContentTypeOpen = false"
                >
                  /taxonomy
                </NuxtLink>.
              </p>
            </div>
          </div>

          <!-- Apps / Dashboards -->
          <div v-else-if="selectedContentType === 'apps'">
            <div class="mb-5 flex items-start gap-4">
              <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-700 dark:text-violet-300">
                <UIcon
                  name="i-lucide-layout-dashboard"
                  class="size-6"
                />
              </div>
              <div class="flex-1">
                <div class="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
                  Content type 3 of 3
                </div>
                <h3 class="text-xl font-extrabold leading-tight text-zinc-900 sm:text-2xl dark:text-white">
                  Apps / Dashboards
                </h3>
              </div>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="sm"
                aria-label="Close"
                @click="isContentTypeOpen = false"
              />
            </div>

            <div class="space-y-5 text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
              <div>
                <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
                  What it is
                </div>
                <p>
                  <strong class="text-zinc-900 dark:text-white">Apps and Dashboards are the interactive visualizations on the hub</strong> — charts, maps, drill-downs that render one or more datasets. Distinct top-level content type, separate from Articles and Datasets. Like Datasets, they carry <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">categories</code> and <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">tags</code> but no <code class="rounded bg-zinc-200/60 px-1 dark:bg-zinc-800">type</code> enum.
                </p>
              </div>

              <div class="rounded-xl border-2 border-amber-500 bg-amber-50 p-4 dark:border-amber-500/60 dark:bg-amber-500/10">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-construction"
                    class="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-amber-300"
                  />
                  <div class="text-sm leading-snug">
                    <strong class="text-amber-800 dark:text-amber-200">More detail coming soon.</strong>
                    <span class="block pt-1 font-normal text-zinc-700 dark:text-zinc-300">
                      This proof-of-concept demo focuses on the Articles filter UX. The Apps/Dashboards story is part of the Hub 2.0 <strong class="text-zinc-900 dark:text-white">"datahub"</strong> roadmap — linking them to Datasets via the four patterns described under the Datasets card — but the editorial details (which apps consume which datasets, how the metadata gets curated, what browsing dashboards looks like in the UI) are a separate workstream that hasn't been scoped for this POC yet.
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
                  What we know so far
                </div>
                <ul class="ml-1 space-y-1.5">
                  <li class="flex items-start gap-2">
                    <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-500" />
                    <span>The Strapi 5 schema treats Apps/Dashboards as a peer of Articles and Datasets, not nested under either.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-500" />
                    <span>Apps already connect both ways with Datasets <em>and</em> with Articles (the structure is a 3-way triangle of two-way connections). The four datahub patterns work out of the box on the App ↔ Dataset edge; Articles citing apps and datasets work today too. <NuxtLink
                      to="/schema"
                      class="font-semibold text-violet-700 underline-offset-2 hover:underline dark:text-violet-400"
                    >
                      Schema details →
                    </NuxtLink></span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-500" />
                    <span>Browsing UX for Apps/Dashboards (filters, list page, detail page) is open territory — TBD as Hub 2.0 progresses.</span>
                  </li>
                </ul>
              </div>

              <p class="text-xs text-zinc-600 dark:text-zinc-400">
                <UIcon
                  name="i-lucide-arrow-right"
                  class="-mt-0.5 mr-1 inline size-3.5"
                />
                See the datahub roadmap context on
                <NuxtLink
                  to="/taxonomy"
                  class="font-semibold text-violet-700 underline-offset-2 hover:underline dark:text-violet-400"
                  @click="isContentTypeOpen = false"
                >
                  /taxonomy
                </NuxtLink>.
              </p>
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style>
details summary .iconify.i-lucide\:chevron-down {
  transition: transform 200ms ease;
  display: inline-block;
}
details[open] > summary .iconify.i-lucide\:chevron-down {
  transform: rotate(180deg) !important;
}
</style>
