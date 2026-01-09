<template>
  <div :class="$style.container">
    <select
      :class="$style.select"
      :value="modelValue"
      @change="onChange">
      <option :value="''">Todos os gêneros</option>

      <option
        v-for="genre in genres"
        :key="genre.id"
        :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
export type Genre = {
  id: number
  name: string
}

const props = defineProps<{
  genres: Genre[]
  modelValue?: number | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value ? Number(value) : null)
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .select {
    padding: .25rem;
    border-radius: 0.25rem;
    border: 1px solid #2a2a2a;
    background: #0f0f0f;
    color: #89a;

    &:focus {
      outline: none;
      border-color: #00ac1c;
    }
  }
}

</style>

