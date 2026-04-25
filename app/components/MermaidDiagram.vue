<script setup lang="ts">
const props = defineProps<{ source: string }>()

const colorMode = useColorMode()
const containerRef = ref<HTMLElement | null>(null)
const error = ref<string | null>(null)

async function render() {
  if (!containerRef.value) return
  try {
    const mermaid = (await import('mermaid')).default
    const isDark = colorMode.value === 'dark'
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        lineColor: isDark ? '#e2e8f0' : '#334155',
        textColor: isDark ? '#e2e8f0' : '#0f172a',
        clusterBkg: 'transparent',
        clusterBorder: isDark ? '#94a3b8' : '#475569',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        fontSize: '14px'
      },
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
watch([() => props.source, () => colorMode.value], render)
</script>

<template>
  <div>
    <div
      v-if="error"
      class="rounded-lg border border-error bg-elevated p-4 text-sm text-error"
    >
      Failed to render diagram: {{ error }}
    </div>
    <div
      ref="containerRef"
      class="overflow-auto rounded-lg border border-default bg-default p-4 [&_.cluster_rect]:!stroke-2 [&_.edgePath_path]:!stroke-2 [&_.flowchart-link]:!stroke-2 [&_.marker]:!fill-current"
    />
  </div>
</template>
