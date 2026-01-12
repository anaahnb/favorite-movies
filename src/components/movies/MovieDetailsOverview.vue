<template>
  <div :class="$style.textContainer">
    <p v-if="tagline" :class="$style.tagline">{{ tagline }}</p>
    <p :class="$style.text">{{ overview }}</p>
    <div :class="$style.gendersList">
      <Tag
        v-for="value in genders"
        :key="value.id"
        :name="value.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Genres } from '~/types/movies';
import Tag from '~/components/Tag.vue';

defineProps<{
  tagline?: string
  overview: string
  genders: Genres[]
}>()
</script>

<style lang="scss" module>

.textContainer {
  flex: 1 1 19rem;
}
.tagline {
  text-transform: uppercase;
  color: #99aabb;
  margin: 0;
}

.text {
  color: #99aabb;
  max-width: 24rem;
}

.gendersList {
  display: flex;
  gap: .375rem;
  flex-wrap: wrap;
}
</style>
