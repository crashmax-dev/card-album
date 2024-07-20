<template>
  <div class="album-buttons">
    <Pagination />
    <div class="album-actions">
      <button @click="clearAlbum">Очистить</button>
      <AlbumColumnSelect />
      <button @click="toggleRecognition">🎤</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from './pagination.vue'
import AlbumColumnSelect from './album-column-select.vue'

import { useAlbum } from '../composables/use-album'
import { useRecognition } from '../composables/use-recognition'

const { toggleRecognition } = useRecognition()
const { clearAlbum } = useAlbum()
</script>

<style scoped lang="scss">
.album-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.album-actions {
  display: flex;
  gap: 8px;
}
</style>
