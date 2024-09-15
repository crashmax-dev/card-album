<template>
  <div class="album-buttons">
    <Pagination />
    <div class="album-actions">
      <button @click="clearAlbum">Очистить</button>
      <AlbumColumnSelect />
      <select v-model="activeCollection" placeholder="Выберите коллекцию">
        <option value="" disabled selected>
          Выберите коллекцию
        </option>
        <option
          v-for="[value, label] of Object.entries(availableCollections)"
          :key="value"
          :value="value"
        >
          {{ label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from '../pagination.vue'
import AlbumColumnSelect from './album-column-select.vue'

import { useAlbum } from '@/composables/use-album'
import { useCollections } from '@/composables/use-collections'
// import { useRecognition } from '@/composables/use-recognition'

// const { toggleRecognition } = useRecognition()
const { clearAlbum } = useAlbum()

const { availableCollections, activeCollection } = useCollections()
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

option[value=""][disabled] {
  display: none;
}
</style>
