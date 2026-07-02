<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

   <div class="border-b border-gray-200 dark:border-gray-700 px-5 py-4 sm:px-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <Input
      v-model="filters.article"
      type="text"
      placeholder="Nom de l'article..."
      class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-white"
    />

    <button
      @click="resetFilters"
      class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
    >
      Réinitialiser
    </button>
  </div>
</div>

<div class="max-w-full overflow-x-auto custom-scrollbar">
  <table class="min-w-full table-fixed">

    <thead>
         <tr class="border-b border-gray-200 dark:border-gray-700">
        <th class="px-5 py-3 text-left sm:px-6">
          <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
            Article
          </p>
        </th>

        <th class="px-5 py-3 text-right sm:px-6">
          <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
            Stock actuel
          </p>
        </th>

        <th class="px-5 py-3 text-right sm:px-6">
          <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
            Production / jour
          </p>
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

      <tr v-if="loading">
        <td colspan="3" class="text-center py-8">
          Chargement...
        </td>
      </tr>

      <tr
        v-for="stock in filteredData"
        :key="stock.article"
        class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/100  transition-colors duration-200"
        @click="handleStock(stock)"
      >
        <td class="px-5 py-4 sm:px-6">
          {{ stock.article }}
        </td>

        <td class="px-5 py-4 sm:px-6 text-right">
          {{ Number(stock.stock ?? 0).toLocaleString("fr-FR") }}
        </td>

        <td class="px-5 py-4 sm:px-6 text-right">
          {{ Number(stock.productionParJour ?? 0).toLocaleString("fr-FR") }}
        </td>
      </tr>

      <tr v-if="!loading && filteredData.length === 0">
        <td colspan="3" class="text-center py-8">
          Aucun résultat trouvé
        </td>
      </tr>

    </tbody>


  </table>
</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Input from '@/components/ui/input/Input.vue'
import api from '@/api/api'

interface StockProduction {
  articleId: number
  article: string
  stock: number
  productionParJour: number
}

const stocks = ref<StockProduction[]>([])
const loading = ref(false)

const filters = ref({
  article: '',
})

async function fetchStocks() {
  loading.value = true

  try {
    const response = await api.get('api/mouvement-stock/stockProduction')
    stocks.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement du stock :', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchStocks)

const filteredData = computed(() => {
  return stocks.value.filter((item) =>
    !filters.value.article ||
    item.article.toLowerCase().includes(filters.value.article.toLowerCase())
  )
})

const totalStock = computed(() =>
  filteredData.value.reduce(
    (sum, item) => sum + Number(item.stock ?? 0),
    0
  )
)

const totalProduction = computed(() =>
  filteredData.value.reduce(
    (sum, item) => sum + Number(item.productionParJour ?? 0),
    0
  )
)
function handleStock(stock) {
  console.log('Stock clicked:', stock.articleId)
}
function resetFilters() {
  filters.value.article = ''
}
</script>