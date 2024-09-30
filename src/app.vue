<template>
  <div class="container">
    <AlbumProgress />

    <div class="albums">
      <template v-for="(page, key) of albumPages">
        <Album v-if="page.length" :columns="albumColumns" :key="key">
          <TransitionGroup name="item">
            <AlbumItem
              v-for="item in page"
              :key="item"
              :id="item"
              @click="toggleAlbumItem(item)"
              :active="hasAlbumItem(item)"
              :is-large="albumColumns === AlbumSize.Two"
            >
              {{ item }}
            </AlbumItem>
          </TransitionGroup>
        </Album>
      </template>
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

const { albumPages, toggleAlbumItem, hasAlbumItem } = useAlbum()
const { albumColumns, updateAlbumColumns } = useAlbumColumn()

onMounted(updateAlbumColumns)
</script>

<style scoped>
.container {
  display: flex;
  gap: 32px;
  padding: 8px;
  width: 100%;
  flex-direction: column;
}

.albums {
  display: flex;
  gap: 32px;
}

.item-move,
.item-enter-active,
.item-leave-active {
  transition: all .5s ease;
}
.item-enter-from,
.item-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.item-leave-active {
  position: absolute;
  transform: translateY(-300px);
}
</style>
