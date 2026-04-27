# Changelog

All notable changes to this project will be documented in this file. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.81] — 2026-04-27

### Changed

- **`/about` page** restructured into a single "All seven, at a glance" interactive grid. Each of the seven upgrades is now a card that opens a detail modal explaining what the upgrade does, why it matters, and where to try it (with the view CTA inside the modal). The earlier "headline fix" equivalence visual is folded into upgrade #1's modal; the author-merge before/after is folded into upgrade #4's modal. The page hero's H1 ("Seven small upgrades. One big difference.") is now backed by a single source of truth — the 7-card grid — rather than split across two sections labeled "headline fix" and "six more."
- **Home page "Hub 1.0 in numbers" section** refreshed to a 6-month window (Oct 2025 – Apr 2026) with explicit time-interval framing throughout. Stats updated: 116K pageviews on hub articles, 18.4K unique visitors, ~66% of all icjia.illinois.gov visitors land on the hub, 16-min average reading time. The top-five articles list is reordered for the 6-month window (Police Officer Stress now leads at 3,200 readers; Mental Illness & Violence remains #5 at 2,400) and **each article now shows its bounce rate** (60–66% across the five) so the "What's a bounce rate?" callout has concrete data to anchor against. The bounce-rate callout itself updated to reference the hub root's 25% bounce (6-month figure) and the closing "why this matters" tile is rewritten to call out the 18,400-visitor figure explicitly rather than the previous "tens of thousands per year."

## [0.1.80] — 2026-04-27

### Added

- **"Hub 1.0 in numbers" section** on the home page (between the existing stat strip and the diagram). Pulls live traffic data from Plausible analytics for the production research hub at `icjia.illinois.gov/researchhub/*`. Four headline stats (232K pageviews, 36.8K visitors, ~70% share of all icjia.illinois.gov traffic, 14 min average reading time, all over the last 12 months), a top-five-articles bar chart with links to the live articles on the production hub, a plain-English "What's a bounce rate?" callout aimed at managers who haven't seen the term before, and an emerald-bordered "Why this matters" closing tile that ties the traffic numbers back to why getting the filter right matters. Establishes that the hub already pulls enormous traffic — and therefore that any UX improvement to it touches a lot of readers.

### Changed

- **`/about` and `/taxonomy` hero CTAs** now link to all three views (View 0, View 1, View 2), not just View 0. Visitors can jump straight from either page into any of the three filter UX flavors. The redundant "Try filtering" → `/` button on `/taxonomy` was dropped, since clicking any view IS trying filtering. `/about` keeps its "See it on the home page" primary CTA alongside the three view buttons.

## [0.1.78] — 2026-04-27

### Changed

- **`/about` page** rewritten as an infograph matching the home page's vocabulary. Six numbered upgrade cards (each linking to the view that demos the feature), a "many clicks → one click" headline-fix equivalence visual, stat strip, TL;DR callout, deep-dive cards. Replaces the previous flat 7-item checkmark list. Every clickable card carries an explicit `🖱 Try it →` affordance.
- **`/taxonomy` page** rewritten as an infograph matching the home page's vocabulary. Drops the long taxonomy analogy and the "every database is a taxonomy" walkthrough. Replaces both Mermaid diagrams (`structureDiagram`, `datahubDiagram`) with bespoke infograph treatments — a 3-content-type ribbon showing each bucket's fields, plus four datahub-pattern cards with Lucide icon-relationship art. Keeps the 14-type interactive grid + modal exactly as they were. Sky-dominant accent.
- **Home page WHY THIS DEMO section** reframed to answer the manager's framing — "I don't want articles. I want a summary." — head-on. Stresses that summary and article mean the same thing on this hub: the database calls them articles; people call them summaries; same content, two labels. The standalone "Why 'articles' and not 'summaries'?" NAMING NOTE section was folded (compressed) into the top section since both were saying the same thing.
- **Home page** gained an `id="author-normalization"` anchor on the author-canonicalization section so `/about` can deep-link visitors to it.

## [0.1.77] — 2026-04-26

### Fixed

- **CLS on the home page.** The POC banner was wrapped in `<ClientOnly>`, which meant it was absent from the prerendered HTML and pushed all page content downward when it appeared on hydration — directly causing the Cumulative Layout Shift score of 0.106. Removed the `<ClientOnly>` wrapper so the banner ships in the SSR/prerendered HTML and is in place from first paint. Previously-dismissed users will see a brief flash before `onMounted` hides it, but Lighthouse runs in a fresh sessionStorage-empty context so the audit always sees the banner from the start.
- **axe `region` (WCAG 2.1 AA).** Wrapped the banner content in `<aside aria-label="Proof-of-concept demo notice">` so all banner copy sits inside a landmark.
- **Critical-request chain — preconnect to Strapi.** Added `<link rel="preconnect" href="https://v2.hub.icjia-api.cloud" crossorigin>` plus a `dns-prefetch` fallback. Every article splash image on `/view0`, `/view1`, `/view2` is fetched from that origin, so warming the TLS handshake during HTML download shaves perceptible time off the grid render.

## [0.1.76] — 2026-04-26

### Fixed

- **Lighthouse a11y `color-contrast` (WCAG 1.4.3 AA) on the home page** — six elements were failing in light mode. Bumped every bare `text-zinc-500` to `text-zinc-600 dark:text-zinc-400` (4.83:1 → 7.6:1 against white) — covers the equivalence eyebrows, the 3-content-type ribbon copy on the de-emphasized Datasets/Apps cards, the four legend chips at the bottom of the Articles bucket, the author-canonicalization eyebrows ("WHAT THE CMS DELIVERS", "FIVE NORMALIZATION STEPS, IN ORDER"), and the "canonical key" small text. Removed `opacity-70` from the Datasets/Apps content-type cards (the opacity was multiplying foreground contrast down to 2.45:1); replaced with `bg-zinc-100/70` so the de-emphasis still reads visually without crushing readable contrast. Lighthouse a11y goes from 96 → 100.

## [0.1.75] — 2026-04-26

### Fixed

- **Meta description trimmed under 160 chars** for SEO / social-preview tools (MetaPeek flagged 276 → exceeds 160). Home page meta description is now ~155 chars: *"How Hub 2.0 organizes ICJIA research: 'Articles' is the umbrella for fourteen publication types — including research reports. Three filter layouts to try."* Global `app.vue` description trimmed to ~140 chars. The richer ~270-char descriptions used by AI summarizers stay in the JSON-LD `WebPage` and `WebSite` blocks (where length isn't constrained).

## [0.1.74] — 2026-04-26

### Added

- **AI-readiness package — JSON-LD, llms.txt, freshness, longer description.** Pass on the four failures + one warning from an AI-readiness audit:
  - Site-wide JSON-LD `@graph` in `app/app.vue` covering `WebSite`, `Organization` (ICJIA + alternateName + url), and the og-image as `ImageObject`. Includes `datePublished`, `dateModified`, `inLanguage`, and stable `@id` references between nodes.
  - Per-page `WebPage` JSON-LD on the home (`app/pages/index.vue`) with `name`, `description`, `url`, `inLanguage`, `datePublished`, `dateModified`, `primaryImageOfPage`, `isPartOf` → site, `publisher` → ICJIA, and `about`.
  - Content-freshness `<meta property="article:published_time">` and `article:modified_time` tags in the global `useHead`.
  - New `public/llms.txt` (per llmstxt.org) with a description, key concepts (articles is the umbrella for 14 types, etc.), per-page links, source / tech-stack info, and a note for AI consumers about the placeholder type-fill.
  - Home-page `description` expanded from 74 chars to ~270 chars so AI summarizers have enough context.

## [0.1.73] — 2026-04-26

### Changed

- **"Try it yourself" heading nudge.** The H2 now reads *"Here are three layouts. Same data behind all of them. Go ahead. Click."* — the trailing prompt is muted-grey so the cards below read as the obvious next step.

## [0.1.72] — 2026-04-26

### Fixed

- **"Back to articles" on `/articles/<slug>` now returns to the view the article was launched from.** `ArticleCard` accepts a new `from` prop (`view0` / `view1` / `view2`); each view passes its own value when rendering the grid, and the link becomes `/articles/<slug>?from=viewN`. The detail page reads `route.query.from` in `onMounted` (avoids any SSR/prerender hydration mismatch on static pages) and updates the back button to `/view0`, `/view1`, or `/view2` with a matching label ("Back to View 0" / "Back to View 1" / "Back to View 2"). If no `from` is set (e.g. arriving via a shared URL or from the `/taxonomy` examples modal), the button falls back to the previous behaviour: "Back to articles" → `/view0`.

## [0.1.71] — 2026-04-26

### Removed

- **All "Don't panic" and "no quiz" references across the site.** On reflection these read as a bit condescending. Removed: the hero "DON'T PANIC. There won't be a quiz." callout on the home page, the "That's the entire pitch. There is no quiz." line in the home's "Why this demo" section, the "Still no quiz." callback in the home's "Try it yourself" subhead, the "There is no quiz." line in the `/about` subhead, and the "There is no quiz" / "Don't panic." / "Still no quiz." markers in the `/taxonomy` opener. The Adams-y warmth in the taxonomy intro stays (thermodynamics, quarterly review, the platypus, hardware-store screws); only the quiz/panic running gag is gone.

## [0.1.70] — 2026-04-26

### Changed

- **"Why this demo" copy expanded for clarity.** Replaced the single opening paragraph (*"This demo exists because of a fair question…"*) with a five-paragraph walk-through that explicitly sets the scene of the ICJIA staff meeting where staff asked, *"Hey, I just want to find research reports,"* and the misunderstanding that followed (*"aren't articles and research reports two different things?"*). The punchline — *"They're not missing. **Research reports are articles.**"* — is now a bordered amber callout in the middle of the section, big and bold so it can't be missed. The paragraph that follows explains the umbrella relationship in plain language ("Research Report" is one of fourteen types of article). Closes with the fix being already in place since Hub 1.0 + a pointer to the naming-history section. Treats the dim-skeptical-manager reader as the primary audience without being condescending.

## [0.1.69] — 2026-04-26

### Changed

- **Hero quiz-gag is now visual.** Replaced the small italic line ("There won't be a quiz.") with a Hitchhiker's-style bordered callout: amber border + amber surface, life-buoy icon, **DON'T PANIC.** in big extrabold uppercase amber, followed by a smaller italic *"There won't be a quiz."* The Adams reference is direct now (it's literally the front of the *Hitchhiker's Guide*), and the gag has enough visual weight at the top of the page that the later "Still no quiz" callback in the "Try it yourself" section reads as a callback.

## [0.1.68] — 2026-04-26

### Changed

- **Quiz-gag setup at the very top of the home page.** Added a small italic line beneath the hero CTAs — *"There won't be a quiz."* — so the running gag has a clear setup for the manager who lands on the home page first. Order across the page: hero ("won't be") → "Why this demo" closer ("There is no quiz") → "Try it yourself" subhead ("Still no quiz").

## [0.1.67] — 2026-04-26

### Added

- **Author canonicalization showcase on the home page** — new section "One more thing we fixed" between the view cards and the deep dives. Infographic-styled with a before/after visual: seven phony variants of the same author name on the left (Jane Carter, Jane Carter Ph.D, JANE CARTER, "··Jane  Carter··", etc.) → an `authorKey()` arrow label → a single canonical entry on the right ("Jane Carter · 7 articles · canonical key: jane carter"). Five numbered cards underneath explain the normalization steps (drop credentials, unify ampersands, collapse spaces, trim whitespace, lowercase) with short example transforms. All names are deliberately invented — no real ICJIA authors. Surfaces a fix the manager has been worried about ("the same person shows up six different ways") so it's visibly addressed.

## [0.1.66] — 2026-04-26

### Fixed

- **`og-image.svg` — `articles` and `summaries` now fit inside their card boxes.** Reduced the card-label font-size from 78px to 64px so both labels render cleanly with margin to spare at native 1200×630. Re-ran `rsvg-convert` to regenerate `og-image.png`.
- **Caption is now layout-accurate.** "The chip filter exposes them all" → "and the UI filter exposes them all" — View 1 uses dropdowns, not chips, so "UI filter" is the correct umbrella term.

## [0.1.65] — 2026-04-26

### Added

- **Bold infographic refresh on the home page.** Hero H1 bumped to 5xl/6xl/7xl. Stat strip becomes four colored icon-cards (zinc / amber / sky / violet) with 4xl/5xl numerals and an icon-pill at the top of each. The articles ≡ summaries equivalence visual scales up — larger cards (4xl/5xl text) and a much bigger central ≡ glyph (5xl/7xl). Each section eyebrow now sits beside a circular icon badge for visual punch.
- **TL;DR section on the home page** ("This is a lot. What's the point?") between the naming note and the view cards. Single-sentence punchline — *"Every research report on the hub is one click away."* — set giant on an amber-bordered band.
- **Takeaways section on the home page** ("Got other meetings?") — five numbered cards in a 2-column grid (last card spans full width) summarizing the page for the busy reader. Emerald accent.
- **Quiz-gag setup added to home and `/about`.** Both pages now include "There is no quiz" *before* any "Still no quiz" callback so the running gag — established on `/taxonomy` — lands in order on every info page.
- **`og:image`, full SEO meta, and brand image asset.**
  - New `public/og-image.svg` (1200×630, dark) with the articles ≡ summaries equivalence as the centerpiece, plus a "Proof-of-Concept Demo" mark.
  - Auto-generated `public/og-image.png` (PNG copy for social previews that don't render SVG).
  - The SVG is embedded at the top of `README.md`.
  - Expanded `useHead` and `useSeoMeta` in `app/app.vue` to set `theme-color`, `color-scheme`, `robots`, `author`, canonical link, OpenGraph fields (`ogType`, `ogUrl`, `ogSiteName`, `ogLocale`, `ogImage`, `ogImageWidth`, `ogImageHeight`, `ogImageAlt`, `ogImageType`), and Twitter card fields (`twitterCard: summary_large_image`, `twitterTitle`, `twitterDescription`, `twitterImage`, `twitterImageAlt`). The `<title>` and `description` were also rewritten to a fuller pitch ("How Hub 2.0 organizes ICJIA research…") so the social preview reads well.

## [0.1.64] — 2026-04-26

### Added

- **New visual orientation home page at `/`** (`app/pages/index.vue`). Seven sections — hero, "Why this demo" with an `articles ≡ summaries` equivalence visual, four-stat strip, "Three top-level content types" diagram zooming into the fourteen-pill Articles bucket, naming note, three view cards, and two deep-dive cards. Designed to land one specific manager-facing point on first scroll: "Articles" is the umbrella for everything published; "Research Report" is one type inside it; nothing is missing. Each of the fourteen type pills opens the same examples modal `/taxonomy` uses, with `fillRandom: true` so types with no real CMS tags get illustrative placeholders.
- **App-wide Proof-of-Concept banner** above every page's header. Icon-in-circle plus dual-line copy explaining that examples are illustrative and full accuracy requires Hub 2.0 editorial curation. **Dismissable per session** via `sessionStorage` — once a manager closes the banner it stays closed for the rest of that tab session, but a new tab or new browser session shows it again.
- **`/taxonomy` whimsical opener.** New section "Why we said 'taxonomy' (and why we're not sorry)" written for non-technical readers in a Douglas Adams voice — thermodynamics, the platypus, hardware-store screws, "Don't panic," "Still no quiz." Sets up the rest of the page for managers who haven't met the word before.
- **Two extracted components for reuse:**
  - `app/components/HubArticleTypeGrid.vue` — the interactive grid of fourteen article-type cards. `list` variant (used by `/taxonomy`) matches the original full-text rendering with counts. `compact` variant (used by the new home) is a denser pill layout with optional family color-coding (sky / emerald / violet / amber-highlight) and an optional `highlight` prop for the headline test case.
  - `app/components/ArticleTypeExamplesModal.vue` — the modal showing top-2 most-recent articles for a clicked type. Now driven by props (`open`, `typeValue`, `articles`) so any page can mount it. New `illustrativeFill` prop swaps in a different curation banner when the underlying article list has been client-side type-filled (home) vs. real-tagged only (taxonomy).
- **Design spec + implementation plan** under `docs/superpowers/specs/2026-04-26-home-page-design.md` and `docs/superpowers/plans/2026-04-26-home-page.md` so the home-page redesign decisions and step-by-step build are versioned alongside the code.

### Changed

- **Route swap.** The previous View 0 (chips + advanced filters) moved from `/` to `/view0`. The new home page now lives at `/`. View 1 and View 2 unchanged. Header nav adds a "Home" entry pointing at `/`.
- **Default color mode flipped to dark, app-wide.** `nuxt.config.ts` now sets `colorMode.preference = 'dark'` and `colorMode.fallback = 'dark'`. The `UColorModeButton` toggle still works on every page; user preference still persists in localStorage. Fresh browsers land in dark.
- **Home page respects the dark/light toggle.** The new home page uses Tailwind `dark:` prefixes throughout so toggling light mode flips its palette to a clean white-with-dark-text variant. Other pages already do this via Nuxt UI tokens.
- **`/taxonomy` page renamed and re-toned.** H1 changed from "Hub 1.0 / 2.0 taxonomy" → **"How this data is organized"**. Subhead is now an italic Adams-ish quip ("Everything you ever wanted to know about the Research Hub, databases, and taxonomies but were afraid to ask").
- **Naming-history copy corrected on `README.md` and `/taxonomy`.** Previous framing said articles "started as summaries of research reports" and "scope quietly widened." Corrected framing: during Hub 1.0 planning the team considered "summaries," rejected it after several weeks of deliberation because articles can stand alone with no attached source PDF, and chose "articles" deliberately as both more general (a publishing platform carries many kinds of digital pieces) and more specific (an "article" is a familiar concept).
- **Home page diagram heading nudge.** "Inside Articles: 14 types of summaries." now ends with a soft prompt — *Go ahead. Try it. Click.* — to invite the click on the type pills.
- **"Try it yourself" section copy** rewritten Adams-ish: *"Here are three layouts. Same data behind all of them. They differ only in how much filter machinery sits on screen at any given moment. Click any one and try filtering to 'Research Report' — that's the test. Still no quiz."*

### Fixed

- **Every type pill now has illustrative examples** on both the home page and `/taxonomy`. Earlier, types with zero real CMS tags (Toolkit, Newsletter, General, etc.) opened a modal saying "No tagged examples for this type in the live data yet," and on `/taxonomy` they showed `(0)` next to the label. Both pages now call `useArticles({ fillRandom: true })` so every type gets ~14 placeholder fills, and the shared modal's `illustrative-fill` banner says so honestly. The persistent app-wide POC banner reinforces the message.
- **Click prompts on the type-grid headings.** Home: *"Inside Articles: 14 types of summaries. Go ahead. Try it. Click."* `/taxonomy`: *"The fourteen Article types. Try it. Click."* — small nudges so the interactive grid reads as interactive.

## [0.1.63] — 2026-04-25

### Fixed

- **Lighthouse `tap-targets` violations on the article cards.** Inline author buttons used to be raw `<button class="cursor-pointer hover:underline">` with no size constraints — they inherited `text-xs` line-height (~16px) which is below the 24px tap-target minimum. Switched them to `inline-flex min-h-6 items-center align-middle` so the hit area is at least 24px tall while the visual flow inside the "By A, B, and C" line stays intact (no horizontal padding, so the natural `, ` separators read normally). Also added `min-h-6 min-w-6` to the type-badge button (`Update`/`Research Report`/etc) for the same reason. Bumped the tag-button gap from `gap-1.5` (6px) to `gap-2` (8px) so adjacent tag tap targets meet the 8px-of-spacing rule.

## [0.1.62] — 2026-04-25

### Fixed

- CI lint failure on `main`. Ran `eslint . --fix` to clear all auto-fixable issues across `app/app.vue`, `app/components/ArticleCard.vue`, `app/pages/articles/[slug].vue`, `app/pages/index.vue`, `app/pages/taxonomy.vue`, `app/pages/view1.vue`, `app/pages/view2.vue`, and `nuxt.config.ts`. The bulk were `vue/max-attributes-per-line` (split multi-attribute opening tags onto separate lines), three `@stylistic/arrow-parens` errors (parenthesized arrow params with block bodies), `vue/attributes-order` on the View 1 filter bar (`v-model:*` now precedes `class`), and `nuxt/nuxt-config-keys-order` (re-sorted top-level keys in `nuxt.config.ts` to the canonical Nuxt order). Removed an unused `TypeOption` type import from `app/pages/view1.vue` (the only non-auto-fixable error). `pnpm run lint` and `pnpm run typecheck` both pass.

## [0.1.61] — 2026-04-25

### Changed

- Promoted the **What This Demo Shows** modal to a real page at `/about` (`app/pages/about.vue`) so the URL can be shared. The header button is now a `NuxtLink` to `/about` instead of a click handler that opens a `UModal`. The seven bullets — find research reports in one click, search highlights, clickable authors, one entry per author, additive tags, ICJIA Center filter, three layouts to compare — render as cards on the page. Includes a footer pointing at the public URL so reviewers can copy and share.
- Removed the modal infrastructure from `app/app.vue` (no more `isWhatsChangedOpen` ref, no `UModal`, no `changes` array — moved to the page).

## [0.1.60] — 2026-04-25

### Changed

- Renamed routes to match the nav labels: `/alt` → `/view1`, `/alt2` → `/view2`. Page files renamed via `git mv` (`alt.vue` → `view1.vue`, `alt2.vue` → `view2.vue`). The home page remains `/`. NuxtLink targets in the header `navItems` and every README reference updated. CHANGELOG entries before this version still mention the old routes — that's intentional (history). The current routes in production are `/`, `/view1`, `/view2`, `/taxonomy`, plus `/articles/<slug>` detail pages.

## [0.1.59] — 2026-04-25

### Fixed

- Footer's copyright year now reads through `useState('currentYear', () => new Date().getFullYear())` instead of inlining `{{ new Date().getFullYear() }}`. The inline call ran twice — once at SSR / build time and once at client hydration — and could produce different values across the year boundary or under timezone weirdness, contributing to a Vue "Hydration completed but contains mismatches" warning. With `useState`, the year is computed once on the server and the value is serialized into the payload so the client hydrates from the cached value. (Other hydration-mismatch sources may still exist inside Nuxt UI / Reka UI internals; those are upstream.)

## [0.1.58] — 2026-04-25

### Fixed

- **Last `color-contrast` violation cleared.** The `Future` badge on `/taxonomy` was using `variant="solid"` against `color="warning"`, which renders white text on amber-500 — only ~2.15:1 in light mode. Switched to `variant="soft"` (amber-50 bg with amber-700 text), which clears WCAG 1.4.3 AA at ~7.4:1. With this, axecap reports **0 violations across all four pages** at level AA.

## [0.1.57] — 2026-04-25

### Fixed

- Last `color-contrast` holdout on `/taxonomy`: the `Future` badge bumped one more notch from `size="sm"` (10 px text) to `size="md"` (12 px). axe was still flagging the 10 px label on a yellow `bg-warning` background — likely an oklch-parsing edge case at small sizes. After this bump, axecap reports 0 violations across all four pages on AA.

## [0.1.56] — 2026-04-25

### Fixed

- **Three remaining `color-contrast` violations** from the prior axe scan resolved:
  - "Filter by:" label inside `ArticleFilterBar` switched from `text-muted` to `text-toned` so it has enough contrast against the bar's `bg-elevated` background. (Hits Views 1 + 2.)
  - Header `PUBLICATION TYPE FILTER DEMO` badge bumped from `size="sm"` (Nuxt UI emits `text-[10px]/3`) to `size="md"` (`text-xs`, 12 px) so it doesn't trip axe's tiny-text contrast edge case.
  - `Future` badge on `/taxonomy` bumped from `size="xs"` (`text-[8px]/3`) to `size="sm"` (`text-[10px]/3`) for the same reason.

## [0.1.55] — 2026-04-25

### Added

- New subsection on `/taxonomy`: **"Wait — a database is a taxonomy?"** Bridges the cognitive gap between "database" (rows-and-columns) and "taxonomy" (hierarchical buckets) for managers who haven't heard the framing before. Lists four everyday taxonomies they've already used (library catalog, banking app, e-commerce, calendar) and ends on the design principle "the database's shape should mirror what the app needs to show" — which is why the demo's chips, filters, and proposed datahub all work the way they do.

## [0.1.54] — 2026-04-25

### Fixed

- **Primary green palette darkened for WCAG 1.4.3 AA contrast.** The old `--color-green-500: #00C16A` only gave ~2.33:1 white-text contrast — far below 4.5:1, which is what flipped every primary-colored solid badge / pill / active chip into an axe-core violation. Shifted `green-500` down to `#007F45` (~5.17:1 with white text) and re-balanced 500 → 950 to keep a smooth gradient. The visual identity shifts a touch deeper green but every primary-on-white surface now passes AA.

## [0.1.53] — 2026-04-25

### Fixed

- **a11y `color-contrast` (WCAG 1.4.3 AA)** — axe-core flagged 15 elements per page failing 4.5:1. Root cause: primary-colored `UBadge` and `UButton` elements using `variant="subtle"` or `variant="soft"` produce a light-green tint background with a green-700-ish text label, which fails AA in light mode. Switched to `variant="solid"` (white text on full primary green) for every primary-colored chip/badge/pill that surfaces text:
  - Header `PUBLICATION TYPE FILTER DEMO` badge.
  - Card publication-type badge.
  - Article detail stub publication-type badge.
  - Active-filter pills near the result count: `Author: …` and `Tag: …` on Views 0 / 1 / 2.
  - The `Future` proposed-feature badge on `/taxonomy`.
- Tag pills inside cards (`color="neutral" variant="subtle"`) and inactive chips (`color="neutral"`) keep their existing styling — neutral-on-neutral pairs still meet contrast.

## [0.1.52] — 2026-04-25

### Fixed

- **Favicon 404s.** Browsers auto-request `/apple-touch-icon.png`, `/apple-touch-icon-precomposed.png`, etc. even without `<link>` tags, hitting 404 on each load. Added explicit `<link rel="apple-touch-icon" href="/favicon.ico">` plus `rel="shortcut icon"` so the existing `favicon.ico` is reused for all icon requests. Lighthouse/console errors should drop.
- **a11y `label-content-name-mismatch`** on the centered `PUBLICATION TYPE FILTER DEMO` badge. Removed the conflicting `aria-label="Go to View 0 (home)"` so the link's accessible name matches the visible text.

### Known issue

- Vue's "Hydration completed but contains mismatches" warning is logged once per page load. Source is third-party (Reka UI / Nuxt UI internal id generation differing between SSR and client). No functional impact; Vue recovers and the page renders correctly. Will resolve when Nuxt UI or Reka UI ship a fix.

## [0.1.51] — 2026-04-25

### Added

- README sections for **"What This Demo Shows" modal** and **Hub Taxonomy page (`/taxonomy`)**, both with full walkthroughs of what each surface contains, who it's for, and how it's wired.
- README **"Accessibility notes"** section listing the WCAG 2.1 AA fixes (heading-order, landmark-unique, target-size, search-match contrast, Mermaid color-mode contrast, keyboard support).

### Changed

- "What the page does" rewritten and expanded into three sub-sections — **Data fetch**, **Card grid**, **Filter bar**, plus a **Behavior details** addendum. Now lists every fetched field, both `fillRandom` modes of `useArticles`, the `priority` LCP optimisation on the first card, and every interaction nuance (search highlighting, additive tags, search-clears-all, scroll-to-top, pagination's aria-label).
- "Random publication-type fill" section expanded to document the `useArticles({ fillRandom: false })` opt-out used by `/taxonomy`.

## [0.1.50] — 2026-04-25

### Changed

- README audit + cleanup:
  - Lead paragraph rewritten — drops the stale "Cards link to `v2hub.netlify.app`" line (we link internally now), names the three views, and points at `/taxonomy`.
  - "Three filter UXs" section labeled by `View 0` / `View 1` / `View 2` to match the nav.
  - Click-to-filter section's tag bullet rewritten to reflect that tags are additive (OR), with multiple removable pills.
  - Author-canonicalization step-by-step example fixed: the whitespace-collapse row had a stray "Anne Kirkner" leftover from the fictional-name swap; corrected to `Riley Calder` with a double space.
  - "Project layout" expanded to list every current page and component (alt.vue, alt2.vue, taxonomy.vue, articles/[slug].vue, ArticleTypeChips, MermaidDiagram) and to describe the shell better.
  - Dropped the stale "TemplateMenu / AppLogo intentionally left in place" line — both have been removed.
  - Netlify section now says `nuxt generate` prerenders **every** route, not just `/`.
  - Stripped a stray "3" character from the end of the file.
  - Replaced "what shipped in v0.1.0" with a generic "full per-version history" pointer to `CHANGELOG.md`.

## [0.1.49] — 2026-04-25

### Changed

- README's Netlify section now documents the `NODE_OPTIONS=--max-old-space-size=4096` build env var that 0.1.48 introduced, with the rationale (~240 routes in a single Node process exceeds the default ~2 GB heap during Nitro prerender) and the option to raise it further if the catalog grows.

## [0.1.48] — 2026-04-25

### Fixed

- **Netlify build OOM during prerender.** With ~240 routes being statically generated (4 list pages + `/taxonomy` + 236 `/articles/<slug>` detail pages), the default ~2 GB Node heap was running out during Nitro's prerender phase. Added `NODE_OPTIONS = "--max-old-space-size=4096"` to `netlify.toml`'s `[build.environment]`. If 4 GB isn't enough later, this can be raised to 6144 / 8192. The Netlify build agent has plenty of headroom.

## [0.1.47] — 2026-04-25

### Fixed

- **a11y / perf (Lighthouse-driven):**
  - Card title is now `<h2>` instead of `<h3>` so each list page reads as `<h1>` page title → `<h2>` per article (hierarchy is correct without needing the previous sr-only `<h2>`, which has been removed).
  - Tag buttons inside cards are now `inline-flex min-h-6 min-w-6` so they meet WCAG 2.5.8's 24×24 target size minimum.
  - Card splash images now carry explicit `width="640" height="360"` (prevents layout shift), `decoding="async"`, and a new `priority` prop. The first card on each list page passes `:priority="i === 0"`, which becomes `loading="eager" fetchpriority="high"` — improves LCP for the above-the-fold image. Other cards remain `loading="lazy"`.

### Added

- `priority` prop on `ArticleCard` (boolean, default `false`) for callers to mark the LCP card.

## [0.1.46] — 2026-04-25

### Fixed

- **a11y (axe-devtools, WCAG 2.1 AA):** two moderate findings cleaned up:
  - `heading-order` — card titles use `<h3>`, but pages went `<h1>` → `<h3>` with no intervening `<h2>`. Added a screen-reader-only `<h2>Articles</h2>` before the card grid on `/`, `/alt`, and `/alt2` so the hierarchy is `h1 → h2 → h3`. Visual layout unchanged.
  - `landmark-unique` — two `<nav>` landmarks per page (header `UNavigationMenu` + bottom `UPagination`), neither named. Added `aria-label="View navigation"` to the header menu and `aria-label="Article pagination"` to all three paginations so screen-reader users can distinguish them.

## [0.1.45] — 2026-04-25

### Fixed

- CHANGELOG had a missing 0.1.25 header — the entry's content was nested as a duplicate `### Changed` block inside 0.1.26. Split into its own section so the version sequence (0.1.0 → 0.1.45) reads cleanly with no gaps.

## [0.1.44] — 2026-04-25

### Changed

- Home (route `/`) page heading is now `Research Hub — View 0` to match the labelled-view pattern on `/alt` (View 1) and `/alt2` (View 2). Browser tab title also updated.

## [0.1.43] — 2026-04-25

### Changed

- `/taxonomy` page heading retitled from `Database Taxonomy` to `Hub 1.0 / 2.0 taxonomy` so it's immediately obvious which hub it's about. Subtitle updated to `How the Data Behind the Research Hub is organized.` Browser tab title also updated.

## [0.1.42] — 2026-04-25

### Changed

- Renamed `Alt 0` / `Alt 1` / `Alt 2` to `View 0` / `View 1` / `View 2` everywhere in user-facing copy — header nav, page headings, modal copy, page descriptions, and README. "Alt" was being read as "alternative" or "broken"; "View" reads as "another way to look at the same thing". Routes (`/`, `/alt`, `/alt2`) are unchanged.

## [0.1.41] — 2026-04-25

### Changed

- Header nav label `Home` → `Alt 0` so the four chip/dropdown UX comparisons read in numeric order (Alt 0 / Alt 1 / Alt 2 / Alt 3-to-come). Route stays `/`.
- The centered `PUBLICATION TYPE FILTER DEMO` badge is now a `NuxtLink` to `/` (Alt 0) — clicking it from anywhere on the demo brings you back to the default view.

## [0.1.40] — 2026-04-25

### Changed

- Moved `Hub Taxonomy` from the left nav to the right side of the header (next to `What This Demo Shows`). Left nav now only carries the alt views (Home, Alt 1, Alt 2), leaving space for an upcoming `Alt 3`.

## [0.1.39] — 2026-04-25

### Changed

- Header nav label `Taxonomy` → `Hub Taxonomy` for clarity. The page route stays `/taxonomy`.

## [0.1.38] — 2026-04-25

### Changed

- Rewrote the "Why is the database structured like a taxonomy?" section on `/taxonomy` to be specifically about Hub 1.0 → Hub 2.0 continuity. Tone aimed at non-technical managers who use the hub but never thought about its architecture: persuasive but kind. Leads with "you've probably noticed that it works" — credits the original team for the architectural choice that made the chips, search, consistent layouts, and editor productivity possible — and frames Hub 2.0 as an upgrade rather than a teardown because that early call was the right one.

## [0.1.37] — 2026-04-25

### Added

- Historical-continuity paragraph in the top callout on `/taxonomy`: the taxonomy approach wasn't an afterthought — it was the plan from day one of Hub 1.0, and the bones held up. What's changed in Hub 2.0 is the toolchain (Strapi 5, richer relationships, more `type` values) and editorial polish, not the architecture. Frames the migration as an upgrade rather than a teardown.

## [0.1.36] — 2026-04-25

### Added

- "Why is the database structured like a taxonomy?" subsection inside the top callout on `/taxonomy`. Covers two practical reasons (findability + consistency over time) and explains how Strapi 5 enforces the shape that makes the chips, filters, search, and proposed datahub possible. Closes with the line "The taxonomy is what turns the pile into a research catalog."

## [0.1.35] — 2026-04-25

### Changed

- Removed the green/star highlight on the `Research Report` card on `/taxonomy`. All fourteen type cards now share identical styling — the only differentiator is the count badge each one already shows.

## [0.1.34] — 2026-04-25

### Added

- Plain-language "First — what's a taxonomy?" callout at the top of `/taxonomy`. Explains the word with three relatable analogies (library shelves, org charts, filing cabinets) so non-technical readers don't bounce off the term. The page subtitle also rephrased from "How the Strapi 5 CMS organizes the data" to the friendlier "How the data behind this site is organized".

## [0.1.33] — 2026-04-25

### Added

- Article type cards on `/taxonomy` are now clickable. Tap any of the fourteen and a `UModal` opens with the top two most-recent real examples for that type (title, splash, date, abstract excerpt). Each example is a `NuxtLink` to the internal stub article page; the modal closes on navigation.
- Per-type counts on each card (`Research Report (33)` etc.) so reviewers see at a glance how many tagged examples exist before clicking.
- Curation banner inside the modal: "For this proof-of-concept, these examples still need curation. They're pulled directly from articles that already carry this `type` tag in the CMS." Empty-state message for types with no tagged examples yet.

### Changed

- `useArticles()` now accepts `{ fillRandom: false }` and uses a separate `articles-raw` cache key for that variant. The taxonomy page uses the raw variant so examples only reflect articles actually tagged with the queried type — the random fill on `/`, `/alt`, `/alt2` is unaffected.

## [0.1.32] — 2026-04-25

### Changed

- `MermaidDiagram` themeVariables now also drive subgraph appearance: `clusterBkg: 'transparent'` so the page background shows through cleanly, and `clusterBorder` / `titleColor` switched on color mode (slate-400-ish in dark mode, slate-600-ish in light) so the outlines and labels of subgraphs stay readable. The arbitrary-selector that bumps stroke-width to 2 now also applies to `.cluster_rect`. Brings the datahub diagram's contrast in line with the simpler structure diagram in both modes.

## [0.1.31] — 2026-04-25

### Changed

- Throughout `/taxonomy` (prose, headings, both Mermaid diagrams), the term `App` is now written as `App/Dashboard` (or `Apps/Dashboards`) so non-technical readers don't read it as "iPhone app". The CMS field names (`App.datasets`, `Dataset.apps`) are unchanged.

## [0.1.30] — 2026-04-25

### Changed

- Datahub diagram on `/taxonomy` expanded from a single one-app-many-datasets example to four labeled subgraphs covering the four real relationship patterns: solo dataset, one-app-one-dataset, one-app-many-datasets, and shared dataset across apps. Surrounding copy reframed to emphasize that all four are already supported by the Strapi 5 schema — the Hub 2.0 work is editorial (curation, editing, adjustment, oversight), not data-layer.

## [0.1.29] — 2026-04-25

### Added

- New "A note on the word 'Article'" callout on `/taxonomy`. Explains the historical scope creep — in Hub 1.0 an article was specifically a summary of a research report; over the years the term expanded to cover annual reports, program evaluation summaries, updates, etc. — and ties that history back to why the Publication Type chips matter today.

## [0.1.28] — 2026-04-25

### Added

- New "Proposed: the 'datahub'" section on `/taxonomy` describing the planned Dataset ↔ App relationship managers want to expose. Includes its own Mermaid diagram (one App pointing at multiple Datasets), a note that Strapi 5 already exposes `App.datasets` and `Dataset.apps` relation fields (so this is editorial work, not a schema change), and a bullet list of UX ideas the linking unlocks.

## [0.1.27] — 2026-04-25

### Changed

- Mermaid diagrams now use the `base` theme with explicit `lineColor` and `textColor` themeVariables, picked from the current color mode (`useColorMode()`). Lines render `#e2e8f0` (slate-200) in dark mode for high contrast against the dark page background, and `#334155` (slate-700) in light mode. Diagram re-renders automatically when the color-mode toggle is flipped. Also bumps edge `stroke-width` to 2 via a Tailwind arbitrary selector.

## [0.1.26] — 2026-04-25

### Added

- New `/taxonomy` page (`app/pages/taxonomy.vue`) — a plain-English explainer of the Strapi 5 data model for non-technical reviewers. Includes a Mermaid diagram of the three content types (Articles, Datasets, Apps), a per-bucket field breakdown, the full list of fourteen article `type` enum values (with `Research Report` highlighted), and a "Why this matters for the demo" closer.
- New `MermaidDiagram` component (`app/components/MermaidDiagram.vue`) — small client-side wrapper that dynamically imports `mermaid` on mount, renders the source string into an SVG, and exposes a styled container. Wrapped in `<ClientOnly>` on the page so SSG works.
- `Taxonomy` link in the header nav (with the `i-lucide-network` icon to set it apart from the filter UX pages).

### Changed

- Added `mermaid@^11.14.0` as a direct dependency.

## [0.1.25] — 2026-04-25

### Changed

- `/alt2` description rewritten to call out the actual difference from Home — the granular filters are always visible (no Advanced toggle hiding them) — and to state the rationale (chips are usually enough; the rest is one glance away when you need it).

## [0.1.24] — 2026-04-25

### Changed

- README's "What the page does" section now lists the features added since the initial dev-doc pass: search highlighting via inline `<mark>`, additive (OR) tag filtering with removable per-tag pills, and the search-starts-and-clears-other-filters behavior. Brings the README in sync with the modal copy.

## [0.1.23] — 2026-04-25

### Changed

- Rewrote the "What This Demo Shows" modal for non-technical managers. Each bullet now leads with a concrete user action and outcome rather than a feature name. New bullets cover search highlighting, the ICJIA Center filter, and the three-layout comparison; the bullet about publication types now opens with the most relatable example ("Find research reports in one click"). Also drops the word "POC" from the intro in favor of plain English.

## [0.1.22] — 2026-04-25

### Changed

- Replaced real ICJIA author names with fictional analogues throughout `README.md` and the "What This Demo Shows" modal so no agency staff appear in documentation examples. Variations and patterns are preserved verbatim — credential variants (`Riley Calder` / `Riley Calder, Ph.D` / `Riley Calder, PhD` / ...), casing (`DAKOTA HARLOW` vs `Dakota Harlow`), typo pairs (`Jordon Reeves` vs `Jordan Reeves`), middle-initial (`Sam Whitley` vs `Sam B. Whitley, BS`), long credentials (`Avery del Mar, PhD, MPA, MA`), and diacritics (`Émile Tanaka` vs `Emile Tanaka`).

## [0.1.21] — 2026-04-25

### Added

- `programEvaluationSummary` added to `CHIP_TYPES` so `Program Evaluation Summaries` shows up as a chip on Home and Alt 2 (Alt 1 is dropdown-only and unaffected).
- Tiny `pluralize()` helper in `app/utils/article-format.ts` that handles `-y` → `-ies` and `-s/-x/-z/-ch/-sh` → `-es` so the new chip reads "Summaries", not "Summarys". Both pages now build the chip label via `pluralize(typeLabel(t))`.

## [0.1.20] — 2026-04-25

### Changed

- Swapped `/` and `/alt2`. Home is now the chip-row + `Advanced filters` toggle UX (the simpler default — chips usually enough, reveal the bar when needed). `/alt2` is the chips + always-on filter bar UX. `/alt` (dropdown-only) is unchanged. Modal copy and README "Three filter UXs" section updated to reflect the new order.

## [0.1.19] — 2026-04-25

### Changed

- README's "Author canonicalization strategy" section rewritten as developer documentation rather than a high-level summary. Adds: source-variant table with reasons, the actual `authorKey()` implementation, a step-by-step regex breakdown with examples, the display-name picking algorithm with code, the filter comparison snippet, an explicit list of cases the algorithm does not merge (typos, middle initials, reordered names, diacritics), and a recommended production path (move canonicalization to Strapi via a stable author ID).

## [0.1.18] — 2026-04-25

### Added

- New `/alt2` page (`app/pages/alt2.vue`). Same chip row as the home page but the filter bar is hidden by default; an `Advanced filters` `USwitch` reveals it on demand. Cards behave identically (clickable type / tag / author, search highlighting, etc.).
- Active-filter pill for **Author** next to the result count, so an author filter set via a card click stays visible even when the bar is hidden. Existing tag pills work the same way.
- `Alt 2` link in the header nav.

### Changed

- Extracted the chip-type list (`CHIP_TYPES`) and ICJIA centers list (`KNOWN_CENTERS`) into `app/utils/article-format.ts`. Both `/` and `/alt2` import the same constants now, so adding a new chip in one place updates both pages.
- Updated the "What This Demo Shows" modal to mention three UX options (Home chips, Alt 1 dropdowns, Alt 2 chips + advanced toggle).
- Removed the GitHub icon from the header right-slot. It's still available in the footer alongside the Changelog button — the header's job is demo navigation, the footer's is meta links.

## [0.1.17] — 2026-04-25

### Changed

- Tag filtering is now **additive (OR-composed)** rather than single-tag (AND). Click multiple tags and the grid shows every article that has *any* of the selected tags — not the intersection. Each selected tag becomes its own dismiss-able pill near the result count, and clicking the same tag again toggles it off. State changed from `selectedTag: ''` to `selectedTags: string[]` on both pages; the filter logic now uses `tags.some(t => selectedTags.includes(t))`. Search-clears-all and the bar's Clear-all both reset the array to `[]`.
- Renamed nav label `Alt View 1` → `Alt 1` to save space in the header. The "What This Demo Shows" modal copy also updated to match.

## [0.1.16] — 2026-04-25

### Changed

- Renamed the header button and modal title from `What's Changed` → `What This Demo Shows`. Frames the modal more clearly for non-technical reviewers (it's about the POC's features, not a release log).

## [0.1.15] — 2026-04-25

### Changed

- Moved `What's Changed` from the left-side navigation menu to a standalone button on the right side of the header (next to the color-mode toggle and GitHub icon). Reads as a utility action rather than a route, which matches its actual behavior — it opens the modal rather than navigating.

## [0.1.14] — 2026-04-25

### Added

- Footer now shows the running version (`v0.1.14`) and a `Changelog` button that links to `CHANGELOG.md` on GitHub. The version string is wired through `runtimeConfig.public.appVersion`, sourced from `package.json` at build time, so future bumps update the footer automatically.

## [0.1.13] — 2026-04-25

### Added

- `What's Changed` nav item in the header. Clicking it opens a `UModal` with a checklist explaining the POC's improvements over the current research hub for non-technical reviewers — filterable publication types, clickable author names, normalized author names (one entry per person), several views for publication types, and clickable tags. The list is data-driven (`changes` array in `app.vue`) so new items can be appended easily.

### Changed

- Renamed the header badge / page title / footer label from `Publication Type Demo` → `Publication Type Filter Demo` to make the demo's scope obvious at a glance.

## [0.1.12] — 2026-04-25

### Changed

- Card abstract truncation increased from `line-clamp-3` to `line-clamp-5` so reviewers see ~67% more summary text before the ellipsis. Added `min-h-[6.25rem]` (5 × `text-sm` line-height of 1.25rem) so cards with short abstracts still match the height of cards with long ones — the grid stays aligned across rows.

## [0.1.11] — 2026-04-25

### Added

- Search-term highlighting on cards. When the search box has a value, each matching substring in the title and abstract is wrapped in a `<mark class="bg-primary/40 ...">`. Implementation lives in `app/utils/article-format.ts` as `highlightSegments(text, query)`, which returns an array of `{ text, match }` segments — safer than `v-html` because it avoids any HTML/regex injection risk if a query contains special characters. `ArticleCard` accepts an optional `searchQuery` prop and renders the segments via `<template v-for>` with `<mark>` for matches and `<span>` for non-matches; both `/` and `/alt` pass `:search-query="searchQuery"` to the card.

## [0.1.10] — 2026-04-25

### Changed

- Header nav label `Alt View` → `Alt View 1` to leave room for additional alternative views (`Alt View 2`, etc.) without renaming later.

## [0.1.9] — 2026-04-25

### Changed

- Article detail stub copy updated from "for the POC" to "for this proof-of-concept app" — reads more cleanly without the abbreviation.

## [0.1.8] — 2026-04-25

### Added

- Internal article detail stub at `app/pages/articles/[slug].vue`. Looks up the article in the cached `useArticles()` payload and renders splash, type badge, title, byline, date, abstract, tags, and a "Demo stub" notice in lieu of the full body. Includes a `Back to articles` button.

### Changed

- `ArticleCard` now links to `/articles/<slug>` via `NuxtLink` instead of `https://v2hub.netlify.app/articles/<slug>` in a new tab. The demo is fully self-contained — no runtime links leave this app.
- Static-gen note: with `nuxt generate`, the home page's links to all 236 article slugs cause Nitro's crawler to prerender every detail page. `useAsyncData('articles')` caches across pages within a single build, so this still results in just one GraphQL fetch.

## [0.1.7] — 2026-04-25

### Changed

- Swapped `/` and `/alt`. The home page is now the chip-driven UX (chips above the bar, Publication Type dropdown removed, Centers added to the bar). `/alt` is now the dropdown-only UX (Publication Type in the bar, no chips, no Centers — i.e., the "centers were removed" original brief).
- Centers dropdown now uses a hardcoded list of the canonical ICJIA centers so all five always appear, with live counts pulled from author matches:
  - Center for Justice Research and Evaluation
  - Center for Sponsored Research & Program Development
  - Center for Victim Studies
  - Center for Violence Prevention and Intervention Research
  - Research & Analysis Unit
  
  Counts of 0 are shown rather than hidden, so the dropdown reflects the full set of ICJIA's organizational divisions even when a center has no articles in the demo dataset yet.

## [0.1.6] — 2026-04-25

### Changed

- Starting a search resets every other filter. As soon as the search box transitions from empty to non-empty, the page clears Type / Topic / Author / Year / Tag (and Center / chip selection on `/alt`) so the search runs against the full dataset and returns the broadest possible matches. Subsequent keystrokes within the same search session don't re-trigger the reset.

## [0.1.5] — 2026-04-25

### Changed

- `/alt` chip labels are now plural — `Research Reports (N)`, `Annual Reports (N)`, `Updates (N)`, `Strategic Plans (N)` — to match how a chip-row reads when each chip is a "category of items" rather than a single article. Card badges remain singular (one article = one type).

## [0.1.4] — 2026-04-25

### Added

- New `/alt` page (`app/pages/alt.vue`) showing an alternative filter UX for managers to compare:
  - A chip row at the top with `All (N)` plus four featured publication types: Research Report, Annual Report, Update, Strategic Plan.
  - The chip's `All (N)` performs a **full reset** — clears every filter (type, topic, author, year, center, tag, search) and returns to the default view.
  - The Publication Type dropdown is removed from the filter bar (chips replace it) and a **Centers** dropdown is added in its place.
- `Centers` filter, derived dynamically from any author whose name contains `Center` or `Unit` (e.g., `Center for Justice Research and Evaluation`, `Research & Analysis Unit`). Variants are canonicalized via the same `authorKey()` used for Authors, so `Research & Analysis Unit` and `Research and Analysis Unit` collapse into one.
- Top-nav navigation between `/` and `/alt` via `UNavigationMenu`.

### Changed

- `app/components/ArticleFilterBar.vue` now accepts optional `types` and `centers` item arrays. Each dropdown only renders if its array is non-empty, so `/` shows Type but not Centers, and `/alt` shows Centers but not Type. Adds `update:center` and `clear-all` emits.
- Header (`app/app.vue`): removed the `AppLogo` Nuxt UI mark; the badge is now `PUBLICATION DEMO` (centered via the default slot of `UHeader`); `UNavigationMenu` items live in the `#left` slot. GitHub icon now links to `ICJIA/v2-hub-demo` instead of the Nuxt UI starter.
- Footer text updated to `ICJIA Publication Type Demo`.

## [0.1.3] — 2026-04-25

### Changed

- Header label changed from the Nuxt UI starter dropdown (`TemplateMenu`) to a static `PUBLICATION TYPE DEMO` badge, signalling the purpose of the deploy.
- README: added the live deploy link `https://v2-hub-demo.netlify.app/` near the top.

## [0.1.2] — 2026-04-25

### Added

- `.nvmrc` pinning Node to 22 so local environments using nvm/fnm pick the same version Netlify uses.

### Changed

- Bumped `NODE_VERSION` in `netlify.toml` from 20 to 22 to match `.nvmrc`.

## [0.1.1] — 2026-04-25

### Fixed

- Netlify deploy: `netlify.toml` `publish` directory updated from `.output/public` to `dist`. On Netlify the `NETLIFY=true` env var makes Nitro auto-select the `netlify-static` preset, which writes to `dist/`; `.output/public/` is only the path locally where no preset override happens.

## [0.1.0] — 2026-04-25

First end-to-end version of the research hub article filter POC, built on top of the Nuxt UI starter.

### Added

- Click-to-filter on cards: the publication type badge, each author name in the byline, and each tag badge are now buttons. Clicking any of them sets the corresponding filter (canonical key for authors) and smooth-scrolls back to the top.
- Inline `Tag: foo ×` pill next to the result count to make the page-level tag filter visible and dismissable. The bar's **Clear all** also clears it via a new `clear-all` event.
- `pnpm generate` script and `netlify.toml` (`command = "pnpm generate"`, `publish = ".output/public"`, `NODE_VERSION = "20"`) for static deployment to Netlify. `nuxt generate` prerenders `/` and bakes the GraphQL response into the HTML.
- `authorKey()` helper exported from `app/utils/article-format.ts` so the card and the page share one canonicalization function.
- Research Hub article list as the landing page (`app/pages/index.vue`).
- Live GraphQL fetch from `https://v2.hub.icjia-api.cloud/graphql` via a single `useAsyncData` query that pulls every published article (`app/composables/useArticles.ts`).
- "Filter by" bar with four dropdowns — **Publication Type**, **Topics**, **Authors**, **Years** — plus a debounced free-text search. Filters compose AND-style across categories. Each dropdown has an `All …` entry that resets only that filter, plus a global **Clear all** button.
- Article cards with splash image (16:9, lazy), publication type badge, title, author byline, formatted date, abstract excerpt, and tag badges. Cards open `https://v2hub.netlify.app/articles/<slug>` in a new tab.
- Author byline formatting on cards:
  - 1 author → `X`
  - 2 authors → `X and Y`
  - 3+ authors → `X, Y, and Z` (Oxford comma)
- Author canonicalization across name variants. Trims whitespace, drops the credentials suffix after the first comma, unifies `&` ↔ `and`, collapses whitespace, lowercases for the merge key. The dropdown shows the most-used display variant per group (tiebreak: shortest). See README for full details.
- Publication type label formatter that turns Strapi enum strings into human-readable Title Case (`researchAtAGlance` → `Research At A Glance`, `process_evaluation` → `Process Evaluation`, `programEvaluationSummary` → `Program Evaluation Summary`).
- Year dropdown derived from each article's actual `date` field (with `publishedAt` as a fallback), sorted descending.
- Reverse-chronological sort applied client-side after fetch so every filter combination keeps newest-first ordering.
- Per-dropdown width that auto-sizes to the longest visible label (≈ longest characters × 7px + chevron padding), capped at 32 characters so author-org outliers don't blow up the bar. The whole filter bar fits on a single line at desktop widths.
- Loading skeletons, error alert with retry, and a centered empty state for "no matches".
- Pagination via `UPagination` (12 per page), auto-resets to page 1 on filter change.
- Random publication-type fill applied client-side at fetch time for articles whose `type` is null/empty, so all 14 enum values can be demonstrated. Source data in Strapi is untouched.
- Defensive string coercion (`asStrings`) for the JSON `categories` and `authors` arrays so non-string entries can't crash the dropdown sort.

### Changed

- Landing page replaces the Nuxt UI starter content with the POC.
- Filter UI evolved from a chip row above a "filter by" bar to a single bar with **Publication Type** as one of the dropdowns. The chip approach is preserved in git history if needed.
- Authors typed as `AuthorRef[] | null` (was incorrectly `string[] | null`); the actual Strapi shape is `{ title, description }[]`.
- Card date now uses `article.date ?? article.publishedAt` so cards show the article's real publication date rather than Strapi's "moved to published" timestamp (which is the same for all articles).
- "Type" placeholder and reset entry renamed to "Publication Type" / "All Publication Types (N)" for clarity.
- Nuxt devtools disabled in `nuxt.config.ts`.

### Removed

- Standalone `/articles` route (consolidated into `/`).
- `Articles Demo` link in the app header (now redundant — the landing page is the demo).
- The chip row component usage from the page (the file remains in `app/components/ArticleTypeChips.vue` for reference).
- The placeholder "Centers" filter from the source pattern (replaced by Publication Type per the brief).

### Notes

- Endpoint is open (no auth) and Strapi 5 introspection is enabled.
- 14 publication type enum values exist; without the random fill, only the 8 that have real data would render as chips.
- The current dataset is small (~236 articles) so client-side filtering and sorting is comfortable. If the dataset grows significantly, swap in server-side filters via Strapi's `filters: { type: { eq: "researchReport" } }` argument.
