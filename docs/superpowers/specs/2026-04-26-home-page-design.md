# Visual home page — design

**Date:** 2026-04-26
**Status:** approved (brainstorm), awaiting implementation plan
**Audience:** the dev/design team building this; ICJIA managers reviewing the demo

## Background

The demo currently lands on **View 0** at `/` — a working filter UI. That made sense for a filter-comparison POC, but a recent review surfaced a recurring miscommunication: a non-technical manager assumed "research reports" and "articles" are two separate entities and that the demo was missing the research reports. In fact, **Research Report is one of fourteen `type` enum values inside the single `Article` content type** in the Hub 2.0 Strapi schema (carried forward from Hub 1.0), and the demo already exposes it via the chip filter.

Rather than answer that question one manager at a time, we're replacing the home page with a **visual orientation page** that lands the conceptual point on first scroll: Articles is one of three top-level content types, it holds 14 named types (one of which is "Research Report"), and the demo's three views just expose those types for filtering.

## Goals

1. **Land the core insight in one scroll**: Articles is the umbrella for everything published; "Research Report" is one type inside it; nothing is missing.
2. **Reframe "articles" as a deliberate naming choice**, not scope creep — explain that "summaries" was considered and rejected during Hub 1.0 planning because some articles stand alone with no attached source PDF.
3. **Funnel the visitor** to one of the three filter views, plus the existing `/taxonomy` and `/about` deep dives.
4. **Tone**: warm, informative, accurate. Treat the reader as a competent newcomer to Hub history, not someone being corrected. No defensive tone, no jargon shaming.
5. **Persistent infographic identity**: dark default, color-coded type families, big stats, illustrated type pills.

## Non-goals

- New filtering behavior. The home page does not filter articles; it points to the views that do.
- Dataset / Apps content. The hub has three top-level content types but the filter demo is scoped to Articles only; the home page mentions Datasets and Apps once and de-emphasizes them.
- Replacing the existing `/taxonomy` page. That page stays; the home page links into it.
- Replacing `/about`. The about page stays; the home page links into it.
- Light mode redesign. We're flipping the app default to dark; light mode keeps working via the existing `UColorModeButton`.

## Audience and tone

The home page is written for one specific reader — a smart, non-technical ICJIA manager who hasn't used the original hub much and is approaching Hub 2.0 as a blank slate — but it should read well to anyone landing on the public URL. Voice rules:

- **Orient, don't correct.** No "Naming is hard. The data isn't." or similar lines that imply the reader was wrong about something.
- **Frame the database as inherited and intact.** "Hub 2.0 carried Hub 1.0's structure forward intact" — the architecture is solid because the original team made good calls, not because we're defending it.
- **Acknowledge the deliberation behind names.** "Summaries" was on the table; we tried it; we rejected it for principled reasons.
- **No emoji-as-content-strategy.** A few decorative emoji on type pills (📑📅🎯 etc.) and section icons are fine; do not lead with them.

## Page structure (top to bottom)

The visual companion mockup at `.superpowers/brainstorm/52205-1777223166/content/home-structure-v6.html` is the approved layout. Sections in order:

### 1. Hero
- Eyebrow: `A SHORT ORIENTATION`
- H1: `How Hub 2.0 organizes ICJIA research.`
- Subhead: `"Articles" is the umbrella for everything published on the hub — research reports, annual reports, program evaluations, and ten more types. The Hub 2.0 migration carried Hub 1.0's structure forward intact, so all of it is already here. This demo just shows how to pull out exactly what you need in one click.`
- Primary CTA → first view card (smooth scroll)
- Secondary CTA → `/taxonomy`

### 2. Why this demo
A short callout right after the hero that directly answers the articles-vs-research-reports question this demo was built to clarify. The centerpiece is a visual equivalence claim — **articles ≡ summaries** — rendered as a two-card equation with the `≡` glyph between them. Eyebrow: `WHY THIS DEMO`. H2: `Every research report on the hub is already an article.`

The equivalence visual has two cards side-by-side, separated by a large `≡` symbol:

