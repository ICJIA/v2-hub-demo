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
- Renders a card grid (1 / 2 / 3 columns at mobile / tablet / desktop) with splash image, publication type badge, title, authors, formatted date, abstract, and tag badges.
- "Filter by" bar (single line at desktop) with four dropdowns and a debounced search box:
  - **Publication Type** — derived from the Strapi `ENUM_ARTICLE_TYPE` values that actually appear in the data, displayed in human-readable Title Case (e.g. `researchAtAGlance` → "Research At A Glance"). Counts shown next to each entry.
  - **Topics** — from the JSON `categories` field on each article.
  - **Authors** — see canonicalization below.
  - **Years** — derived from each article's `date` (or `publishedAt` fallback), descending.
- Each dropdown leads with an `All …` reset entry. Filters compose AND-style across categories and the **Clear all** button wipes every filter (including the tag pill described below).
- Pagination shows 12 per page; resets to page 1 on any filter change.

## Click-to-filter on cards

Three card elements double as filters — click them and the grid narrows without leaving the page. The page also smooth-scrolls back to the top so the filter bar is in view.

- **Publication type badge** — sets the Publication Type dropdown to that type.
- **Author name** in the byline — sets the Authors dropdown to the canonical key for that name (so all credential variants for the same person match).
- **Tag badge** — sets a tag filter. Tags don't have a dropdown in the bar; an active tag shows up as a small pill (`Tag: foo ×`) next to the result count, click the × to clear.

## Author canonicalization strategy

Authors come back from Strapi as `{ title, description }[]`. The same person frequently appears under multiple `title` values — most often a base name plus credentials (e.g. `Anne Kirkner` / `Anne Kirkner, Ph.D` / `Anne Kirkner, PhD` / `Anne Kirkner, PHD` / `Anne Kirkner, PH.D`), occasionally a casing difference (`KYLE HUCKE`), and rarely an "& vs and" difference in org names (`Research & Analysis Unit` / `Research and Analysis Unit`).

The dropdown groups these variants into one entry per person via a canonical key:

1. **Trim** leading/trailing whitespace at extraction.
2. **Strip credentials** — drop the comma and everything after it (`Anne Kirkner, Ph.D` → `Anne Kirkner`).
3. **Unify connectors** — convert `&` to `and` so `Research & Analysis Unit` and `Research and Analysis Unit` collapse together.
4. **Collapse whitespace** — `\s+` → single space.
5. **Lowercase** — handles `KYLE HUCKE` matching `Kyle Hucke`.

For each canonical group, the dropdown displays the **most-used variant** in the data (tiebreaker: shorter wins, which favors the cleaner name without credentials). The filter value stored on the article state is the canonical key itself, and the filter compares articles by re-keying their author titles, so any variant on any article matches its group.

**Trade-offs.** This deliberately does *not* merge:

- Typos like `Mathew Riordan` vs `Matthew Riordan` (would need fuzzy/edit-distance matching, which risks false collapses across genuinely different people).
- Middle-initial differences like `Kaitlin Martins` vs `Kaitlin F. Martins, BS` (could be the same person or two different ones — safer to keep them separate).

The bias is toward under-merging: it's better to occasionally show two entries for the same person than to wrongly fuse two different people into one filter selection.

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
