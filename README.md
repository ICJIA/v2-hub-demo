# V2 Hub Demo — Research Hub Article Filter POC

**Live:** https://v2-hub-demo.netlify.app/

Proof-of-concept for ICJIA showing how the research hub article list could be filtered by publication type, topic, author, and year, alongside a free-text search. Built on the Nuxt UI starter; the landing page is the demo itself.

The page fetches live from the Strapi 5 GraphQL endpoint at `https://v2.hub.icjia-api.cloud/graphql`, holds all published articles in memory, and applies all filters client-side. Cards link to the corresponding article on `https://v2hub.netlify.app/articles/<slug>` in a new tab.

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

- Fetches every article with `status: PUBLISHED` in a single query (limit 1000), ordered by `publishedAt` descending. Sorts client-side by each article's `date` field (fallback `publishedAt`) so the displayed date drives the order.
- Renders a card grid (1 / 2 / 3 columns at mobile / tablet / desktop) with splash image, publication type badge, title, authors, formatted date, abstract, and tag badges. Cards link to an internal stub detail page at `/articles/<slug>` — the demo is self-contained and never sends users out to the live `v2hub.netlify.app`.
- "Filter by" bar (single line at desktop) with four dropdowns and a debounced search box:
  - **Publication Type** — derived from the Strapi `ENUM_ARTICLE_TYPE` values that actually appear in the data, displayed in human-readable Title Case (e.g. `researchAtAGlance` → "Research At A Glance"). Counts shown next to each entry.
  - **Topics** — from the JSON `categories` field on each article.
  - **Authors** — see canonicalization below.
  - **Years** — derived from each article's `date` (or `publishedAt` fallback), descending.
- Each dropdown leads with an `All …` reset entry. Filters compose AND-style across categories and the **Clear all** button wipes every filter (including the tag pills described below).
- Search results **highlight matched substrings** inside each card's title and abstract via inline `<mark>` elements (no `v-html`, so query strings with HTML/regex chars are safe).
- Tag filtering is **additive (OR-composed)**. Click multiple tags and the grid shows every article matching *any* of them. Each selected tag becomes a removable pill near the result count; clicking the same card-tag again toggles it off.
- Starting a search **clears every other filter** (type, topic, author, year, center, tag) so the search runs against the full dataset. Only triggers on the empty→non-empty transition.
- Pagination shows 12 per page; resets to page 1 on any filter change.

## Three filter UXs for managers to compare

The same dataset and the same card design are presented three ways so reviewers can compare:

- **`/` (Home) — chips with optional advanced filters.** A row of quick-pick chips (`All`, plus pluralized Research Reports, Annual Reports, Program Evaluation Summaries, Updates, Strategic Plans). The full filter bar (Topics, Centers, Authors, Years, Search) is hidden behind an `Advanced filters` toggle. The hypothesis: chips are usually enough; reveal the bar only when needed. Clicking the `All` chip is a full reset.
- **`/alt` (Alt 1) — dropdown-only.** All filtering, including Publication Type, lives in the filter bar. No chip row, no Centers dropdown — this is the "centers removed" UX from the original brief.
- **`/alt2` (Alt 2) — chips with always-on filter bar.** Same chip row as Home, with the full filter bar (Topics, Centers, Authors, Years, Search) always visible alongside. No advanced toggle.

There's also `/taxonomy`, a non-filter page that explains the underlying Strapi 5 data model in plain English and a Mermaid diagram. Audience: managers who don't yet understand that "Research Reports" is one of fourteen `type` values inside the `Articles` content type.

The chip set and the canonical Centers list are shared across pages via `CHIP_TYPES` and `KNOWN_CENTERS` exports in `app/utils/article-format.ts` — adding a new chip or center happens in one place.

Both `ArticleFilterBar` consumers conditionally render Type / Centers based on which item arrays the page passes in.

The Centers dropdown is hardcoded to the five canonical ICJIA divisions so all of them always appear (with live counts of matching articles, including zero counts):

