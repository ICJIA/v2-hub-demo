<script setup lang="ts">
const PAGE_TITLE = 'What this demo shows — ICJIA Research Hub Demo'
const PAGE_DESCRIPTION = 'Seven small upgrades the live hub doesn\'t have yet — one-click filters, author normalization, click-to-filter tags, and three layouts to try.'
const PAGE_URL = 'https://v2-hub-demo.netlify.app/about'
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

interface UpgradeLink {
  label: string
  to: string
}

interface Upgrade {
  title: string
  shortBody: string
  description: string
  whyItMatters: string
  links: UpgradeLink[]
  accent: 'sky' | 'emerald' | 'violet' | 'amber' | 'zinc'
  visual?: 'click-equivalence' | 'author-merge'
  fullWidth?: boolean
}

const upgrades: Upgrade[] = [
  {
    title: 'Find research reports in one click',
    shortBody: 'Click "Research Reports" on any view and the list narrows to exactly those. Same one-click filter for every type.',
    description: 'Every view has a row of chips at the top — Research Reports, Annual Reports, Program Evaluation Summaries, Updates, Strategic Plans. Click one and the list filters to that type. The chips work the same way for every one of the 14 article types.',
    whyItMatters: 'Finding a research report on the live hub today takes 5+ clicks: open menu, scroll the list, find the type, click, then click again. Here it\'s one click. Same data, exposed via a chip instead of buried in a menu.',
    links: [{ label: 'Try it on /view0', to: '/view0' }],
    accent: 'amber',
    visual: 'click-equivalence'
  },
  {
    title: 'Search highlights what it matched',
    shortBody: 'Type a word and matching articles surface, with the word highlighted in title and summary.',
    description: 'Type a word in the search box — try "opioid". Articles mentioning it surface in the list, and the word itself is visibly highlighted in their title and summary.',
    whyItMatters: 'On the live hub, search returns articles but doesn\'t show why they matched. Here you can see at a glance — saves the time you\'d otherwise spend scanning each article looking for your search term.',
    links: [{ label: 'Try it on /view0', to: '/view0' }],
    accent: 'emerald'
  },
  {
    title: 'Click any author for their work',
    shortBody: 'Every author name on a card is a one-click filter. See everything that person has published.',
    description: 'Author names on every article card are clickable. Click one and the list narrows to every article that author worked on. Click another author to switch. Click the active author chip near the result count to clear it.',
    whyItMatters: 'Useful when you remember a researcher\'s name but not the article — or when you want to read everything by one person without searching for each piece by hand.',
    links: [{ label: 'Try it on /view0', to: '/view0' }],
    accent: 'violet'
  },
  {
    title: 'One author entry, every variant matched',
    shortBody: '"Riley Calder", "Riley Calder, Ph.D", "Riley Calder, PhD" all merge to one entry. The count and click work across all of them.',
    description: 'The CMS sometimes credits the same person three or four different ways — with credentials, without, with stray whitespace, in ALL CAPS. Without normalization the dropdown lists them as separate people. This demo merges every variant onto a single canonical entry, so you see one author, one count, one click — and clicking matches every variant on every article.',
    whyItMatters: 'On the live hub today, prolific researchers are scattered across multiple dropdown entries. Their work fragments. Here it consolidates: one Riley Carter, the full body of work, one click away.',
    links: [{ label: 'See the breakdown on /', to: '/#author-normalization' }],
    accent: 'violet',
    visual: 'author-merge'
  },
  {
    title: 'Click tags. Stack them.',
    shortBody: 'Click one tag to filter. Click another to widen. Each active tag shows as a removable pill near the result count.',
    description: 'Tags on every article card are clickable. Click one and the list narrows to articles with that tag. Click another and the list widens — articles with either tag now appear. Each active tag shows as a removable pill near the result count, so you can clear them one at a time.',
    whyItMatters: 'Lets you explore a topic from multiple angles without losing your place. Stacking tags is "OR" not "AND" — you keep accumulating possible reads, not narrowing them away.',
    links: [{ label: 'Try it on /view0', to: '/view0' }],
    accent: 'amber'
  },
  {
    title: 'Filter by ICJIA Center',
    shortBody: 'Narrow articles to a specific division — Center for Justice Research and Evaluation, Center for Victim Studies, the rest. All five always visible.',
    description: 'Each article is published by one of five ICJIA Centers. The Centers filter is a dropdown that\'s always visible on the home page and View 2. All five Centers are listed regardless of how much each one has published; clicking one narrows the article list to that Center.',
    whyItMatters: 'See one Center\'s body of work without hunting for it. Useful for stakeholders who care about a specific division\'s output, and for quickly answering "what has this Center put out?"',
    links: [{ label: 'Try it on /view2', to: '/view2' }],
    accent: 'sky'
  },
  {
    title: 'Three layouts to compare',
    shortBody: 'Same data, three filter UX flavors. View 0 (chips + advanced toggle), View 1 (dropdowns only), View 2 (chips + always-on bar). Pick a winner.',
    description: 'View 0 has chips at the top and an "Advanced filters" toggle that hides the full filter bar by default — the friendliest first impression. View 1 uses dropdown menus exclusively (closest to the live site today). View 2 shows chips and the full filter bar side by side, always visible — maximum flexibility, more visual weight.',
    whyItMatters: 'The team can pick the layout that works best in side-by-side review — and that becomes the live hub experience. The decision affects every visitor for years; comparing three live mockups is the way to make it.',
    links: [
      { label: 'View 0', to: '/view0' },
      { label: 'View 1', to: '/view1' },
      { label: 'View 2', to: '/view2' }
    ],
    accent: 'zinc',
    fullWidth: true
  }
]

