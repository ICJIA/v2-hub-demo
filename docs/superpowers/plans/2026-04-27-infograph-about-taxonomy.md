# Infograph `/about` and `/taxonomy` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `app/pages/about.vue` and `app/pages/taxonomy.vue` so they adopt the home page's infograph vocabulary (big headlines, stat strips, equivalence visuals, numbered cards, color-coded TL;DR callouts, deep-dive cards). `/about` reformats the existing 7-item list into 6 numbered upgrade cards plus a "many clicks → one click" headline-fix equivalence visual. `/taxonomy` aggressively trims the long-form prose, replaces both Mermaid diagrams with bespoke infograph treatments, and keeps the existing 14-type interactive grid + modal.

**Architecture:** Two `app/pages/*.vue` files get full template rewrites using the same Tailwind + Nuxt UI utility classes home already uses. No new components — `HubArticleTypeGrid` and `ArticleTypeExamplesModal` are reused on `/taxonomy`; `MermaidDiagram` is no longer imported (file stays in place). One small one-line edit on `app/pages/index.vue` adds `id="author-normalization"` so `/about` can deep-link to home's existing author-normalization showcase.

**Tech Stack:** Nuxt 4.4, Vue 3, Nuxt UI 4.6, Tailwind CSS 4.2, TypeScript, vue-tsc, ESLint. No test runner in the project — verification is via `pnpm typecheck`, `pnpm lint`, manual dev verification on `pnpm dev`, a final `pnpm generate` to confirm static build still works, and (per the user's tool preferences) accessibility/performance audits via `lightcap` MCP and a viewcap screenshot.

**Reference spec:** `docs/superpowers/specs/2026-04-27-infograph-about-taxonomy-design.md`
**Reference page (the visual template being matched):** `app/pages/index.vue`

**Conventions:**

- Commit messages follow the project's existing scoped Conventional Commits style (e.g. `feat(about): …`, `feat(taxonomy): …`, `chore(release): …`, `docs(changelog): …`). Examples taken from recent commits visible in `git log`.
- Do **not** add Claude as a Co-Authored-By in commit messages — the user has flagged this as a global preference.
- Dev server is assumed running on `http://localhost:3000` for manual verifications. If it's not, start it with `pnpm dev`.
- This change includes a minor version bump from `0.1.77` to `0.1.78` and a CHANGELOG entry, per the project's existing release rhythm.

---

## Task 1: Add `id="author-normalization"` anchor to the home page

**What this does:** Lets `/about` deep-link to the home page's existing "Same person, listed seven different ways" author-normalization showcase. One-line edit. Fast warmup task before the larger page rewrites.

**Files:**

- Modify: `app/pages/index.vue:579` (the section opening tag)

- [ ] **Step 1: Add the `id` attribute to the section opening tag**

Open `app/pages/index.vue`. Find line 579, which currently reads:

```vue
    <section class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]">
```

(Confirm the section by checking that the line above is the `<!-- 6.5 AUTHOR NORMALIZATION — one more under-the-hood fix -->` comment.)

Replace with:

```vue
    <section
      id="author-normalization"
      class="border-b border-zinc-200 bg-white px-6 py-16 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0a0a0a]"
    >
```

- [ ] **Step 2: Verify typecheck and lint**

Run:

```bash
pnpm typecheck
pnpm lint
```

Expected: both exit 0, no errors.

- [ ] **Step 3: Manually verify the anchor in dev**

In the browser, visit `http://localhost:3000/#author-normalization`.

Expected: the page scrolls down to the "Same person, listed seven different ways." section. The URL bar shows `#author-normalization`.

- [ ] **Step 4: Commit**

```bash
git add app/pages/index.vue
git commit -m "$(cat <<'EOF'
feat(home): add author-normalization anchor for /about deep-link

The new /about page links its author-normalization upgrade card
to /#author-normalization. This adds the missing id attribute
to the existing section.
EOF
)"
```

---

## Task 2: Rewrite `/about` with infograph treatment

**What this does:** Full file replacement of `app/pages/about.vue`. New page has six sections: hero, stat strip, headline-fix equivalence ("many clicks → one click"), six numbered upgrade cards (each linking to a view that demos that feature), TL;DR callout, deep-dive cards. Drops the existing `<UContainer>` + flat 7-item `<ul>` layout. Matches home's section padding (`px-6 py-12 sm:px-12 sm:py-14 lg:px-16`), max-width (`max-w-5xl`), typography (`text-5xl sm:text-6xl lg:text-7xl font-black` for H1), and dark/light variants on every literal class.

**Files:**

- Modify: `app/pages/about.vue` (full rewrite)

- [ ] **Step 1: Read the existing file so you know what's being replaced**

Run:

```bash
wc -l app/pages/about.vue
```

Expected: 73 lines. The existing file is the `<UContainer>` + flat list. You're replacing all of it.

- [ ] **Step 2: Replace the entire file contents**

Write the new contents of `app/pages/about.vue`:

```vue
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

const accentClasses: Record<Upgrade['accent'], { ring: string, text: string, hoverBorder: string, ctaText: string }> = {
  sky: {
    ring: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
    text: 'text-sky-700 dark:text-sky-400',
    hoverBorder: 'hover:border-sky-500/60 dark:hover:border-sky-400/60 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400',
    ctaText: 'text-sky-700 dark:text-sky-400'
  },
  emerald: {
    ring: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    text: 'text-emerald-700 dark:text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/60 dark:hover:border-emerald-400/60 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400',
    ctaText: 'text-emerald-700 dark:text-emerald-400'
  },
  violet: {
    ring: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
    text: 'text-violet-700 dark:text-violet-400',
    hoverBorder: 'hover:border-violet-500/60 dark:hover:border-violet-400/60 focus-visible:ring-violet-500 dark:focus-visible:ring-violet-400',
    ctaText: 'text-violet-700 dark:text-violet-400'
  },
  amber: {
    ring: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    text: 'text-amber-700 dark:text-amber-400',
    hoverBorder: 'hover:border-amber-500/60 dark:hover:border-amber-400/60 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400',
    ctaText: 'text-amber-700 dark:text-amber-400'
  },
  zinc: {
    ring: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300',
    text: 'text-zinc-700 dark:text-zinc-300',
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
```

- [ ] **Step 3: Verify typecheck and lint**

Run:

```bash
pnpm typecheck
pnpm lint
```

Expected: both exit 0, no errors.

If lint flags Tailwind class ordering (the project's eslint config uses `@nuxt/eslint`'s default rules; it may auto-fix), run:

```bash
pnpm lint --fix
```

Re-run `pnpm lint` and confirm it passes.

- [ ] **Step 4: Manually verify each section in dev**

Open `http://localhost:3000/about`. Walk through each section and confirm it renders as the spec describes. Use the viewcap MCP for screenshots if helpful (per user tool preferences).

Verify:

1. **Hero** — H1 reads "Seven small upgrades. / One big difference." (with line break). Eyebrow `WHAT THIS DEMO ADDS` is emerald. Two CTAs: solid dark "See it on the home page" links to `/`; outline "Open View 0" links to `/view0`. Both work.
2. **Stat strip** — four tiles with `7`, `1`, `1`, `5`. Colors: emerald, sky, violet, amber. Each tile has an icon above the numeral.
3. **Headline fix** — "Live hub today / many clicks" (zinc, dimmed) → arrow → "This demo / one click" (amber). The right-hand card is clickable: hover shifts the border, click navigates to `/view0`. Inside the right card, `🖱 Try the one-click filter →` reads.
4. **Six upgrades** — six cards in a 2-col grid; the last ("Three layouts to compare") spans full width. Each card has a numbered circle (1–6) colored by accent. Each is clickable, with a `🖱 Try it on /viewN →` CTA. Hover shifts the border to the accent color. Click each to confirm it lands on the right route:
   - Card 1 → `/view0`
   - Card 2 → `/view0`
   - Card 3 → `/#author-normalization` (should scroll to the author normalization section on home)
   - Card 4 → `/view0`
   - Card 5 → `/view2`
   - Card 6 → `/view0`
5. **TL;DR** — emerald-bordered band with `i-lucide-zap` icon, eyebrow `THE POINT`, big H2 "Everything's already on the hub. The demo just *exposes* it."
6. **Deep dives** — two cards, /taxonomy (sky) and / (amber). Both clickable.

Now toggle the color mode via the header button and re-walk: every section should remain readable in both light and dark.

- [ ] **Step 5: Verify mobile breakpoint**

Resize the browser to ~375px width (or use DevTools mobile preset). Verify:

- Hero H1 is still readable, doesn't overflow horizontally.
- Stat strip collapses to 2-col.
- Headline-fix equivalence stacks vertically with the arrow rotated to point down (the spec's CSS uses `flex-col` / `sm:flex-row` so this should happen automatically — confirm).
- Six upgrades grid stacks to 1-col.
- TL;DR H2 doesn't wrap awkwardly. If it does (the spec flagged this risk), tighten to `text-3xl sm:text-4xl lg:text-5xl` and re-verify.

- [ ] **Step 6: Commit**

```bash
git add app/pages/about.vue
git commit -m "$(cat <<'EOF'
feat(about): rewrite as infograph page matching home

Replaces the flat 7-item checkmark list with home's
visual vocabulary: hero, stat strip, "many clicks → one
click" equivalence visual, six numbered upgrade cards
(each linking to the view that demos that feature),
TL;DR callout, deep-dive cards. Every clickable card
carries an explicit "Try it →" affordance.
EOF
)"
```

---

## Task 3: Rewrite `/taxonomy` with infograph treatment

**What this does:** Full file replacement of `app/pages/taxonomy.vue`. New page has eight sections: hero, stat strip, architecture (3-content-type ribbon + Hub 1.0 ≡ Hub 2.0 equivalence), naming callout, 14-type interactive grid (preserved), proposed datahub (4 pattern cards + schema-supported tile), TL;DR callout, deep-dive cards. Drops both Mermaid diagrams, the long taxonomy analogy, and the "every database is a taxonomy" walkthrough. Reuses the existing `HubArticleTypeGrid` and `ArticleTypeExamplesModal` components.

**Files:**

- Modify: `app/pages/taxonomy.vue` (full rewrite)

- [ ] **Step 1: Read the existing file so you know what's being replaced**

Run:

```bash
wc -l app/pages/taxonomy.vue
```

Expected: 320 lines. The existing file has both Mermaid diagrams and the long-form prose. You're replacing all of it.

- [ ] **Step 2: Replace the entire file contents**

Write the new contents of `app/pages/taxonomy.vue`:

```vue
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
            to="/"
            label="Try filtering"
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
            top-level content types
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
            named article types
          </div>
        </div>
        <div class="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-5 dark:bg-emerald-500/10">
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
        </div>
        <div class="rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 dark:bg-violet-500/10">
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
        </div>
      </div>
    </section>

    <!-- 3. THE ARCHITECTURE -->
    <section class="border-b border-zinc-200 bg-zinc-50 px-6 py-14 sm:px-12 lg:px-16 dark:border-zinc-800 dark:bg-[#0e0e10]">
      <div class="mx-auto max-w-5xl">
        <div class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
          Inherited from Hub 1.0
        </div>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl dark:text-white">
          Same bones. Modern CMS.
        </h2>
        <p class="mb-7 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
          The hub holds three top-level buckets. Hub 2.0 swapped the CMS to <strong>Strapi 5</strong> but kept the original Hub 1.0 shape intact — because the original team got it right.
        </p>

        <!-- 3-content-type ribbon -->
        <div class="mb-10 grid gap-3 sm:grid-cols-3">
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
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span class="rounded-full border border-amber-500 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">type</span>
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">categories</span>
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">tags</span>
            </div>
            <div class="mt-2 text-[10px] text-zinc-600 dark:text-zinc-400">
              <code class="text-amber-700 dark:text-amber-300">type</code>: 14 fixed values · the rest: free-form
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
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">categories</span>
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">tags</span>
            </div>
            <div class="mt-2 text-[10px] text-zinc-600 dark:text-zinc-400">
              free-form labels · no <code>type</code> enum
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
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">categories</span>
              <span class="rounded-full bg-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">tags</span>
            </div>
            <div class="mt-2 text-[10px] text-zinc-600 dark:text-zinc-400">
              free-form labels · no <code>type</code> enum
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
          <div class="w-full max-w-xs rounded-2xl border-2 border-sky-500 bg-sky-500/10 px-8 py-6 text-center sm:w-auto">
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
          Hub 2.0 inherited the structure that <span class="text-sky-700 dark:text-sky-400">already worked.</span>
        </h2>
        <p class="text-xl leading-relaxed text-zinc-700 sm:text-2xl dark:text-zinc-300">
          This demo exposes the shape so visitors can filter by it. The bones haven't changed since Hub 1.0 — and that's why filters and search work at all.
        </p>
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
```

- [ ] **Step 3: Verify typecheck and lint**

Run:

```bash
pnpm typecheck
pnpm lint
```

Expected: both exit 0, no errors.

If lint flags Tailwind class ordering, run `pnpm lint --fix` and re-verify.

- [ ] **Step 4: Manually verify each section in dev**

Open `http://localhost:3000/taxonomy`. Walk through each section.

Verify:

1. **Hero** — H1 reads "How Hub 2.0 organizes / everything it publishes." Eyebrow `THE STRUCTURE` is sky. Two CTAs: "See the 14 types" smooth-scrolls to the type-grid section; "Try filtering" links to `/`.
2. **Stat strip** — four tiles with `3`, `14`, `1`, `4`. Colors: sky, amber, emerald, violet.
3. **Architecture** — three-content-type ribbon (Articles amber + emphasized; Datasets and Apps zinc + dimmed). Each card shows its field chips. Below: `Hub 1.0 shape ≡ Hub 2.0 shape` equivalence visual with the `≡` glyph.
4. **Naming callout** — amber-tinted strip with `i-lucide-notebook-pen`, eyebrow `THE NAMING DECISION`, two paragraphs about "summaries" vs "articles".
5. **The 14 types (interactive)** — `id="types"` anchor; clicking the hero "See the 14 types" CTA scrolls here. The `HubArticleTypeGrid` renders. Click any pill — the modal opens with examples (this is the existing behavior; confirm it still works).
6. **Datahub** — eyebrow `WHAT'S NEXT` with a "Future" badge. H2 "Connecting datasets to dashboards. Four patterns." Four cards in a 2x2 (or 4-col on lg:) grid: `Solo dataset` (sky), `One app, one dataset` (emerald), `One app, many datasets` (amber), `Shared dataset` (violet). Each card has icon-relationship art. **None of the cards is clickable** — confirm hovering doesn't change the border. Below the grid: emerald-bordered "All four patterns: schema-supported in Strapi 5 today" tile with check icon.
7. **TL;DR** — sky-bordered band with `i-lucide-zap` icon, eyebrow `THE POINT`, big H2 "Hub 2.0 inherited the structure that *already worked.*"
8. **Deep dives** — two cards, /about (emerald) and / (amber). Both clickable.

Toggle the color mode and re-walk: every section should remain readable in both modes.

- [ ] **Step 5: Verify the type-grid modal still works (regression check)**

The `HubArticleTypeGrid` + `ArticleTypeExamplesModal` interaction is the main risk on this page. Click each of the 14 type pills:

- "Research Report" — modal opens, shows real examples
- "Annual Report" — modal opens, shows real examples (or illustrative-fill, since the data uses `fillRandom: true`)
- ... walk through each
- Close the modal via the close button or Escape — closes cleanly

If any pill fails to open the modal, check that the `selectedTypeForModal`/`isExamplesOpen` refs and the `showExamples` handler are wired correctly to `HubArticleTypeGrid`'s `@select` event.

- [ ] **Step 6: Verify mobile breakpoint**

Resize to ~375px width. Verify:

- Hero H1 reads cleanly (the `<br>` is mobile-friendly).
- Stat strip collapses to 2-col.
- 3-content-type ribbon stacks to 1-col (each card full-width).
- Hub 1.0 ≡ Hub 2.0 equivalence stacks vertically with the `≡` glyph centered between.
- Type grid (`HubArticleTypeGrid` `variant="list"`) is already responsive — verify it still reads well.
- Datahub 4-card grid stacks to 1-col (the spec uses `sm:grid-cols-2 lg:grid-cols-4` so at 375px it's 1-col).
- TL;DR H2 doesn't wrap awkwardly. Tighten to `text-3xl sm:text-4xl lg:text-5xl` if it does.

- [ ] **Step 7: Commit**

```bash
git add app/pages/taxonomy.vue
git commit -m "$(cat <<'EOF'
feat(taxonomy): rewrite as infograph page matching home

Drops the long taxonomy analogy and "every database is a
taxonomy" walkthrough. Replaces both Mermaid diagrams with
bespoke infograph treatments — a 3-content-type ribbon
showing each bucket's fields, plus four datahub-pattern
cards with Lucide icon-relationship art. Keeps the
14-type interactive grid + modal exactly as they were.
Adds the same hero/stat-strip/TL;DR rhythm the home page
established. Sky-dominant accent.
EOF
)"
```

---

## Task 4: Final verification, version bump, and CHANGELOG

**What this does:** Confirms the static build still works, runs an accessibility audit on both new pages (per the user's tool preferences), bumps the patch version, and writes the CHANGELOG entry.

**Files:**

- Modify: `package.json:3` (version bump)
- Modify: `CHANGELOG.md` (new release entry at the top)

- [ ] **Step 1: Run the full static build**

Run:

```bash
pnpm generate
```

Expected: completes successfully under the 4 GB heap. Output ends with prerendered route counts including `/about` and `/taxonomy`.

If the build fails, fix the failure and re-run before continuing.

- [ ] **Step 2: Inspect the generated HTML for both pages**

Run:

```bash
grep -c 'Seven small upgrades' dist/about/index.html
grep -c 'How Hub 2.0 organizes' dist/taxonomy/index.html
```

Expected: each prints `1` (or higher). The H1 for each page must be present in the prerendered HTML — this is what SEO and AI summarizers will read.

- [ ] **Step 3: Run accessibility audits via lightcap MCP**

Per the user's tool preferences (`/Users/cschweda/.claude/CLAUDE.md`), use the `lightcap` MCP server for accessibility audits. With the dev server running:

Run `mcp__lightcap__run_a11y` against `http://localhost:3000/about` and `http://localhost:3000/taxonomy`.

Expected: 100/100 on both. The home page already lands at 100 in v0.1.76; the new pages use the same color-contrast vocabulary, so they should match.

If any contrast failures surface (the spec flagged the dimmed-card text as a risk), tighten the offending text color to `text-zinc-700 dark:text-zinc-300` (which already passes 7.6:1 against zinc-50/zinc-900 backgrounds — the home spec's safe pair).

- [ ] **Step 4: Run a Lighthouse audit via lightcap MCP**

Run `mcp__lightcap__run_audit` against `http://localhost:3000/about` and `http://localhost:3000/taxonomy`.

Expected: scores in line with home (≥95 across performance/a11y/best-practices/SEO). The new pages have one `useArticles` call (only `/taxonomy`; `/about` has none), no images beyond Lucide icon SVGs, and no client-side hydration costs beyond what home already pays.

If performance regresses, the most likely culprit is the type-grid render on `/taxonomy` (which already exists and is unchanged). Don't over-engineer — match home's score, not exceed it.

- [ ] **Step 5: Take screenshots via viewcap MCP for visual verification**

Per the user's tool preferences, use `viewcap` (not Chrome DevTools MCP) for screenshots. Capture:

- `http://localhost:3000/about` — full-page screenshot, light mode
- `http://localhost:3000/about` — full-page screenshot, dark mode
- `http://localhost:3000/taxonomy` — full-page screenshot, light mode
- `http://localhost:3000/taxonomy` — full-page screenshot, dark mode

Spot-check: H1 sizes match home, color-coded sections feel like a family, every clickable card has the `🖱` affordance, the four datahub-pattern cards do **not** look clickable (no hover-shift, no `→` CTA inside).

- [ ] **Step 6: Bump version**

Edit `package.json:3` from:

```json
"version": "0.1.77",
```

to:

```json
"version": "0.1.78",
```

- [ ] **Step 7: Add CHANGELOG entry**

Open `CHANGELOG.md`. Add a new section immediately after the `# Changelog` header line and before the `## [0.1.77]` line:

```markdown
## [0.1.78] — 2026-04-27

### Changed

- **`/about` page** rewritten as an infograph matching the home page's vocabulary. Six numbered upgrade cards (each linking to the view that demos the feature), a "many clicks → one click" headline-fix equivalence visual, stat strip, TL;DR callout, deep-dive cards. Replaces the previous flat 7-item checkmark list. Every clickable card carries an explicit `🖱 Try it →` affordance.
- **`/taxonomy` page** rewritten as an infograph matching the home page's vocabulary. Drops the long taxonomy analogy and the "every database is a taxonomy" walkthrough. Replaces both Mermaid diagrams (`structureDiagram`, `datahubDiagram`) with bespoke infograph treatments — a 3-content-type ribbon showing each bucket's fields, plus four datahub-pattern cards with Lucide icon-relationship art. Keeps the 14-type interactive grid + modal exactly as they were. Sky-dominant accent.
- **Home page** gained an `id="author-normalization"` anchor on the author-canonicalization section so `/about` can deep-link visitors to it.
```

(If `CHANGELOG.md` uses a different newline/section convention than the example above, mirror the existing v0.1.77 entry's spacing.)

- [ ] **Step 8: Final typecheck + lint**

Run:

```bash
pnpm typecheck
pnpm lint
```

Expected: both exit 0.

- [ ] **Step 9: Commit the release**

```bash
git add package.json CHANGELOG.md
git commit -m "$(cat <<'EOF'
chore(release): v0.1.78 — infograph /about and /taxonomy

Both pages now match the home page's visual vocabulary
(stat strips, equivalence visuals, numbered cards, TL;DR
callouts, color-coded deep-dive cards). Aggressive trim
on /taxonomy: long analogies removed, both Mermaid
diagrams replaced with bespoke infograph treatments.
EOF
)"
```

- [ ] **Step 10: Verify clean git state**

Run:

```bash
git status
git log --oneline -5
```

Expected: working tree clean. The last 5 commits show, in order: `chore(release): v0.1.78 …`, `feat(taxonomy): rewrite …`, `feat(about): rewrite …`, `feat(home): add author-normalization anchor …`, then the prior `81b03cd fix(perf,a11y): SSR the POC banner …`.

---

## Self-Review

**Spec coverage:** Every section of the spec is covered:

- `/about` Sections 1–6 → Task 2 (single file replacement with all six sections)
- `/taxonomy` Sections 1–8 → Task 3 (single file replacement with all eight sections)
- Anchor on home page → Task 1
- Verification (typecheck, lint, generate, a11y, lighthouse, screenshots) → Task 4 Steps 1–5
- Version bump + CHANGELOG → Task 4 Steps 6–7
- Commits per the project's scoped Conventional Commits style → all four tasks have commit steps

**Placeholder scan:** No "TBD", "TODO", "implement later", or "similar to Task N" phrases. Every step contains the exact code or command. The two `if it does, tighten to …` notes (Task 2 Step 5, Task 3 Step 6) are not placeholders — they're conditional follow-ups for a flagged-risk verification, with the exact tighter classes spelled out (`text-3xl sm:text-4xl lg:text-5xl`).

**Type / signature consistency:** The plan defines an `Upgrade` interface in `/about` (Task 2) with `accent` typed as `'sky' | 'emerald' | 'violet' | 'amber' | 'zinc'` and uses the same five accents in the `accentClasses` lookup. Same accent values are used by `/taxonomy`'s sections (sky for stat-strip emphasis, amber for the highlighted Articles content-type, emerald for the schema-supported tile, violet for the datahub eyebrow). Section IDs are referenced consistently: `id="types"` on `/taxonomy` Section 5 matches the hero CTA's `to="#types"`; `id="author-normalization"` on home matches `/about`'s upgrade card 3 link.
