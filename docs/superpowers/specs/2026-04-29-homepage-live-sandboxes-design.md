# Homepage Live Sandboxes — Search Highlighting & Author Normalization

**Date:** 2026-04-29
**Status:** Approved
**Owner:** cschweda

## Problem

The homepage currently explains two of the three "concerns from recent meetings" — search highlighting and author-name normalization — using static before/after cards. Each section walks a manager from problem to solution to property breakdown, but every example is a frozen mockup. A skim-reader can plausibly conclude the demo is rendered from screenshots.

The demo views (`view0`, `view1`, `view2`) and `ArticleCard.vue` actually run real implementations of `highlightSegments()` and `authorKey()` from `app/utils/article-format.ts`. The homepage doesn't yet exercise either function inline. Managers should be able to type into the homepage and see those exact production functions run, without leaving the page.

## Goals

- Add two interactive "Try it live" widgets to the homepage, each calling the same exported function the production demo views use.
- Make it visually obvious that the widgets are live and that they share code with the demos (`● LIVE` badge, function name in the header).
- Cover all five normalization steps and all four highlight properties through the widgets — no static-only behavior left to imagine.
- Keep `index.vue` from growing further by extracting each widget as its own component.

## Non-goals

- No change to the demo views (`view0/1/2.vue`) or to `ArticleCard.vue`.
- No new search backend, no full-text index, no fuzzy matching.
- No persistence (no URL params, no localStorage). Widget state is in-memory only.
- No telemetry/analytics on widget interactions.
- No animation library; transitions use CSS only.

## Architecture

### Placement

Two new sub-panels added inline to `app/pages/index.vue`:

1. **Search highlighting** — after the "with highlighting" green card (around current line 2040), before the "Four properties" grid.
2. **Author normalization** — after the "one canonical entry" violet card (around current line 2282), before the "Five normalization steps" grid.

Each panel sits inside its existing section, so it inherits the section's color palette and surrounding narrative.

### Components

Two new components extracted from `index.vue`:

- `app/components/HighlightSandbox.vue`
- `app/components/AuthorNormalizationSandbox.vue`

Rationale: `index.vue` is already 2,771 lines. Extracting keeps each sandbox testable in isolation and prevents the file from growing further.

### Code reuse — the integrity claim

Both components import directly from `~/utils/article-format`:

- `HighlightSandbox.vue` imports `highlightSegments`.
- `AuthorNormalizationSandbox.vue` imports `authorKey` and a new helper `authorKeySteps`.

These are the same exported functions used by `view0.vue`, `view1.vue`, `view2.vue`, and `ArticleCard.vue`. No reimplementation, no shadow copy. If a manager asks "is this the real search?" the answer is "yes — the homepage and the views call the identical function in the same module."

### Refactor in `article-format.ts`

`authorKey()` currently chains five string operations as a single function. To support the 5-step pipeline display in the author sandbox without duplicating the regexes, add a sibling helper:

```ts
export interface AuthorKeyStep {
  value: string  // intermediate string after this step
  label: string  // human-readable rule name
}

export function authorKeySteps(name: string): { steps: AuthorKeyStep[], key: string } {
  // Apply each transformation in order, capturing the intermediate value.
}

export function authorKey(name: string): string {
  return authorKeySteps(name).key
}
```

`authorKey()` retains its exact public contract (same input → same output). Production callers (`view1.vue`, `view2.vue`, `ArticleCard.vue`) need no change. The sandbox calls `authorKeySteps()` to render the per-step pipeline.

## HighlightSandbox.vue

### Visual layout

Slots into the emerald-themed search-highlighting section, matching its color palette.

