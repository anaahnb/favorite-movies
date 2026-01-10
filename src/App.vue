<template>
  <Navbar />
  <RouterView :class="$style.container" />
  <Footer />
  <RegisterModal
    v-model="ui.showRegisterModal"
    @submit="handleRegister"/>
  <LoginModal
    v-model="ui.showLoginModal"
    @submit="handleLogin" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUIStore } from '~/stores/ui';
import { useAuthStore } from '~/stores/auth';
import RegisterModal from '~/components/RegisterModal.vue';
import LoginModal from '~/components/LoginModal.vue';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
import type { RegisterForm } from '~/types/register';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import type { LoginForm } from './types/login';

const ui = useUIStore();
const auth = useAuthStore();
const $toast = useToast();

async function handleRegister(payload: RegisterForm) {
  try {
    console.log('payload', payload)
    await auth.register(payload);

    $toast.success('Usuário cadastrado!', { position: 'top-right' })
    ui.closeRegister();
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Não foi possível criar o usuário';
    $toast.error(message, { position: 'top-right' });
  }
}


async function handleLogin(payload: LoginForm) {
  try {
    await auth.login(payload);

    $toast.success('Login realizado com sucesso!', { position: 'top-right' });
    ui.closeLogin();
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Email ou senha inválidos';
      $toast.error(message, { position: 'top-right' });
  }
}

onMounted(() => {
  auth.fetchUser();
});
</script>

<style module lang="scss">
  .container {
    padding-top: 4rem;
  }

</style>

