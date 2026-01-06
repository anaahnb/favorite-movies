<template>
  <div :class="$style.card">
    <img
      :class="$style.image"
      :src="src"
      :alt="alt" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()
</script>

<style module lang="scss">
.image {
  width: 4.75rem;
  height: 6.9375rem;
  object-fit: cover;

  &:hover {
    border: 2px #00ac1c solid;
  }
}
</style>
