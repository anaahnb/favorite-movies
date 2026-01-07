<template>
  <div>
    <p v-if="tagline" :class="$style.tagline">{{ tagline }}</p>
    <p :class="$style.text">{{ overview }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tagline?: string
  overview: string
}>()
</script>

<style lang="scss" module>
.tagline {
  text-transform: uppercase;
  color: #99aabb;
  margin: 0;
}

.text {
  color: #99aabb;
  max-width: 24rem;
}
</style>
