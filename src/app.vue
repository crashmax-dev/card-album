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
    </div>

    <AlbumButtons />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import Album from './components/album.vue'
import AlbumItem from './components/album-item.vue'
import AlbumButtons from './components/album-buttons.vue'
import AlbumProgress from './components/album-progress.vue'

import { useAlbum } from './composables/use-album'
import { AlbumSize, useAlbumColumn } from './composables/use-album-column'

const { albumItems, toggleAlbumItem, hasAlbumItem } = useAlbum()
const { albumColumns, updateAlbumColumns } = useAlbumColumn()

onMounted(updateAlbumColumns)
</script>

<style scoped>
.container {
  display: flex;
  gap: 24px;
  padding: 8px;
  width: 100%;
  max-height: 100vh;
  overflow: auto;
  scrollbar-width: none;
  flex-direction: column;
}

.albums {
  display: flex;
  gap: 16px;
}
</style>
