<template>
  <label :class="$style.field">
    <span v-if="label">{{ label }}</span>

    <input
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :required="required"
      :minlength="minlength"
    />
  </label>
</template>

<script setup lang="ts">
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

const model = defineModel<string>({ default: '' })
</script>

<style lang="scss" module>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #9ab;
}

input {
  background: #2c3440;
  color: #fff;
  font-size: 14px;
  border-radius: 0.25rem;
  padding: 0.5rem;
  border: none;
  box-sizing: border-box;

  &::placeholder {
    color: #89a;
  }

  &:focus {
    outline: 2px solid #00ac1c;
  }
}
</style>