```
┌─────────────────────────────────────────────────────────────┐
│  ● LIVE  ·  Try it yourself                                 │
│                                                             │
│  ┌─────────────────────────────────────┐ ┌─────────────┐    │
│  │ 🔍 [type any word…              ✕] │ │ 4 matches   │    │
│  └─────────────────────────────────────┘ └─────────────┘    │
│                                                             │
│  Try one:  [juvenile] [Cook County] [diversion] [recidivism]│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Examining the Effectiveness of [Juvenile] Diversion…    ││
│  │ By Jane Carter · Sept 2024                              ││
│  │                                                         ││
│  │ This study evaluates outcomes from [juvenile] diversion ││
│  │ programs across [Cook County]…                          ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Behavior

- `searchQuery` is a `ref<string>`, default `'juvenile'` so the widget shows highlighting on first paint.
- Title and abstract render through `v-for` over `highlightSegments(text, searchQuery.value)`. Segments with `match: true` wrap in `<mark class="rounded-sm bg-primary/40 px-0.5 text-inherit">` — same `<mark>` styling as `ArticleCard.vue` and the existing static cards on the page.
- Match count is a `computed` that totals `segment.match === true` across both title and abstract segments. Shows `"4 matches"`, `"1 match"`, or `"no matches"` (latter renders in zinc, not emerald).
- Preset chips fill the input on click. The chip whose text matches the current query (case-insensitive) gets the emerald accent and `aria-pressed="true"`.
- Clear button (`✕`) inside the input clears `searchQuery`.
- Header includes a small pulsing badge: `● LIVE — running highlightSegments() from app/utils/article-format.ts` (text wraps responsively).

### Sample content

A title and abstract about juvenile diversion in Cook County by "Jane Carter, Sept 2024." Roughly 150 words total — enough to give the manager interesting words to try (juvenile, juveniles, diversion, court, county, recidivism, traditional, completed). Hard-coded as a constant `SAMPLE_ARTICLE` inside the component.

### Accessibility

- Input `aria-label="Search highlight demo"`.
- Match count container `aria-live="polite"` so screen readers announce updates.
- `<mark>` is semantic and announced by readers without extra ARIA.
- Preset chips are real `<button>` elements with `aria-pressed`.

### No new dependencies

Plain Vue 3 `ref` + `computed`. No animation library. Estimated ~80 lines of component code.

## AuthorNormalizationSandbox.vue

### Visual layout

Slots into the violet-themed author-normalization section, matching its color palette. Two parts stacked vertically.

#### Part 1 — Side-by-side dropdowns (visual collapse)

```
Part 1 — Same dropdown, two different worlds

┌─────────────────────────────┐  ┌──────────────────────────────┐
│ Author — raw CMS         ▾  │  │ Author — normalized      ▾   │
│ ────────────────────────────│  │ ─────────────────────────────│
│ ☐ Jane Carter              │  │ ◉ Jane Carter      7 articles│
│ ☐ Jane Carter, Ph.D        │  │                              │
│ ☐ Jane Carter, PhD         │  │                              │
│ ☐ Jane Carter, M.A., M.P.A.│  │                              │
│ ☐ JANE CARTER              │  │                              │
│ ☐ ··Jane  Carter··         │  │                              │
│ ☐ Jane Carter, MSW, LCSW   │  │                              │
│ 7 entries · same person 😕 │  │ 1 entry · ✓ canonical        │
└─────────────────────────────┘  └──────────────────────────────┘
```

- Two `<details>` elements styled to look like a `USelect` from `view1/view2`. Native `<summary>` provides the closed-state click-to-toggle.
- Both default `open` on first paint so a skim-reader sees the collapse without clicking.
- Left dropdown's 7 entries are hard-coded — same list shown in the existing static card at `index.vue` lines 2212–2234.
- Right dropdown's single entry is computed *live* by passing those 7 strings through `authorKey()` and selecting the most-frequent variant — same logic `view1.vue` `authorItems` uses (lines 58–83).
- Footer captions reinforce the count delta: `7 entries · same person 😕` vs `1 entry · ✓ canonical`.

#### Part 2 — Author selector + try-your-own pipeline

```
Part 2 — Type any name, watch the 5 steps

Pick an author:
[ Jane Carter ]  [ Marcus Reynolds ]  [ Forensics & Policy Lab ]
   active                                                       

Variants of "Jane Carter":
[Jane Carter] [Jane Carter, Ph.D] [Jane Carter, PhD]
[Jane Carter, M.A., M.P.A.] [JANE CARTER] [··Jane  Carter··]
[Jane Carter, MSW, LCSW]

