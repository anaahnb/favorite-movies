<template>
  <button
    type="button"
    :class="[
      $style.button,
      $style[`size-${size}`],
      $style[`variant-${variant}`],
    ]"
    @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      size?: 'md' | 'sm'
      variant?: 'primary' | 'secondary'
    }>(),
    {
      size: 'md',
      variant: 'primary',
    }
  )

  const emit = defineEmits<{(e: 'click', event: MouseEvent): void}>()

  function handleClick(event: MouseEvent) {
    emit('click', event)
  }
</script>

<style lang="scss" module>
.button {
  border-radius: 0.25rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, opacity 0.15s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.size-md {
  font-size: 1.125rem;
  padding: 0.5rem 1.5rem;
}

.size-sm {
  font-size: 0.875rem;
  padding: 0.35rem 0.75rem;
}

.variant-primary {
  background-color: #00ac1c;
  color: #fff;

  &:hover {
    background-color: #009318;
  }

  &:active {
    background-color: #007f15;
  }
}

.variant-secondary {
  background: transparent;
  color: #9ab;

  &:hover {
    color: #fff;
  }
}
</style>
