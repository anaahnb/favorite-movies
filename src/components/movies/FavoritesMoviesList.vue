<template>
  <div :class="$style.listContainer">
    <div :class="$style.moviesWrapper">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :src="getTmdbImage(movie.poster_path)"
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
import { getTmdbImage } from '~/util/tmdbImage';

const props = defineProps<{
  movies: FavoriteMovie[]
}>()

const emit = defineEmits<{
  (event: 'select', movie: FavoriteMovie): void;
  (event: 'remove', movie: FavoriteMovie): void;
}>()

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
  width: 100%;

  .moviesWrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
}
</style>