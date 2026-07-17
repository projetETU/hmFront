<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <!-- Alerte de succès -->
    <Alert variant="success" class="mb-6" v-if="openSuccessAlert">
      <KeyRoundIcon />
      <AlertTitle>Succès</AlertTitle>
      <AlertDescription>
        La commande a été créée avec succès.
      </AlertDescription>
    </Alert>

    <Alert variant="destructive" class="mb-6" v-if="openErrorAlert">
      <AlertCircle />
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription>
        {{ message }}
      </AlertDescription>
    </Alert>


    <!-- Conteneur principal -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3 items-start">
      <!-- Colonne principale: Formulaire + Catalogue -->
      <div class="col-span-2 flex flex-col gap-6">

        <!-- ===== SECTION FORMULAIRE ===== -->
        <div
          class="bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm backdrop-blur-sm overflow-hidden">

          <!-- En-tête du formulaire -->
          <div
            class="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-transparent dark:from-slate-700/50">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Informations de commande</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sélectionnez le client et le point de vente</p>
          </div>


          <!-- Section 1: Client et Point de Vente -->
          <div class="p-6 space-y-4 border-b border-gray-100 dark:border-slate-700">
            <div class="flex items-center gap-3">
              <Checkbox id="terms" :checked="isEchange" @click="isEchange = !isEchange" />
              <Label for="terms">Echange ??</Label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

              <!-- Client -->
              <div class="flex flex-col gap-2.5">
                <label class="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <UserIcon class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Client
                </label>
                <Popover v-model:open="openClient">
                  <PopoverTrigger as-child>
                    <Button variant="outline" role="combobox" :aria-expanded="openClient"
                      class="h-11 w-full justify-between font-normal text-sm transition-all duration-200" :class="[
                        selectedClient
                          ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                          : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                      ]">
                      <div class="flex items-center gap-2.5 truncate">
                        <div :class="[
                          'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all',
                          selectedClient
                            ? 'bg-blue-600 dark:bg-blue-500'
                            : 'bg-gray-100 dark:bg-slate-700'
                        ]">
                          <UserIcon :class="[
                            'w-3.5 h-3.5',
                            selectedClient
                              ? 'text-white'
                              : 'text-gray-400 dark:text-slate-500'
                          ]" />
                        </div>
                        <span :class="[
                          'text-sm transition-colors truncate',
                          selectedClient
                            ? 'text-gray-900 dark:text-white font-medium'
                            : 'text-gray-500 dark:text-slate-400'
                        ]">
                          {{ selectedClient?.label || "Sélectionner un client" }}
                        </span>
                      </div>
                      <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-full p-0">
                    <Command>
                      <CommandInput class="h-9" placeholder="Rechercher un client..." />
                      <CommandList>
                        <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun client trouvé.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem v-for="client in clients" :key="client.value" :value="client.value"
                            @select="() => { clientValue = client.value; openClient = false }" class="cursor-pointer">
                            <span class="truncate">{{ client.label }}</span>
                            <CheckIcon :class="[
                              'ml-auto w-4 h-4 transition-opacity',
                              clientValue === client.value ? 'opacity-100' : 'opacity-0'
                            ]" />
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <!-- Point de vente -->
              <div class="flex flex-col gap-2.5">
                <label class="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <StoreIcon class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Point de Vente
                </label>
                <Popover v-model:open="openPdv">
                  <PopoverTrigger as-child>
                    <Button variant="outline" role="combobox" :aria-expanded="openPdv"
                      class="h-11 w-full justify-between font-normal text-sm transition-all duration-200" :class="[
                        selectedPdv
                          ? 'border-emerald-300 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 hover:border-emerald-400'
                          : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                      ]">
                      <div class="flex items-center gap-2.5 truncate">
                        <div :class="[
                          'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all',
                          selectedPdv
                            ? 'bg-emerald-600 dark:bg-emerald-500'
                            : 'bg-gray-100 dark:bg-slate-700'
                        ]">
                          <StoreIcon :class="[
                            'w-3.5 h-3.5',
                            selectedPdv
                              ? 'text-white'
                              : 'text-gray-400 dark:text-slate-500'
                          ]" />
                        </div>
                        <span :class="[
                          'text-sm transition-colors truncate',
                          selectedPdv
                            ? 'text-gray-900 dark:text-white font-medium'
                            : 'text-gray-500 dark:text-slate-400'
                        ]">
                          {{ selectedPdv?.label || "Sélectionner un PDV" }}
                        </span>
                      </div>
                      <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-full p-0">
                    <Command>
                      <CommandInput class="h-9" placeholder="Rechercher un PDV..." />
                      <CommandList>
                        <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun point de vente trouvé.
                        </CommandEmpty>
                        <CommandGroup>
                          <CommandItem v-for="pdv in pointsDeVente" :key="pdv.value" :value="pdv.value"
                            @select="() => { pdvValue = pdv.value; openPdv = false }" class="cursor-pointer">
                            <span class="truncate">{{ pdv.label }}</span>
                            <CheckIcon :class="[
                              'ml-auto w-4 h-4 transition-opacity',
                              pdvValue === pdv.value ? 'opacity-100' : 'opacity-0'
                            ]" />
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <!-- Section 2: Date et Bon de commande -->
          <div class="p-6 space-y-4 border-b border-gray-100 dark:border-slate-700">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

              <!-- Bon de commande -->
              <div class="flex flex-col gap-2.5">
                <label class="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <FileTextIcon class="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Bon de Commande
                </label>
                <Input v-model="bonCommande"
                  class="h-11 bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 text-sm placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-colors focus:border-purple-300 dark:focus:border-purple-600 focus:bg-white dark:focus:bg-slate-700"
                  placeholder="Numéro de bon..." />
              </div>

              <!-- Date -->
              <div class="flex flex-col gap-2.5">
                <label class="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <CalendarIcon class="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  Date de Commande
                </label>
                <Popover>
                  <PopoverTrigger as-child>
                    <Button variant="outline"
                      class="h-11 justify-between font-normal text-sm bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700">
                      <span class="text-gray-700 dark:text-gray-300">
                        {{ date.toString().slice(0, 10) }}
                      </span>
                      <CalendarIcon class="w-4 h-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0" align="start">
                    <Calendar v-model="date" class="rounded-md" :min-value="new CalendarDate(1925, 1, 1)"
                      :max-value="new CalendarDate(2035, 1, 1)" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        <!-- ===== SECTION CATALOGUE ===== -->
        <div
          class="bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm backdrop-blur-sm overflow-hidden">

          <!-- En-tête Catalogue -->
          <div
            class="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-transparent dark:from-slate-700/50">
            <div class="flex items-center justify-between gap-4 mb-4">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">Catalogue</h2>
              <span
                class="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                {{ catalogue.length }} produits
              </span>
            </div>

            <!-- Recherche -->
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input v-model="searchQuery" type="text" placeholder="Rechercher un produit..."
                class="w-full h-11 pl-9 pr-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-sm placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-colors" />
            </div>

            <!-- Catégories -->
            <div class="flex gap-2 mt-4 overflow-x-auto pb-2">
              <button v-for="cat in categories" :key="cat.value" @click="selectedcategorie = cat.value" :class="[
                'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0',
                selectedcategorie === cat.value
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700/50'
              ]">
                {{ cat.label }}
              </button>
            </div>
          </div>

          <!-- Grille de produits -->
          <div class="p-6">
            <div v-if="filteredProducts.length === 0" class="text-center py-12">
              <SearchIcon class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p class="text-gray-500 dark:text-gray-400 text-sm">Aucun produit trouvé</p>
            </div>

            <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <button v-for="product in filteredProducts" :key="product.id" @click="addToOrder(product)" :class="[
                'group relative flex flex-col gap-2 p-3 rounded-xl border transition-all duration-150 text-left hover:shadow-md',
                getItemQuantity(product.id) > 0
                  ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-950/20'
                  : 'border-gray-200 bg-white hover:border-gray-300 dark:border-slate-700 dark:bg-slate-800/30 dark:hover:border-slate-600'
              ]">
                <!-- Badge quantité -->
                <span v-if="getItemQuantity(product.id) > 0"
                  class="absolute top-2 right-2 min-w-[20px] h-[20px] px-1.5 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {{ getItemQuantity(product.id) }}
                </span>

                <!-- Emoji -->
                <span class="text-2xl">{{ product.emoji }}</span>

                <!-- Nom et Prix -->
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-gray-900 dark:text-white truncate leading-tight">
                    {{ product.name }}
                  </p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                    {{ product.prix.toLocaleString('fr-FR') }} Ar
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>
      <div class="col-span-1">
        <div
          class="bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm backdrop-blur-sm overflow-hidden sticky top-6 flex flex-col">


          <div
            class="px-5 py-4 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-transparent dark:from-slate-700/50">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <h3 class="font-bold text-sm text-gray-900 dark:text-white truncate">
                  {{ selectedPdv?.label || "Point de vente" }}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                  {{ selectedClient?.label || "Aucun client" }}
                </p>
              </div>
              <span v-if="items.length > 0"
                class="shrink-0 text-[11px] font-bold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                {{ items.length }}
              </span>
            </div>
          </div>

          <!-- Liste articles -->
          <div class="flex-1 flex flex-col overflow-y-auto max-h-[350px]">
            <div v-if="items.length === 0" class="flex flex-col items-center justify-center gap-3 py-10 px-5">
              <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-700/50 flex items-center justify-center">
                <ShoppingCartIcon class="w-5 h-5 text-gray-400" />
              </div>
              <div class="text-center">
                <p class="text-xs text-gray-600 dark:text-gray-400 font-medium">Panier vide</p>
                <p class="text-[11px] text-gray-400 dark:text-gray-500 mt-1">Ajoutez des produits<br>depuis le catalogue
                </p>
              </div>
            </div>

            <div v-else class="flex flex-col divide-y divide-gray-100 dark:divide-slate-700">
              <div v-for="item in items" :key="item.id"
                class="flex items-center gap-2.5 px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                <!-- Emoji -->
                <span class="text-lg shrink-0 w-6 text-center">{{ item.emoji }}</span>

                
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-gray-800 dark:text-white truncate">{{ item.name }}</p>
                  <p class="text-[13px] text-gray-500 dark:text-gray-400">{{ item.prix.toLocaleString('fr-FR') }} Ar</p>
                </div>

               
                <div class="flex items-end gap-4 shrink-0">

                  <!-- Quantité -->
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Quantité
                    </label>
                    <div class="flex items-center gap-2">
                      <button @click="item.quantity > 1 ? item.quantity-- : removeItem(item.id)"
                        class="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 transition-colors text-sm font-bold">
                        −
                      </button>
                      <Input v-model.number="item.quantity" type="text" min="1"
                        class="w-10 h-11 px-0 text-center text-xs font-semibold text-gray-900 dark:text-white focus:ring-0 focus:outline-none border-0 bg-transparent" />
                      <button @click="item.quantity++"
                        class="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 transition-colors text-sm font-bold">
                        +
                      </button>
                    </div>
                  </div>

                  <!-- Remise -->
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Remise (%)
                    </label>
                    <div class="flex items-center gap-2">
                      <button @click="item.remise = Math.max(0, (item.remise || 0) - 1)"
                        class="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 transition-colors text-sm font-bold">
                        −
                      </button>
                      <Input v-model.number="item.remise" type="text" min="0" max="100"
                        class="w-10 h-11 px-0 text-center text-xs font-semibold text-gray-900 dark:text-white focus:ring-0 focus:outline-none border-0 bg-transparent" />
                      <button @click="item.remise = Math.min(100, (item.remise || 0) + 1)"
                        class="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 transition-colors text-sm font-bold">
                        +
                      </button>
                    </div>
                  </div>

                </div>

                <!-- Total ligne -->
                <span
                  class="text-xs font-semibold text-gray-900 dark:text-white whitespace-nowrap w-14 text-right shrink-0 tabular-nums">
                  {{ (item.prix * item.quantity).toLocaleString() }} Ar
                </span>
              </div>
            </div>
          </div>

         
          <div class="px-5 py-4 border-t border-gray-100 dark:border-slate-700 space-y-4 mt-auto">
            <div v-if="items.length > 0" class="space-y-2">
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>
                  {{items.reduce((s, i) => s + i.quantity, 0)}} article{{items.reduce((s, i) => s + i.quantity, 0) >
                    1 ? 's' : ''}}
                </span>
                <span>{{ total.toLocaleString() }} Ar</span>
              </div>


              <div class="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700">
                <span class="text-sm font-bold text-gray-700 dark:text-gray-200">Total</span>
                <span class="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
                  {{ total.toLocaleString() }} Ar
                </span>
              </div>
            </div>

            
            <button :disabled="items.length === 0 || !clientValue" :class="[
              'w-full h-11 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2',
              items.length > 0 && clientValue
                ? 'bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 text-white hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer'
                : 'bg-gray-100 dark:bg-slate-700/50 text-gray-400 dark:text-slate-500 cursor-not-allowed'
            ]" @click="validerCommande">
              <CheckIcon class="w-4 h-4" />
              Valider
            </button>

           
            <button v-if="items.length > 0"
              class="w-full text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2 font-medium"
              @click="clearOrder">
              Vider le panier
            </button>
          </div>
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import { CheckIcon, ChevronsUpDownIcon, UserIcon, StoreIcon, SearchIcon, ShoppingCartIcon, FileTextIcon, CalendarIcon, KeyRoundIcon, AlertCircle } from 'lucide-vue-next';
import Input from "@/components/ui/input/Input.vue";
import { Button } from '@/components/ui/button';
import {
  Command, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import type { DateValue } from '@internationalized/date'
import { CalendarDate, fromDate, getLocalTimeZone } from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'
import api from "@/api/api";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { watch } from "vue";


const currentPageTitle = ref("Commande");
const bonCommande = ref('');

const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>
const dateJava = computed(() => date.value.toString().slice(0, 10))

const clients = ref([]);
const pointsDeVente = ref([]);
const catalogue = ref([]);

interface categorie {
  value: string | number;
  label: string;
}

const categories = ref<categorie[]>([]);

async function fetchClients() {
  try {
    const response = await api.get('api/client/all');
    clients.value = response.data.data.map((client: any) => ({
      value: client.id,
      label: client.name,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error);
  }
}

async function fetchPointsDeVente() {
  try {
    const response = await api.get('api/point-de-vente/all');
    pointsDeVente.value = response.data.data.map((pdv: any) => ({
      value: pdv.id,
      label: pdv.name,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des points de vente:", error);
  }
}

async function fetchCategories() {
  try {
    const response = await api.get('api/article-categorie/all');
    categories.value = [
      { value: 'all', label: 'Tout' },
      ...response.data.data.map((cat: any) => ({
        value: cat.name,
        label: cat.name,
      }))
    ];
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories d'articles:", error);
  }
}

const categorieEmojis: Record<string, string> = {
  'samboss': '',
  'panini': '',
  'char siu': '',
  'pain': '',
  'salade': '',
};

function getEmojiForcategorie(categorieName: string): string {
  const key = categorieName.toLowerCase().trim();
  return categorieEmojis[key] ?? '';
}

async function fetchArticles() {
  try {
    const response = await api.get('api/article/all');
    catalogue.value = response.data.data.map((article: any) => ({
      id: article.id,
      name: article.name,
      prix: article.prix,
      categorie: article.categorie,
      emoji: getEmojiForcategorie(article.categorie ?? ''),
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
  }
}


fetchClients();
fetchPointsDeVente();
fetchCategories();
fetchArticles();


const openClient = ref(false);
const openPdv = ref(false);
const clientValue = ref('');
const pdvValue = ref('');
const searchQuery = ref('');
const selectedcategorie = ref('all');
const openSuccessAlert = ref(false);
const openErrorAlert = ref(false);
const message = ref('');
const isEchange = ref(false)

watch(isEchange, (newVal) => {
  console.log('isEchange changed:', newVal)
})


const selectedClient = computed(() => clients.value.find(c => c.value === clientValue.value));
const selectedPdv = computed(() => pointsDeVente.value.find(p => p.value === pdvValue.value));

const filteredProducts = computed(() =>
  catalogue.value.filter(p => {
    const matchCat = selectedcategorie.value === 'all' || p.categorie === selectedcategorie.value;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCat && matchSearch;
  })
);

interface OrderItem {
  id: number;
  name: string;
  prix: number;
  quantity: number;
  remise : number; 
  emoji: string;
}

const items = ref<OrderItem[]>([]);

function addToOrder(product: typeof catalogue[0]) {
  const existing = items.value.find(i => i.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    items.value.push({ ...product, quantity: 1 , remise: 0});
  }
}

function removeItem(id: number) {
  items.value = items.value.filter(item => item.id !== id);
}

function getItemQuantity(id: number): number {
  return items.value.find(i => i.id === id)?.quantity ?? 0;
}

function clearOrder() {
  items.value = [];
}

const total = computed(() =>
  items.value.reduce((sum, item) => sum + item.prix * item.quantity, 0)
);

// ===== SUBMIT =====
const sub = computed(() => isEchange.value ? 'retour' : 'create');;
async function validerCommande() {
  if (!clientValue.value || items.value.length === 0) return;
  try {
    await api.post(`api/commande/${sub.value}`, {
      client_id: clientValue.value,
      pointDeVente_id: pdvValue.value,
      commandes: items.value.map(i => ({ article_id: i.id, quantiter: i.quantity , remise: i.remise })),
      dateCommande: dateJava.value,
      bonCommande: bonCommande.value,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    openSuccessAlert.value = true;

    setTimeout(() => {
      openSuccessAlert.value = false;
    }, 3000);

    items.value = [];
    clientValue.value = '';
    pdvValue.value = '';
    bonCommande.value = '';

  } catch (error) {
    message.value = error.response?.data?.message || "Une erreur est survenue lors de la création de la commande.";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    openErrorAlert.value = true;
    setTimeout(() => {
      openErrorAlert.value = false;
    }, 6000);
  }
}
</script>

<style scoped>
:deep([role="combobox"]) {
  transition: all 0.2s ease;
}


::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

:deep(.dark) ::-webkit-scrollbar-thumb {
  background: rgba(71, 85, 105, 0.5);
}

:deep(.dark) ::-webkit-scrollbar-thumb:hover {
  background: rgba(71, 85, 105, 0.7);
}
</style>