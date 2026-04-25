# Changelog

All notable changes to this project will be documented in this file. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/).

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
