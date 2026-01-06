<template>
  <DefaultLayout>
    <Navbar @open-register="showRegisterModal = true" />
    <RouterView />
    <Footer />

    <RegisterModal v-model="showRegisterModal" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Footer from '~/components/Footer.vue';
import Navbar from '~/components/Navbar.vue';
import RegisterModal from '~/components/RegisterModal.vue';

defineOptions({ shadow: true });

const showRegisterModal = ref(false)
</script>
