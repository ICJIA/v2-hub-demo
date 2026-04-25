<script setup lang="ts">
import type { Article } from '~/composables/useArticles'
import { formatDate, imageUrl, typeLabel } from '~/utils/article-format'

useHead({ title: 'Database Taxonomy — Research Hub Demo' })

const { data: rawArticles } = await useArticles({ fillRandom: false })

const examplesByType = computed(() => {
  const map = new Map<string, Article[]>()
  for (const a of rawArticles.value ?? []) {
    if (!a.type) continue
    const list = map.get(a.type) ?? []
    list.push(a)
    map.set(a.type, list)
  }
  for (const list of map.values()) {
    list.sort((a, b) => {
      const ka = a.date ?? a.publishedAt ?? ''
      const kb = b.date ?? b.publishedAt ?? ''
      return kb.localeCompare(ka)
    })
  }
  return map
})

const selectedTypeForModal = ref<string | null>(null)
const isExamplesOpen = ref(false)

function showExamples(typeValue: string) {
  selectedTypeForModal.value = typeValue
  isExamplesOpen.value = true
}

const modalTitle = computed(() => {
  if (!selectedTypeForModal.value) return ''
  return `Examples — ${typeLabel(selectedTypeForModal.value)}`
})

const modalExamples = computed(() => {
  if (!selectedTypeForModal.value) return []
  return (examplesByType.value.get(selectedTypeForModal.value) ?? []).slice(0, 2)
})

const modalTotalCount = computed(() => {
  if (!selectedTypeForModal.value) return 0
  return examplesByType.value.get(selectedTypeForModal.value)?.length ?? 0
})

const datahubDiagram = `flowchart TB
  classDef app fill:#fef3c7,stroke:#d97706,color:#78350f,stroke-width:2px
  classDef dataset fill:#dbeafe,stroke:#2563eb,color:#1e3a8a,stroke-width:2px

  subgraph p1 [1 — Solo dataset]
    direction LR
    Dsolo["📊 Dataset<br/>(no app)"]:::dataset
  end

  subgraph p2 [2 — One app, one dataset]
    direction LR
    A1["📱 App / Dashboard"]:::app --> D1["📊 Dataset"]:::dataset
  end

  subgraph p3 [3 — One app, many datasets]
    direction LR
    A2["📱 App / Dashboard"]:::app
    A2 --> D2a["📊 Dataset A"]:::dataset
    A2 --> D2b["📊 Dataset B"]:::dataset
    A2 --> D2c["📊 Dataset C"]:::dataset
  end

  subgraph p4 [4 — Shared dataset across apps]
    direction LR
    A3a["📱 App / Dashboard 1"]:::app --> Dshared["📊 Dataset"]:::dataset
    A3b["📱 App / Dashboard 2"]:::app --> Dshared
  end`

const structureDiagram = `flowchart TB
  classDef hub fill:#1e293b,stroke:#334155,color:#fff,stroke-width:2px
  classDef content fill:#dcfce7,stroke:#16a34a,color:#14532d,stroke-width:2px
  classDef typeEnum fill:#bbf7d0,stroke:#16a34a,color:#14532d,stroke-width:2px
  classDef freeform fill:#f1f5f9,stroke:#94a3b8,color:#1e293b

  Hub[("Research Hub data")]:::hub
  Articles["Articles<br/>~236 items"]:::content
  Datasets["Datasets"]:::content
  Apps["Apps / Dashboards"]:::content

  Hub --> Articles
  Hub --> Datasets
  Hub --> Apps

  Articles --> AType["<b>type</b><br/>14 fixed values<br/>(Research Report,<br/>Annual Report, etc.)"]:::typeEnum
  Articles --> ACat["categories<br/>free-form labels"]:::freeform
  Articles --> ATag["tags<br/>free-form keywords"]:::freeform

  Datasets --> DCat["categories<br/>free-form labels"]:::freeform
  Datasets --> DTag["tags<br/>free-form keywords"]:::freeform

  Apps --> APCat["categories<br/>free-form labels"]:::freeform
  Apps --> APTag["tags<br/>free-form keywords"]:::freeform`

