<template>
  <div :class="$style.banner">
    <img :src="image" :alt="alt" />
    <div :class="$style.overlay" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string
  alt?: string
}>()
</script>

<style lang="scss" module>
.banner {
  position: relative;
  width: 100%;
  height: auto;
  max-height: 40rem;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;

    background:
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 35%,
        rgba(0, 0, 0, 0.5) 60%,
        rgba(0, 0, 0, 0.85) 80%,
        rgba(0, 0, 0, 1) 100%
      ),

      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.35) 0%,
        rgba(0, 0, 0, 0) 25%
      ),

      linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 65%,
        rgba(0, 0, 0, 0.5) 100%,
      ),

      linear-gradient(
        to left,
        rgba(0, 0, 0, 0.25) 0%,
        rgba(0, 0, 0, 0) 20%
      );
  }
}
</style>
