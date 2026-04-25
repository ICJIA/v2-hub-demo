# V2 Hub Demo — Research Hub Article Filter POC

**Live:** https://v2-hub-demo.netlify.app/

Proof-of-concept for ICJIA showing how the research hub article list could be filtered by publication type, topic, author, year, and tags, alongside a free-text search. Three side-by-side "views" let managers compare different filter UX flavors against the same dataset, plus a `/taxonomy` page explaining the underlying Strapi 5 data model in plain English.

The pages fetch live from the Strapi 5 GraphQL endpoint at `https://v2.hub.icjia-api.cloud/graphql`, hold all published articles in memory, and apply every filter client-side. Cards link to an internal stub detail page at `/articles/<slug>` so the demo is fully self-contained — no runtime traffic leaves this app.

## Quick start

```bash
pnpm install
pnpm dev
```

Then visit `http://localhost:3000/`.

```bash
pnpm typecheck   # type check
pnpm lint        # eslint
pnpm build       # production build (Nitro server)
pnpm generate    # static site generation (for Netlify)
```

## What the page does

### Data fetch

- Single GraphQL query against `https://v2.hub.icjia-api.cloud/graphql` (`useArticles` composable, `app/composables/useArticles.ts`). Pulls every article with `status: PUBLISHED`, `pagination.limit: 1000`, ordered server-side by `publishedAt` descending.
- Each article's record includes: `documentId`, `title`, `slug`, `abstract`, `type`, `date`, `publishedAt`, `tags`, `categories`, `authors[]` (objects with `title` and `description`), `splash` (with `url` and `alternativeText`).
- Articles missing a `type` value get a random one assigned client-side at fetch time via `pickRandomType()` so all fourteen `type` values are visible in the chip / dropdown UX during the demo. Toggleable: `useArticles({ fillRandom: false })` returns the raw set, used by `/taxonomy` so the type-card examples aren't polluted by the random fill. Different cache keys (`articles` vs `articles-raw`) keep the two flavors separate inside `useAsyncData`.
- Client-side, the array is sorted again by each article's `date` field (fallback `publishedAt`) so the displayed date drives the order. Filters and pagination operate on this sorted array.

### Card grid

- 1 / 2 / 3 columns at mobile / tablet / desktop. Card layout: 16:9 splash image (with explicit `width` / `height` to prevent CLS), publication-type badge (clickable), title (clickable via the wrapping `NuxtLink`), author byline (each name clickable), formatted date, abstract (line-clamp-5), tag pills (each clickable).
- The first card on every list page is rendered with `:priority="i === 0"`, which becomes `loading="eager"` + `fetchpriority="high"` on the splash image — improves the LCP metric.
- Cards link to an internal stub detail page at `/articles/<slug>` (`app/pages/articles/[slug].vue`). The detail page renders splash / type / title / byline / date / abstract / tags plus a "demo stub" notice and a Back-to-articles button. The demo never sends users to `v2hub.netlify.app`.

### Filter bar

The `ArticleFilterBar` component (`app/components/ArticleFilterBar.vue`) renders a single-line "Filter by:" row at desktop with up to five dropdowns plus a debounced search input plus a Clear-all button:

- **Publication Type** — derived from the Strapi `ENUM_ARTICLE_TYPE` values that appear in the data, formatted in human-readable Title Case (e.g. `researchAtAGlance` → "Research At A Glance"). Counts shown next to each entry. Only rendered when the page passes `:types`. View 0 and View 2 don't (they use chips instead); View 1 does.
- **Topics** — from the JSON `categories` field.
- **Centers** — hardcoded list of the five canonical ICJIA divisions (see below). Only rendered when the page passes `:centers`. View 1 doesn't.
- **Authors** — canonicalized (see Author canonicalization section).
- **Years** — derived from each article's `date` (or `publishedAt` fallback), descending.
- **Search** — free-text, debounced 300 ms, case-insensitive substring match against `title` and `abstract`.

