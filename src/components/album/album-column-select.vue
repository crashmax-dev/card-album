<template>
  <select v-model="albumColumns" @update:model-value="updateAlbumColumns">
    <option v-for="option of AlbumOptions" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { AlbumOptions, useAlbumColumn } from '@/composables/use-album-column'

const { albumColumns, updateAlbumColumns } = useAlbumColumn()
</script>
