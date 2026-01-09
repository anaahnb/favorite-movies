<template>
  <div :class="$style.listContainer">
    <div :class="$style.moviesWrapper">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :src="getImageUrl(movie.poster_path)"
        :alt="`Cartaz do filme ${movie.title}`"
        @click="onSelectMovie(movie)"
        @remove="onRemove(movie)"
        removable />
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from '~/components/movies/MovieCard.vue';
import type { FavoriteMovie } from '~/types/movies'

const props = defineProps<{
  movies: FavoriteMovie[]
}>()

const emit = defineEmits<{
  (event: 'select', movie: FavoriteMovie): void;
  (event: 'remove', movie: FavoriteMovie): void;
}>()

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

function getImageUrl(path: string | null) {
  if (!path) return ''
  return `${IMAGE_BASE_URL}${path}`
}

function onSelectMovie(movie: FavoriteMovie) {
  emit('select', movie)
}

function onRemove(movie: FavoriteMovie) {
  emit('remove', movie)
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