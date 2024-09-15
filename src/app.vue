<template>
  <div class="container">
    <AlbumProgress />

    <div class="albums">
      <template v-for="(page, key) of albumPages" :key="key">
        <Album v-if="page.length" :columns="albumColumns">
          <TransitionGroup name="left">
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

.right-move,
.right-enter-active,
.right-leave-active {
  transition: all .5s ease;
}
.right-enter-from,
.right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.right-leave-active {
  position: absolute;
  transform: translateY(-300px);
}

.left-move,
.left-enter-active,
.left-leave-active {
  transition: all .5s ease;
}
.left-enter-from,
.left-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.left-leave-active {
  position: absolute;
  transform: translateY(-300px);
}
</style>
