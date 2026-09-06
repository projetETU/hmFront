<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
 
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full table-fixed">
        <colgroup>
          <col class="w-[20%]" />
          <col class="w-[25%]" />
          <col class="w-[20%]" />
          <col class="w-[20%]" />
          <col class="w-[25%]" />
        </colgroup>
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Designation</p>
            </th>
            <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Prix Unitaire</p>
            </th>
            <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Quantité</p>
            </th>
            <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Total</p>
            </th>

              <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date</p>
            </th>

                <th class="px-5 py-3 text-right sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
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
          
            >

            <td class="px-5 py-4 sm:px-6">
              <span class="block font-black text-xl text-gray-800 text-theme-sm dark:text-white/90">
                {{ achat.designation.name }}
              </span>
            </td>

            <td class="px-5 py-4 sm:px-6 text-right">
              <span class="text-gray-700 text-theme-sm font-bold dark:text-gray-300">
              {{ achat.prixUnitaire.toLocaleString('fr-FR') }} Ar
              </span>
            </td>

            <td class="px-10 py-8 sm:px-6 text-right">
              <span class="text-theme-sm font-bold">
                 {{ achat.quantite.toLocaleString('fr-FR') + ' ' + achat.designation.uniter.name }}
              </span>
            </td>

            <td class="px-10 py-8 sm:px-6 text-right">
              <span class="text-theme-sm font-bold"
                >
                {{ (achat.prixUnitaire * achat.quantite).toLocaleString('fr-FR') }} Ar
              </span>
            </td>

             <td class="px-10 py-8 sm:px-6 text-right">
              <span class="text-theme-sm font-bold">
              {{$dayjs(achat.achat.dateAchat).format('D MMM YYYY')}}
              </span>
            </td>


                <td class="px-10 py-8 sm:px-6 text-right">
              <span class=" text-theme-sm font-medium"
                >
                <div class="flex space-x-2 justify-end">
                <Button variant="outline" size="sm" @click="handleClick(achat)">
                  <DollarSign  class="inline-block w-4 h-4 mr-1" />
                  Payer
                </Button>

                  <Button variant="outlineRed" size="sm" @click="handleClick(achat)">
                  <X  class="inline-block w-4 h-4 mr-1" />
                  Annuler
                </Button>
                </div>
              </span>
            </td>

          </tr>

          <tr v-if="!loading && filteredData.length === 0">
            <td colspan="4" class="px-5 py-8 sm:px-6 text-center">
              <p class="text-gray-500 dark:text-gray-400 text-theme-sm">Aucun résultat trouvé</p>
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
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { DollarSign, X } from 'lucide-vue-next'


const props = defineProps<{
  fournisseur: string
}>()

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
console.log(props.fournisseur);


async function fetchAchats() {
  loading.value = true
  try {
    const response = await api.get('/api/achat/parFournisseur' , 
      { params : { fournisseur : props.fournisseur } }
    )
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

// const totalMontant = computed(() =>
//   filteredData.value.reduce((sum, a) => sum + a.totalMontant, 0)
// )
// const totalPayer = computed(() =>
//   filteredData.value.reduce((sum, a) => sum + a.payer, 0)
// )
// const totalRestant = computed(() =>
//   filteredData.value.reduce((sum, a) => sum + a.restant, 0)
// )

// function resetFilters() {
//   filters.value = { fournisseur: '' }
// }

function handleClick(achat: AchatParFournisseur)
{
    router.push({ name: 'AchatDetails', params: { fournisseur : achat.fournisseur } });
}
</script>