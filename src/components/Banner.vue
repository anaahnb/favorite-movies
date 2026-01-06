<template>
  <div :class="$style.bannerContainer">
    <img
      :class="$style.image"
      :src="imageSrc"
      alt="" />

    <div :class="$style.overlay" />

    <div :class="$style.titleContainer">
      <h1>
        Encontre filmes incríveis. <br />
        Marque seus favoritos. <br />
        Decida o que fica e o que sai.
      </h1>
    </div>

    <div :class="$style.movieName">
      <p v-if="selectedMovie">
        {{ selectedMovie?.title }} ({{ selectedMovie?.release_date }})
      </p>
      <p v-else> Marty Supreme (2025)</p>
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
  display: flex;
  justify-content: center;
  align-items: center;
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


.movieName {
  p {
    position: absolute;
    right: .75rem;

    top: 30%;
    writing-mode: vertical-lr;

    font-size: 14px;
    color: #89a;
    z-index: 2;

    white-space: nowrap;
  }
}


.titleContainer {
  position: absolute;
  bottom: 24px;
  z-index: 2;

  text-align: center;
  max-width: 65rem;
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

  span {
    font-family: Arial;
    font-weight: 400;
    font-size: 16px;
  }
}
</style>