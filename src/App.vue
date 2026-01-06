<template>
  <DefaultLayout>
    <RouterView />
    <Footer />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';

defineOptions({ shadow: true });
</script>
