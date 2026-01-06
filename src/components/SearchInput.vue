<template>
  <div :class="$style.filter">
    <div :class="$style.searchContainer">
      <div :class="$style.inputList">
        <Input
          v-model="search"
          placeholder="Pesquise pelo nome do filme"
          @enter="onSearch" />
        <div
          v-show="showResults"
          :class="$style.results"
          ref="resultsRef"
          @scroll="onScroll">
          <button
            v-for="movie in movies"
            :key="movie.id"
            :class="$style.option"
            @click="onSelect(movie)">
            <img
              v-if="movie.poster_path"
              :src="getImageUrl(movie.poster_path)"
              :alt="`Cartaz do filme ${movie.original_title}`" />
            <div>
              <strong>{{ movie.original_title }}</strong>
              <span v-if="movie.release_date">
                ({{ movie.release_date.slice(0, 4) }})
              </span>
            </div>
          </button>
          <div v-if="loading" :class="$style.loading">
            Carregando...
          </div>
        </div>
      </div>
      <Button @click="onSearch">
        Buscar
      </Button>
    </div>
    <div :class="$style.explicitOption">
      <label>
        <input type="checkbox" v-model="explict" />
        Incluir conteúdo explícito
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Button from '~/components/Button.vue'
import Input from '~/components/Input.vue';
import type { Movie } from '~/types/movies'

const search = defineModel<string>({ default: '' })

const props = defineProps<{
  movies: Movie[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'search', value: string): void
  (e: 'load-more'): void
  (e: 'select', movie: Movie): void
  (e: 'explicit-change', value: boolean): void
}>()

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL
const resultsRef = ref<HTMLElement | null>(null)
const explict = ref(false)

watch(explict, (value) => {
  emit('explicit-change', value)
})

const showResults = computed(() => {
  return search.value.length > 0 && props.movies.length > 0
})

function getImageUrl(path: string | null) {
  if (!path) return ''
  return `${IMAGE_BASE_URL}${path}`
}

function onSearch() {
  if (!search.value.trim()) return
  emit('search', search.value)
}

function onSelect(movie: Movie) {
  emit('select', movie)
}

function onScroll() {
  if (!resultsRef.value || props.loading) return

  const { scrollTop, scrollHeight, clientHeight } = resultsRef.value

  if (scrollTop + clientHeight >= scrollHeight - 20) {
    emit('load-more')
  }
}
</script>


<style lang="scss" module>
.filter {
  .searchContainer {
    display: flex;
    margin: .5rem 0 .375rem 0;
    gap: .5rem;

    .inputList {
      position: relative;
      width: 18rem;
      height: 100%;

      .results {
        position: absolute;
        top: 100%;
        left: 0;
        width: 18rem;

        max-height: 20rem;
        overflow-y: auto;

        background: #1f252f;
        border-radius: 0.25rem;
        margin-top: 0.25rem;
        z-index: 10;

        .option {
          display: flex;
          gap: 0.5rem;
          align-items: center;

          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: none;
          text-align: left;
          color: #fff;
          cursor: pointer;

          &:hover {
            background: #2c3440;
          }

          img {
            width: 2.5rem;
            border-radius: 0.125rem;
          }

          strong {
            font-weight: 500;
          }

          span {
            color: #9ab;
            margin-left: 0.25rem;
          }
        }

        .loading {
          padding: 0.75rem;
          text-align: center;
          color: #9ab;
        }
      }
    }
  }
}
</style>