┌─────────────────────────────────────────────────────────┐
│ 👤 [ Jane Carter, M.A., M.P.A.                        ] │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Input    "Jane Carter, M.A., M.P.A."                    │
│ Step 1 → "Jane Carter"          Drop credentials        │
│ Step 2 → "Jane Carter"          Unify ampersands        │
│ Step 3 → "Jane Carter"          Collapse spaces         │
│ Step 4 → "Jane Carter"          Trim whitespace         │
│ Step 5 → "jane carter"          Lowercase               │
│ ────────────────────────────────────────────────────────│
│ Canonical key:  jane carter                              │
│ All 7 variants of "Jane Carter" → jane carter            │
└─────────────────────────────────────────────────────────┘
```

### Sample authors (Part 2)

Three authors, each chosen to demonstrate different normalization behavior:

| Author tab | Variants | What it teaches |
|---|---|---|
| **Jane Carter** | Same 7 variants as Part 1: `Jane Carter`, `Jane Carter, Ph.D`, `Jane Carter, PhD`, `Jane Carter, M.A., M.P.A.`, `JANE CARTER`, `··Jane  Carter··` (with leading/trailing spaces and double internal space), `Jane Carter, MSW, LCSW` | Steps 1, 3, 4, 5 |
| **Marcus Reynolds** | `Marcus Reynolds`, `M. Reynolds, M.D.`, `Marcus Reynolds, JD, MPA`, `marcus reynolds` | Step 1 (different credential styles), Step 5 (lowercasing already-lowercase input is a no-op — useful to show) |
| **Forensics & Policy Lab** | `Forensics & Policy Lab`, `Forensics and Policy Lab`, `Forensics  &  Policy Lab`, `forensics and policy lab` | Step 2 (`&` ↔ `and`), Step 3 (extra spaces around `&`) |

Sample data lives as a typed const in `AuthorNormalizationSandbox.vue`, not in `article-format.ts`. These are pedagogical examples, not production data — and `article-format.ts` is imported by production views, so the sandbox keeps its sample data local.

### Behavior

- `selectedAuthorIndex` is a `ref<number>`, default `0` (Jane Carter).
- `userInput` is a `ref<string>`, pre-filled with the current author's first variant.
- Author tabs are radio-style buttons. Clicking one updates `selectedAuthorIndex` and re-pre-fills `userInput` with that author's first variant.
- Variant chips below the tabs come from the selected author's variant list. Clicking one writes to `userInput`. The chip whose text matches `userInput` verbatim gets the violet accent.
- The 5-step pipeline computes `authorKeySteps(userInput)` and renders one row per step plus the final canonical key. Whitespace is preserved visually with `whitespace-pre` and a monospace font, so leading/trailing spaces are visible.
- Final canonical key shown in violet, monospace, with `aria-live="polite"`.
- "All N variants of `<author>` → `<key>`" line below the canonical key — runs `authorKey()` over every variant in the selected author's list and asserts they all collapse to the same key. (If they don't — e.g., a future contributor adds a variant that doesn't fit the rules — the line displays a red warning. This doubles as a test.)

### Accessibility

- `<details>`/`<summary>` for the dropdowns are natively keyboard accessible and screen-reader friendly.
- Author tabs and variant chips are real `<button>` elements with `aria-pressed`.
- Input `aria-label="Author normalization demo"`.
- 5-step rows are inside an ordered list (`<ol>`).
- Canonical key container `aria-live="polite"`.

### No new dependencies

Plain Vue 3 `ref` + `computed`. Estimated ~150 lines of component code (including the typed sample-author data).

## Data flow

```
HighlightSandbox.vue
  ├── imports highlightSegments from ~/utils/article-format
  └── searchQuery (ref) → highlightSegments(text, query) → segments → <mark> render

AuthorNormalizationSandbox.vue
  ├── imports authorKey, authorKeySteps from ~/utils/article-format
  ├── selectedAuthorIndex (ref) → variant list
  ├── userInput (ref) → authorKeySteps(userInput) → step rows + final key
  └── authorKey(variant) for every variant → "All N → key" assertion

article-format.ts
  ├── authorKey(name): string                  // unchanged public API
  ├── authorKeySteps(name): { steps, key }     // new helper
  └── highlightSegments(text, query)           // unchanged
```

## Error handling

The widgets handle only one realistic error case: `highlightSegments(text, '')` with an empty query — already handled in the function (returns `[{ text, match: false }]`). The sandbox renders that as plain text with zero matches, no exception.

For author normalization, every input is a valid input. Empty string returns empty key, which renders as `""` in the canonical row. No exceptions.

If `authorKey()` over all variants for the selected author ever returns more than one distinct key, the "All N → key" line shows a red warning. Acts as a runtime regression check on the sample data and the function.

## Testing

- Manual smoke test in Chrome at `localhost:3000` once dev server is running:
  - Type into the search box; confirm matches highlight in title and abstract.
  - Click each preset chip; confirm the input fills and matches highlight.
  - Click each author tab; confirm variants and pipeline update.
  - Click each variant chip; confirm pipeline runs.
  - Type a custom variant (e.g., paste in a new credential string); confirm the 5 steps still execute.
- Type-checking via existing project config (`tsconfig.json`).
- No new automated tests — both functions already exist and are exercised by production code; the sandbox is a thin UI shell over them.

## Out of scope, explicitly

- Search highlighting *across* a list of articles. The widget shows highlighting on a single sample article. The full multi-article behavior is what the demo views (`view0/1/2`) already demonstrate.
- Center normalization (the `KNOWN_CENTERS` constant in `article-format.ts`). The Forensics & Policy Lab sample author covers the `&` / `and` case at a smaller scale; full center handling lives in `view2.vue`.
- Saving sandbox state to URL params or localStorage.
