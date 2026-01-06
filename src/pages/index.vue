<template>
  <div :class="$style.main">
    <div :class="$style.content">
      <Banner />
      <SearchInput />
      <PopularMoviesList :movies="movies" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Banner from '~/components/Banner.vue';
import SearchInput from '~/components/SearchInput.vue';
import { getPopularMovies } from '~/api/tmdb';
import type { Movie } from '~/types/movies';
import { onMounted, ref } from 'vue';
import PopularMoviesList from '~/components/PopularMoviesList.vue';

const movies = ref<Movie[]>([]);
const loading = ref<boolean>(false);

async function loadPopularMovies(page: number = 1) {
  if (loading.value) return;
  loading.value = true;

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

  loading.value = false;
}

onMounted(() => {
  loadPopularMovies()
})

</script>

<style lang="scss" module>
.main {
  width: 100%;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>