<template>
  <div :class="['album-item', { 'album-item-active': active }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  active: boolean
  isLarge: boolean
}>()

const width = computed(() => props.isLarge ? '250px' : '160px')
const height = computed(() => props.isLarge ? '350px' : '200px')
</script>

<style scoped>
.album-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #333;
  background-color: var(--background-button);
  width: v-bind(width);
  height: v-bind(height);
  cursor: pointer;
  transition: all 0.25s;
  font-size: 5rem;
  font-family: fantasy;
  font-variant-numeric: tabular-nums;
  user-select: none;
}

.album-item-active {
  background-color: #646cff;
}

.album-item:hover {
  border-color: #646cff;
}
</style>
