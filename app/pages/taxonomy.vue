<script setup lang="ts">
useHead({ title: 'How this data is organized — Research Hub Demo' })

const { data: rawArticles } = await useArticles({ fillRandom: false })

const selectedTypeForModal = ref<string | null>(null)
const isExamplesOpen = ref(false)

function showExamples(typeValue: string) {
  selectedTypeForModal.value = typeValue
  isExamplesOpen.value = true
}

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
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-6 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight text-highlighted">
        How this data is organized
      </h1>
      <p class="text-base italic text-toned">
        Everything you ever wanted to know about the Research Hub, databases, and taxonomies but were afraid to ask.
      </p>
    </div>

    <section class="mb-6 rounded-lg border border-default bg-elevated p-5">
      <p class="mb-2 text-base font-semibold text-highlighted">
        Why we said "taxonomy" (and why we're not sorry)
      </p>
      <div class="space-y-3 text-sm text-toned">
        <p>
          "Taxonomy" is one of those words that sounds intimidating in the same way that <em>thermodynamics</em> or <em>quarterly review</em> sound intimidating: not because the underlying idea is particularly difficult, but because it suggests there might be a quiz at the end.
        </p>
        <p>
          <strong class="text-highlighted">There is no quiz.</strong>
        </p>
        <p>
          In plain English, a taxonomy is the system someone decided on for sorting things into labeled boxes. <strong>Biologists</strong> use one to sort animals — Kingdom, Phylum, Class, Order, Family, Genus, Species, ending eventually with the platypus, which the system never really knew what to do with. <strong>Librarians</strong> use one to sort books: building → section → subject → individual title. <strong>Hardware stores</strong> use one to sort screws, plus several adjacent categories of small metal things that are technically not screws but ended up here anyway. The <strong>Research Hub</strong> uses one to sort everything it publishes — research reports, annual reports, evaluations, datasets, dashboards, and so on — into a small number of named buckets, where every item in a bucket shares the same predictable labeled fields.
        </p>
        <p>
          We could have called this page <em>"How the data is organized,"</em> which is in fact what it is, and what it now says at the top. But "taxonomy" is the word people in this field actually use. Hearing it from us now means you'll recognize it later, when someone in a CMS configuration screen starts shouting it at you. So: taxonomy. <strong class="text-highlighted">Don't panic.</strong>
        </p>
        <p>
          The rest of this page walks through, in order: a quick reminder that databases <em>are</em> taxonomies and you've used a few before; why the original team committed to this shape and why Hub 2.0 has kept it; the three top-level buckets the hub holds; a note on the word "articles"; what's inside each bucket; the fourteen article types as clickable cards; and a proposed future linking of Datasets to Apps/Dashboards. Still no quiz.
        </p>
      </div>

      <p class="mt-5 mb-2 text-base font-semibold text-highlighted">
        Wait — a database is a <em>taxonomy</em>?
      </p>
      <div class="space-y-3 text-sm text-toned">
        <p>
          If "database" makes you think of spreadsheets and rows, this might feel off. But every well-designed database <strong>is</strong> a taxonomy. It sorts records into typed buckets — called <em>tables</em>, <em>collections</em>, or <em>content types</em> depending on the software — and within each bucket every record carries the same labeled fields. Buckets, fields, and the relationships between them: <em>that structure is the taxonomy</em>.
        </p>
        <p>
          And it isn't unique to the research hub. Any time you've used:
        </p>
        <ul class="ml-5 list-disc space-y-1">
          <li>a <strong>library catalog</strong> (Books → ISBN, title, author, subject, year);</li>
          <li>a <strong>banking app</strong> (Accounts → Transactions → date, amount, payee);</li>
          <li>an <strong>e-commerce site</strong> (Categories → Products → price, stock, description);</li>
          <li>a <strong>calendar</strong> (Calendars → Events → start time, end time, attendees);</li>
        </ul>
        <p>
          …you've used a taxonomy. Someone designing those apps decided up front, "items here fall into these buckets, and each bucket has these specific properties." That single decision is what makes the app's filters, search results, and reports possible later.
        </p>
        <p>
          There's a software-design principle behind this: <strong class="text-highlighted">the database's shape should mirror what the app needs to show</strong>. If the home page has a "Filter by publication type" chip, every Article carries a <code>type</code> field. If a dataset's detail page should list "apps that use this dataset", the database holds a relationship between Datasets and Apps. The data shape determines the UX shape. Get the taxonomy right at the start and the app's features more or less write themselves; get it wrong and editorial work fights the data forever.
        </p>
      </div>

      <p class="mt-5 mb-2 text-base font-semibold text-highlighted">
        Why is the database structured this way — and why has Hub 2.0 kept it?
      </p>
      <div class="space-y-3 text-sm text-toned">
        <p>
          If you've used the research hub for any length of time, you've probably noticed that <em>it works</em>. You can find an annual report from 2018. New articles look like the old ones. Search returns sensible results. None of that happens by accident — it happens because the original team, back when <strong>Hub 1.0</strong> was being built, committed to a single architectural choice: every published item gets filed into one of a small number of named buckets, and every record in a bucket carries the same labeled fields. Research reports go in one place, with the same metadata as every other research report. Datasets go in another, with their own consistent shape. Dashboards, the same.
        </p>
        <p>
          That's the taxonomy. It's not flashy — it doesn't show up in a screenshot — but it's the reason the hub doesn't degrade as it grows. A few practical wins that flow directly from that early call:
        </p>
        <ul class="ml-5 list-disc space-y-1">
          <li>
            <strong>Search and filters can do anything useful.</strong> You can type a word in the search box because every article has a <code>title</code> and an <code>abstract</code>. You can click "Research Reports" because every article has a <code>type</code>. None of that works if the hub is a dumping ground of mixed Word docs and PDFs.
          </li>
          <li>
            <strong>The site looks consistent year over year.</strong> Every article card looks like every other article card because every Article record has the same fields. Without that shape, every page would render slightly differently and the hub would feel like a flea market.
          </li>
          <li>
            <strong>Editors can move fast and safely.</strong> A new staff writer doesn't have to invent a structure — the CMS shows them the same form every other writer has filled out. The taxonomy is also editorial guardrails.
          </li>
          <li>
            <strong>The catalog can grow to thousands of items without slowing readers down.</strong> Filters and search work because the database knows the shape ahead of time, not because it's reading every document on every query.
          </li>
        </ul>
        <p>
          When the original team committed to that shape at the start of Hub 1.0, they were investing in everything that came after — every clean filter, every consistent layout, every fast page. None of those features could have been retrofitted later without painful manual cleanup.
        </p>
        <p>
          That's exactly why <strong class="text-highlighted">Hub 2.0 keeps the same architecture</strong> rather than reinventing it. The bones of the original taxonomy still match what readers and editors need. Hub 2.0 swaps in a more modern CMS (<strong>Strapi 5</strong>), adds richer relationships like the proposed datahub linking datasets to dashboards, and expands the <code>type</code> list so editors can label more kinds of articles. But the three-bucket structure, the labeled fields, the consistent record shape — all of that is intact. <strong>Hub 2.0 is an upgrade, not a teardown, because the original choice was the right one.</strong>
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
        Why "articles" — and not "summaries"?
      </p>
      <div class="space-y-3 text-sm text-toned">
        <p>
          During <strong>Hub 1.0</strong> planning, <em>summaries</em> was a candidate label. It was rejected after several weeks of deliberation because articles can also stand on their own — published pieces with no attached source PDF, just an article in the everyday sense. "Summaries" didn't fit that case.
        </p>
        <p>
          The team landed on <strong>articles</strong> because it was both more general (a publishing platform carries many kinds of digital pieces, including standalone articles) and more specific (an "article" is a familiar concept on a publishing platform). The core scope was anticipated by that choice: an article can be a summary of a research report, an annual report, a program evaluation, a strategic plan, or one of fourteen <code>type</code> values total — and it can also be a piece with no source attachment at all.
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
        These are the only valid values for an article's <em>type</em> field. Editors can't add new ones in the CMS without a code change. The View 0 chips surface five of these (the most-asked-for); the dropdown on View 1 surfaces all of them.
      </p>

      <p class="mb-3 text-xs text-muted">
        <UIcon
          name="i-lucide-mouse-pointer-click"
          class="mr-1 inline size-4"
        />
        Click any type to see real examples from the live database.
      </p>

      <HubArticleTypeGrid
        :articles="rawArticles"
        variant="list"
        @select="showExamples"
      />
    </section>

    <section class="mb-10">
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <h2 class="text-xl font-semibold text-highlighted">
          Proposed: the "datahub" — Datasets linked to Apps/Dashboards
        </h2>
        <UBadge
          label="Future"
          color="warning"
          variant="soft"
          size="md"
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

    <ArticleTypeExamplesModal
      v-model:open="isExamplesOpen"
      :type-value="selectedTypeForModal"
      :articles="rawArticles"
    />
  </UContainer>
</template>
