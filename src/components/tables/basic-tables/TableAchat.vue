<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

    <div class="border-b border-gray-200 dark:border-gray-700 px-5 py-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div class="relative">
          <Input v-model="filters.fournisseur" type="text" placeholder="Nom fournisseur..."
            class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors" />
        </div>

        <div class="relative">
          <button @click="resetFilters"
            class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium">
            Réinitialiser
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full table-fixed">
        <colgroup>
          <col class="w-[30%]" />
          <col class="w-[25%]" />
          <col class="w-[20%]" />
          <col class="w-[25%]" />
        </colgroup>
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Fournisseur</p>
            </th>
            <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Total Montant</p>
            </th>
            <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Payé</p>
            </th>
            <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Restant</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

          <tr v-if="loading">
            <td colspan="4" class="px-5 py-8 sm:px-6 text-center">
              <p class="text-gray-500 dark:text-gray-400 text-theme-sm">Chargement...</p>
            </td>
          </tr>

          <tr v-for="achat in filteredData" :key="achat.fournisseur"
            class="cursor-pointer border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/100 transition-colors duration-200"
           @click="handleClick(achat)"
            >

            <td class="px-5 py-4 sm:px-6">
              <span class="block font-black text-xl text-gray-800  dark:text-white/90">
                {{ achat.fournisseur }}
              </span>
            </td>

            <td class="px-5 py-4 sm:px-6 text-right">
              <span class="text-gray-700 text-theme-sm dark:text-gray-300">
                {{ achat.totalMontant.toLocaleString('fr-FR') }} Ar
              </span>
            </td>

            <td class="px-10 py-8 sm:px-6 text-right">
              <span class="text-theme-sm font-medium text-green-600 dark:text-green-400">
                {{ achat.payer.toLocaleString('fr-FR') }} Ar
              </span>
            </td>

            <td class="px-10 py-8 sm:px-6 text-right">
              <span class="text-theme-sm font-medium"
                :class="achat.restant > 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'">
                {{ achat.restant.toLocaleString('fr-FR') }} Ar
              </span>
            </td>

          </tr>

          <tr v-if="!loading && filteredData.length === 0">
            <td colspan="4" class="px-5 py-8 sm:px-6 text-center">
              <p class="text-gray-500 dark:text-gray-400 text-theme-sm">Aucun résultat trouvé</p>
            </td>
          </tr>

        </tbody>

       
        <tfoot v-if="!loading && filteredData.length > 0"
          class="border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <td class="px-10 py-6 sm:px-6 text-theme-sm  text-gray-700 dark:text-white">
              Total 
            </td>
            <td class="px-5 py-3 sm:px-6 text-right text-theme-sm font-semibold text-gray-700 dark:text-white">
              {{ totalMontant.toLocaleString('fr-FR') }} Ar
            </td>
            <td class="px-5 py-3 sm:px-6 text-right text-theme-sm font-semibold text-green-600 dark:text-green-400">
              {{ totalPayer.toLocaleString('fr-FR') }} Ar
            </td>
            <td class="px-5 py-3 sm:px-6 text-right text-theme-sm font-semibold text-red-500 dark:text-red-400">
              {{ totalRestant.toLocaleString('fr-FR') }} Ar
            </td>
          </tr>
        </tfoot><statistics-chart />

      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Input from '@/components/ui/input/Input.vue'
import api from '@/api/api'
import { useRouter } from 'vue-router'

interface AchatParFournisseur {
  fournisseur: string
  totalMontant: number
  payer: number
  restant: number
}


const achats = ref<AchatParFournisseur[]>([])
const loading = ref(false)

const router = useRouter();

const filters = ref({
  fournisseur: '',
})

async function fetchAchats() {
  loading.value = true
  try {
    const response = await api.get('/api/achat/all')
    achats.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des achats:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchAchats()
})

const filteredData = computed(() => {
  return achats.value.filter((achat) => {
    return !filters.value.fournisseur ||
      achat.fournisseur?.toLowerCase().includes(filters.value.fournisseur.toLowerCase())
  })
})

const totalMontant = computed(() =>
  filteredData.value.reduce((sum, a) => sum + a.totalMontant, 0)
)
const totalPayer = computed(() =>
  filteredData.value.reduce((sum, a) => sum + a.payer, 0)
)
const totalRestant = computed(() =>
  filteredData.value.reduce((sum, a) => sum + a.restant, 0)
)

function resetFilters() {
  filters.value = { fournisseur: '' }
}

function handleClick(achat: AchatParFournisseur)
{
    router.push({ name: 'AchatDetails', params: { fournisseur : achat.fournisseur } });
}
</script>