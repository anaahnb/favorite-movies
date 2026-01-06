<template>
  <DefaultLayout>
    <Navbar />
    <RouterView />
    <Footer />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

defineOptions({ shadow: true });
</script>
