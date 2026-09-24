<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

    <div class="border-b border-gray-200 dark:border-gray-700 px-5 py-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input v-model="filters.article" type="text" placeholder="Nom de l'article..."
          class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-white" />

        <button @click="resetFilters"
          class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
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
                Refference achat
              </p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                Article
              </p>
            </th>

            <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                Quantité
              </p>
            </th>

            <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                Departement
              </p>
            </th>

            <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                Date 
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
          <tr v-for="Historique in filteredData" :key="Historique.article"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/100  transition-colors duration-200"
           >
            <td class="px-5 py-4 sm:px-6">
              {{ Historique}}

            </td>

            <td class="px-5 py-4 sm:px-6 text-right">
              {{ Number(Historique.quantite ?? 0).toLocaleString() + " " + Historique.uniter }}
            </td>

            <td class="px-5 py-4 sm:px-6 text-right">
              {{ Historique.date }}
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

interface HistoriqueInterface {
  referenceAchat: string
  article: string
  categorie: string
  quantite: number
  uniter: string
  departement: string
  date: string
}

const Historique = ref<HistoriqueInterface[]>([])
const loading = ref(false)

const filters = ref({
  article: '',
})

async function fetchHistorique() {
  loading.value = true

  try {
    const response = await api.get('api/mouvement-stock/historique-mouvement-stock-ingredients')
    Historique.value = response.data.content
  } catch (error) {
    console.error('Erreur lors du chargement du stock :', error)
  } finally {
    loading.value = false
  }
}
console.log(Historique);

onMounted(fetchHistorique)

const filteredData = computed(() => {
  return Historique.value.filter((item) =>
    !filters.value.article ||
    item.article.toLowerCase().includes(filters.value.article.toLowerCase())
  )
})

function resetFilters() {
  filters.value.article = ''
}
</script>