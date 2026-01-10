<template>
  <div :class="$style.container">
    <div :class="$style.favoriteList">
      <div :class="$style.title">
        <p>Favoritos de <strong>{{ userName }}</strong></p>
        <div :class="$style.listDetails">
          <GenreSelect
            v-model="selectedGenre"
            :genres="genres" />
          <span>Lista atualizada {{ lastUpdatedAt }}</span>
        </div>
      </div>
      <Loading v-if="loading" />
      <FavoritesMoviesList
        v-else-if="filteredMovies.length > 0"
        :movies="filteredMovies"
        @select="onSelectMovie"
        @remove="onRemoveMovieFromFavorite" />
      <div
        v-else
        :class="$style.noData">
        Nenhum filme adicionado à lista.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { deleteFavoriteMovie, getFavoriteList } from '~/api/favorites';
import { getMovieGenres } from '~/api/tmdb';
import GenreSelect, { type Genre } from '~/components/GenreSelect.vue';
import Loading from '~/components/Loading.vue';
import FavoritesMoviesList from '~/components/movies/FavoritesMoviesList.vue';
import { useAuthStore } from '~/stores/auth';
import type { FavoriteMovie } from '~/types/movies';
import { formatLastUpdate } from '~/util/date';

const auth = useAuthStore();
const $toast = useToast();
const router = useRouter();

const movies = ref<FavoriteMovie[]>([]);
const genres = ref<Genre[]>([])
const selectedGenre = ref<number | null>(null)
const loading = ref<boolean>(false)

const userName = computed(() => auth.user?.name ?? '');

const lastUpdatedAt = computed(() => {
  if (!movies.value.length) return null;

  return formatLastUpdate(movies.value[0]?.created_at);
});

const filteredMovies = computed(() => {
  if (!selectedGenre.value) return movies.value

  return movies.value.filter((movie: FavoriteMovie) =>
    movie.genre_ids?.includes(selectedGenre.value!)
  )
})

function onSelectMovie(movie: FavoriteMovie) {
  router.push({
    name: 'details',
    params: { id: movie.tmdb_movie_id },
  });
}

async function loadMovieList() {
  try {
    loading.value = true
    const res = await getFavoriteList()

    movies.value = res;
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function onRemoveMovieFromFavorite(movie: FavoriteMovie) {
  try {
    console.log('entrou em remove', movie)
    await deleteFavoriteMovie(movie.tmdb_movie_id)
    await loadMovieList()

    $toast.success('Filme removido', { position: 'top-right' })
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Não foi remover o filme dos favoritos';
    $toast.error(message, { position: 'top-right' })
  }
}

async function getGenres() {
  try {
    const res = await getMovieGenres({ language: 'pt-BR' })
    genres.value = res.genres
  } catch {
    console.error('Não foi possível buscar os gêneros')
  }
}

onMounted(async () => {
  await Promise.all([
    loadMovieList(),
    getGenres(),
  ])
})

</script>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: center;
  height: 84vh;

  .favoriteList {
    font-size: 1rem;
    color: #fff;
    font-family: Arial;
    margin-top: 2rem;
    width: 60rem;

    .noData {
      font-size: .875rem;
      color: #678;
      margin-top: 0.5rem;
    }

    .title {
      border-bottom: 1px solid #456;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    p {
      margin: 0 0 .375rem 0;
    }

    strong {
      font-weight: 700;
    }

    .listDetails {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: .375rem;

      span {
        font-size: 0.75rem;
        color: #678;
      }
    }

  }
}
</style>