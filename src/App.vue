<template>
  <Navbar />
  <RouterView />
  <Footer />

  <RegisterModal
    v-model="ui.showRegisterModal"
    @submit="handleRegister"/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUIStore } from '~/stores/ui';
import { useAuthStore } from '~/stores/auth';
import RegisterModal from '~/components/RegisterModal.vue';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
import type { RegisterForm } from '~/types/register';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const ui = useUIStore();
const auth = useAuthStore();
const $toast = useToast();

async function handleRegister(payload: RegisterForm) {
  try {
    console.log('payload', payload)
    await auth.register(payload);

    $toast.success('Usuário cadastrado!', { position: 'top-right' })
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Não foi possível criar o usuário';
    $toast.error(message, { position: 'top-right' });
  } finally {
    ui.closeRegister();
  }
}

onMounted(() => {
  auth.fetchUser();
});
</script>

