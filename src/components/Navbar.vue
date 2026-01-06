<template>
  <header :class="$style.navbar">
    <div :class="$style.container">
      <nav :class="$style.nav">
        <component
          v-for="item in menuItems"
          :key="item.label"
          :is="item.component"
          v-bind="item.props"
          :class="$style.link"
          @click="item.onClick">
          {{ item.label }}
        </component>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const isAutenthicate = ref(true)

const emit = defineEmits<{
  (e: 'open-register'): void
}>()

function openRegister() {
  emit('open-register')
}

type MenuItem = {
  label: string
  component: any
  props?: Record<string, any>
  onClick?: () => void
}

const menuItems = computed<MenuItem[]>(() => {
  if (isAutenthicate.value) {
    return [
      {
        label: 'Explorar',
        component: RouterLink,
        props: { to: '/' },
      },
      {
        label: 'Favoritos',
        component: RouterLink,
        props: { to: '/favorites' },
      },
    ]
  }

  return [
    {
      label: 'Inscreva-se',
      component: 'button',
      onClick: openRegister,
    },
    {
      label: 'Entrar',
      component: RouterLink,
      props: { to: '/' },
    },
  ]
})
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

  border: 0;
  background: transparent;

  &:hover {
    color: #fff;
  }

  &.active {
    color: #fff;
  }
}
</style>