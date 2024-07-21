<template>
  <div :class="['album-item', { 'album-item-active': active }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean
}>()
</script>

<style scoped>
.album-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #333;
  background-color: var(--background-button);
  width: 100%;
  height: 200px;
  cursor: pointer;
  transition: all 0.25s;
  font-size: 5rem;
  font-family: fantasy;
  font-variant-numeric: tabular-nums;
  user-select: none;
}

.album-item-active {
  background-color: var(--main-color);
}

.album-item:hover {
  border-color: var(--main-color);
}
</style>
