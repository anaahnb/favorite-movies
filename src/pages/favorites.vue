<template>
  <div :class="$style.container">
    <div :class="$style.favoriteList">
      <div :class="$style.title">
        <p>Favoritos de <strong>{{ userName }}</strong></p>
        <div :class="$style.listDetails">
          <span>Lista atualizada {{ lastUpdatedAt }}</span>
        </div>
      </div>
      <FavoritesMoviesList :movies="movies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getFavoriteList } from '~/api/favorites';
import FavoritesMoviesList from '~/components/movies/FavoritesMoviesList.vue';
import { useAuthStore } from '~/stores/auth';
import type { FavoriteMovie } from '~/types/movies';
import { formatLastUpdate } from '~/util/date';

const auth = useAuthStore();

const movies = ref<FavoriteMovie[]>([]);

const userName = computed(() => auth.user?.name ?? '');

const lastUpdatedAt = computed(() => {
  if (!movies.value.length) return null;

  return formatLastUpdate(movies.value[0]?.created_at);
});

async function loadMovieList() {
  try {
    const res = await getFavoriteList()

    movies.value = res;
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadMovieList()
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
        font-size: 0.75rem;
        color: #678;
      }
    }

  }
}
</style>