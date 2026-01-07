<template>
  <div :class="$style.container">
    <div :class="$style.favoriteList">
      <div :class="$style.title">
        <p>Favoritos de <strong>{{ userName }}</strong></p>
        <div :class="$style.listDetails">
          <span>Lista atualizada ontem</span>
        </div>
      </div>
      <FavoritesMoviesList :movies="movies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getPopularMovies } from '~/api/tmdb';
import FavoritesMoviesList from '~/components/FavoritesMoviesList.vue';
import { useAuthStore } from '~/stores/auth';
import type { Movie } from '~/types/movies';

const auth = useAuthStore();

const movies = ref<Movie[]>([]);

const userName = computed(() => auth.user?.name ?? '');

async function loadPopularMovies(page: number = 1) {
  try {
    const params = {
      language: 'pt-BR',
      page,
    };

    const res = await getPopularMovies(params)

    movies.value = res.results;
    console.log(movies.value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadPopularMovies()
})

</script>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: center;

  .favoriteList {
    font-size: 1rem;
    color: #fff;
    font-family: Arial;
    margin-top: 2rem;
    width: 60rem;

    .title {
      border-bottom: 1px solid #456;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    p {
      margin: 0;
    }

    strong {
      font-weight: 700;
    }

    .listDetails {
      span {
        font-size: 12px;
        color: #678;
      }
    }

  }
}
</style>