<script setup lang="ts">
useHead({ title: 'What This Demo Shows — Research Hub Demo' })

const changes = [
  {
    title: 'Find research reports in one click',
    body: 'Click "Research Reports" at the top of the home page and the list narrows to just research reports. Same one-click filter for Annual Reports, Program Evaluation Summaries, Updates, and Strategic Plans. No scrolling, no menus.'
  },
  {
    title: 'Search highlights what it matched',
    body: 'Type a word in the search box (try "opioid") and articles mentioning it appear, with the word highlighted in their title and summary. Easy to see at a glance why each article was included.'
  },
  {
    title: 'Click an author\'s name to see their other work',
    body: 'Every author name in a card is clickable. One click filters the list to every article that person worked on.'
  },
  {
    title: 'One entry per author, even when their name varies',
    body: 'Articles sometimes credit the same person three or four different ways — "Riley Calder", "Riley Calder, Ph.D", "Riley Calder, PhD". The current site shows three different entries. This demo shows one, and clicking it matches every variant.'
  },
  {
    title: 'Click any tag — and stack them',
    body: 'Tags on cards are clickable. Click one and the list filters; click another and the results widen to articles with either tag. Each active tag shows as a removable pill near the result count.'
  },
  {
    title: 'Filter by ICJIA Center',
    body: 'On the Home page and View 2, narrow articles to a specific ICJIA division — Center for Justice Research and Evaluation, Center for Victim Studies, and the rest. All five divisions are always listed.'
  },
  {
    title: 'Three layouts to compare',
    body: 'Same articles, three filter UX flavors so the team can pick a winner. View 0 (home): chips with an "Advanced filters" toggle that reveals the full bar. View 1: pure dropdown menus (closest to the live site today). View 2: chips and the full bar always visible side by side.'
  }
]
</script>

<template>
  <UContainer class="py-8">
    <div class="mb-6 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight text-highlighted">
        What this demo shows
      </h1>
      <p class="text-sm text-muted">
        How this proof-of-concept differs from the current research hub. The goal: anyone — staff, partners, the public — can find the article they're looking for in one or two clicks. <strong>There is no quiz.</strong>
      </p>
    </div>

    <ul class="space-y-5">
      <li
        v-for="c in changes"
        :key="c.title"
        class="flex gap-3 rounded-lg border border-default bg-default p-4"
      >
        <UIcon
          name="i-lucide-check-circle-2"
          class="mt-0.5 size-5 shrink-0 text-primary"
        />
        <div>
          <p class="font-semibold text-highlighted">
            {{ c.title }}
          </p>
          <p class="mt-1 text-sm text-toned">
            {{ c.body }}
          </p>
        </div>
      </li>
    </ul>

    <p class="mt-8 rounded-lg border border-dashed border-default p-4 text-xs text-muted">
      More highlights will be added here as the POC evolves. Direct link to share with colleagues:
      <code class="text-toned">https://v2-hub-demo.netlify.app/about</code>
    </p>
  </UContainer>
</template>