- **Left card** — amber-bordered. Eyebrow `DATABASE TERM`. Big text `articles` (extrabold, amber).
- **Right card** — sky-bordered. Eyebrow `PLAIN ENGLISH`. Big text `summaries` (extrabold, sky).

Caption directly under the equation, centered: `That equivalence was the original mission of Hub 1.0.`

Body (two paragraphs after the equation):

> This demo exists because of a fair question: "Where are the research reports?" The answer turned out to be a labeling story, not a missing-data story.
>
> "Articles" is Hub 2.0's umbrella label, carried forward from Hub 1.0 — originally called "summaries" during Hub 1.0 planning, before the team renamed it ahead of implementation. The label covers fourteen publication types from ICJIA: research reports, annual reports, program evaluations, updates, strategic plans, and nine more. An article *is* a summary; the name just changed. See *Why "articles" and not "summaries"?* below for the deliberation.

### 3. Stat strip
Four stats in one row, big numerals + caption:
- `~236` articles already in the catalog (live count from `useArticles({ fillRandom: false })`)
- `14` types inside the Articles bucket (constant)
- `3` filter layouts to compare (constant)
- `1` click to find what you want (constant)

### 4. The diagram — "The hub at a glance"
Eyebrow: `THE HUB AT A GLANCE`. Heading: `Three top-level content types. We're zooming into Articles.`

Sub-section 1 — three peer content-type cards (Articles · Datasets · Apps/Dashboards):
- Articles is highlighted (amber border, "filter demo focuses here" callout, live `~236 items` count)
- Datasets and Apps are de-emphasized (low opacity, "separate top-level type" caption, no count needed)
- Visual ▼ zoom cue between this row and the bucket below

Sub-section 2 — the Articles bucket:
- Bordered amber container labeled `📚 ARTICLES`
- 4-column grid of all 14 type pills
- Color-coded by family:
  - **Highlighted (amber)**: Research Report — the headline test case
  - **Sky / research family**: Research At A Glance, Evaluation, Process Evaluation, Program Eval Summary, Research Bulletin
  - **Emerald / reports & plans**: Annual Report, Strategic Plan
  - **Violet / communications**: Article, Newsletter, Update, Toolkit, General, Dataset
- Each pill is a button that opens the same examples-modal as `/taxonomy`
- Bottom row: color legend + "🖱 Click any type for live examples" affordance

### 5. Naming note (the deliberate-choice argument)
Amber-tinted callout, soft border. Heading: `Why "articles" — and not "summaries"?`

Two paragraphs (verbatim):