Each dropdown leads with an `All …` reset entry, sized to fit the longest item label (capped at 32 chars so outlier "org-as-author" entries don't blow up the bar). Filters compose AND-style across categories. The **Clear all** button wipes every filter, including the page-level tag pills.

### Behavior details

- **Search highlighting.** Matched substrings inside each card's title and abstract are wrapped in `<mark>` via the `highlightSegments()` helper — splits the text into `{ text, match }[]` pairs using `indexOf`, no `v-html`, so query strings with HTML or regex chars are safe.
- **Additive (OR) tag filtering.** Click one tag and the grid filters to articles with that tag. Click another and the grid widens to articles with *either* tag. State is `selectedTags: string[]` (not a single string). Each active tag shows as a removable pill near the result count.
- **Search starts → clear other filters.** When the search transitions from empty to non-empty, every other filter (type, topic, author, year, center, tag) resets so the search runs against the full dataset. Only triggers on the empty → non-empty transition; subsequent keystrokes don't re-trigger the reset.
- **Smooth scroll-to-top** when a card-click filter is applied so the filter bar comes back into view.
- **Pagination** via `UPagination`, 12 per page, resets to page 1 on any filter change. Has `aria-label="Article pagination"` for screen-reader landmark uniqueness.

## Three filter UXs for managers to compare

The same dataset and the same card design are presented three ways so reviewers can pick a winner:

- **`/` — View 0 (chips with optional advanced filters).** Default landing page. A row of quick-pick chips (`All`, plus pluralized Research Reports, Annual Reports, Program Evaluation Summaries, Updates, Strategic Plans). The full filter bar (Topics, Centers, Authors, Years, Search) is hidden behind an **Advanced filters** toggle. The hypothesis: chips are usually enough; reveal the bar only when needed. Clicking the `All` chip is a full reset.
- **`/view1` — View 1 (dropdown-only).** All filtering, including Publication Type, lives in the filter bar. No chip row, no Centers dropdown — this is the "centers removed" UX from the original brief, closest to the live site today.
- **`/view2` — View 2 (chips with always-on filter bar).** Same chip row as View 0, with the full filter bar (Topics, Centers, Authors, Years, Search) always visible alongside. No Advanced toggle.

There's also a separate `/taxonomy` page (linked as **Hub Taxonomy** on the right side of the header) that explains the underlying Strapi 5 data model in plain English with two Mermaid diagrams. Audience: managers who don't yet understand that "Research Reports" is one of fourteen `type` values inside the `Articles` content type. Each of the fourteen types is clickable and opens a modal showing the top two real examples currently tagged with that type.

The chip set and the canonical Centers list are shared across pages via `CHIP_TYPES` and `KNOWN_CENTERS` exports in `app/utils/article-format.ts` — adding a new chip or center happens in one place.

Both `ArticleFilterBar` consumers conditionally render Type / Centers based on which item arrays the page passes in.

The Centers dropdown is hardcoded to the five canonical ICJIA divisions so all of them always appear (with live counts of matching articles, including zero counts):

- Center for Justice Research and Evaluation
- Center for Sponsored Research & Program Development
- Center for Victim Studies
- Center for Violence Prevention and Intervention Research
- Research & Analysis Unit

## "What This Demo Shows" modal

Top-right of the header, next to the color-mode toggle. Opens a `UModal` (`app/app.vue`) with a non-jargon checklist aimed at managers who haven't seen the demo yet — this is the elevator pitch:

1. **Find research reports in one click** — the headline benefit, mapped to the chips on View 0 / View 2.
2. **Search highlights what it matched** — yellow `<mark>` inside title and abstract.
3. **Click an author's name to see their other work** — clickable bylines.
4. **One entry per author, even when their name varies** — author canonicalization (see section below).
5. **Click any tag — and stack them** — additive (OR) tag filtering with removable pills.
6. **Filter by ICJIA Center** — the five canonical centers, listed even when count is zero.
7. **Three layouts to compare** — Views 0, 1, and 2.

The modal content is data-driven (a `changes: { title, body }[]` array in `app.vue`), so adding a bullet is one object literal — no template changes.

## Hub Taxonomy page (`/taxonomy`)

A non-filter explainer page accessible via the **Hub Taxonomy** button on the right side of the header. Audience: non-technical managers who use the research hub but have never thought about how the data behind it is organized. The page walks through, in this order:

1. **"First — what's a taxonomy?"** Plain-language definition with three analogies (library, org chart, filing cabinet).
2. **"Why is the database structured this way — and why has Hub 2.0 kept it?"** Persuasive but kind. Frames the architecture as Hub 1.0's original choice, lists practical wins it produced (findability, consistency over time, fast onboarding for editors, scalable catalog), and explains why Hub 2.0 is an upgrade rather than a teardown.
3. **The three top-level content types.** A Mermaid diagram (themed for both light and dark mode) showing Articles / Datasets / Apps-Dashboards with their respective fields. Notes that only Articles have a `type` enum; Datasets and Apps/Dashboards just have categories and tags.
4. **"A note on the word 'Article'."** Historical scope creep from Hub 1.0 — articles started as summaries of research reports and now cover annual reports, program evaluation summaries, updates, etc.
5. **What each bucket means.** Per-content-type field breakdown.
6. **Proposed: the "datahub" — Datasets linked to Apps/Dashboards.** A second Mermaid diagram with four labeled subgraphs covering the four real relationship patterns: solo dataset, one app/dashboard with one dataset, one app/dashboard with many datasets, shared dataset across apps/dashboards. The copy emphasizes that **all four are already supported by the Strapi 5 schema today** (introspection confirms `App.datasets` and `Dataset.apps` are bidirectional and accept any number on either side) — the work for Hub 2.0 is editorial: curation, editing, adjustment, oversight.
7. **The fourteen Article types.** A grid of clickable cards. Each opens a modal listing the top two most-recent real articles tagged with that type (pulled via `useArticles({ fillRandom: false })` so the random-fill demo helper doesn't pollute the examples). Empty types show a "no tagged examples yet — needs curation" message. The modal also includes a banner explaining that examples are illustrative and curation is ongoing.
8. **"Why this matters for the demo."** A closer that ties everything back to the chip filter on View 0.

The page uses the shared `MermaidDiagram` component (`app/components/MermaidDiagram.vue`), which dynamically imports `mermaid` only when the component mounts — so the ~1 MB library doesn't ship with the other pages — and reactively re-renders when the user toggles light / dark mode. Cluster (subgraph) borders, line color, and text color are all driven by `useColorMode()`.

## Click-to-filter on cards

Three card elements double as filters — click them and the grid narrows without leaving the page. The page also smooth-scrolls back to the top so the filter bar is in view.

- **Publication type badge** — sets the Publication Type filter (chip on View 0 / View 2, dropdown on View 1) to that type.
- **Author name** in the byline — sets the Authors dropdown to the canonical key for that name (so every credential variant for the same person matches).
- **Tag badge** — adds the tag to the active tag filter. Tag filtering is **additive (OR-composed)**: clicking multiple tags widens results to articles matching *any* selected tag. Each active tag shows as a removable pill (`Tag: foo ×`) next to the result count; clicking the same card-tag again toggles it off.

## Author canonicalization strategy

> This is the most opinionated piece of the demo. If you port these filters into the live hub, port this **first** — without it, the same person renders as multiple dropdown entries and the filter is unusable. All of it lives in `app/utils/article-format.ts` and `app/pages/index.vue` (mirrored to `view1.vue` / `view2.vue`).

### Why it's needed

Authors come back from Strapi as `{ title: string, description: string | null }[]`. The same person frequently appears under multiple `title` values, in three flavors:

| Source variant                            | Reason                  |
|-------------------------------------------|-------------------------|
| `Riley Calder` / `Riley Calder, Ph.D` / `Riley Calder, PhD` / `Riley Calder, PHD` / `Riley Calder, PH.D` | Credential suffix, mixed casing |
| `DAKOTA HARLOW` vs `Dakota Harlow`              | Casing                  |
| `Research & Analysis Unit` vs `Research and Analysis Unit` | `&` vs `and` connector |
| `  Riley Calder ` (with surrounding space) | Editor whitespace       |

A naive `Set<string>` over titles produces ~180 distinct entries when the data really has more like ~120 distinct people/orgs.

### The canonical key

Every author title is run through one pure function that returns a **canonical key**. The key is what's used to:

1. **Group** variants in the Authors / Centers dropdown items.
2. **Compare** an article's authors against the selected filter value.

The filter never compares raw titles to raw titles — only `authorKey(title) === selectedKey`. That's why every variant on every article matches its group.

```ts
// app/utils/article-format.ts
export function authorKey(name: string): string {
  return name
    .replace(/,.*$/, '')        // 1. drop credentials suffix
    .replace(/\s*&\s*/g, ' and ') // 2. unify "&" with " and "
    .replace(/\s+/g, ' ')        // 3. collapse internal whitespace
    .trim()                      // 4. trim leading/trailing whitespace
    .toLowerCase()               // 5. lowercase
}
```

#### Step-by-step

| Step | Regex / op                | Purpose                                                   | Example                                                  |
|-----:|---------------------------|-----------------------------------------------------------|----------------------------------------------------------|
| 1    | `name.replace(/,.*$/, '')`  | Drop the comma and everything after — credentials, suffixes, post-nominals. | `Riley Calder, Ph.D` → `Riley Calder`               |
| 2    | `.replace(/\s*&\s*/g, ' and ')` | Normalize ampersand-vs-"and" so org variants merge.   | `Research & Analysis Unit` → `Research and Analysis Unit` |
| 3    | `.replace(/\s+/g, ' ')`   | Collapse runs of whitespace (tabs, double spaces).         | `Riley   Calder` (double space) → `Riley Calder`         |
| 4    | `.trim()`                | Drop leading/trailing whitespace introduced by editors.    | `  Riley Calder ` → `Riley Calder`                       |
| 5    | `.toLowerCase()`         | Make the key case-insensitive so `DAKOTA HARLOW` matches `Dakota Harlow`. | `Dakota Harlow` → `dakota harlow`                  |

#### Concrete worked examples

| Raw `title`                                  | Canonical key               |
|----------------------------------------------|-----------------------------|
| `Riley Calder`                                | `riley calder`              |
| `Riley Calder, Ph.D`                          | `riley calder`              |
| `Riley Calder, PHD`                           | `riley calder`              |
| `DAKOTA HARLOW`                                  | `dakota harlow`                |
| `Research & Analysis Unit`                    | `research and analysis unit`|
| `Research and Analysis Unit`                  | `research and analysis unit`|
| `Avery del Mar, PhD, MPA, MA`              | `avery del mar`          |

### Picking the display name per group

Inside the page's `authorItems` computed, each canonical key becomes one dropdown entry. The label shown to users is the **most-used variant** in the dataset; ties are broken by **shorter** (which naturally favors the clean name without credentials).

```ts
// pseudo-code from app/pages/index.vue
const groups = new Map<string, Map<string /*variant*/, number /*count*/>>()
for (const article of articles.value) {
  for (const name of articleAuthorNames(article)) {
    const key = authorKey(name)
    if (!key) continue
    const variants = groups.get(key) ?? new Map()
    variants.set(name, (variants.get(name) ?? 0) + 1)
    groups.set(key, variants)
  }
}

// for each group, pick the variant with the highest count;
// on tie, prefer the shorter one
const items = [...groups].map(([key, variants]) => {
  let best = '', bestCount = -1
  for (const [name, count] of variants) {
    if (count > bestCount || (count === bestCount && name.length < best.length)) {
      best = name; bestCount = count
    }
  }
  return { label: best, value: key }
})
```

So if `Riley Calder` has 95 occurrences and `Riley Calder, MS` has 4, the dropdown shows `Riley Calder`.

### How filtering uses the key

```ts
// the filter value stored on the page is the canonical key, not a display name
if (selectedAuthor.value) {
  r = r.filter(a =>
    articleAuthorNames(a).some(n => authorKey(n) === selectedAuthor.value)
  )
}
```

Card click handlers also emit the canonical key, not the display name:

```vue
<!-- ArticleCard.vue -->
<button @click="emit('select-author', authorKey(name))">{{ name }}</button>
```

### What it deliberately does NOT merge

- **Typos.** `Jordon Reeves` vs `Jordan Reeves` — would require fuzzy/edit-distance matching (Levenshtein, Jaro-Winkler, etc.), which risks false collapses across genuinely different people.
- **Middle-initial differences.** `Sam Whitley` vs `Sam B. Whitley, BS` — could be the same person or two different ones; the algorithm treats them as separate.
- **Reordered names.** `Smith, John` (last-first) vs `John Smith` — not seen in the data, but if it shows up, current logic strips at the first comma so `Smith, John` becomes `Smith`. Watch for this.
- **Diacritics / accents.** `Émile Tanaka` vs `Emile Tanaka` — currently distinct. Add `.normalize('NFD').replace(/\p{Diacritic}/gu, '')` to the chain if your data has these.

The bias is **toward under-merging**: it's better to occasionally show two entries for the same person than to wrongly fuse two different people into one filter.

### Recommended production path

For the live hub, do this once at the source rather than every page load:

1. Add a stable `slug` (or `personId`) field on the Strapi `author` content type and set it once when the author is created.
2. Articles relate to authors by ID, not by typed name.
3. Drop `authorKey()` from the frontend — query the unique authors directly.

Until that lands, this client-side canonicalization keeps the filter usable. The same approach also powers the **Centers** dropdown (`centerItems` in `app/pages/index.vue`), which uses `authorKey()` on a hardcoded list of canonical center names from `KNOWN_CENTERS` in `app/utils/article-format.ts`.

## Random publication-type fill (POC only)

Roughly 80 % of the articles in the source CMS don't have a `type` set yet. To make the filter behavior visible across all fourteen enum values during the demo, articles missing a `type` get a random one assigned **client-side at fetch time** — the Strapi data is never modified. Counts will shift between deploys because the assignment is non-deterministic.

Two ways to opt out:

- **Per-call:** `useArticles({ fillRandom: false })` returns the raw articles unchanged. The `/taxonomy` page uses this so the per-type example modal only shows real, tagged examples. The cache key (`articles-raw` vs `articles`) keeps the two variants separate inside `useAsyncData`.
- **Global remove:** once Strapi is fully tagged, delete the `pickRandomType()` call inside `useArticles()` and the random fill is gone for everyone.

## Accessibility notes

The demo is targeted at WCAG 2.1 AA. Recent fixes:

- **Heading order.** Page H1 → card H2 (one level deep) so axe-core's `heading-order` rule passes. Modal headings start fresh under the modal title.
- **Landmark uniqueness.** Both `<nav>` regions (header `UNavigationMenu` + page `UPagination`) carry distinct `aria-label`s (`"View navigation"` and `"Article pagination"`).
- **Touch target size.** Tag buttons inside cards are `inline-flex min-h-6 min-w-6` so they meet WCAG 2.5.8's 24 × 24 minimum.
- **Search-match contrast.** `<mark class="bg-primary/40">` keeps the highlight legible against light and dark cards.
- **Mermaid contrast.** The `MermaidDiagram` component sets `themeVariables.lineColor` / `textColor` / `clusterBorder` / `titleColor` from the current color mode, with `clusterBkg: 'transparent'` so the page bg shows through subgraph rectangles cleanly.
- **Keyboard.** All clickable elements are `<button>` or `<NuxtLink>`; tab order follows DOM order; focus-visible ring uses Nuxt UI's primary color token.

## Project layout

```
app/
  app.vue                              # shell — header (nav + demo badge + What This Demo Shows
                                       #   modal + Hub Taxonomy link + color-mode toggle), main,
                                       #   footer (version + Changelog + GitHub)
  pages/
    index.vue                          # View 0 — chips with Advanced toggle for the bar
    view1.vue                          # View 1 — dropdown-only bar (no chips, no Centers)
    view2.vue                          # View 2 — chips with always-on bar
    taxonomy.vue                       # Hub Taxonomy explainer (Mermaid + interactive type list)
    articles/[slug].vue                # internal stub article detail page
  components/
    ArticleCard.vue                    # single card with click-to-filter on type/author/tag
    ArticleFilterBar.vue               # conditional Type / Topics / Centers / Authors / Years
                                       #   / search + Clear all
    ArticleTypeChips.vue               # the chip row used by View 0 and View 2
    MermaidDiagram.vue                 # client-only Mermaid wrapper, color-mode aware
  composables/
    useArticles.ts                     # GraphQL query + fetch with optional random-type fill
  utils/
    article-format.ts                  # typeLabel / pluralize / imageUrl / formatDate /
                                       #   articleAuthorNames / authorKey / highlightSegments /
                                       #   CHIP_TYPES / KNOWN_CENTERS
```

## Deploying to Netlify (static)

This POC is set up for **fully static** deployment — `nuxt generate` prerenders every route at build time (View 0, View 1, View 2, `/taxonomy`, and all 236 `/articles/<slug>` detail pages discovered by the crawler), baking the GraphQL response into the HTML. No Netlify Functions, no runtime fetches needed. The Strapi endpoint just has to be reachable from Netlify's build container (it's public, so it is).

Already in the repo:

- `netlify.toml` — `command = "pnpm generate"`, `publish = "dist"`, `NODE_VERSION = "22"`, `NODE_OPTIONS = "--max-old-space-size=4096"`. Netlify auto-detects the lockfile and uses pnpm. (`dist` is correct because Netlify's build container sets `NETLIFY=true`, which makes Nitro pick the `netlify-static` preset; that preset outputs to `dist/` rather than the local `.output/public/`.) The 4 GB heap bump is required: Nitro's prerender phase runs ~240 routes (4 list pages + `/taxonomy` + 236 `/articles/<slug>` detail pages) in a single Node process, and the default ~2 GB heap runs out partway through. With 4 GB the build completes cleanly. Raise to 6144 / 8192 if the catalog grows large enough that 4 GB stops being enough.
- `.nvmrc` — pins Node 22 for local development; matches Netlify's `NODE_VERSION` so local builds and deploys run on the same runtime.
- `pnpm generate` script — wraps `nuxt generate`, which sets the Nitro preset to `static` and prerenders all crawled routes. No `nitro.preset = 'netlify'` needed; that preset is for the SSR-on-functions path, which we don't want for a fully static demo.
- `useAsyncData('articles', …)` — the standard Nuxt primitive. At build time it runs once during prerender, the result is serialized into the page payload, and the client hydrates from that without a second fetch.

To deploy: connect the repo to Netlify, accept the auto-detected build settings, and ship. Each new deploy re-fetches articles and re-runs the random publication-type fill, so counts will shift between deploys until Strapi is fully tagged and the random fill is removed.

If you ever need fresher data without a deploy, switch to `nitro.preset = 'netlify'` in `nuxt.config.ts` and remove the `pnpm generate` step — the page will be SSR'd on a Netlify Function, fetching live on each request.

See [`CHANGELOG.md`](./CHANGELOG.md) for the full per-version history.