<template>
  <div class="container">
    <AlbumProgress />

    <div class="albums">
      <Album :columns="albumColumns">
        <AlbumItem
          v-for="item in albumItems"
          :key="item"
          @click="toggleAlbumItem(item)"
          :active="hasAlbumItem(item)"
          :is-large="albumColumns === AlbumSize.Two"
        >
          {{ item }}
        </AlbumItem>
      </Album>

      <Album :columns="albumColumns">
        <AlbumItem
          v-for="item in albumItems.map((item) => item + pagination.perPage)"
          :key="item"
          @click="toggleAlbumItem(item)"
          :active="hasAlbumItem(item)"
          :is-large="albumColumns === AlbumSize.Two"
        >
          {{ item }}
        </AlbumItem>
      </Album>
    </div>

    <AlbumButtons />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import Album from './components/album/album.vue'
import AlbumItem from './components/album/album-item.vue'
import AlbumButtons from './components/album/album-buttons.vue'
import AlbumProgress from './components/album/album-progress.vue'

import { useAlbum } from './composables/use-album'
import { AlbumSize, useAlbumColumn } from './composables/use-album-column'
import { usePagination } from './composables/use-pagination'

const { albumItems, toggleAlbumItem, hasAlbumItem } = useAlbum()
const { albumColumns, updateAlbumColumns } = useAlbumColumn()
const { pagination } = usePagination()

onMounted(updateAlbumColumns)
</script>

<style scoped>
.container {
  display: flex;
  gap: 24px;
  padding: 8px;
  width: 100%;
  flex-direction: column;
}

.albums {
  display: flex;
  gap: 16px;
}
</style>
