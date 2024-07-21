<template>
  <div class="album">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  columns: number
}>()

const gridColumns = computed(() => `repeat(${props.columns}, 1fr)`)
</script>

<style scoped>
.album {
  display: grid;
  grid-template-columns: v-bind(gridColumns);
  justify-items: center;
  gap: 8px;
  width: 100%;
}
</style>
