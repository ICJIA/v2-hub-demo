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

interface Upgrade {
  title: string
  body: string
  to: string
  cta: string
  accent: 'sky' | 'emerald' | 'violet' | 'amber' | 'zinc'
  fullWidth?: boolean
}

const upgrades: Upgrade[] = [
  {
    title: 'Search highlights what it matched',
    body: 'Type a word in the search box (try "opioid"). Matching articles surface, with the word highlighted in title and summary.',
    to: '/view0',
    cta: 'Try it on /view0',
    accent: 'emerald'
  },
  {
    title: 'Click any author for their work',
    body: 'Every author name on a card is a one-click filter. See everything that person has published.',
    to: '/view0',
    cta: 'Try it on /view0',
    accent: 'violet'
  },
  {
    title: 'One author entry, every variant matched',
    body: '"Riley Calder", "Riley Calder, Ph.D", "Riley Calder, PhD" all merge to one entry — the count and click work across all of them.',
    to: '/#author-normalization',
    cta: 'See the breakdown on /',
    accent: 'violet'
  },
  {
    title: 'Click tags. Stack them.',
    body: 'Click one tag to filter. Click another to widen. Each active tag shows as a removable pill near the result count.',
    to: '/view0',
    cta: 'Try it on /view0',
    accent: 'amber'
  },
  {
    title: 'Filter by ICJIA Center',
    body: 'Narrow articles to a specific division — Center for Justice Research and Evaluation, Center for Victim Studies, the rest. All five are always visible.',
    to: '/view2',
    cta: 'Try it on /view2',
    accent: 'sky'
  },
  {
    title: 'Three layouts to compare',
    body: 'Same data, three filter UXs. View 0 (chips + advanced toggle), View 1 (dropdown menus), View 2 (chips + always-on bar). Pick a winner.',
    to: '/view0',
    cta: '/view0 · /view1 · /view2',
    accent: 'zinc',
    fullWidth: true
  }
]

const accentClasses: Record<Upgrade['accent'], { ring: string, hoverBorder: string, ctaText: string }> = {
  sky: {
    ring: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
    hoverBorder: 'hover:border-sky-500/60 dark:hover:border-sky-400/60 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400',
    ctaText: 'text-sky-700 dark:text-sky-400'
  },
  emerald: {
    ring: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    hoverBorder: 'hover:border-emerald-500/60 dark:hover:border-emerald-400/60 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400',
    ctaText: 'text-emerald-700 dark:text-emerald-400'
  },
  violet: {
    ring: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
    hoverBorder: 'hover:border-violet-500/60 dark:hover:border-violet-400/60 focus-visible:ring-violet-500 dark:focus-visible:ring-violet-400',
    ctaText: 'text-violet-700 dark:text-violet-400'
  },
  amber: {
    ring: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    hoverBorder: 'hover:border-amber-500/60 dark:hover:border-amber-400/60 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400',
    ctaText: 'text-amber-700 dark:text-amber-400'
  },
  zinc: {
    ring: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300',
    hoverBorder: 'hover:border-zinc-500/60 dark:hover:border-zinc-400/60 focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400',
    ctaText: 'text-zinc-700 dark:text-zinc-300'
  }
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

    <!-- 3. THE HEADLINE UPGRADE -->
    <section class="border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-50 px-6 py-12 sm:px-12 lg:px-16 dark:border-zinc-800 dark:from-[#0a0a0a] dark:to-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
          The headline fix
        </div>
        <h2 class="mb-6 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-white">
          Finding research reports: from many clicks to <span class="text-amber-700 dark:text-amber-400">one</span>.
        </h2>

        <div class="my-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <div class="w-full max-w-xs rounded-2xl border-2 border-zinc-300 bg-zinc-100/70 px-8 py-6 text-center sm:w-auto dark:border-zinc-800 dark:bg-zinc-900/50">
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
              Live hub today
            </div>
            <div class="mt-2 text-4xl font-black tracking-tight text-zinc-700 sm:text-5xl dark:text-zinc-300">
              many clicks
            </div>
            <div class="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              open menu → scroll → find → click → click
            </div>
          </div>
          <div
            class="text-5xl font-black text-sky-600 sm:text-7xl dark:text-sky-400"
            aria-hidden="true"
          >
            →
          </div>
          <NuxtLink
            to="/view0"
            class="group block w-full max-w-xs rounded-2xl border-2 border-amber-500 bg-amber-500/10 px-8 py-6 text-center transition-colors hover:border-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:w-auto dark:border-amber-400 dark:hover:border-amber-300 dark:focus-visible:ring-amber-400"
          >
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
              This demo
            </div>
            <div class="mt-2 text-4xl font-black tracking-tight text-amber-700 sm:text-5xl dark:text-amber-400">
              one click
            </div>
            <div class="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              Click <strong>Research Reports</strong>. Done.
            </div>
            <div class="mt-3 flex items-center justify-center gap-1 text-xs font-bold text-amber-700 group-hover:underline dark:text-amber-400">
              <UIcon
                name="i-lucide-mouse-pointer-click"
                class="size-3.5"
              />
              Try the one-click filter →
            </div>
          </NuxtLink>
        </div>
        <p class="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Same data. The chips on every view do the work.
        </p>
      </div>
    </section>

    <!-- 4. THE SIX OTHER UPGRADES -->
    <section class="border-b border-zinc-200 bg-white px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
          Everything else
        </div>
        <h2 class="mb-8 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
          Six more, just as practical.
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <NuxtLink
            v-for="(upgrade, i) in upgrades"
            :key="upgrade.title"
            :to="upgrade.to"
            :class="[
              'group block rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-colors focus:outline-none focus-visible:ring-2 dark:border-zinc-800 dark:bg-zinc-900',
              accentClasses[upgrade.accent].hoverBorder,
              upgrade.fullWidth ? 'md:col-span-2' : ''
            ]"
          >
            <div :class="['mb-3 flex size-10 items-center justify-center rounded-xl', accentClasses[upgrade.accent].ring]">
              <span class="text-lg font-black">{{ i + 1 }}</span>
            </div>
            <h3 class="mb-2 text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
              {{ upgrade.title }}
            </h3>
            <p class="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {{ upgrade.body }}
            </p>
            <div :class="['flex items-center gap-1 text-xs font-bold group-hover:underline', accentClasses[upgrade.accent].ctaText]">
              <UIcon
                name="i-lucide-mouse-pointer-click"
                class="size-3.5"
              />
              {{ upgrade.cta }} →
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 5. TL;DR -->
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

    <!-- 6. DEEP DIVES -->
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
  </div>
</template>
