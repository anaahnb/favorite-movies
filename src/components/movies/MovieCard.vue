<template>
  <div
    :class="$style.card"
    @click="onClick">
    <img
      :class="$style.image"
      :src="src"
      :alt="alt" />
    <button
      v-if="removable"
      :class="$style.remove"
      type="button"
      @click.stop="onRemove">
      ✕
    </button>
  </div>
</template>


<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt?: string
    removable?: boolean
  }>(),
  {
    removable: false,
  }
)

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'remove'): void
}>()

function onClick() {
  emit('click')
}

function onRemove() {
  emit('remove')
}
</script>


<style module lang="scss">
.card {
  position: relative;
  cursor: pointer;

  &:hover .remove {
    opacity: 1;
    pointer-events: auto;
  }
}

.image {
  width: 4.75rem;
  height: 6.9375rem;
  object-fit: cover;
  border-radius: 0.25rem;

  &:hover {
    outline: 2px solid #00ac1c;
  }
}

.remove {
  position: absolute;
  top: 4px;
  right: 4px;

  width: 1.5rem;
  height: 1.5rem;

  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;

  font-size: 0.875rem;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;

  &:hover {
    background: #e5484d;
  }
}
</style>
