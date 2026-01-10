<template>
  <div
    :class="$style.loading">
    <VueSpinnerFacebook
      :size="46"
      color="#9ab" />
  </div>
</template>

<script lang="ts" setup>
import { VueSpinnerFacebook } from 'vue3-spinners';

</script>

<style lang="scss" module>
.loading {
  display: flex;
  justify-content: center;
  height: 84vh;
  margin-top: 1rem;
}
</style>