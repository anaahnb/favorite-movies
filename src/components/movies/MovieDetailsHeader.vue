<template>
  <div :class="$style.header">
    <h1>{{ title }}</h1>
    <p>({{ year }})</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  year: string
}>()
</script>

<style lang="scss" module>
.header {
  display: flex;
  gap: .5rem;
  align-items: center;

  h1 {
    margin: 0;
  }

  p {
    margin: .5rem 0 0 0;
  }
}
</style>
