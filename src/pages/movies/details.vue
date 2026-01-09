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
              :is-user-favorite-movie="isUserFavoriteMovie"
              :vote-average="movie.vote_average.toFixed(1)"
              :vote-count="movie.vote_count"
              @login="ui.openRegister"
              @favorite="onAddToFavorites"
              @remove="onRemoveMovieFromFavorite" />
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

import type { FavoriteMovie, Movie } from '~/types/movies'
import { getYearFromDate } from '~/util/date'
import { getMovieDetailsById } from '~/api/tmdb'
import { deleteFavoriteMovie, getFavoriteList, storeFavoriteMovie } from '~/api/favorites'

const route = useRoute();
const auth = useAuthStore();
const ui = useUIStore();
const $toast = useToast();


const movie = ref<Movie | null>(null)
const loading = ref(false)
const favoriteMovies = ref<FavoriteMovie[] | null>([])

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

const isUserFavoriteMovie = computed(() => {
  if (!auth.isAuthenticated || !movie.value) {
    return false;
  }

  return favoriteMovies.value?.some(el => el.tmdb_movie_id === movie.value?.id);
});


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
      poster_path: movie.value?.poster_path,
      genre_ids: movie.value?.genres.map(el => el.id)
    }

    await storeFavoriteMovie(params)
    await loadMovieList();

    $toast.success('Filme adicionado aos favoritos!', { position: 'top-right' })
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Não foi possível adicionar o filme aos favoritos';
    $toast.error(message, { position: 'top-right' });
  }
}

async function onRemoveMovieFromFavorite() {
  try {
    if (!movie.value || !favoriteMovies.value) return

    await deleteFavoriteMovie(movie.value?.id)

    favoriteMovies.value = favoriteMovies.value?.filter(fav => fav.tmdb_movie_id !== movie.value!.id);
    $toast.success('Filme removido', { position: 'top-right' })
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Não foi remover o filme dos favoritos';
    $toast.error(message, { position: 'top-right' })
  }
}

async function loadMovieList() {
  try {
    const res = await getFavoriteList()

    favoriteMovies.value = res;
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await loadMovieDetails();
  if (auth.isAuthenticated) await loadMovieList();
});
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
