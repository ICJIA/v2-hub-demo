# Infograph treatment for `/about` and `/taxonomy` — design

**Date:** 2026-04-27
**Status:** approved (brainstorm), awaiting implementation plan
**Audience:** the dev/design team building this; ICJIA managers reviewing the demo
**Predecessor spec:** `docs/superpowers/specs/2026-04-26-home-page-design.md` (visual home page)

## Background

The home page (`app/pages/index.vue`) was rebuilt as a visual orientation page in v0.1.65–v0.1.77, with a strong infograph identity: big bold headlines, color-coded sections, stat strips, equivalence visuals, numbered takeaway cards, and TL;DR callouts. It works for the target reader — a skeptical, non-technical ICJIA manager who needs to be convinced quickly.

`/about` and `/taxonomy` haven't been brought along yet. They're plain prose pages today:

- **`/about`** (`app/pages/about.vue`) — a 7-item list rendered as `<UContainer>` + a flat `<ul>` with checkmark icons. Functional but visually unrelated to home.
- **`/taxonomy`** (`app/pages/taxonomy.vue`) — content-heavy long-form prose (biologists/librarians taxonomy analogy, "every database is a taxonomy" walkthrough, architecture-is-good argument, two Mermaid diagrams, the 14-type interactive grid, proposed datahub explanation). Substantive but reads as walls of text.

The fix: rewrite both pages using the home page's visual vocabulary so the three pages read as one consistent product. Keep enough substance to convince a skeptic; cut the rest.

## Goals

1. **Visual coherence with home.** Both pages adopt home's vocabulary — eyebrow tags, 5xl–7xl headlines, stat strips, equivalence visuals, numbered cards, color-coded TL;DR callouts, deep-dive cards at the bottom.
2. **Aggressive trim on `/taxonomy`.** Drop the long analogies and the "every database is a taxonomy" walkthrough. Keep the architecture-is-inherited story, the 14-type interactive grid, the datahub future, and a tight "why we say articles" callout.
3. **Distinct dominant accent per page** so `/about` and `/taxonomy` read as a family but feel distinct: **`/about` = emerald** (what changed for the better), **`/taxonomy` = sky** (the structure).
4. **Make interactivity obvious.** Every clickable card uses the `i-lucide-mouse-pointer-click` icon, a `Try it →` / `Open →` CTA inside the card body, and a border-color hover-shift matching home's existing view-card pattern.
5. **Replace Mermaid diagrams with bespoke infograph treatments** — the structure diagram becomes a 3-content-type ribbon, the datahub diagram becomes 4 colored relationship cards.
6. **Preserve existing interactive behavior.** The `HubArticleTypeGrid` + `ArticleTypeExamplesModal` interaction on `/taxonomy` stays exactly as it is.

## Non-goals

- **No new components.** Reuse `HubArticleTypeGrid` and `ArticleTypeExamplesModal`. The `MermaidDiagram` component file stays in place but is no longer imported by these pages.
- **No new data fetching.** Same `useArticles` calls; no new composables, no new GraphQL queries.
- **No re-skin of View 0/1/2.** They keep their Nuxt UI token-based theme and their existing layouts.
- **No re-skin of home.** Home is the reference — these pages match it, not the other way around.
- **No animation beyond hover transitions.** Same constraint as the home page.

## Audience and tone

Same reader as home: a smart, non-technical ICJIA manager approaching the demo skeptically. Voice rules carry over from the home spec:

- **Orient, don't correct.** Don't imply the reader was wrong about anything.
- **Frame the architecture as inherited and intact.** Hub 2.0 carried Hub 1.0's structure forward — that's the point.
- **No defensive tone, no jargon shaming.**
- **Decorative emoji sparingly** — section icons and the datahub-card icon-relationships only.

## Page structure — `/about`

**Dominant accent: emerald** (with sky / amber / violet as secondary accents on the upgrade cards, color-coded by kind of fix).

### 1. Hero

- Eyebrow (emerald): `WHAT THIS DEMO ADDS`
- H1 (5xl/6xl/7xl, font-black, leading-[1.02]): "Seven small upgrades.<br>One big difference."
- Subhead (lg/xl, max-w-2xl, zinc-600/400): "What this proof-of-concept does that the live hub doesn't — so anyone can find what they're looking for in one or two clicks."
- CTAs (flex-wrap gap-3):
  - Primary (solid zinc-900/white): `See it on the home page` → `/`
  - Secondary (outline): `Open View 0` → `/view0`

