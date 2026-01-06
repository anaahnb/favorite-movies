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
        @select="onSelectMovie"
        @explicit-change="includeExplicit = $event" />
      <PopularMoviesList
        :movies="movies"
        @select="searchMovieSelected = $event"/>
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
const includeExplicit = ref(false)

const page = ref(1);
const totalPages = ref(1);

function onSelectMovie(movie: Movie) {
  console.log('Filme selecionado:', movie)
  searchMovieSelected.value = movie

  searchList.value = []
}

async function fetchMovies({ query, pageNumber }: { query: string; pageNumber: number }) {
  try {
    const params = {
      query,
      page: pageNumber,
      include_adult: includeExplicit.value,
      language: 'pt-BR',
    }

    return await getMovieListByName(params)
  } catch (error) {
    console.error(error)
    return null
  }
}

async function searchMovie(query: string) {
  if (!query.trim()) return
  if (loadingSearchList.value) return

  loadingSearchList.value = true
  page.value = 1

  const res = await fetchMovies({
    query,
    pageNumber: page.value,
  })

  if (res) {
    searchList.value = res.results
    totalPages.value = res.total_pages
  }

  loadingSearchList.value = false
}

async function loadMoreMovies() {
  if (loadingSearchList.value) return
  if (page.value >= totalPages.value) return

  loadingSearchList.value = true
  page.value += 1

  const res = await fetchMovies({
    query: searchMovieName.value,
    pageNumber: page.value,
  })

  if (res) {
    searchList.value.push(...res.results)
  }

  loadingSearchList.value = false
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