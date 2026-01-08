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
  padding: 3px 6px;
  font-size: 12px;
  width: fit-content;
}
</style>