### 2. Stat strip

Four tiles in a `grid-cols-2 md:grid-cols-4` layout, matching home's stat strip (`max-w-5xl`, rounded-2xl tiles, big numerals 4xl/5xl, font-black, captions xs font-medium).

| Tile | Numeral | Caption | Border |
| --- | --- | --- | --- |
| 1 | `7` | upgrades shipping in this POC | emerald-500 (highlighted) |
| 2 | `1` | click to find research reports | sky-500 |
| 3 | `1` | entry per author, every variant counted | violet-500 |
| 4 | `5` | ICJIA Centers always visible | amber-500 |

Each tile has a small icon (size-9 rounded-lg) above the numeral, matching home: e.g., `i-lucide-list-checks` (emerald), `i-lucide-mouse-pointer-click` (sky), `i-lucide-merge` (violet), `i-lucide-building-2` (amber).

### 3. The headline upgrade — clicks comparison

- Eyebrow (sky): `THE HEADLINE FIX`
- H2 (3xl, font-bold, leading-tight): "Finding research reports: from many clicks to **one.**"

Equivalence-style visual matching home's `articles ≡ summaries` pattern: two cards side-by-side with a centered glyph between them.

- **Left card** — zinc border, dimmed. Eyebrow: `LIVE HUB TODAY`. Big text (4xl/5xl, font-black, zinc-700): "many clicks". Subtext: "open menu → scroll → find → click → click".
- **Center glyph** — `→` (arrow-right) at 5xl/7xl, sky.
- **Right card** — amber border + amber-500/10 bg. Eyebrow: `THIS DEMO`. Big text (4xl/5xl, font-black, amber-600/400): "one click". Subtext: "Click `Research Reports`. Done."

Caption underneath, centered, sm zinc-600/400: "Same data. The chips on every view do the work."

**The right card is a `<NuxtLink>` to `/view0`** with a `🖱 Try the one-click filter →` CTA inside (xs font-bold, amber-700/400, hover-underline) and a border-color hover-shift to match home's view cards.

### 4. The six other upgrades

- Eyebrow (emerald): `EVERYTHING ELSE`
- H2 (3xl/4xl, font-extrabold, leading-tight): "Six more, just as practical."

