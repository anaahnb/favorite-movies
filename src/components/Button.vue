<template>
  <button
    type="button"
    @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
  }>()

  function handleClick(event: MouseEvent) {
    emit('click', event)
  }
</script>

<style lang="scss" module>
button {
  background-color: #00ac1c;
  color: #FFF;
  font-size: 1.125rem;
  border-radius: 0.25rem;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  border: none;
}
</style>
