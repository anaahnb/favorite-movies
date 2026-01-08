<template>
  <div :class="$style.details">
    <div v-if="loading">Carregando...</div>

    <div v-else-if="movie" :class="$style.content">
      <MovieBanner :image="backgroundImage" />

      <div :class="$style.detailsContainer">
        <MovieDetailsPoster
          :src="posterUrl"
          :alt="movie.title" />

        <div :class="$style.informationsContainer">
          <MovieDetailsHeader
            :title="movie.title"
            :year="getYearFromDate(movie.release_date) ?? 'N/A'" />

          <div :class="$style.movieDetails">
            <MovieDetailsOverview
              :tagline="movie.tagline"
              :overview="movie.overview"
              :genders="movie.genres" />

            <MovieDetailsAside
              :is-authenticated="auth.isAuthenticated"
              :vote-average="movie.vote_average.toFixed(1)"
              :vote-count="movie.vote_count"
              @login="ui.openRegister"
              @favorite="onAddToFavorites" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'
import { useToast } from 'vue-toast-notification'

import MovieBanner from '~/components/movies/MovieBanner.vue'
import MovieDetailsPoster from '~/components/movies/MovieDetailsPoster.vue'
import MovieDetailsHeader from '~/components/movies/MovieDetailsHeader.vue'
import MovieDetailsOverview from '~/components/movies/MovieDetailsOverview.vue'
import MovieDetailsAside from '~/components/movies/MovieDetailsAside.vue'

import type { Movie } from '~/types/movies'
import { getYearFromDate } from '~/util/date'
import { getMovieDetailsById } from '~/api/tmdb'
import { storeFavoriteMovie } from '~/api/favorites'

const route = useRoute();
const auth = useAuthStore();
const ui = useUIStore();
const $toast = useToast();


const movie = ref<Movie | null>(null)
const loading = ref(false)

const movieId = Number(route.params.id)
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

const backgroundImage = computed(() =>
  movie.value?.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.value.backdrop_path}`
    : new URL('~/assets/img/banner.jpg', import.meta.url).href
)

const posterUrl = computed(() =>
  movie.value?.poster_path
    ? `${IMAGE_BASE_URL}${movie.value.poster_path}`
    : ''
)

async function loadMovieDetails() {
  loading.value = true
  try {
    movie.value = await getMovieDetailsById(movieId, {
      language: 'pt-BR',
    })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function onAddToFavorites() {
  try {
    const params = {
      tmdb_movie_id: movie.value?.id,
      title: movie.value?.title,
      poster_path: movie.value?.poster_path
    }

    console.log(params)

    await storeFavoriteMovie(params)

    $toast.success('Filme adicionado aos favoritos!', { position: 'top-right' })
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Não foi possível adicionar o filme aos favoritos';
    $toast.error(message, { position: 'top-right' });
  }
}

onMounted(loadMovieDetails)
</script>

<style lang="scss" module>
.details {
  overflow-x: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detailsContainer {
  max-width: 60rem;
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.informationsContainer {
  display: flex;
  flex-direction: column;
}

.movieDetails {
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
}
</style>
