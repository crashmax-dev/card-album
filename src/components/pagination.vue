<template>
  <div class="pagination">
    <button @click="prevPage" @wheel="prevPage">Назад</button>
    <select v-model="pagination.page">
      <template v-for="page in pagination.totalPages" :key="page">
        <option :value="page">
          {{ page }}
        </option>
      </template>
    </select>
    <button @click="nextPage" @wheel="nextPage">Вперед</button>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables/use-pagination'

const { pagination, nextPage, prevPage } = usePagination()
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}
</style>