const articleTypes = [
  { value: 'researchReport', label: 'Research Report' },
  { value: 'annualReport', label: 'Annual Report' },
  { value: 'article', label: 'Article' },
  { value: 'dataset', label: 'Dataset (article subtype)', note: 'Yes, confusingly there is a "Dataset" type inside Articles AND a separate Datasets content type. They are different.' },
  { value: 'evaluation', label: 'Evaluation' },
  { value: 'general', label: 'General' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'process_evaluation', label: 'Process Evaluation' },
  { value: 'programEvaluationSummary', label: 'Program Evaluation Summary' },
  { value: 'researchAtAGlance', label: 'Research At A Glance' },
  { value: 'researchBulletin', label: 'Research Bulletin' },
  { value: 'strategicPlan', label: 'Strategic Plan' },
  { value: 'toolkit', label: 'Toolkit' },
  { value: 'update', label: 'Update' }
]
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-6 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight text-highlighted">
        Database Taxonomy
      </h1>
      <p class="text-sm text-muted">
        How the data behind this site is organized — explained for non-developers.
      </p>
    </div>

    <section class="mb-6 rounded-lg border border-default bg-elevated p-5">
      <p class="mb-2 text-base font-semibold text-highlighted">
        First — what's a "taxonomy"?
      </p>
      <div class="space-y-3 text-sm text-toned">
        <p>
          It's a fancy word for <strong class="text-highlighted">how things are organized into groups, from broad to specific</strong>. Think of:
        </p>
        <ul class="ml-5 list-disc space-y-1">
          <li>A <strong>library</strong>: building → section (Fiction, Reference) → subject → individual book.</li>
          <li>An <strong>org chart</strong>: agency → division → team → person.</li>
          <li>A <strong>filing cabinet</strong>: cabinet → drawer → folder → document.</li>
        </ul>
        <p>
          That's all this page is doing — walking through how the research hub's content is filed away. The big buckets sit at the top, narrower groupings inside each, and the actual pieces (research reports, datasets, dashboards) at the bottom.
        </p>
      </div>

      <p class="mt-5 mb-2 text-base font-semibold text-highlighted">
        Why is the database structured like a taxonomy?
      </p>
      <div class="space-y-3 text-sm text-toned">
        <p>
          Two practical reasons:
        </p>
        <ul class="ml-5 list-disc space-y-1">
          <li>
            <strong>Findability.</strong> When every item is filed in the right bucket (and only the right bucket), pulling up exactly what someone wants is fast. The chip filter on the Home page works because every Article is filed under one of fourteen <code>type</code> values — click "Research Reports" and you skip past everything that isn't one.
          </li>
          <li>
            <strong>Consistency over time.</strong> The hub grows. New articles, datasets, and dashboards arrive every quarter. A taxonomy gives editors a fixed set of buckets and a fixed set of fields per bucket — same shape, same rules — instead of inventing a new place each time. "Annual Report 2030" lands the same way "Annual Report 2024" did.
          </li>
        </ul>
        <p>
          That's what <strong class="text-highlighted">Strapi 5</strong> (the CMS behind Hub 2.0) does. It forces every Article to carry the same fields (<code>title</code>, <code>date</code>, <code>type</code>, <code>categories</code>, …); every Dataset has its own fixed schema; every App/Dashboard has another. The site can then turn that fixed shape into something useful — chips, filters, search, the proposed datahub — because the shape is the same for every record. Take the structure away and the hub becomes a pile of documents again. <strong>The taxonomy is what turns the pile into a research catalog.</strong>
        </p>
        <p>
          And this wasn't an afterthought — it was the plan from day one of <strong>Hub 1.0</strong>. The original team chose a structured catalog over a free-form document dump, and the bones (three big buckets, the idea of an Article summarizing a research report, fixed fields per content type) have held up ever since. What's changed in Hub 2.0 is the toolchain underneath (Strapi 5, richer relationships like the proposed datahub, more <code>type</code> values now that Articles also summarize annual reports, evaluations, and updates) and the editorial polish on top. The structure itself didn't need a rewrite — it just needed updating. That's why moving to Hub 2.0 is an upgrade, not a teardown.
        </p>
      </div>
    </section>

    <section class="mb-8 space-y-4 text-sm text-toned">
      <p>
        Every item in the research hub falls into one of three buckets: <strong class="text-highlighted">Articles</strong>, <strong class="text-highlighted">Datasets</strong>, or <strong class="text-highlighted">Apps/Dashboards</strong>. Most of what people search for — research reports, annual reports, newsletters, strategic plans — lives inside <strong class="text-highlighted">Articles</strong>, as one of fourteen possible <em>type</em> values.
      </p>
      <p>
        That's why this demo can give you a one-click "Research Reports" chip: <strong class="text-highlighted">Research Report</strong> is one of those fourteen values. The chips on the Home page just say "show me the Articles whose type equals X."
      </p>
    </section>

    <section class="mb-10">
      <h2 class="mb-3 text-xl font-semibold text-highlighted">
        How the data is structured
      </h2>
      <ClientOnly>
        <MermaidDiagram :source="structureDiagram" />
        <template #fallback>
          <div class="rounded-lg border border-default bg-elevated p-8 text-center text-sm text-muted">
            Loading diagram…
          </div>
        </template>
      </ClientOnly>
    </section>

    <section class="mb-10 rounded-lg border border-default bg-elevated p-5">
      <p class="mb-2 text-base font-semibold text-highlighted">
        A note on the word "Article"
      </p>
      <div class="space-y-3 text-sm text-toned">
        <p>
          In <strong>Hub 1.0</strong>, an <em>article</em> was specifically a summary of a <strong>research report</strong> — the public-facing write-up that pointed back at the underlying research document. That was the original meaning when the term was chosen.
        </p>
        <p>
          Over the years the scope quietly widened. Articles started covering <strong>annual reports</strong>, <strong>program evaluation summaries</strong>, <strong>updates</strong>, and so on. The core idea is still the same — an article is a summary of something — but today that "something" can be any one of the fourteen <code>type</code> values, not just <code>researchReport</code>.
        </p>
        <p>
          That history is exactly why the chips in this demo matter. Without a way to filter by <code>type</code>, an article that summarizes a formal research report and an article that summarizes a quarterly newsletter look identical in the list. With the chips, "show me only the formal research reports" is one click.
        </p>
      </div>
    </section>

    <section class="mb-10 space-y-6">
      <h2 class="text-xl font-semibold text-highlighted">
        What each bucket means
      </h2>

      <div class="space-y-2">
        <h3 class="text-base font-semibold text-highlighted">
          Articles <span class="text-sm font-normal text-muted">(~236 items)</span>
        </h3>
        <ul class="ml-5 list-disc space-y-1 text-sm text-toned">
          <li><strong>type</strong> — one of fourteen fixed values. <em>This is what the chips on the Home page filter by.</em></li>
          <li><strong>categories</strong> — free-form topical labels editors can type in (e.g. "youth", "deflection", "violence prevention").</li>
          <li><strong>tags</strong> — more free-form keywords for search and surfacing.</li>
        </ul>
      </div>

      <div class="space-y-2">
        <h3 class="text-base font-semibold text-highlighted">
          Datasets
        </h3>
        <p class="text-sm text-toned">
          Datasets do <strong>not</strong> have a "type" enum. They only carry <strong>categories</strong> and <strong>tags</strong>. This demo doesn't touch Datasets — it focuses on Articles.
        </p>
      </div>

      <div class="space-y-2">
        <h3 class="text-base font-semibold text-highlighted">
          Apps / Dashboards
        </h3>
        <p class="text-sm text-toned">
          Same shape as Datasets — <strong>categories</strong> and <strong>tags</strong> only, no "type" enum. The CMS calls these "Apps"; in plain language they're the dashboards and visualizations on the site. Also out of scope for this demo.
        </p>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="mb-3 text-xl font-semibold text-highlighted">
        The fourteen Article types
      </h2>
      <p class="mb-4 text-sm text-toned">
        These are the only valid values for an article's <em>type</em> field. Editors can't add new ones in the CMS without a code change. The Home page chips surface five of these (the most-asked-for); the dropdown on Alt 1 surfaces all of them.
      </p>

      <p class="mb-3 text-xs text-muted">
        <UIcon name="i-lucide-mouse-pointer-click" class="mr-1 inline size-4" />
        Click any type to see real examples from the live database.
      </p>

      <div class="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
        <button
          v-for="t in articleTypes"
          :key="t.value"
          type="button"
          class="flex w-full items-start gap-2 rounded border border-default bg-default px-3 py-2 text-left transition-all hover:border-primary/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          @click="showExamples(t.value)"
        >
          <UIcon
            name="i-lucide-tag"
            class="mt-0.5 size-4 shrink-0 text-muted"
          />
          <div class="flex-1">
            <div class="text-toned">
              {{ t.label }}
              <span class="ml-1 text-xs font-normal text-muted">({{ examplesByType.get(t.value)?.length ?? 0 }})</span>
            </div>
            <div class="text-xs text-muted">
              <code>{{ t.value }}</code>
            </div>
            <div v-if="t.note" class="mt-1 text-xs text-muted">
              {{ t.note }}
            </div>
          </div>
          <UIcon name="i-lucide-chevron-right" class="mt-1 size-4 shrink-0 text-muted" />
        </button>
      </div>
    </section>

    <section class="mb-10">
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <h2 class="text-xl font-semibold text-highlighted">
          Proposed: the "datahub" — Datasets linked to Apps/Dashboards
        </h2>
        <UBadge
          label="Future"
          color="warning"
          variant="subtle"
          size="xs"
        />
      </div>

      <div class="mb-4 space-y-3 text-sm text-toned">
        <p>
          Right now Datasets and Apps/Dashboards live as separate islands. The team wants them connected: a <strong>Dataset</strong> can stand alone, or it can power an <strong>App/Dashboard</strong>; an <strong>App/Dashboard</strong> can pull from one Dataset or several; and the same Dataset can show up in more than one App/Dashboard. Managers are calling this the <strong class="text-highlighted">datahub</strong>.
        </p>
        <p>
          <strong class="text-highlighted">All four of the patterns below are already supported by the Strapi 5 schema today.</strong> Introspection confirms the relation fields are in place — <code>App.datasets</code> and <code>Dataset.apps</code> are bidirectional and accept any number on either side. So the work for Hub 2.0 isn't building anything new at the data layer. It's editorial: <strong>curating</strong> which datasets belong to which apps, <strong>editing</strong> the metadata so the relationships make sense, <strong>adjusting</strong> as the catalog grows, and <strong>oversight</strong> to make sure everything is wired correctly.
        </p>
      </div>

      <ClientOnly>
        <MermaidDiagram :source="datahubDiagram" />
        <template #fallback>
          <div class="rounded-lg border border-default bg-elevated p-8 text-center text-sm text-muted">
            Loading diagram…
          </div>
        </template>
      </ClientOnly>

      <div class="mt-4 space-y-3 text-sm text-toned">
        <p>What the four patterns mean in practice:</p>
        <ul class="ml-5 list-disc space-y-1">
          <li><strong>Solo dataset</strong> — a dataset that stands on its own (raw data, no dashboard yet).</li>
          <li><strong>One app/dashboard, one dataset</strong> — a dashboard built around a single dataset.</li>
          <li><strong>One app/dashboard, many datasets</strong> — a dashboard that pulls in several datasets (e.g. a crime mapper layering 2024 stats, 2023 stats, and geocoded incidents).</li>
          <li><strong>Shared dataset across apps/dashboards</strong> — the same dataset feeding more than one dashboard.</li>
        </ul>
        <p>Once the linking is curated, the hub can:</p>
        <ul class="ml-5 list-disc space-y-1">
          <li>Show <em>"Datasets used by this app/dashboard"</em> on each App/Dashboard page.</li>
          <li>Show <em>"Apps/Dashboards that use this dataset"</em> on each Dataset page.</li>
          <li>Let visitors jump from a research article straight to the dataset it cites and the app/dashboard that visualizes it.</li>
        </ul>
      </div>
    </section>

    <section class="rounded-lg border border-default bg-elevated p-5 text-sm text-toned">
      <p class="mb-2 font-semibold text-highlighted">
        Why this matters for the demo
      </p>
      <p>
        The "Publication Type Filter Demo" is doing one specific thing: it's filtering the <strong>Articles</strong> list by the <strong>type</strong> field. Datasets and Apps/Dashboards aren't part of the filter demo — they're separate content types with no "type" of their own. Once Research Reports (and the other types) are tagged consistently in the CMS, the chip on the Home page becomes a one-click answer to "show me everything our researchers have published as a formal report." The datahub above is the next obvious step: connect those reports to the underlying data and dashboards.
      </p>
    </section>

    <UModal
      v-model:open="isExamplesOpen"
      :title="modalTitle"
    >
      <template #body>
        <div class="space-y-4">
          <p class="rounded-lg border border-amber-300/40 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-200">
            <UIcon name="i-lucide-info" class="mr-1 inline size-4" />
            <strong>For this proof-of-concept, these examples still need curation.</strong> They're pulled directly from articles that already carry this <code>type</code> tag in the CMS. Many articles aren't tagged yet — once editorial curation is complete, every type will have richer, more representative examples.
          </p>

          <div
            v-if="!modalExamples.length"
            class="rounded-lg border border-dashed border-default p-6 text-center text-sm text-muted"
          >
            No tagged examples for this type in the live data yet.
          </div>

          <div v-else class="space-y-3">
            <p class="text-xs text-muted">
              Top {{ modalExamples.length }} most-recent of {{ modalTotalCount }} tagged article(s):
            </p>
            <NuxtLink
              v-for="ex in modalExamples"
              :key="ex.documentId"
              :to="`/articles/${ex.slug}`"
              class="block rounded-lg border border-default bg-elevated p-4 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              @click="isExamplesOpen = false"
            >
              <div class="flex gap-4">
                <div class="aspect-[16/9] w-32 shrink-0 overflow-hidden rounded bg-default">
                  <img
                    v-if="ex.splash?.url"
                    :src="imageUrl(ex.splash.url)"
                    :alt="ex.splash.alternativeText ?? ex.title"
                    class="h-full w-full object-cover"
                  >
                </div>
                <div class="min-w-0 flex-1 space-y-1">
                  <h4 class="line-clamp-2 font-semibold text-highlighted">
                    {{ ex.title }}
                  </h4>
                  <p class="text-xs text-muted">
                    {{ formatDate(ex.date ?? ex.publishedAt) }}
                  </p>
                  <p
                    v-if="ex.abstract"
                    class="line-clamp-2 text-sm text-toned"
                  >
                    {{ ex.abstract }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </template>
    </UModal>
  </UContainer>
</template>
