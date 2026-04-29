# Homepage Live Sandboxes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two interactive "Try it live" widgets to the homepage that call the same `highlightSegments()` and `authorKey()` functions production demo views use, so a manager can see live code on the page.

**Architecture:** Two new Vue components (`HighlightSandbox.vue`, `AuthorNormalizationSandbox.vue`) under `app/components/`, auto-imported into `app/pages/index.vue` and slotted into the existing emerald and violet sections. One small refactor in `app/utils/article-format.ts` adds `authorKeySteps()` so the normalization pipeline can render its 5 intermediate steps without duplicating regexes.

**Tech Stack:** Nuxt 4, Vue 3 (Composition API + `<script setup>`), Tailwind CSS v4, Nuxt UI v4, TypeScript 6. No test framework — verification via `pnpm typecheck`, `pnpm lint`, and manual browser check at `localhost:3000`.

**Spec:** `docs/superpowers/specs/2026-04-29-homepage-live-sandboxes-design.md`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/utils/article-format.ts` | Modify (lines 43–50) | Add `authorKeySteps()` helper. Refactor `authorKey()` to delegate. Public API unchanged. |
| `app/components/HighlightSandbox.vue` | Create | Self-contained search-highlight playground. Calls `highlightSegments()`. |
| `app/components/AuthorNormalizationSandbox.vue` | Create | Self-contained author-normalization playground. Calls `authorKey()` and `authorKeySteps()`. |
| `app/pages/index.vue` | Modify (insert at line 2041) | Place `<HighlightSandbox />` after the green "with highlighting" card. |
| `app/pages/index.vue` | Modify (insert at line 2283) | Place `<AuthorNormalizationSandbox />` after the violet "one canonical entry" card. |

Components auto-import via Nuxt 4 conventions (`app/components/`). No explicit imports needed in `index.vue`.

---

### Task 1: Refactor `authorKey()` to expose intermediate steps

**Files:**
- Modify: `app/utils/article-format.ts:43-50`

**Why first:** Both downstream sandbox components are independent of this, but `AuthorNormalizationSandbox.vue` (Task 3) imports `authorKeySteps`. Doing the helper first means `view1.vue` and `view2.vue` get verified through the existing demo views before any sandbox lands.

- [ ] **Step 1: Replace lines 43–50 of `app/utils/article-format.ts` with the refactor**

The current code at lines 43–50 is:

```ts
export function authorKey(name: string): string {
  return name
    .replace(/,.*$/, '')
    .replace(/\s*&\s*/g, ' and ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}
```

Replace with:

```ts
export interface AuthorKeyStep {
  value: string
  label: string
}

export function authorKeySteps(name: string): { steps: AuthorKeyStep[], key: string } {
  const steps: AuthorKeyStep[] = []
  let v = name
  v = v.replace(/,.*$/, '')
  steps.push({ value: v, label: 'Drop credentials' })
  v = v.replace(/\s*&\s*/g, ' and ')
  steps.push({ value: v, label: 'Unify ampersands' })
  v = v.replace(/\s+/g, ' ')
  steps.push({ value: v, label: 'Collapse spaces' })
  v = v.trim()
  steps.push({ value: v, label: 'Trim whitespace' })
  v = v.toLowerCase()
  steps.push({ value: v, label: 'Lowercase' })
  return { steps, key: v }
}

export function authorKey(name: string): string {
  return authorKeySteps(name).key
}
```

The five `replace`/`trim`/`toLowerCase` operations are *identical* to the original — just split across statements with intermediate captures. `authorKey()` is now defined in terms of `authorKeySteps()`, so any future change to the rules touches one place.

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`

Expected: passes with no new errors. (Existing errors, if any, should be unchanged.)

- [ ] **Step 3: Run lint**

Run: `pnpm lint`

Expected: passes.

- [ ] **Step 4: Verify production demo views still render correctly**

Open Chrome at `localhost:3000/view1` (the dev server is already running on port 3000). Open the Author dropdown. Confirm:
- The dropdown still lists merged author entries (one row per canonical key).
- The counts in parentheses still appear correct.
- Clicking an author still filters the article grid.

Then open `localhost:3000/view2`. Same checks.

If anything looks wrong, **the refactor introduced a regression**. The two functions must be byte-for-byte equivalent on every input — re-read the new `authorKeySteps()` and verify each transformation matches the original chain order exactly.

- [ ] **Step 5: Commit**

```bash
git add app/utils/article-format.ts
git commit -m "refactor(utils): expose authorKey intermediate steps via authorKeySteps()"
```

---

### Task 2: Create `HighlightSandbox.vue` and integrate into homepage

**Files:**
- Create: `app/components/HighlightSandbox.vue`
- Modify: `app/pages/index.vue:2040-2042` (insert at line 2041)

- [ ] **Step 1: Create `app/components/HighlightSandbox.vue`**

Full file content:

```vue
<script setup lang="ts">
import { highlightSegments } from '~/utils/article-format'

const SAMPLE_ARTICLE = {
  title: 'Examining the Effectiveness of Juvenile Diversion in Cook County',
  byline: 'By Jane Carter · Sept 2024',
  abstract: 'This study evaluates outcomes from juvenile diversion programs across Cook County, comparing recidivism rates among juvenile participants who completed diversion versus those processed through the traditional juvenile court system. Researchers tracked 1,200 first-time offenders over thirty months, controlling for offense severity, age at first contact, and prior school attendance. Findings indicate that juveniles who completed diversion were 43 percent less likely to reoffend within twelve months compared to peers routed through traditional adjudication. The recidivism gap widened over the full thirty-month window. Cook County\'s diversion model — combining a structured intake assessment, restorative-justice conferences, and community-based mentoring — delivered the largest benefit to younger juveniles with no prior contacts.'
}

const CHIPS = ['juvenile', 'Cook County', 'diversion', 'recidivism']

const searchQuery = ref('juvenile')

const titleSegments = computed(() => highlightSegments(SAMPLE_ARTICLE.title, searchQuery.value))
const abstractSegments = computed(() => highlightSegments(SAMPLE_ARTICLE.abstract, searchQuery.value))

const matchCount = computed(() => {
  const t = titleSegments.value.filter(s => s.match).length
  const a = abstractSegments.value.filter(s => s.match).length
  return t + a
})

const matchLabel = computed(() => {
  if (!searchQuery.value) return 'type to highlight'
  const n = matchCount.value
  if (n === 0) return 'no matches'
  if (n === 1) return '1 match'
  return `${n} matches`
})

function isChipActive(chip: string) {
  return chip.toLowerCase() === searchQuery.value.toLowerCase()
}
</script>

<template>
  <div class="mt-6 rounded-2xl border-2 border-dashed border-emerald-500 bg-emerald-500/5 p-5">
    <div class="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
      <span class="inline-flex items-center gap-1.5">
        <span class="size-2 animate-pulse rounded-full bg-emerald-500" />
        Live
      </span>
      <span class="text-zinc-400 dark:text-zinc-600">·</span>
      <span>Try it yourself</span>
      <span class="ml-auto whitespace-normal text-[10px] font-normal normal-case tracking-normal text-zinc-500 dark:text-zinc-500">
        Running <code class="font-mono text-emerald-700 dark:text-emerald-300">highlightSegments()</code> from <code class="font-mono">~/utils/article-format</code>
      </span>
    </div>

    <div class="mb-3 flex flex-wrap items-stretch gap-2">
      <div class="relative min-w-[200px] flex-1">
        <UIcon
          name="i-lucide-search"
          class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
        />
        <input
          v-model="searchQuery"
          type="text"
          aria-label="Search highlight demo"
          placeholder="type any word…"
          class="w-full rounded-lg border border-emerald-500/40 bg-white py-2 pl-10 pr-9 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:bg-zinc-950 dark:text-white"
        >
        <button
          v-if="searchQuery"
          type="button"
          aria-label="Clear search"
          class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          @click="searchQuery = ''"
        >
          <UIcon
            name="i-lucide-x"
            class="size-4"
          />
        </button>
      </div>
      <div
        aria-live="polite"
        class="flex items-center rounded-lg px-3 text-xs font-bold uppercase tracking-[0.12em]"
        :class="matchCount > 0
          ? 'bg-emerald-500 text-white'
          : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'"
      >
        {{ matchLabel }}
      </div>
    </div>

    <div class="mb-4 flex flex-wrap items-center gap-2 text-xs">
      <span class="font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
        Try one:
      </span>
      <button
        v-for="chip in CHIPS"
        :key="chip"
        type="button"
        :aria-pressed="isChipActive(chip)"
        class="rounded-full border px-2.5 py-1 transition-colors"
        :class="isChipActive(chip)
          ? 'border-emerald-500 bg-emerald-500 text-white'
          : 'border-zinc-300 bg-white text-zinc-700 hover:border-emerald-500/60 hover:bg-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'"
        @click="searchQuery = chip"
      >
        {{ chip }}
      </button>
    </div>

    <article class="rounded-xl border border-emerald-500/40 bg-white p-5 shadow-sm dark:bg-zinc-900">
      <h3 class="text-base font-semibold leading-snug text-zinc-900 dark:text-white">
        <template
          v-for="(seg, i) in titleSegments"
          :key="`t${i}`"
        >
          <mark
            v-if="seg.match"
            class="rounded-sm bg-primary/40 px-0.5 text-inherit"
          >{{ seg.text }}</mark>
          <template v-else>{{ seg.text }}</template>
        </template>
      </h3>
      <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
        {{ SAMPLE_ARTICLE.byline }}
      </p>
      <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <template
          v-for="(seg, i) in abstractSegments"
          :key="`a${i}`"
        >
          <mark
            v-if="seg.match"
            class="rounded-sm bg-primary/40 px-0.5 text-inherit"
          >{{ seg.text }}</mark>
          <template v-else>{{ seg.text }}</template>
        </template>
      </p>
    </article>
  </div>
</template>
```

- [ ] **Step 2: Insert `<HighlightSandbox />` into `app/pages/index.vue`**

Locate line 2040 of `app/pages/index.vue`. The block looks like:

```vue
        </div>

        <!-- Four properties of the highlight -->
        <div class="mt-12">
```

(Line 2040 = `        </div>`, line 2041 = blank, line 2042 = `<!-- Four properties of the highlight -->`.)

Insert the component on the blank line so the result reads:

```vue
        </div>

        <HighlightSandbox />

        <!-- Four properties of the highlight -->
        <div class="mt-12">
```

The single tag is indented 8 spaces to match the surrounding peers in the section.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`

Expected: passes.

- [ ] **Step 4: Run lint**

Run: `pnpm lint`

Expected: passes.

If lint flags `pnpm lint` issues in the new component (e.g., quoting, indentation, tag self-closing), fix the file inline and re-run.

- [ ] **Step 5: Manually verify in Chrome at `localhost:3000`**

Open `localhost:3000`, scroll to the green "Search Highlighting" section (or click the section anchor `#search-highlighting`). The new sandbox should appear *between* the green "with highlighting" card and the "Four properties" grid. Verify, in this order:

1. On first paint, the input shows `juvenile`, the badge reads "4 matches", the title and abstract render with green highlights on every "juvenile"/"Juvenile".
2. Click the `Cook County` chip. Input updates to `Cook County`. Highlights update to wrap "Cook County" in the abstract. Match count updates.
3. Type a non-matching word like `xyz`. Badge reads "no matches" in zinc. No highlights render.
4. Clear the input via the `✕` button. Badge reads "type to highlight". No highlights.
5. Type `JUVENILE` in all caps. Highlights still appear on `Juvenile`/`juvenile` (case-insensitive). The rendered match keeps the *original* casing from the source text.
6. Tab through the widget with the keyboard. Input is focusable, chips are focusable, clear button is focusable. `Enter` on a chip writes its text into the input.

If anything fails, fix the component and re-run.

- [ ] **Step 6: Commit**

```bash
git add app/components/HighlightSandbox.vue app/pages/index.vue
git commit -m "feat(home): live search-highlight sandbox using highlightSegments()"
```

---

### Task 3: Create `AuthorNormalizationSandbox.vue` and integrate into homepage

**Files:**
- Create: `app/components/AuthorNormalizationSandbox.vue`
- Modify: `app/pages/index.vue:2282-2284` (insert at line 2283)

- [ ] **Step 1: Create `app/components/AuthorNormalizationSandbox.vue`**

Full file content:

```vue
<script setup lang="ts">
import { authorKey, authorKeySteps } from '~/utils/article-format'

interface SampleAuthor {
  canonical: string
  variants: string[]
}

const SAMPLE_AUTHORS: SampleAuthor[] = [
  {
    canonical: 'Jane Carter',
    variants: [
      'Jane Carter',
      'Jane Carter, Ph.D',
      'Jane Carter, PhD',
      'Jane Carter, M.A., M.P.A.',
      'JANE CARTER',
      '  Jane  Carter  ',
      'Jane Carter, MSW, LCSW'
    ]
  },
  {
    canonical: 'Marcus Reynolds',
    variants: [
      'Marcus Reynolds',
      'M. Reynolds, M.D.',
      'Marcus Reynolds, JD, MPA',
      'marcus reynolds'
    ]
  },
  {
    canonical: 'Forensics & Policy Lab',
    variants: [
      'Forensics & Policy Lab',
      'Forensics and Policy Lab',
      'Forensics  &  Policy Lab',
      'forensics and policy lab'
    ]
  }
]

const PART_1_VARIANTS = SAMPLE_AUTHORS[0]!.variants

const part1CanonicalLabel = computed(() => {
  const counts = new Map<string, Map<string, number>>()
  for (const name of PART_1_VARIANTS) {
    const k = authorKey(name)
    const variants = counts.get(k) ?? new Map<string, number>()
    variants.set(name, (variants.get(name) ?? 0) + 1)
    counts.set(k, variants)
  }
  let bestName = ''
  let bestCount = -1
  for (const [, variants] of counts) {
    for (const [name, count] of variants) {
      if (count > bestCount || (count === bestCount && name.length < bestName.length)) {
        bestName = name
        bestCount = count
      }
    }
  }
  return bestName
})

const selectedAuthorIndex = ref(0)
const selectedAuthor = computed(() => SAMPLE_AUTHORS[selectedAuthorIndex.value]!)
const userInput = ref(SAMPLE_AUTHORS[0]!.variants[0]!)

watch(selectedAuthorIndex, (i) => {
  userInput.value = SAMPLE_AUTHORS[i]!.variants[0]!
})

const pipeline = computed(() => authorKeySteps(userInput.value))

const collapseAssertion = computed(() => {
  const author = selectedAuthor.value
  const keys = new Set(author.variants.map(v => authorKey(v)))
  return {
    consistent: keys.size === 1,
    key: keys.size === 1 ? [...keys][0]! : '',
    count: author.variants.length
  }
})

function isVariantActive(variant: string) {
  return variant === userInput.value
}

function visibleWhitespace(s: string): string {
  return s.replaceAll(' ', '·')
}
</script>

<template>
  <div class="mt-6 rounded-2xl border-2 border-dashed border-violet-500 bg-violet-500/5 p-5">
    <div class="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
      <span class="inline-flex items-center gap-1.5">
        <span class="size-2 animate-pulse rounded-full bg-violet-500" />
        Live
      </span>
      <span class="text-zinc-400 dark:text-zinc-600">·</span>
      <span>Try it yourself</span>
      <span class="ml-auto whitespace-normal text-[10px] font-normal normal-case tracking-normal text-zinc-500 dark:text-zinc-500">
        Running <code class="font-mono text-violet-700 dark:text-violet-300">authorKey()</code> from <code class="font-mono">~/utils/article-format</code>
      </span>
    </div>

    <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
      Part 1 — Same dropdown, two different worlds
    </div>
    <div class="mb-8 grid gap-3 sm:grid-cols-2">
      <details
        open
        class="group rounded-xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
      >
        <summary class="flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-700 [&::-webkit-details-marker]:hidden dark:text-zinc-300">
          <span>Author — raw CMS</span>
          <UIcon
            name="i-lucide-chevron-down"
            class="size-4 transition-transform group-open:rotate-180"
          />
        </summary>
        <ul class="border-t border-zinc-200 dark:border-zinc-700">
          <li
            v-for="(v, i) in PART_1_VARIANTS"
            :key="i"
            class="border-b border-zinc-100 px-4 py-2 font-mono text-xs text-zinc-700 last:border-b-0 dark:border-zinc-800 dark:text-zinc-300"
          >
            {{ v }}
          </li>
        </ul>
        <div class="border-t border-zinc-200 px-4 py-2 text-[11px] text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
          7 entries · same person 😕
        </div>
      </details>

      <details
        open
        class="group rounded-xl border border-violet-500 bg-white dark:bg-zinc-900"
      >
        <summary class="flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm font-semibold text-violet-700 [&::-webkit-details-marker]:hidden dark:text-violet-300">
          <span>Author — normalized</span>
          <UIcon
            name="i-lucide-chevron-down"
            class="size-4 transition-transform group-open:rotate-180"
          />
        </summary>
        <ul class="border-t border-violet-500/30">
          <li class="flex items-center justify-between gap-3 px-4 py-2 text-sm">
            <span class="font-semibold text-zinc-900 dark:text-white">
              {{ part1CanonicalLabel }}
            </span>
            <span class="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:text-violet-300">
              7 articles
            </span>
          </li>
        </ul>
        <div class="border-t border-violet-500/30 px-4 py-2 text-[11px] text-violet-600 dark:text-violet-400">
          1 entry · ✓ canonical
        </div>
      </details>
    </div>

    <div class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
      Part 2 — Type any name, watch the 5 steps
    </div>

    <div class="mb-3 flex flex-wrap items-center gap-2 text-xs">
      <span class="font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
        Pick an author:
      </span>
      <button
        v-for="(author, i) in SAMPLE_AUTHORS"
        :key="i"
        type="button"
        :aria-pressed="selectedAuthorIndex === i"
        class="rounded-full border px-3 py-1 font-semibold transition-colors"
        :class="selectedAuthorIndex === i
          ? 'border-violet-500 bg-violet-500 text-white'
          : 'border-zinc-300 bg-white text-zinc-700 hover:border-violet-500/60 hover:bg-violet-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'"
        @click="selectedAuthorIndex = i"
      >
        {{ author.canonical }}
      </button>
    </div>

    <div class="mb-3 flex flex-wrap items-center gap-2 text-xs">
      <span class="font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
        Variants of "{{ selectedAuthor.canonical }}":
      </span>
      <button
        v-for="variant in selectedAuthor.variants"
        :key="variant"
        type="button"
        :aria-pressed="isVariantActive(variant)"
        class="rounded-full border px-2.5 py-1 font-mono transition-colors"
        :class="isVariantActive(variant)
          ? 'border-violet-500 bg-violet-500 text-white'
          : 'border-zinc-300 bg-white text-zinc-700 hover:border-violet-500/60 hover:bg-violet-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'"
        @click="userInput = variant"
      >
        {{ variant.replace(/^\s+|\s+$/g, m => '·'.repeat(m.length)) }}
      </button>
    </div>

    <div class="mb-3 relative">
      <UIcon
        name="i-lucide-user"
        class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
      />
      <input
        v-model="userInput"
        type="text"
        aria-label="Author normalization demo"
        placeholder="type any author name…"
        class="w-full rounded-lg border border-violet-500/40 bg-white py-2 pl-10 pr-3 font-mono text-sm text-zinc-900 placeholder-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 dark:bg-zinc-950 dark:text-white"
      >
    </div>

    <ol class="rounded-xl border border-violet-500/40 bg-white p-4 dark:bg-zinc-900">
      <li class="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
        <span class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-500">
          Input
        </span>
        <code class="whitespace-pre rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">"{{ visibleWhitespace(userInput) }}"</code>
      </li>
      <li
        v-for="(step, i) in pipeline.steps"
        :key="i"
        class="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-zinc-100 py-2 text-sm dark:border-zinc-800"
      >
        <span class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-violet-700 dark:text-violet-300">
          Step {{ i + 1 }}
        </span>
        <code class="whitespace-pre rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">"{{ visibleWhitespace(step.value) }}"</code>
        <span class="text-xs text-zinc-500 dark:text-zinc-500">
          {{ step.label }}
        </span>
      </li>
      <li
        aria-live="polite"
        class="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t-2 border-violet-500/40 pt-3 text-sm"
      >
        <span class="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-violet-700 dark:text-violet-300">
          Canonical key
        </span>
        <code class="whitespace-pre rounded bg-violet-500/15 px-2 py-0.5 font-mono font-bold text-violet-700 dark:text-violet-300">{{ pipeline.key }}</code>
      </li>
    </ol>

    <p
      v-if="collapseAssertion.consistent"
      class="mt-3 text-xs text-zinc-600 dark:text-zinc-400"
    >
      All <strong class="text-zinc-900 dark:text-white">{{ collapseAssertion.count }} variants</strong> of "{{ selectedAuthor.canonical }}" collapse to <code class="rounded bg-violet-500/15 px-1.5 py-0.5 font-mono text-violet-700 dark:text-violet-300">{{ collapseAssertion.key }}</code> ✓
    </p>
    <p
      v-else
      class="mt-3 text-xs text-red-600 dark:text-red-400"
    >
      ⚠ Variants of "{{ selectedAuthor.canonical }}" produce more than one canonical key. The sample data and the function disagree — check the variant list.
    </p>
  </div>
</template>
```

A few notes on this file the implementer may need:

- `SAMPLE_AUTHORS[0]!.variants[0]!` — the non-null assertions are safe because the array is hard-coded with at least one author and each author has at least one variant. TypeScript can't prove this at compile time without `as const`, so we assert.
- `visibleWhitespace()` replaces spaces with `·` so leading/trailing/double spaces are visible to the manager. Otherwise a string like `"  Jane  Carter  "` looks identical to `"Jane Carter"` after rendering.
- The variant chips re-render with leading/trailing space dots via the inline `replace` — the actual `userInput` ref still gets the real string with real spaces.
- The chevron rotation uses the `group` + `group-open:rotate-180` pattern — the same pattern used by the pseudocode `<details>` collapsibles already on the page (`index.vue:2102`).

- [ ] **Step 2: Insert `<AuthorNormalizationSandbox />` into `app/pages/index.vue`**

Locate line 2282 of `app/pages/index.vue`. The block looks like:

```vue
        </div>

        <!-- The five steps -->
        <div class="mt-12">
```

(Line 2282 = `        </div>`, line 2283 = blank, line 2284 = `<!-- The five steps -->`.)

Insert on the blank line so the result reads:

```vue
        </div>

        <AuthorNormalizationSandbox />

        <!-- The five steps -->
        <div class="mt-12">
```

The single tag is indented 8 spaces.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`

Expected: passes.

- [ ] **Step 4: Run lint**

Run: `pnpm lint`

Expected: passes.

If lint flags style issues in the new component, fix the file inline and re-run.

- [ ] **Step 5: Manually verify in Chrome at `localhost:3000`**

Open `localhost:3000`, scroll to the violet "Author Names" section (or click the anchor `#author-normalization`). The new sandbox should appear *between* the violet "one canonical entry" card and the "Five normalization steps" grid. Verify, in this order:

1. **Part 1 dropdowns** — both `<details>` are open by default. Left lists 7 raw variants in monospace. Right shows one entry "Jane Carter" with a "7 articles" chip. The footer captions read "7 entries · same person 😕" and "1 entry · ✓ canonical".
2. **Part 1 collapse interaction** — clicking either summary toggles open/closed. Chevron rotates.
3. **Part 2 author tabs** — three tabs visible: `Jane Carter` (active, violet), `Marcus Reynolds`, `Forensics & Policy Lab`.
4. **Part 2 variant chips** — show the 7 Jane Carter variants. The first variant chip is violet (matches the input).
5. **Part 2 input + pipeline** — input shows "Jane Carter". Pipeline shows 5 steps; final canonical key reads `jane carter` in violet. "All 7 variants of Jane Carter collapse to `jane carter` ✓" appears below.
6. **Switch tab** — click `Marcus Reynolds`. Variant chips swap. Input pre-fills with "Marcus Reynolds". Pipeline updates. Bottom line reads "All 4 variants … `marcus reynolds` ✓".
7. **Switch to Forensics & Policy Lab** — click the variant `Forensics  &  Policy Lab` (with extra spaces around `&`). Pipeline shows: Step 1 unchanged, **Step 2** transforms `&` to `and` and the result reads `Forensics  and  Policy Lab`, Step 3 collapses to `Forensics and Policy Lab`. Final key: `forensics and policy lab`.
8. **Whitespace visibility** — click the Jane Carter variant `··Jane··Carter··` (the one with leading/trailing/internal extra spaces). Input shows the variant with `·` characters where the spaces are. Steps 3 and 4 visibly remove them. Final key: `jane carter`.
9. **Custom input** — clear the input and type `  Dr. Jane Carter, M.A., M.P.A.  `. Pipeline runs live as you type. Final key: `dr. jane carter`. The "All N variants" line still references the *currently-selected tab* — that's expected; the assertion is about the tabbed sample, not the user's free input.
10. **Empty input** — clear all text. Pipeline shows empty intermediate strings. Canonical key is empty. No JS errors in the console.
11. **Keyboard navigation** — Tab through tabs, chips, input, summaries. All focusable. `Enter`/`Space` activate buttons.

If anything fails, fix the component and re-run.

- [ ] **Step 6: Commit**

```bash
git add app/components/AuthorNormalizationSandbox.vue app/pages/index.vue
git commit -m "feat(home): live author-normalization sandbox using authorKey()"
```

---

## Self-Review

**Spec coverage:**
- Spec § Architecture / Placement → Tasks 2 & 3 (insertion lines explicit). ✓
- Spec § Components extracted → Tasks 2 & 3. ✓
- Spec § Refactor `authorKey()` / `authorKeySteps()` → Task 1 (full code shown). ✓
- Spec § HighlightSandbox layout, behavior, sample content, accessibility → Task 2 Step 1 (full file). ✓
- Spec § AuthorNormalizationSandbox Part 1, Part 2, sample authors, behavior, accessibility → Task 3 Step 1 (full file). ✓
- Spec § "All N → key" assertion → present in `collapseAssertion` computed in Task 3. ✓
- Spec § Manual smoke test → Task 2 Step 5 and Task 3 Step 5 (with explicit verification list). ✓
- Spec § No new dependencies → confirmed; only Vue 3 `ref`/`computed`/`watch` and existing Nuxt UI `UIcon`. ✓

**Placeholder scan:** No "TBD"/"TODO"/"implement later"/"add error handling"/"similar to Task N" in this plan. Every code step shows complete code. Every test step is a manual checklist with concrete things to look for.

**Type consistency:**
- `AuthorKeyStep` interface: `value: string`, `label: string`. Used identically in Tasks 1 and 3. ✓
- `authorKeySteps()` return shape: `{ steps: AuthorKeyStep[], key: string }`. Same shape consumed in Task 3. ✓
- `highlightSegments()` signature unchanged from existing implementation. Task 2 consumes `{ text, match }` segments — matches the interface in `article-format.ts:52-55`. ✓
- `SAMPLE_AUTHORS` typed via `SampleAuthor` interface declared in the same file. ✓
