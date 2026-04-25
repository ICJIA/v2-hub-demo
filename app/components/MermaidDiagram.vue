<script setup lang="ts">
const props = defineProps<{ source: string }>()

const containerRef = ref<HTMLElement | null>(null)
const error = ref<string | null>(null)

async function render() {
  if (!containerRef.value) return
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: { htmlLabels: true, useMaxWidth: true }
    })
    const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`
    const { svg } = await mermaid.render(id, props.source)
    containerRef.value.innerHTML = svg
    error.value = null
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  }
}

onMounted(render)
watch(() => props.source, render)
</script>

<template>
  <div>
    <div v-if="error" class="rounded-lg border border-error bg-elevated p-4 text-sm text-error">
      Failed to render diagram: {{ error }}
    </div>
    <div ref="containerRef" class="overflow-auto rounded-lg border border-default bg-default p-4" />
  </div>
</template>
