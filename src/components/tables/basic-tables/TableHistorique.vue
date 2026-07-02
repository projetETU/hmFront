<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    
    <div class="border-b border-gray-200 dark:border-gray-700 px-5 py-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div class="relative">
          <Input
            v-model="filters.date"
            type="dateTime-local"
            placeholder="Date commande..."
            class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          />
        </div>
        <div class="relative">
          <Input
            v-model="filters.numeroFacture"
            type="text"
            placeholder="Numéro facture..."
            class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          />
        </div>

        

        <div class="relative">
          <select
            v-model="filters.etat"
            class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors appearance-none"
          >
            <option value="">Tous les statuts</option>
            <option value="PAYER">Payé</option>
            <option value="VALIDER">Validé</option>
            <option value="EN_ATTENTE">En attente</option>
            <option value="ANNULER">Annulé</option>
          </select>
          <svg class="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>

        <div class="relative">
          <button
            @click="resetFilters"
            class="w-full h-11 px-3 py-2 text-theme-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
   
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Client</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Numero facture</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date commande</p>
            </th>

            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Statut</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="datas in filteredData" :key="datas.id"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/100  transition-colors duration-200">
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">

                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ datas.client?.name ? datas.client.name : 'N/A' }}
                  </span>
                  <span v-if="datas.pointVente?.name" class="block text-gray-500 text-theme-xs dark:text-gray-400">
                    {{ datas.pointVente.name }}
                  </span>
                </div>
              </div>
            </td>

            <td class="sm:px-6 text-gray-500 text-theme-sm dark:text-gray-400">
              <p>{{ datas.numeroFacture ? datas.numeroFacture : 'N/A' }}</p>
            </td>
            <td class="sm:px-6 text-gray-500 text-theme-sm dark:text-gray-400">
              <p>{{ $dayjs(datas.dateCommande).format('D MMM YYYY') }}</p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span :class="[
                'rounded-full  px-2 py-0.5 text-theme-xs font-medium',
                {
                  'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                    datas.etat === 'PAYER',
                  'bg-blue-50 text-green-700 dark:bg-green-500/15 dark:text-green-500':
                    datas.etat === 'VALIDER',
                  'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                    datas.etat === 'EN_ATTENTE',
                  'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                    datas.etat === 'ANNULER',
                },
              ]">
                {{ datas.etat }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex space-x-2">
                <Button variant="outline" size="sm" @click="gotoDetails(datas.id)">
                  <EyeIcon class="inline-block w-4 h-4 mr-1" />
                </Button>
                <Button variant="outline" size="sm" >
                  <Pencil class="inline-block w-4 h-4 mr-1" />
                </Button>

              </div>

            </td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td colspan="5" class="px-5 py-8 sm:px-6 text-center">
              <p class="text-gray-500 dark:text-gray-400 text-theme-sm">Aucun résultat trouvé</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { EyeIcon, Pencil } from 'lucide-vue-next';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import router from '@/router';
import { useCommandeStore } from '@/stores/CommandeStore';
import { useDebounceFn } from "@vueuse/core";
import { storeToRefs } from 'pinia'; 

const commandeStore = useCommandeStore();
const { commandes, loading } = storeToRefs(commandeStore);

const filters = ref({
  client: '',
  numeroFacture: '',
  date: '',
  etat: '',
});

onMounted(async () => {
  await commandeStore.fetchCommandesRecherche();
});

const debouncedFetchCommandes = useDebounceFn(async () => {

    const date = filters.value.date
    ? filters.value.date.split('T')[0]
    : undefined;

  await commandeStore.fetchCommandesRecherche(
    filters.value.numeroFacture || undefined,
    date || undefined
  );
}, 500);

watch(() => [filters.value.numeroFacture, filters.value.date], () => {
  debouncedFetchCommandes();
});

const filteredData = computed(() => {
  return commandes.value.filter((datas: any) => { // 👈 commandes.value
    const clientMatch = !filters.value.client ||
      (datas.client?.name?.toLowerCase().includes(filters.value.client.toLowerCase()) ?? false);
    const etatMatch = !filters.value.etat || datas.etat === filters.value.etat;
    return clientMatch && etatMatch;
  });
});


function gotoDetails(id: number) {
  router.push({ name: 'CommandeDetails', params: { id } });
}

function resetFilters() {
  filters.value = { client: '', numeroFacture: '', date: '', etat: '' };
  commandeStore.fetchCommandesRecherche();
}
</script>