<script setup lang="ts">
useHead({ title: 'Database Taxonomy — Research Hub Demo' })

const structureDiagram = `flowchart TB
  classDef hub fill:#1e293b,stroke:#334155,color:#fff,stroke-width:2px
  classDef content fill:#dcfce7,stroke:#16a34a,color:#14532d,stroke-width:2px
  classDef typeEnum fill:#bbf7d0,stroke:#16a34a,color:#14532d,stroke-width:2px
  classDef freeform fill:#f1f5f9,stroke:#94a3b8,color:#1e293b

  Hub[("Research Hub data")]:::hub
  Articles["Articles<br/>~236 items"]:::content
  Datasets["Datasets"]:::content
  Apps["Apps"]:::content

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
  { value: 'researchReport', label: 'Research Report', highlight: true },
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
        How the Strapi 5 CMS organizes the data behind this site — explained for non-developers.
      </p>
    </div>

    <section class="mb-8 space-y-4 text-sm text-toned">
      <p>
        Every item in the research hub falls into one of three buckets: <strong class="text-highlighted">Articles</strong>, <strong class="text-highlighted">Datasets</strong>, or <strong class="text-highlighted">Apps</strong>. Most of what people search for — research reports, annual reports, newsletters, strategic plans — lives inside <strong class="text-highlighted">Articles</strong>, as one of fourteen possible <em>type</em> values.
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
          Apps
        </h3>
        <p class="text-sm text-toned">
          Same shape as Datasets — <strong>categories</strong> and <strong>tags</strong> only, no "type" enum. Also out of scope for this demo.
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

      <ul class="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
        <li
          v-for="t in articleTypes"
          :key="t.value"
          class="flex items-start gap-2 rounded border border-default bg-default px-3 py-2"
          :class="t.highlight ? 'border-primary/50 bg-primary/10' : ''"
        >
          <UIcon
            :name="t.highlight ? 'i-lucide-star' : 'i-lucide-tag'"
            class="mt-0.5 size-4 shrink-0"
            :class="t.highlight ? 'text-primary' : 'text-muted'"
          />
          <div>
            <div :class="t.highlight ? 'font-semibold text-highlighted' : 'text-toned'">
              {{ t.label }}
            </div>
            <div class="text-xs text-muted">
              <code>{{ t.value }}</code>
            </div>
            <div v-if="t.note" class="mt-1 text-xs text-muted">
              {{ t.note }}
            </div>
          </div>
        </li>
      </ul>
    </section>

    <section class="rounded-lg border border-default bg-elevated p-5 text-sm text-toned">
      <p class="mb-2 font-semibold text-highlighted">
        Why this matters for the demo
      </p>
      <p>
        The "Publication Type Filter Demo" is doing one specific thing: it's filtering the <strong>Articles</strong> list by the <strong>type</strong> field. Datasets and Apps aren't part of the demo — they're separate content types with no "type" of their own. Once Research Reports (and the other types) are tagged consistently in the CMS, the chip on the Home page becomes a one-click answer to "show me everything our researchers have published as a formal report."
      </p>
    </section>
  </UContainer>
</template>
