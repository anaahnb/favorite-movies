<template>
  <div
    :class="[$style.loading, { [$style.container]: props.isContainer }]">
    <VueSpinnerFacebook
      :size="size"
      color="#9ab" />
  </div>
</template>

<script lang="ts" setup>
import { VueSpinnerFacebook } from 'vue3-spinners';

const props = withDefaults(
  defineProps<{
    size?: number
    isContainer?: boolean
  }>(),
  {
    size: 46,
    isContainer: true
  }
)
</script>

<style lang="scss" module>
.container {
  height: 82vh;
  margin-top: 1rem;
}
.loading {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
</style>