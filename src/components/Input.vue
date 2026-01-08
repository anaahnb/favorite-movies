<!-- Input.vue -->
<template>
  <div :class="$style.field">
    <span v-if="label">{{ label }}</span>

    <input
      ref="inputRef"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :required="required"
      :minlength="minlength"
      @keydown.enter="$emit('enter')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    label?: string
    type?: string
    placeholder?: string
    required?: boolean
    minlength?: number
  }>(),
  {
    type: 'text',
  }
)

defineEmits<{
  (e: 'enter'): void
}>()

const model = defineModel<string>({ default: '' })
const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({ inputRef })
</script>


<style lang="scss" module>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #9ab;
  height: 100%;

  input {
    background: #2c3440;
    color: #fff;
    font-size: .875rem;
    border-radius: 0.25rem;
    padding: 0.5rem;
    border: none;
    box-sizing: border-box;
    width: 100%;
    min-height: 2.3125rem;


    &::placeholder {
      color: #89a;
    }

    &:focus {
      outline: 2px solid #00ac1c;
    }
  }
}

</style>