- Center for Justice Research and Evaluation
- Center for Sponsored Research & Program Development
- Center for Victim Studies
- Center for Violence Prevention and Intervention Research
- Research & Analysis Unit

## Click-to-filter on cards

Three card elements double as filters — click them and the grid narrows without leaving the page. The page also smooth-scrolls back to the top so the filter bar is in view.

- **Publication type badge** — sets the Publication Type dropdown to that type.
- **Author name** in the byline — sets the Authors dropdown to the canonical key for that name (so all credential variants for the same person match).
- **Tag badge** — sets a tag filter. Tags don't have a dropdown in the bar; an active tag shows up as a small pill (`Tag: foo ×`) next to the result count, click the × to clear.

## Author canonicalization strategy

> This is the most opinionated piece of the demo. If you port these filters into the live hub, port this **first** — without it, the same person renders as multiple dropdown entries and the filter is unusable. All of it lives in `app/utils/article-format.ts` and `app/pages/index.vue` (mirrored to `alt.vue` / `alt2.vue`).

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
| 3    | `.replace(/\s+/g, ' ')`   | Collapse runs of whitespace (tabs, double spaces).         | `Anne   Kirkner` → `Riley Calder`                        |
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

Roughly 80% of the articles in the source CMS don't have a `type` set yet. To make the filter behavior visible across all 14 enum values during the demo, articles missing a `type` get a random one assigned **client-side at fetch time** — the Strapi data is never modified. Counts will shift slightly on each reload because the assignment is non-deterministic. Once Strapi is fully tagged, drop the `pickRandomType()` fallback in `app/composables/useArticles.ts` and reload.

## Project layout

```
app/
  app.vue                              # shell (header / main / footer)
  pages/
    index.vue                          # the demo page (state, filter logic, layout)
  components/
    ArticleCard.vue                    # single card
    ArticleFilterBar.vue               # the four dropdowns + search + Clear all
  composables/
    useArticles.ts                     # GraphQL query + fetch
  utils/
    article-format.ts                  # typeLabel / imageUrl / formatDate / articleAuthorNames
```

The Nuxt UI starter scaffolding (header `TemplateMenu`, `AppLogo`, etc.) is intentionally left in place so the demo still feels like a normal app shell.

## Deploying to Netlify (static)

This POC is set up for **fully static** deployment — `nuxt generate` prerenders `/` at build time, baking the GraphQL response into the HTML. No Netlify Functions, no runtime fetches needed. The Strapi endpoint just has to be reachable from Netlify's build container (it's public, so it is).

Already in the repo:

- `netlify.toml` — `command = "pnpm generate"`, `publish = "dist"`, `NODE_VERSION = "22"`. Netlify auto-detects the lockfile and uses pnpm. (`dist` is correct because Netlify's build container sets `NETLIFY=true`, which makes Nitro pick the `netlify-static` preset; that preset outputs to `dist/` rather than the local `.output/public/`.)
- `.nvmrc` — pins Node 22 for local development; matches Netlify's `NODE_VERSION` so local builds and deploys run on the same runtime.
- `pnpm generate` script — wraps `nuxt generate`, which sets the Nitro preset to `static` and prerenders all crawled routes. No `nitro.preset = 'netlify'` needed; that preset is for the SSR-on-functions path, which we don't want for a fully static demo.
- `useAsyncData('articles', …)` — the standard Nuxt primitive. At build time it runs once during prerender, the result is serialized into the page payload, and the client hydrates from that without a second fetch.

To deploy: connect the repo to Netlify, accept the auto-detected build settings, and ship. Each new deploy re-fetches articles and re-runs the random publication-type fill, so counts will shift between deploys until Strapi is fully tagged and the random fill is removed.

If you ever need fresher data without a deploy, switch to `nitro.preset = 'netlify'` in `nuxt.config.ts` and remove the `pnpm generate` step — the page will be SSR'd on a Netlify Function, fetching live on each request.

See [`CHANGELOG.md`](./CHANGELOG.md) for the full list of what shipped in v0.1.0.
3