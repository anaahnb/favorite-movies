<template>
  <div :class="$style.tag">
    {{ name }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<style lang="scss" module>
.tag {
  color: #9ab;
  background-color: #283038;
  padding: 0.1875rem 0.375rem;
  font-size: 0.75rem;
  width: fit-content;
}
</style>
