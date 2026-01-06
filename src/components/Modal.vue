<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        :class="$style.overlay"
        @click.self="close">

        <div
          :class="$style.modal"
          role="dialog"
          aria-modal="true">

          <header v-if="$slots.header" :class="$style.header">
            <slot name="header" />
            <button
              :class="$style.close"
              aria-label="Fechar"
              @click="close">
              ✕
            </button>
          </header>

          <section :class="$style.content">
            <slot />
          </section>

          <footer v-if="$slots.footer" :class="$style.footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const open = defineModel<boolean>({ default: false })

function close() {
  open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style lang="scss" module>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #1f252f;
  color: #fff;
  width: 100%;
  max-width: 520px;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5rem 1rem;
  border-bottom: 1px solid #2c3440;

  h3 {
    margin: 0;
  }
}

.close {
  background: transparent;
  border: none;
  color: #9ab;
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}

.content {
  padding: 1.25rem;
}

.footer {
  padding: .5rem 1rem;
  border-top: 1px solid #2c3440;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  background: #1f252f;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

