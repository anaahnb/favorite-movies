<template>
  <div :class="$style.searchContainer">
    <input
      type="text"
      v-model="search"
      placeholder="Pesquise pelo nome do filme"
      @keyup.enter="onSearch"
    />

    <Button @click="onSearch">
      <slot name="button">
        Buscar
      </slot>
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue'

const search = defineModel<string>({ default: '' })

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

function onSearch() {
  emit('search', search.value)
}
</script>

<style lang="scss" module>
  .searchContainer {
    width: max-content;

    input {
      background: #2c3440;
      color: #FFF;
      font-size: 1.125rem;
      border-radius: 0.25rem;
      padding: 0.5rem;
      border: none;
      width: 18rem;
      margin-right: 0.5rem;

      &::placeholder {
        color: #89a;
      }
    }
  }
</style>
