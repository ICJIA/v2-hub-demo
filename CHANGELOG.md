# Changelog

All notable changes to this project will be documented in this file. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/).

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
