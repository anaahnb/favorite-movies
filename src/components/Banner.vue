<template>
  <div :class="$style.bannerContainer">
    <img
      :class="$style.image"
      :src="imageSrc"
      alt="" />

    <div :class="$style.overlay" />

    <div :class="$style.titleContainer">
      <h1 v-if="selectedMovie">
        {{ selectedMovie.title }}
      </h1>

      <p v-if="selectedMovie">
        {{ selectedMovie.overview }}
      </p>

      <h1 v-else>
        Encontre filmes incríveis. <br />
        Marque seus favoritos. <br />
        Decida o que fica e o que sai.
      </h1>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import type { Movie } from '~/types/movies'

const props = defineProps<{
  selectedMovie?: Movie
}>()

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

const imageSrc = computed(() => {
  if (props.selectedMovie?.backdrop_path) {
    return `${IMAGE_BASE_URL}${props.selectedMovie.backdrop_path}`
  }

  return new URL('~/assets/img/banner.jpg', import.meta.url).href
})
</script>


<style lang="scss" module>
.bannerContainer {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 35%,
    rgba(0, 0, 0, 0.5) 60%,
    rgba(0, 0, 0, 0.85) 80%,
    rgba(0, 0, 0, 1) 100%
  );
}

.titleContainer {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  text-align: center;
  max-width: 80rem;
  padding: 0 1rem;

  h1 {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 2.25rem;
    line-height: 1.3;
    color: #fff;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 16px;
    color: #89a;
    text-align: center;
  }
}
</style>