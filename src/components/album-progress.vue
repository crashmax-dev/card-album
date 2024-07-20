<template>
  <div class="progress-container">
    <div class="progress-counter">
      <span>{{ albumCounter }}</span>
      <span>{{ totalItems }}</span>
    </div>

    <div class="progress-bar">
      <div class="filled" :style="{ width: `${progressPercentage}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAlbum } from '../composables/use-album'
import { usePagination } from '../composables/use-pagination'

const { album } = useAlbum()
const { totalItems } = usePagination()

const albumCounter = computed(() => album.value.length)
const progressPercentage = computed(() => (albumCounter.value / totalItems.value) * 100)
</script>

<style scoped>
.progress-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-counter {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
}

.progress-bar {
  background-color: var(--background-button);
  border-radius: 8px;
  overflow: hidden;
  height: 1em;
  outline: 1px solid var(--background);
}

.filled {
  height: inherit;
  background-color: var(--main-color);
  transition: all 0.25s;
}
</style>
