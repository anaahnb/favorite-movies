<template>
  <img :src="src" :alt="alt" :class="$style.poster" />
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()
</script>

<style lang="scss" module>
.poster {
  width: 30%;
  height: 30%;
  max-width: 14.375rem;
  max-height: 21.5625rem;
  border-radius: 2px;
}
</style>