const accentClasses: Record<Upgrade['accent'], { ring: string, hoverBorder: string, ctaText: string, modalAccent: string }> = {
  sky: {
    ring: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
    hoverBorder: 'hover:border-sky-500/60 dark:hover:border-sky-400/60 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400',
    ctaText: 'text-sky-700 dark:text-sky-400',
    modalAccent: 'text-sky-700 dark:text-sky-400'
  },
  emerald: {
    ring: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    hoverBorder: 'hover:border-emerald-500/60 dark:hover:border-emerald-400/60 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400',
    ctaText: 'text-emerald-700 dark:text-emerald-400',
    modalAccent: 'text-emerald-700 dark:text-emerald-400'
  },
  violet: {
    ring: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
    hoverBorder: 'hover:border-violet-500/60 dark:hover:border-violet-400/60 focus-visible:ring-violet-500 dark:focus-visible:ring-violet-400',
    ctaText: 'text-violet-700 dark:text-violet-400',
    modalAccent: 'text-violet-700 dark:text-violet-400'
  },
  amber: {
    ring: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    hoverBorder: 'hover:border-amber-500/60 dark:hover:border-amber-400/60 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400',
    ctaText: 'text-amber-700 dark:text-amber-400',
    modalAccent: 'text-amber-700 dark:text-amber-400'
  },
  zinc: {
    ring: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300',
    hoverBorder: 'hover:border-zinc-500/60 dark:hover:border-zinc-400/60 focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400',
    ctaText: 'text-zinc-700 dark:text-zinc-300',
    modalAccent: 'text-zinc-700 dark:text-zinc-300'
  }
}

const selectedUpgradeIndex = ref<number | null>(null)
const isModalOpen = ref(false)

const selectedUpgrade = computed(() =>
  selectedUpgradeIndex.value !== null ? upgrades[selectedUpgradeIndex.value] : null
)

function openUpgrade(index: number) {
  selectedUpgradeIndex.value = index
  isModalOpen.value = true
}
</script>

