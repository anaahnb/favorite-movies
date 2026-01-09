<template>
  <div :class="$style.container">
    <div :class="$style.favoriteCard">
      <a @click="handleFavoriteClick">
        {{ favoriteActionLabel }}
      </a>
    </div>
    <div :class="$style.cardEvaluation">
      <div :class="$style.evaluationHeader">
        <h3>Avaliação</h3>
        <span>{{ voteCount }} avaliadores</span>
      </div>
      <div :class="$style.evaluationRating">
        <img
          :class="$style.evaluationGraph"
          :src="evaluateGraph"
          alt="Gráfico de avaliação" />
        <h2>{{ voteAverage }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import evaluateGraph from '~/assets/img/evaluateGraph.png'

const props = defineProps<{
  isAuthenticated: boolean
  voteAverage: string | number
  voteCount: number
  isUserFavoriteMovie?: boolean
}>()

const emit = defineEmits<{
  (e: 'login'): void
  (e: 'favorite'): void
  (e: 'remove'): void
}>()

const favoriteActionLabel = computed(() => {
  if (!props.isAuthenticated) return 'Faça login para adicionar aos favoritos'
  return props.isUserFavoriteMovie ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
});

function onLogin() {
  emit('login')
}

function onFavorite() {
  emit('favorite')
}

function onRemove() {
  emit('remove')
}

function handleFavoriteClick() {
  if (!props.isAuthenticated) {
    onLogin()
    return
  }

  if (props.isUserFavoriteMovie) {
    onRemove()
  } else {
    onFavorite()
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
}

.favoriteCard {
  padding: .5rem;
  border-radius: 3px;
  background-color: #456;
  text-align: left;
  font-size: .875rem;
  margin-bottom: 1rem;

  a {
    color: #bcd;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.cardEvaluation {
  .evaluationHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 14.375rem;

    h3 {
      font-weight: 400;
      color: #9ab;
      font-size: 1rem;
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
    }

    span {
      color: #678;
      font-size: 0.75rem;
    }
  }

  .evaluationRating {
    position: relative;
    border-top: 1px solid #9ab;
    margin-top: 0.5rem;

    .evaluationGraph {
      position: absolute;
      width: 14.375rem;
      height: 2.75rem;
      margin-top: 1.5rem;
    }

    h2 {
      position: relative;
      margin: 0;
      color: #789;
      font-weight: 300;
      font-size: 1.25rem;
      right: -11.625rem;
      bottom: -1.5rem;
    }
  }
}
</style>
