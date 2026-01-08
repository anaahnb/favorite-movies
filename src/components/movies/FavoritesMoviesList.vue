<template>
  <div :class="$style.listContainer">
    <div :class="$style.moviesWrapper">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :src="getImageUrl(movie.poster_path)"
        :alt="`Cartaz do filme ${movie.original_title}`"
        @click="onSelectMovie(movie)"
        removable />
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from '~/components/movies/MovieCard.vue';
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
  margin-top: 2rem;
  width: 60rem;

  .moviesWrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
}
</style>