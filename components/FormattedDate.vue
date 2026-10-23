<script setup lang="ts">
const props = defineProps<{
  date: string | Date
}>()

const formatted = computed(() => {
  const value = props.date instanceof Date ? props.date : new Date(props.date)
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(value)
})
</script>

<template>
  <time :datetime="String(date)">{{ formatted }}</time>
</template>
