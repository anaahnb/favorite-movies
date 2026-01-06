<template>
  <div :class="$style.main">
    <div :class="$style.content">
      <Banner :selected-movie="searchMovieSelected" />
      <SearchInput
        v-model="searchMovieName"
        :movies="searchList"
        :loading="loadingSearchList"
        @search="searchMovie"
        @load-more="loadMoreMovies"
        @select="onSelectMovie" />
      <PopularMoviesList
        :movies="movies"
        @select="(movie) => searchMovieSelected = movie"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Banner from '~/components/Banner.vue';
import SearchInput from '~/components/SearchInput.vue';
import { getMovieListByName, getPopularMovies } from '~/api/tmdb';
import type { Movie } from '~/types/movies';
import { onMounted, ref } from 'vue';
import PopularMoviesList from '~/components/PopularMoviesList.vue';

const movies = ref<Movie[]>([]);
const loading = ref(false);

const searchMovieName = ref('');
const searchMovieSelected = ref<Movie>();
const searchList = ref<Movie[]>([]);
const loadingSearchList = ref(false);
const explict = ref(false);

const page = ref(1);
const totalPages = ref(1);

function onSelectMovie(movie: Movie) {
  console.log('Filme selecionado:', movie)
  searchMovieSelected.value = movie

  searchList.value = []
}

async function loadMoreMovies() {
  if (loadingSearchList.value) return
  if (page.value >= totalPages.value) return

  loadingSearchList.value = true
  page.value += 1

  try {
    const params = {
      query: searchMovieName.value,
      page: page.value,
      include_adult: false,
      language: 'pt-BR',
    }

    const res = await getMovieListByName(params)

    searchList.value.push(...res.results)
  } catch (error) {
    console.error(error)
  } finally {
    loadingSearchList.value = false
  }
}

async function searchMovie(query: string) {
  if (!query.trim()) return

  loadingSearchList.value = true
  page.value = 1

  try {
    const params = {
      query,
      page: page.value,
      include_adult: false,
      language: 'pt-BR',
    }

    const res = await getMovieListByName(params)

    searchList.value = res.results
    totalPages.value = res.total_pages
  } catch (error) {
    console.error(error)
  } finally {
    loadingSearchList.value = false
  }
}

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
  } finally {
    loading.value = false;
  }
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