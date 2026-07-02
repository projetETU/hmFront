<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />
        <Alert :variant="alertVariant" class="mb-4" v-if="openAlert">
            <KeyRoundIcon />
            <AlertTitle>{{ alertTitle }}</AlertTitle>
            <AlertDescription>
                {{ message }}
            </AlertDescription>
        </Alert>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">

            <div
                class="rounded-2xl  border w-100 border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
                <span class="text-lg font-bold  text-gray-500 dark:text-gray-400">Nouveau produit</span>
                <div class="justify-between">

                    <div class="flex grid-cols-2 gap-2 w-full">
                        <Input class=" h-11" v-model="produitName" placeholder="Nom produit"></Input>

                        <Popover v-model:open="openuniter">
                            <PopoverTrigger as-child>
                                <Button variant="outline" role="combobox" :aria-expanded="openuniter"
                                    class="h-11 font-normal text-sm transition-all duration-200" :class="[
                                        selecteduniter
                                            ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                                            : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                    ]">
                                    <div class="flex items-center gap-2.5 truncate">
                                        <span :class="[
                                            'text-sm transition-colors truncate',
                                            selecteduniter
                                                ? 'text-gray-900 dark:text-white font-medium'
                                                : 'text-gray-500 dark:text-slate-400'
                                        ]">
                                            {{ selecteduniter?.label || "Sélectionner un uniter" }}
                                        </span>
                                    </div>
                                    <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-full p-0">
                                <Command>
                                    <CommandInput class="h-9" placeholder="Rechercher un uniter..." />
                                    <CommandList>
                                        <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun uniter
                                            trouvé.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem v-for="uniter in uniters" :key="uniter.value"
                                                :value="uniter.value"
                                                @select="() => { uniterValue = uniter.value; openuniter = false }"
                                                class="cursor-pointer">
                                                <span class="truncate">{{ uniter.label }}</span>
                                                <CheckIcon :class="[
                                                    'ml-auto w-4 h-4 transition-opacity',
                                                    uniterValue === uniter.value ? 'opacity-100' : 'opacity-0'
                                                ]" />
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div class="flex items-end justify-between mt-2">
                        <div class="w-full">
                            <Popover v-model:open="opencategorie">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" role="combobox" :aria-expanded="opencategorie"
                                        class="h-11 w-full font-normal text-sm transition-all duration-200" :class="[
                                            selectedcategorie
                                                ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                                                : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                        ]">
                                        <div class="flex items-center gap-2.5 truncate">
                                            <span :class="[
                                                'text-sm transition-colors truncate',
                                                selectedcategorie
                                                    ? 'text-gray-900 dark:text-white font-medium'
                                                    : 'text-gray-500 dark:text-slate-400'
                                            ]">
                                                {{ selectedcategorie?.label || "Sélectionner un categorie" }}
                                            </span>
                                        </div>
                                        <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-0">
                                    <Command>
                                        <CommandInput class="h-9" placeholder="Rechercher un categorie..." />
                                        <CommandList>
                                            <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun categorie
                                                trouvé.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="categorie in categories" :key="categorie.value"
                                                    :value="categorie.value"
                                                    @select="() => { categorieValue = categorie.value; opencategorie = false }"
                                                    class="cursor-pointer">
                                                    <span class="truncate">{{ categorie.label }}</span>
                                                    <CheckIcon :class="[
                                                        'ml-auto w-4 h-4 transition-opacity',
                                                        categorieValue === categorie.value ? 'opacity-100' : 'opacity-0'
                                                    ]" />
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <Button :onClick="createProduit"
                        class="mt-3 h-11 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800">
                        <MapPin></MapPin>
                        Creer
                    </Button>

                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import Input from "@/components/ui/input/Input.vue";
import api from "@/api/api";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { KeyRoundIcon, ChevronsUpDownIcon, CheckIcon } from '@lucide/vue';
import {
    Command, CommandEmpty, CommandGroup,
    CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';
import {
    Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { MapPin } from "lucide-vue-next";

const currentPageTitle = ref("Produit");
const openAlert = ref(false);

const produitName = ref("");
const adresse = ref("");
const codeMagasin = ref("");

const uniters = ref([]);
const uniterValue = ref('');
const openuniter = ref(false);
const selecteduniter = computed(() => uniters.value.find(c => c.value === uniterValue.value));

const opencategorie = ref(false);
const categorieValue = ref('');
const categories = ref([]);
const selectedcategorie = computed(() => categories.value.find(q => q.value === categorieValue.value));

const message = ref("");
const alertTitle = ref("Succès");
type AlertVariant = "success" | "default" | "primary" | "destructive" | null | undefined;
const alertVariant = ref<AlertVariant>("success");

const createProduit = async () => {
    console.log(categorieValue.value);
    
    try {
        const response = await api.post("/api/produit/create", {
          name  :   produitName.value , 
          uniter_id : uniterValue.value , 
          categorie_id : categorieValue.value
          
        });
        alertTitle.value = "Succès";
        alertVariant.value = "success";
        openAlert.value = true;
        message.value = response?.data?.message || "Produit créé avec succès.";

    } catch (error) {
        message.value = error.response?.data?.message || "Une erreur est survenue lors de la création.";
        alertTitle.value = "Erreur";
        alertVariant.value = "destructive";
        openAlert.value = true;
        return;
    } finally {
        setTimeout(() => { openAlert.value = false; }, 3000);
        produitName.value = "";
        adresse.value = "";
        categorieValue.value = "";
        codeMagasin.value = "";
    }
};

async function fetchuniters() {
    try {
        const response = await api.get('api/uniter/all');
        uniters.value = response.data.data.map((uniter: any) => ({
            value: uniter.id,
            label: uniter.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des uniters:", error);
    }
}
async function fetchcategorie() {
    try {
        const response = await api.get('api/categorie/all');
        categories.value = response.data.map((categorie: any) => ({
            value: categorie.id,
            label: categorie.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des categories:", error);
    }
}


fetchuniters();
fetchcategorie();
</script>