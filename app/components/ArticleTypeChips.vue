<script setup lang="ts">
export interface TypeOption {
  value: string
  label: string
  count: number
}

const props = defineProps<{
  available: TypeOption[]
  totalCount: number
  modelValue: string | null
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

function isActive(value: string | null) {
  return props.modelValue === value
}

function select(value: string | null) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <UButton
      :label="`All (${totalCount})`"
      :color="isActive(null) ? 'primary' : 'neutral'"
      :variant="isActive(null) ? 'solid' : 'subtle'"
      size="sm"
      class="rounded-full"
      @click="select(null)"
    />
    <UButton
      v-for="opt in available"
      :key="opt.value"
      :label="`${opt.label} (${opt.count})`"
      :color="isActive(opt.value) ? 'primary' : 'neutral'"
      :variant="isActive(opt.value) ? 'solid' : 'subtle'"
      size="sm"
      class="rounded-full"
      @click="select(opt.value)"
    />
  </div>
</template>
