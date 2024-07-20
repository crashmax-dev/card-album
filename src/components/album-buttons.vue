<template>
  <div class="album-buttons">
    <Pagination />
    <div class="album-actions">
      <button @click="clearAlbum">Очистить альбом ({{ albumCounter }})</button>
      <AlbumColumnSelect />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbum } from '../composables/use-album';
import Pagination from './pagination.vue'
import { usePagination } from '../composables/use-pagination';
import AlbumColumnSelect from './album-column-select.vue';

const { pagination } = usePagination()
const { album, clearAlbum } = useAlbum()

const albumCounter = computed(() => {
  return `${album.value.length} / ${pagination.perPage * pagination.totalPages}`
})
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