<template>
  <div class="bg-white text-zinc-900 dark:bg-[#0a0a0a] dark:text-[#fafafa]">
    <!-- 1. HERO -->
    <section class="px-6 pt-16 pb-8 sm:px-12 lg:px-16">
      <div class="mx-auto max-w-5xl">
        <div class="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
          What this demo adds
        </div>
        <h1 class="mb-4 text-5xl font-black leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
          Seven small upgrades.<br>One big difference.
        </h1>
        <p class="mb-7 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          What this proof-of-concept does that the live hub doesn't — so anyone can find what they're looking for in <span class="font-semibold text-zinc-900 dark:text-white">one or two clicks</span>.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="/"
            label="See it on the home page"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            variant="solid"
            class="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
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
        <div class="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-5 dark:bg-emerald-500/10">
          <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
            <UIcon
              name="i-lucide-list-checks"
              class="size-5"
            />
          </div>
          <div class="text-4xl font-black tracking-tight text-emerald-700 sm:text-5xl dark:text-emerald-400">
            7
          </div>
          <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            upgrades shipping in this POC
          </div>
        </div>
        <div class="rounded-2xl border-2 border-sky-500 bg-sky-50 p-5 dark:bg-sky-500/10">
          <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-700 dark:text-sky-300">
            <UIcon
              name="i-lucide-mouse-pointer-click"
              class="size-5"
            />
          </div>
          <div class="text-4xl font-black tracking-tight text-sky-700 sm:text-5xl dark:text-sky-400">
            1
          </div>
          <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            click to find research reports
          </div>
        </div>
        <div class="rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 dark:bg-violet-500/10">
          <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-700 dark:text-violet-300">
            <UIcon
              name="i-lucide-merge"
              class="size-5"
            />
          </div>
          <div class="text-4xl font-black tracking-tight text-violet-700 sm:text-5xl dark:text-violet-400">
            1
          </div>
          <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            entry per author, every variant counted
          </div>
        </div>
        <div class="rounded-2xl border-2 border-amber-500 bg-amber-50 p-5 dark:bg-amber-500/10">
          <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300">
            <UIcon
              name="i-lucide-building-2"
              class="size-5"
            />
          </div>
          <div class="text-4xl font-black tracking-tight text-amber-700 sm:text-5xl dark:text-amber-400">
            5
          </div>
          <div class="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            ICJIA Centers always visible
          </div>
        </div>
      </div>
    </section>

    <!-- 3. THE SEVEN UPGRADES — interactive grid -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
          All seven, at a glance
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Click any one for the details.
        </h2>
        <p class="mb-8 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          Each card opens a quick explainer with what the upgrade does, why it matters, and where to try it. Then jump to a view from inside the modal.
        </p>
        <div class="grid gap-4 md:grid-cols-2">
          <button
            v-for="(upgrade, i) in upgrades"
            :key="upgrade.title"
            type="button"
            :class="[
              'group block rounded-2xl border border-zinc-200 bg-white p-6 text-left transition-colors focus:outline-none focus-visible:ring-2 dark:border-zinc-800 dark:bg-zinc-900',
              accentClasses[upgrade.accent].hoverBorder,
              upgrade.fullWidth ? 'md:col-span-2' : ''
            ]"
            @click="openUpgrade(i)"
          >
            <div class="mb-3 flex items-center gap-3">
              <div :class="['flex size-10 items-center justify-center rounded-xl', accentClasses[upgrade.accent].ring]">
                <span class="text-lg font-black">{{ i + 1 }}</span>
              </div>
              <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
                Upgrade {{ i + 1 }} of 7
              </div>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              {{ upgrade.title }}
            </h3>
            <p class="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {{ upgrade.shortBody }}
            </p>
            <div :class="['flex items-center gap-1 text-xs font-bold group-hover:underline', accentClasses[upgrade.accent].ctaText]">
              <UIcon
                name="i-lucide-mouse-pointer-click"
                class="size-3.5"
              />
              Click for the details →
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- 4. TL;DR -->
    <section class="border-y-4 border-emerald-500 bg-emerald-100/40 px-6 py-16 sm:px-12 lg:px-16 dark:border-emerald-500/80 dark:bg-emerald-500/10">
      <div class="mx-auto max-w-4xl">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
            <UIcon
              name="i-lucide-zap"
              class="size-6"
            />
          </div>
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 sm:text-sm dark:text-emerald-300">
            The point
          </span>
        </div>
        <h2 class="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          Everything's already on the hub. The demo just <span class="text-emerald-700 dark:text-emerald-400">exposes</span> it.
        </h2>
        <p class="text-xl leading-relaxed text-zinc-700 sm:text-2xl dark:text-zinc-300">
          Every research report. Every author's full body of work. Every tag. The structure was always there — Hub 2.0 just gave you the chips to click.
        </p>
      </div>
    </section>

    <!-- 5. DEEP DIVES -->
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
              The three-bucket structure, the 14 article types, and the proposed dataset/dashboard linking. With diagrams.
            </p>
            <div class="text-xs font-semibold uppercase tracking-[0.04em] text-sky-600 group-hover:underline dark:text-sky-400">
              /taxonomy →
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

    <!-- UPGRADE DETAIL MODAL -->
    <UModal v-model:open="isModalOpen">
      <template #content>
        <div
          v-if="selectedUpgrade"
          class="bg-white p-6 sm:p-8 dark:bg-zinc-950"
        >
          <div class="mb-5 flex items-start gap-4">
            <div :class="['flex size-12 shrink-0 items-center justify-center rounded-xl', accentClasses[selectedUpgrade.accent].ring]">
              <span class="text-xl font-black">{{ (selectedUpgradeIndex ?? 0) + 1 }}</span>
            </div>
            <div class="flex-1">
              <div class="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                Upgrade {{ (selectedUpgradeIndex ?? 0) + 1 }} of 7
              </div>
              <h3 class="text-xl font-extrabold leading-tight text-zinc-900 sm:text-2xl dark:text-white">
                {{ selectedUpgrade.title }}
              </h3>
            </div>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="sm"
              aria-label="Close"
              @click="isModalOpen = false"
            />
          </div>

          <div class="space-y-5">
            <div>
              <div :class="['mb-2 text-xs font-bold uppercase tracking-[0.14em]', accentClasses[selectedUpgrade.accent].modalAccent]">
                What it does
              </div>
              <p class="text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
                {{ selectedUpgrade.description }}
              </p>
            </div>

            <!-- Special visual: click equivalence (upgrade #1) -->
            <div
              v-if="selectedUpgrade.visual === 'click-equivalence'"
              class="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-5 sm:flex-row sm:gap-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div class="w-full max-w-[10rem] rounded-xl border border-zinc-300 bg-zinc-100/70 px-4 py-3 text-center sm:w-auto dark:border-zinc-700 dark:bg-zinc-800/70">
                <div class="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
                  Live hub today
                </div>
                <div class="mt-1 text-2xl font-black tracking-tight text-zinc-700 dark:text-zinc-300">
                  many clicks
                </div>
              </div>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-6 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              <div class="w-full max-w-[10rem] rounded-xl border-2 border-amber-500 bg-amber-500/10 px-4 py-3 text-center sm:w-auto dark:border-amber-400">
                <div class="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
                  This demo
                </div>
                <div class="mt-1 text-2xl font-black tracking-tight text-amber-700 dark:text-amber-400">
                  one click
                </div>
              </div>
            </div>

            <!-- Special visual: author merge (upgrade #4) -->
            <div
              v-if="selectedUpgrade.visual === 'author-merge'"
              class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div class="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div>
                  <div class="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-400">
                    The CMS delivers
                  </div>
                  <ul class="space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                    <li class="rounded border border-zinc-200 bg-white px-2 py-1 dark:border-zinc-700 dark:bg-zinc-950">
                      Riley Carter
                    </li>
                    <li class="rounded border border-zinc-200 bg-white px-2 py-1 dark:border-zinc-700 dark:bg-zinc-950">
                      Riley Carter, Ph.D
                    </li>
                    <li class="rounded border border-zinc-200 bg-white px-2 py-1 dark:border-zinc-700 dark:bg-zinc-950">
                      RILEY CARTER
                    </li>
                    <li class="rounded border border-zinc-200 bg-white px-2 py-1 font-mono dark:border-zinc-700 dark:bg-zinc-950">
                      ··Riley  Carter··
                    </li>
                  </ul>
                </div>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="hidden size-6 text-violet-500 md:block"
                  aria-hidden="true"
                />
                <UIcon
                  name="i-lucide-arrow-down"
                  class="mx-auto size-6 text-violet-500 md:hidden"
                  aria-hidden="true"
                />
                <div class="rounded-xl border-2 border-violet-500 bg-violet-500/10 p-3 text-center">
                  <div class="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300">
                    The filter shows
                  </div>
                  <div class="mt-1.5 text-base font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Riley Carter
                  </div>
                  <div class="mt-1 inline-block rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:text-violet-300">
                    4 articles
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div :class="['mb-2 text-xs font-bold uppercase tracking-[0.14em]', accentClasses[selectedUpgrade.accent].modalAccent]">
                Why it matters
              </div>
              <p class="text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
                {{ selectedUpgrade.whyItMatters }}
              </p>
            </div>
          </div>

          <!-- Footer CTAs -->
          <div class="mt-6 flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <span class="text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
              <UIcon
                name="i-lucide-mouse-pointer-click"
                class="-mt-0.5 mr-1 inline size-3.5"
              />
              Try it:
            </span>
            <UButton
              v-for="link in selectedUpgrade.links"
              :key="link.to"
              :to="link.to"
              :label="link.label"
              trailing-icon="i-lucide-arrow-right"
              color="neutral"
              variant="solid"
              class="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              size="md"
              @click="isModalOpen = false"
            />
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
