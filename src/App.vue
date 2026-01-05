<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

defineOptions({ shadow: true });
</script>
