<template>
  <div :class="$style.bannerContainer">
    <MovieBanner :image="imageSrc" />

    <div :class="$style.titleContainer">
      <h1>
        Encontre filmes incríveis. <br />
        Marque seus favoritos. <br />
        Decida o que fica e o que sai.
      </h1>
    </div>

    <div :class="$style.movieName">
      <RouterLink :to="`/movies/${selectedMovie.id}`">
        {{ movieTitleWithYear }}
      </RouterLink>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import type { Movie } from '~/types/movies'
import MovieBanner from '~/components/movies/MovieBanner.vue';
import { getYearFromDate } from '~/util/date'

const props = defineProps<{
  selectedMovie: Movie
}>()

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

const imageSrc = computed(() => {
  return `${IMAGE_BASE_URL}${props.selectedMovie.backdrop_path}`
})

const movieTitleWithYear = computed(() => {
  if (!props.selectedMovie) return ''

  const { title, release_date } = props.selectedMovie
  const year = release_date ? getYearFromDate(release_date) : ''

  return `${title} (${year})`
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

.movieName {
  a {
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
}
</style>