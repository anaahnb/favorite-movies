<template>
  <div :class="$style.listContainer">
    <h2>MAIS POPULARES...</h2>

    <div :class="$style.moviesWrapper">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :src="getImageUrl(movie.poster_path)"
        :alt="`Cartaz do filme ${movie.original_title}`"
        @click="onSelectMovie(movie)"
      />
    </div>

    <div :class="$style.fadeRight" />
  </div>
</template>

<script setup lang="ts">
import MovieCard from './MovieCard.vue';
import type { Movie } from '~/types/movies'

const props = defineProps<{
  movies: Movie[]
}>()

const emit = defineEmits<{
  (event: 'select', movie: Movie): void;
}>()

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

function getImageUrl(path: string | null) {
  if (!path) return ''
  return `${IMAGE_BASE_URL}${path}`
}

function onSelectMovie(movie: Movie) {
  emit('select', movie)
}

</script>

<style lang="scss" module>
.listContainer {
  max-width: 60rem;
  margin-top: 2rem;
  position: relative;

  h2 {
    font-weight: 400;
    color: #9ab;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;

    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 6px;
    text-decoration-color: #9ab;
  }
}

.moviesWrapper {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  overflow: hidden;
  position: relative;
}

.fadeRight {
  position: absolute;
  top: 2.5rem;
  right: 0;
  width: 6rem;
  height: calc(100% - 2.5rem);

  pointer-events: none;

  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.85)
  );
}
</style>