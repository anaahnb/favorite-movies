<template>
  <header :class="$style.navbar">
    <div :class="$style.container">
      <nav>
        <div
          v-if="isAutenthicate"
          :class="$style.nav">
          <RouterLink
            to="/"
            :class="$style.link"
            active-class="active">
            Explorar
          </RouterLink>
          <RouterLink
            to="/favorites"
            :class="$style.link"
            active-class="active">
            Favoritos
          </RouterLink>
        </div>
        <div
          v-else
          :class="$style.nav">
          <RouterLink
            to="/"
            :class="$style.link"
            active-class="active">
              Inscreva-se
          </RouterLink>
          <RouterLink
            to="/"
            :class="$style.link"
            active-class="active">
              Entrar
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isAutenthicate = ref(false)

</script>

<style lang="scss" module>
.navbar {
  width: 100%;
  height: 64px;
  background: #14181c;
  border-bottom: 1px solid #2c3440;
}

.container {
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
}


.nav {
  display: flex;
  gap: 1.5rem;
}

.link {
  position: relative;
  color: #9ab;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    color: #fff;
  }

  &.active {
    color: #fff;
  }
}
</style>