Six cards in a 2-col `md:grid-cols-2` grid (last card spans full-width with `md:col-span-2`, matching home's takeaway pattern). Each card:

- Numbered circle (size-10, rounded-xl, color tied to kind-of-fix). Number is `font-black text-lg`.
- H3 (base/lg, font-bold, leading-snug): one short, declarative sentence.
- Body (sm, leading-relaxed): one or two sentences.
- Footer CTA inside the card: `🖱 Try it on /viewN →` (xs font-semibold, color-tied) — wraps the whole card as a `<NuxtLink>`.
- Border-color hover-shift on the wrapping link (matches home's view cards).

The seven items from the existing `/about` are remapped to six (one moved to Section 3) plus tightened copy:

| # | Title (≤7 words) | Body (≤2 sentences) | Kind / accent | Link |
| --- | --- | --- | --- | --- |
| 1 | Search highlights what it matched | Type a word in the search box (try "opioid"). Matching articles surface, with the word highlighted in title and summary. | search/highlight (emerald) | `/view0` |
| 2 | Click any author for their work | Every author name on a card is a one-click filter. See everything that person has published. | people (violet) | `/view0` |
| 3 | One author entry, every variant matched | "Riley Calder", "Riley Calder, Ph.D", "Riley Calder, PhD" all merge to one entry — the count and click work across all of them. | people (violet) | `/` (anchor to home's normalization showcase) |
| 4 | Click tags. Stack them. | Click one tag to filter. Click another to widen. Each active tag shows as a removable pill. | tags (amber) | `/view0` |
| 5 | Filter by ICJIA Center | Narrow articles to a specific division — Center for Justice Research and Evaluation, Center for Victim Studies, the rest. All five are always visible. | filter (sky) | `/view2` |
| 6 (full width) | Three layouts to compare | Same data, three filter UXs. View 0 (chips + advanced toggle), View 1 (dropdown menus), View 2 (chips + always-on bar). Pick a winner. | layouts (zinc) | three sub-CTAs: `/view0`, `/view1`, `/view2` |

The "three layouts" card has three small inline links instead of a single `Try it →` (matches home's three-card grid pattern but compressed into one card).

### 5. TL;DR / one-breath callout

Border-y-4 + border-emerald-500. Inner bg-emerald-100/40 dark:bg-emerald-500/10. Same shape as home's amber TL;DR section.

- Icon circle (size-12, rounded-full, bg-emerald-500, text-white): `i-lucide-zap`
- Eyebrow (xs/sm, font-bold, uppercase, tracking-[0.18em], emerald-800/300): `THE POINT`
- H2 (4xl/5xl/6xl, font-black, leading-[1.05]): "Everything's already on the hub. The demo just **exposes** it."
- Supporting line (xl/2xl, leading-relaxed, zinc-700/300): "Every research report. Every author's full body of work. Every tag. The structure was always there — Hub 2.0 just gave you the chips to click."

### 6. Deep-dive cards

Two cards, 2-col grid, mirroring home's bottom-row pattern exactly:

- `/taxonomy` — sky badge + `i-lucide-network` icon — "How the data is organized" — sub: "The three-bucket structure, the 14 article types, and the proposed dataset/dashboard linking. With diagrams."
- `/` — amber badge + `i-lucide-home` icon — "Back to the home page" — sub: "The visual orientation: articles ≡ summaries, the 14-type bucket, and three filter layouts to try."

Both wrapped as full-card `<NuxtLink>`s.

### Removed from the current `/about`

- The flat `<ul>` of 7 checkmark items (replaced by Sections 3 + 4)
- The `<UContainer>` wrapper (the new page uses home's full-bleed `<section>` pattern with `mx-auto max-w-5xl` inner content, matching home's responsive padding `px-6 sm:px-12 lg:px-16`)
- The bottom "More highlights will be added" code block (redundant with home; if anything, it would belong on home, not here)

## Page structure — `/taxonomy`

**Dominant accent: sky** (with amber for the Articles bucket / "why articles not summaries" callout, emerald for one datahub pattern, violet for one datahub pattern, matching home's color-family conventions).

### 1. Hero

- Eyebrow (sky): `THE STRUCTURE`
- H1 (5xl/6xl/7xl, font-black): "How Hub 2.0 organizes<br>everything it publishes."
- Subhead (lg/xl, max-w-2xl): "Three top-level buckets. Articles holds 14 named types. Hub 2.0 inherited the shape from Hub 1.0 — and that's why it works."
- CTAs:
  - Primary: `See the 14 types` → `#types` (smooth-scroll target on Section 5)
  - Secondary: `Try filtering` → `/`

### 2. Stat strip

Four tiles, same layout as `/about`'s stat strip and home's.

| Tile | Numeral | Caption | Border |
| --- | --- | --- | --- |
| 1 | `3` | top-level content types | sky-500 (highlighted) |
| 2 | `14` | named article types | amber-500 |
| 3 | `1` | shape inherited from Hub 1.0 | emerald-500 |
| 4 | `4` | patterns proposed for the datahub | violet-500 |

Icons (size-9 rounded-lg, themed): `i-lucide-layout-grid`, `i-lucide-tags`, `i-lucide-link`, `i-lucide-share-2`.

### 3. The architecture (replaces `structureDiagram`)

- Eyebrow (emerald): `INHERITED FROM HUB 1.0`
- H2 (3xl/4xl, font-extrabold): "Same bones. Modern CMS."
- Subhead (sm/base, max-w-2xl, leading-relaxed): "The hub holds three top-level buckets. Hub 2.0 swapped the CMS to Strapi 5 but kept the original Hub 1.0 shape intact — because the original team got it right."

**Sub-block A — three-content-type ribbon** (matches home's existing 3-card ribbon at `app/pages/index.vue:252-299`, with each card now also listing its fields):

3-col grid (`sm:grid-cols-3`). Each card keeps home's eyebrow pattern (`Content type 1 of 3`, `Content type 2 of 3`, `Content type 3 of 3`) plus an icon + label, then adds a chip row below the label showing the fields:

- **Articles** (amber-emphasized, eyebrow `CONTENT TYPE 1 OF 3` in amber) — `i-lucide-library` icon, label "Articles · ~236 items", chips: `type` (amber pill, sub-text `14 fixed values`) · `categories` (zinc pill, `free-form`) · `tags` (zinc pill, `free-form`)
- **Datasets** (zinc, dimmed) — `i-lucide-database` icon, label "Datasets", chips: `categories` · `tags` (each `free-form`, no `type` enum, sub-text "no `type` enum")
- **Apps / Dashboards** (zinc, dimmed) — `i-lucide-layout-dashboard` icon, label "Apps / Dashboards", chips: `categories` · `tags` (each `free-form`)

Chips render as small rounded pills (`rounded-full px-2.5 py-0.5 text-[10px]`) in the card body. Sub-text under each chip uses the smallest text scale (`text-[10px] text-zinc-600 dark:text-zinc-400`).

**Sub-block B — equivalence visual** (matches home's `articles ≡ summaries` pattern):

Two cards side-by-side with a centered `≡` glyph (5xl/7xl, font-black, zinc-900/white):

- **Left card** — zinc-bordered, dimmed. Eyebrow: `HUB 1.0 SHAPE`. Big text (4xl/5xl, font-black, zinc-700/300): `3 buckets · 14 types`.
- **Right card** — sky-bordered + sky-500/10 bg. Eyebrow: `HUB 2.0 SHAPE`. Big text (4xl/5xl, font-black, sky-700/300): `3 buckets · 14 types`.

Caption underneath, centered, sm zinc-600/400: "**The structure is identical.** The CMS is new (Strapi 5). Hub 2.0 is an upgrade, not a teardown."

### 4. Why "articles" — and not "summaries"?

Compact callout, mirrors home's existing naming-note section at `app/pages/index.vue:355-375`. Border-amber-300/50 + bg-amber-50 dark:bg-amber-500/5.

- Icon (`i-lucide-notebook-pen`, size-5, amber-600/400)
- H3 (base, font-bold, amber-700/400): "Why 'articles' — and not 'summaries'?"
- Body — same two paragraphs as home's existing callout (verbatim, so the public-facing story stays consistent across all three pages):

> "Summaries" was on the table during Hub 1.0 planning. Over several weeks and several name changes, we kept running into the same problem: an article *can* be a summary of an attached research report or annual report — but it can also stand on its own, a standalone piece with no attached PDF at all. "Summaries" didn't fit that case.
>
> We landed on **articles** because it was both more general (a publishing platform can carry many kinds of digital pieces, including standalone articles) and more specific (an "article" is a familiar concept — exactly what you'd expect on a publishing platform).

### 5. The 14 article types — interactive

`id="types"` for the hero CTA's smooth-scroll target.

- Eyebrow (amber): `INSIDE ARTICLES`
- H2 (3xl/4xl, font-extrabold): "Fourteen types. **Click any one.**"
- Subhead (sm/base, max-w-2xl): "These are the only valid values for an article's `type` field. Real examples open in a modal."

Render the existing `<HubArticleTypeGrid>`:

```vue
<HubArticleTypeGrid
  :articles="rawArticles"
  variant="list"
  @select="showExamples"
/>
```

Bottom legend bar (matches home's identical affordance at `app/pages/index.vue:331-346`): color-family legend on the left, `🖱 Click any type for live examples` (xs font-semibold, amber-700/500) on the right.

The existing `<ArticleTypeExamplesModal v-model:open="isExamplesOpen" :type-value="selectedTypeForModal" :articles="rawArticles" illustrative-fill />` stays exactly as it is.

### 6. Proposed datahub (replaces `datahubDiagram`)

- Eyebrow (violet): `WHAT'S NEXT`
- H2 (3xl/4xl, font-extrabold): "Connecting datasets to dashboards. **Four patterns.**"
- Subhead (lg, max-w-2xl): "Right now Datasets and Apps live as separate islands. The team wants them connected. The Strapi 5 schema already supports all four shapes today — the work for Hub 2.0 is editorial."

Four cards in a `sm:grid-cols-2 lg:grid-cols-4` grid, each rendering one pattern with mini icon-relationship art:

| Card | Title | Visual (Lucide icons w/ arrows) | Sub-line | Accent |
| --- | --- | --- | --- | --- |
| 1 | Solo dataset | `i-lucide-database` alone, centered, size-12 | A dataset that stands on its own — raw data, no dashboard yet. | sky |
| 2 | One app, one dataset | `i-lucide-layout-dashboard` → `i-lucide-database` (size-10, sky/emerald) | A dashboard built around a single dataset. | emerald |
| 3 | One app, many datasets | `i-lucide-layout-dashboard` → `i-lucide-database` ×3 (size-10, smaller datasets) | A dashboard pulling in several datasets — e.g., layered crime stats by year. | amber |
| 4 | Shared dataset | `i-lucide-layout-dashboard` ×2 → `i-lucide-database` (size-10) | The same dataset feeding more than one dashboard. | violet |

Use `<UIcon>` Lucide icons for the relationship art rather than emoji — keeps visual vocabulary consistent with home's stat-tile and section icons. Arrows render as `<UIcon name="i-lucide-arrow-right" />` (size-6, themed to the card accent).

Each card uses the home page's stat-tile shape (rounded-2xl, border-2 themed, padding p-5) but is **not a `<NuxtLink>`** — these are descriptive, not interactive. No `🖱 Try it →` CTA. No hover-shift. The lack of click affordance is intentional and matches the user feedback "make the interactive stuff obvious."

Below the 4-card grid, one full-width stat tile:

- Border emerald-500 + bg-emerald-500/10 (matches home's stat-strip emphasis tile pattern)
- Icon (`i-lucide-circle-check-big`, size-6 emerald-700/300)
- Inline text (lg, font-bold, leading-snug): "**All four patterns: schema-supported in Strapi 5 today.** The work for Hub 2.0 is editorial — curating which datasets belong to which apps, not building anything new at the data layer."

### 7. TL;DR / one-breath callout

Border-y-4 + border-sky-500. Inner bg-sky-100/40 dark:bg-sky-500/10. Same shape as home's amber TL;DR section.

- Icon circle (size-12, rounded-full, bg-sky-500, text-white): `i-lucide-zap`
- Eyebrow (xs/sm, font-bold, uppercase, tracking-[0.18em], sky-800/300): `THE POINT`
- H2 (4xl/5xl/6xl, font-black, leading-[1.05]): "Hub 2.0 inherited the structure that **already worked.**"
- Supporting line (xl/2xl, leading-relaxed, zinc-700/300): "This demo exposes the shape so visitors can filter by it. The bones haven't changed since Hub 1.0 — and that's why filters and search work at all."

### 8. Deep-dive cards

Two cards, 2-col grid, mirroring home's bottom-row pattern:

- `/about` — emerald badge + `i-lucide-sparkles` icon — "What else this demo shows" — sub: "Search highlighting, click-to-filter authors, additive tags, the five ICJIA Centers — seven small upgrades that make the catalog easier to navigate."
- `/` — amber badge + `i-lucide-home` icon — "Back to the home page" — sub: "The visual orientation: articles ≡ summaries, the 14-type bucket, and three filter layouts to try."

Both wrapped as full-card `<NuxtLink>`s.

### Removed from the current `/taxonomy`

- The "Why we said 'taxonomy' (and why we're not sorry)" section (biologists/librarians/hardware-stores analogy)
- The "Wait — a database is a taxonomy?" section (4 examples + design-principle paragraph)
- The "Why is the database structured this way" section (4 wins of the architecture — replaced by the equivalence visual in Section 3)
- The `structureDiagram` Mermaid block (replaced by Section 3's three-content-type ribbon + equivalence)
- The `datahubDiagram` Mermaid block (replaced by Section 6's 4-card grid)
- The "What each bucket means" prose section (rolled into Section 3's ribbon — each bucket card already shows its fields)
- The closing "Why this matters for the demo" callout (folded into Section 7's TL;DR)

## Visual style — shared

**Class vocabulary** matches home exactly. Both pages use the same Tailwind/Nuxt UI utilities home uses:

- Backgrounds: `bg-white dark:bg-[#0a0a0a]` (page), `bg-zinc-50 dark:bg-[#0e0e10]` (alternating section), `bg-zinc-100 dark:bg-zinc-900` (cards)
- Borders: `border-zinc-200 dark:border-zinc-800` (default), `border-zinc-300 dark:border-zinc-700` (raised)
- Text: `text-zinc-900 dark:text-white` (headlined), `text-zinc-700 dark:text-zinc-300` (body), `text-zinc-600 dark:text-zinc-400` (toned), `text-zinc-500 dark:text-zinc-500` (muted)
- Accents: `amber-500/600/700` light · `amber-300/400/500` dark · same for `sky`, `emerald`, `violet`
- Section padding: `px-6 py-12 sm:px-12 sm:py-14 lg:px-16` with inner `mx-auto max-w-5xl`
- Section borders: `border-y border-zinc-200 dark:border-zinc-800` between alternating sections

**Typography scale** matches home:

- H1 hero: `text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight`
- H2 callout: `text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05]` (TL;DR sections)
- H2 section: `text-3xl sm:text-4xl font-extrabold leading-tight` or `text-2xl sm:text-3xl font-bold`
- H3 card: `text-base sm:text-lg font-bold leading-snug`
- Body: `text-base leading-relaxed` for prose, `text-sm` for card body
- Eyebrow: `text-xs font-bold uppercase tracking-[0.14em]` (or `[0.18em]` for TL;DR sections)

**Icons** — Lucide via `<UIcon>` (already in use on home).

**No animation** beyond CSS transitions on hover/focus states (border color, underline). Same constraint as home.

## Component architecture

No new components. Both pages directly inline their sections in their respective `.vue` files. Reused components:

- **`HubArticleTypeGrid`** — `/taxonomy` Section 5 only. No prop changes. Same `variant="list"` as today.
- **`ArticleTypeExamplesModal`** — `/taxonomy` Section 5 only. No prop changes.
- **`UButton`, `UIcon`, `NuxtLink`** — both pages.

**Components that stop being imported from these pages:**

- `MermaidDiagram` — no longer imported by `/taxonomy`. The component file stays in `app/components/` in case any future page wants it.

**Components untouched:** `ArticleCard`, `ArticleFilterBar`, `ArticleTypeChips`, `AppLogo`, `TemplateMenu`.

## Data

- **`/about`**: `useArticles({ fillRandom: false })` for the article count in Section 2 stat strip. Hits the existing `articles-raw` cache key. Same call pattern as home.
- **`/taxonomy`**: `useArticles({ fillRandom: true })` for the type-grid + modal (unchanged behavior — `fillRandom: true` is what `/taxonomy` already uses for the same reason home uses it: every type pill needs at least one example for the modal).

No new GraphQL queries. No new composables.

## Routing changes

None. `/about` and `/taxonomy` keep their routes and their existing nav entries in `app/app.vue`.

## SEO / `useHead`

Match home's pattern from `app/pages/index.vue:11-56`:

- `useSeoMeta` with title, description, ogTitle, ogDescription
- JSON-LD `WebPage` block via `useHead.script` with `@context`, `@type`, `name`, `url`, `description`, `inLanguage`, `datePublished`, `dateModified`, `primaryImageOfPage`, `isPartOf`, `publisher`

Suggested copy:

**`/about`**:

- `<title>`: "What this demo shows — ICJIA Research Hub Demo" (≤60 chars)
- `meta description` (≤160 chars): "Seven small upgrades the live hub doesn't have yet — one-click filters, author normalization, click-to-filter tags, and three layouts to try."

**`/taxonomy`**:

- `<title>`: "How the data is organized — ICJIA Research Hub Demo" (≤60 chars)
- `meta description` (≤160 chars): "How Hub 2.0 organizes ICJIA research: three top-level buckets, 14 named article types, and a proposed dataset-to-dashboard datahub."

`datePublished: 2026-04-15` (project-wide value). `dateModified: 2026-04-27` for both pages on this change.

## Testing / verification

Per existing project patterns (mirroring the home spec's test plan):

1. `pnpm typecheck` — passes
2. `pnpm lint` — clean
3. `pnpm dev` then manually:
   - Visit `/about` — sees the new infograph layout
   - Visit `/taxonomy` — sees the new infograph layout
   - On `/taxonomy` Section 5, click each of the 14 type pills — modal opens with examples (verifies the extracted component still works)
   - On `/about` Section 3, click the "This demo · one click" card — lands on `/view0`
   - On `/about` Section 4, click each of the six upgrade cards — lands on the linked view (`/view0`, `/view2`, etc.)
   - Hover each clickable card — border-color shift + cursor pointer
   - Hover the four datahub-pattern cards on `/taxonomy` Section 6 — **no** hover-shift (they're not interactive, by design)
   - Toggle color mode via the header button — both pages flip light/dark gracefully (verifies `dark:` variants on every literal class)
   - On a mobile viewport (≤640px): verify the stat strip collapses to 2-col, the 14-type grid responds, the datahub 4-card grid stacks 1-col, the equivalence visuals stack vertically
4. `pnpm generate` — completes successfully under the 4 GB heap (no new routes, just two pages rebuilt)
5. Inspect `dist/about/index.html`, `dist/taxonomy/index.html` — both rendered, both contain expected H1 text
6. Lighthouse run on both pages — should match home's score (~96–100). New pages have no live data fetching beyond the same `useArticles` calls already in place
7. **Accessibility quick-check** via `lightcap`'s `run_a11y` (per the user's tool preferences): heading order on both pages (H1 → H2 → H3, no jumps), color contrast on all text/background pairs (especially the dimmed zinc-700/300 on the equivalence visual's left card, and the stat-tile captions on colored backgrounds), landmark uniqueness (single `<main>` per page, header nav already labeled), focus-visible rings on every clickable card

## Open questions / risks

- **Stat values that might shift.** `/about` says `1 click to find research reports` — that's true for `/view0` (chips) and `/view2` (chips + bar) but takes ~2 clicks on `/view1` (open dropdown → select). The stat is honest because the home page chips already deliver the one-click experience and that's the "headline upgrade" being measured. Don't change the stat unless the team objects.
- **`/about` Section 4 card 3 link target.** "One author entry, every variant matched" links to `/#author-normalization` — the home page's author-normalization showcase. The home page section currently has no anchor (`app/pages/index.vue:579`); add `id="author-normalization"` to that `<section>` as part of this change. One-line edit, ships in the same commit.
- **Color-contrast on dimmed cards.** The `/taxonomy` equivalence visual's "Hub 1.0 shape" left card uses `text-zinc-700 dark:text-zinc-300` to read as "dimmed" — verify it still passes 4.5:1 against the section background. Same risk on the dimmed Datasets/Apps cards in the 3-content-type ribbon.
- **Mobile typography on `4xl/5xl/6xl` TL;DR headlines.** The home page's `text-4xl sm:text-5xl lg:text-6xl` H2 in the TL;DR section reads fine on mobile but is dense — verify the "Hub 2.0 inherited the structure that **already worked.**" text doesn't wrap awkwardly at 320px–375px viewports. Tighten to `text-3xl sm:text-4xl lg:text-5xl` if it does.
- **Datahub-card icons.** The spec uses literal emoji (📊, 📱) for the relationship art on the datahub cards. Decide during implementation whether to keep emoji (matches home's type-pill emoji vocabulary) or swap to `<UIcon>` Lucide (`i-lucide-bar-chart-3`, `i-lucide-monitor-smartphone`) for consistency with the section icons. Either reads well; emoji is faster to build and matches home.

## Out of scope

- New nav entries / route changes
- Re-skin of View 0 / View 1 / View 2
- Re-skin of `/articles/[slug]`
- Light-mode-specific design (both pages flip via `dark:` variants and the existing `UColorModeButton`; no separate light-mode redesign)
- Analytics events on the new CTAs
- A/B testing the old vs. new pages — this is a one-shot replacement
- Re-naming `app/pages/about.vue` or `app/pages/taxonomy.vue` (file paths and routes are unchanged)

## Reference files

- Visual reference: `app/pages/index.vue` (the home page, this spec's source of truth for visual vocabulary)
- Predecessor spec: `docs/superpowers/specs/2026-04-26-home-page-design.md`
- Existing pages being replaced: `app/pages/about.vue` (74 lines), `app/pages/taxonomy.vue` (321 lines)
- Reused components: `app/components/HubArticleTypeGrid.vue`, `app/components/ArticleTypeExamplesModal.vue`
- Component being orphaned (file kept): `app/components/MermaidDiagram.vue`
- Data composable: `app/composables/useArticles.ts`
- Format helpers: `app/utils/article-format.ts`