> "Summaries" was on the table during Hub 1.0 planning. Over several weeks and several name changes, we kept running into the same problem: an article *can* be a summary of an attached research report or annual report — but it can also stand on its own, a standalone piece with no attached PDF at all. "Summaries" didn't fit that case.
>
> We landed on **articles** because it was both **more general** (a publishing platform can carry many kinds of digital pieces, including standalone articles) and **more specific** (an "article" is a familiar concept — exactly what you'd expect on a publishing platform). The hub was always meant to be a publishing platform first; "articles" was the umbrella that fit that identity.

### 6. Three view cards
Eyebrow: `TRY THE THREE LAYOUTS`. Heading: `Three filter UXs. Same data.` Subhead: `Same dataset, three layouts to compare. Click any one and try filtering to "Research Report" — that's the headline test.`

Three cards in a 3-col grid (1-col mobile). Each is a full-card `NuxtLink`:
- View 0 (`/view0`) — sky accent — "Chips + Advanced"
- View 1 (`/view1`) — emerald accent — "Dropdowns only"
- View 2 (`/view2`) — violet accent — "Chips + always-on bar"

Each card has a 4px colored top bar, type label, name, miniaturized UI mock (chips or dropdowns), one-line description, and a `Open View N →` CTA inside the card body. The whole card is the click target.

### 7. Deep-dive cards
Eyebrow: `DEEPER LOOK`. Heading: `More to explore.`

Two cards, 2-col grid:
- `/taxonomy` — sky badge — "How the data is organized"
- `/about` — amber badge — "What else this demo shows"

Both are full-card `NuxtLink`s.

## Visual style

- **Default color mode: dark, app-wide.** `nuxt.config.ts` sets `colorMode.preference = 'dark'` and `colorMode.fallback = 'dark'` (via `@nuxt/ui` module options or `@nuxtjs/color-mode` config — exact key TBD when implementing). Light mode still works via the existing `UColorModeButton` in the header.
- **Palette** (used directly, not via theme tokens, so the home page reads as a distinct landing surface):
  - Backgrounds: `#0a0a0a` base, `#0e0e10` section bg, `#18181b` card surface
  - Borders: `#27272a` default, `#3f3f46` raised
  - Text: `#fafafa` headlined, `#d4d4d8` body, `#a1a1aa` toned, `#71717a` muted, `#52525b` faint
  - Accents: amber `#f59e0b` (highlighted Research Report + Articles bucket), sky `#38bdf8` (research family + View 0 + taxonomy), emerald `#10b981` (reports family + View 1), violet `#a78bfa` (communications family + View 2 + about)
- **Existing pages** (View 0/1/2, `/taxonomy`, `/about`, `/articles/[slug]`): keep using Nuxt UI tokens (`bg-default`, `text-highlighted`, etc.) so they automatically adapt to whichever color mode is active. The new home page is the only page that uses the literal hex palette above.
- **Typography**: existing app font stack, no new font loading.
- **No animation** in v1. Keep it static and printable. Hover states on clickable items only.

## Component architecture

The new home page lives at `app/pages/index.vue`. The current `app/pages/index.vue` (View 0) is renamed to `app/pages/view0.vue`.

Two small extracted components (each focused, each independently reasonable):

**`app/components/HubArticleTypeGrid.vue`** — the reusable interactive type grid currently inlined in `app/pages/taxonomy.vue:298-330`. Props:
- `highlight?: string` — the `type` value to render with the amber emphasis treatment (used on the home page to highlight `researchReport`; absent on `/taxonomy` where everything is equal weight)
- `colorFamily?: 'auto' | 'none'` — whether to apply the family color-coding (`auto` for the home page, `none` for `/taxonomy` to keep its existing flat treatment)
- `compact?: boolean` — denser pill layout for the home page; full-text card layout for `/taxonomy`

The component owns the grid render, the hover/focus styling, and emits `select(typeValue)` when a pill is clicked. The modal stays on the calling page so each page can phrase the surrounding chrome and modal title.

**`app/components/ArticleTypeExamplesModal.vue`** — the modal currently inlined in `app/pages/taxonomy.vue:390-453`. Props:
- `v-model:open` — visibility (UModal-compatible)
- `typeValue: string | null` — which type to show
- `articles: Article[]` — the dataset to look up examples in (callers pass `useArticles({ fillRandom: false })`'s data)

Both pages reuse this same modal. Internal logic moves out of `taxonomy.vue` into the component.

**Existing components stay as-is.** `ArticleCard.vue`, `ArticleFilterBar.vue`, `ArticleTypeChips.vue`, `MermaidDiagram.vue`, `AppLogo.vue`, `TemplateMenu.vue` are not touched.

## Data

The home page calls `useArticles({ fillRandom: false })` — the same call `/taxonomy` uses, hitting the existing `articles-raw` cache key. We use `fillRandom: false` because the type-pill examples should reflect real curation, not the random-type fill. The `~236` count for the stat strip is derived from `articles.value.length` — formatted with a tilde and `Intl.NumberFormat` to handle the data growing past 999.

No new GraphQL queries. No new composables.

## Routing changes

| Before | After | Notes |
|---|---|---|
| `/` → View 0 (chips + advanced toggle) | `/` → new home page | New file at `app/pages/index.vue` |
| (none) | `/view0` → View 0 | Renamed file: `app/pages/index.vue` → `app/pages/view0.vue`. Internal logic unchanged. |
| `/view1` → View 1 | `/view1` → View 1 | unchanged |
| `/view2` → View 2 | `/view2` → View 2 | unchanged |
| `/taxonomy` → Taxonomy | `/taxonomy` → Taxonomy | unchanged behavior, copy updated (see next section) |
| `/about` → About | `/about` → About | unchanged behavior, copy may want a once-over but is out of scope unless you flag changes |

**Header navigation** (`app/app.vue`): the `navItems` array currently has `View 0 → /`. Update to `View 0 → /view0`. Add a "Home" item at the front of the array pointing to `/`. Keep the demo badge linking to `/`.

**Static-generation crawler**: Nitro's prerender finds routes via `<NuxtLink>` traversal. Adding `/view0` to the nav and the home page's view cards means the new route is discovered automatically. No `nitro.prerender.routes` change needed. The 4 GB heap setting in `netlify.toml` is unchanged — adding one more route is well within budget.

## Default color mode change

Add to `nuxt.config.ts`:

```ts
colorMode: {
  preference: 'dark',
  fallback: 'dark'
}
```

Verify the exact location (`@nuxtjs/color-mode` module options vs `ui:` block) when implementing — `@nuxt/ui` v3 inherits from `@nuxtjs/color-mode`. Test that the `UColorModeButton` toggle still works on every page after the change. First-load on a fresh browser should render dark; the toggle then persists user preference in `localStorage` as before.

The two existing pages that render mode-aware content — `/taxonomy` (Mermaid diagram theme via `useColorMode()`) and the global `UColorModeButton` icon swap — are not affected by changing the default; they read live mode and respond.

## Copy updates on related pages

The new home page tells the corrected naming history (deliberate "articles" choice over "summaries"). Two existing places carry the older "started as summaries → name was generalized" framing, which now contradicts the home page. Update them to match.

### `README.md`

The existing prose at the "Hub Taxonomy page (`/taxonomy`)" section currently has this bullet under the page walkthrough:

> "**A note on the word 'Article'.** Historical scope creep from Hub 1.0 — articles started as summaries of research reports and now cover annual reports, program evaluation summaries, updates, etc."

Replace with:

> "**Why 'articles' and not 'summaries'?** Naming context — during Hub 1.0 planning the team considered 'summaries' and rejected it after several weeks because articles can also stand alone with no attached source PDF. 'Articles' was chosen as both a more general label (a publishing platform carries many kinds of digital pieces) and a more specific one (an 'article' is a familiar concept on a publishing platform)."

No other README sections need to change — the architectural prose in the rest of the README is independent of this naming history.

### `app/pages/taxonomy.vue`

The "A note on the word 'Article'" section (lines ~230–245) has three paragraphs. Replace the first two with the corrected naming history; the third (about why the chips matter) is fine as-is.

**First paragraph** — currently:

> "In **Hub 1.0**, an *article* was specifically a summary of a **research report** — the public-facing write-up that pointed back at the underlying research document. That was the original meaning when the term was chosen."

Replace with:

> "During **Hub 1.0** planning, *summaries* was a candidate label. It was rejected after several weeks of deliberation because articles can also stand on their own — published pieces with no attached source PDF, just an article in the everyday sense. 'Summaries' didn't fit that case."

**Second paragraph** — currently:

> "Over the years the scope quietly widened. Articles started covering **annual reports**, **program evaluation summaries**, **updates**, and so on. The core idea is still the same — an article is a summary of something — but today that 'something' can be any one of the fourteen `type` values, not just `researchReport`."

Replace with:

> "The team landed on **articles** because it was both more general (a publishing platform carries many kinds of digital pieces, including standalone articles) and more specific (an 'article' is a familiar concept on a publishing platform). The core scope was anticipated by that choice: an article can be a summary of a research report, an annual report, a program evaluation, a strategic plan, or one of fourteen `type` values total — and it can also be a piece with no source attachment at all."

**Third paragraph** ("That history is exactly why the chips in this demo matter…") is unchanged.

Keep paragraphs short. We're correcting two paragraphs, not rewriting the section. These edits ship in the same change as the home page so the public-facing story stays consistent across `/`, `/taxonomy`, and the README.

## Testing / verification

Per the project's existing patterns:

1. `pnpm typecheck` — passes
2. `pnpm lint` — clean
3. `pnpm dev` then manually:
   - Visit `/` — sees the new home page in dark mode
   - Click each of the three view cards — lands on `/view0`, `/view1`, `/view2`
   - On the home page, click any of the 14 type pills — modal opens with top-2 examples (matches `/taxonomy` behavior)
   - Click View 0 in the header nav — lands on `/view0` (not `/`)
   - Toggle color mode via the header button — both `/` and other pages flip light/dark and persist
   - Visit `/taxonomy` — same interactive type grid as before, modal still works (verifies the extracted component doesn't regress)
   - Reload — first-load is dark again on a fresh browser (clear localStorage)
4. `pnpm generate` — completes successfully under the 4 GB heap
5. Inspect `dist/index.html`, `dist/view0/index.html` — both rendered, both contain expected content
6. WCAG quick-check via existing axe pattern: heading order (`/`'s H1 → H2 sections, no jumps), landmark uniqueness (header nav already labeled), color contrast on the dark palette (verify `#a1a1aa` body text on `#0e0e10` and `#0a0a0a` backgrounds passes 4.5:1 — if not, tighten to `#b4b4b8`)
7. Lighthouse run on the new `/` to ensure no regression vs. the current `/`. The home page has no live data fetching beyond the same `useArticles` call the demo already makes; LCP should be the hero text or stat strip.

## Open questions / risks

- **Nuxt UI v3 dark default API.** The exact config key (`ui.colorMode` vs top-level `colorMode`) needs verification against the version pinned in `package.json`. If the obvious config doesn't take effect, we may need to set `data-mode="dark"` on `<html>` via `useHead` in `app.vue` as a fallback. Resolve during implementation, before claiming done.
- **Color contrast on dark.** The chosen muted text color `#a1a1aa` against `#0e0e10` is around 7.0:1 (passes), and `#71717a` against `#0a0a0a` is around 4.6:1 (just above 4.5:1 minimum). Verify with axe; tighten if axe flags any pair.
- **The `dataset` enum value.** All 14 types appear in the home-page bucket including "Dataset" (the article-`type` enum value, not the top-level Datasets content type — those are now disambiguated by the 3-content-type ribbon at the top). If the team later decides to retire the `dataset` enum value from `Article.type`, removing it from the home page is one constant edit.
- **Stat strip "~236" growth.** As articles are added, the number nudges up. Computed live, so no maintenance.
- **Mobile layout.** The 4-col type grid collapses to 2 cols at sm: breakpoint, the 3-col content-type ribbon stacks at md:, the 3-col view cards stack at md:. Implementation must verify all three break points.

## Out of scope

- Animation / motion design beyond hover transitions
- New components beyond the two extractions noted
- Re-skinning View 0 / View 1 / View 2 to match the home page's literal palette (they keep using Nuxt UI tokens)
- Re-skinning `/about` (only header copy might benefit; flag if you want it)
- A/B testing of the home page vs. the old View 0 home — this is a one-shot replacement
- Analytics events on the home-page CTAs (no Plausible / GA wiring is in the demo today)
- Search engine optimization beyond inheriting the existing `useSeoMeta` setup. Concrete `<title>` for `/`: **"ICJIA Research Hub — Filter Demo"**. `og:description`: **"How Hub 2.0 organizes ICJIA research, and three filter layouts to compare."**

## Reference files

- Approved visual mockup: `.superpowers/brainstorm/52205-1777223166/content/home-structure-v6.html`
- Existing taxonomy page (source of the modal pattern + 14-type list): `app/pages/taxonomy.vue:103-118` (types), `:298-330` (grid), `:390-453` (modal)
- Existing app shell + header nav: `app/app.vue`
- Existing format helpers: `app/utils/article-format.ts`
- README to update: `README.md`
