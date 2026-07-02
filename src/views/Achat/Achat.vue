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
                class="rounded-2xl border w-100 border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
                <span class="text-lg font-bold text-gray-500 dark:text-gray-400">Faire un achat</span>
                <div class="justify-between">

                    <!-- Produit (designation = Long ID) -->
                    <div class="flex grid-cols-3 gap-2 w-full mt-2">
                        <Popover v-model:open="openproduit">
                            <PopoverTrigger as-child>
                                <Button variant="outline" role="combobox" :aria-expanded="openproduit"
                                    class="h-11 w-full font-normal text-sm transition-all duration-200" :class="[
                                        selectedproduit
                                            ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                                            : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                    ]">
                                    <div class="flex items-center gap-2.5 truncate">
                                        <span :class="[
                                            'text-sm transition-colors truncate',
                                            selectedproduit
                                                ? 'text-gray-900 dark:text-white font-medium'
                                                : 'text-gray-500 dark:text-slate-400'
                                        ]">
                                            {{ selectedproduit?.label || "Sélectionner un produit" }}
                                        </span>
                                    </div>
                                    <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-full p-0">
                                <Command>
                                    <CommandInput class="h-9" placeholder="Rechercher un produit..." />
                                    <CommandList>
                                        <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun produit
                                            trouvé.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem v-for="produit in produits" :key="produit.value"
                                                :value="produit.value"
                                                @select="() => { designationValue = produit.value; openproduit = false }"
                                                class="cursor-pointer">
                                                <span class="truncate">{{ produit.label }}</span>
                                                <CheckIcon :class="[
                                                    'ml-auto w-4 h-4 transition-opacity',
                                                    designationValue === produit.value ? 'opacity-100' : 'opacity-0'
                                                ]" />
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <!-- Prix unitaire + Quantité -->
                    <div class="flex items-end gap-2 justify-between mt-2">
                        <Input class="h-11" v-model="prixUnitaire" placeholder="Prix unitaire" type="number" />
                        <Input class="h-11" v-model="quantite" placeholder="Quantité" type="number" />
                    </div>

                    <!-- Type de dépense -->
                    <!-- <div class="flex items-end justify-between mt-2">
                        <div class="w-full">
                            <Popover v-model:open="opentypeDepense">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" role="combobox" :aria-expanded="opentypeDepense"
                                        class="h-11 w-full font-normal text-sm transition-all duration-200" :class="[
                                            selectedtypeDepense
                                                ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                                                : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                        ]">
                                        <div class="flex items-center gap-2.5 truncate">
                                            <span :class="[
                                                'text-sm transition-colors truncate',
                                                selectedtypeDepense
                                                    ? 'text-gray-900 dark:text-white font-medium'
                                                    : 'text-gray-500 dark:text-slate-400'
                                            ]">
                                                {{ selectedtypeDepense?.label || "Sélectionner un type de dépense" }}
                                            </span>
                                        </div>
                                        <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-0">
                                    <Command>
                                        <CommandInput class="h-9" placeholder="Rechercher un type..." />
                                        <CommandList>
                                            <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun type
                                                trouvé.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="type in typeDepenses" :key="type.value"
                                                    :value="type.value"
                                                    @select="() => { typeDepenseValue = type.value; opentypeDepense = false }"
                                                    class="cursor-pointer">
                                                    <span class="truncate">{{ type.label }}</span>
                                                    <CheckIcon :class="[
                                                        'ml-auto w-4 h-4 transition-opacity',
                                                        typeDepenseValue === type.value ? 'opacity-100' : 'opacity-0'
                                                    ]" />
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div> -->

                    <!-- Département -->
                    <div class="flex items-end justify-between mt-2">
                        <div class="w-full">
                            <Popover v-model:open="opendepartement">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" role="combobox" :aria-expanded="opendepartement"
                                        class="h-11 w-full font-normal text-sm transition-all duration-200" :class="[
                                            selecteddepartement
                                                ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                                                : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                        ]">
                                        <div class="flex items-center gap-2.5 truncate">
                                            <span :class="[
                                                'text-sm transition-colors truncate',
                                                selecteddepartement
                                                    ? 'text-gray-900 dark:text-white font-medium'
                                                    : 'text-gray-500 dark:text-slate-400'
                                            ]">
                                                {{ selecteddepartement?.label || "Sélectionner un département" }}
                                            </span>
                                        </div>
                                        <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-0">
                                    <Command>
                                        <CommandInput class="h-9" placeholder="Rechercher un département..." />
                                        <CommandList>
                                            <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun
                                                département trouvé.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="departement in departements"
                                                    :key="departement.value" :value="departement.value"
                                                    @select="() => { departementValue = departement.value; opendepartement = false }"
                                                    class="cursor-pointer">
                                                    <span class="truncate">{{ departement.label }}</span>
                                                    <CheckIcon :class="[
                                                        'ml-auto w-4 h-4 transition-opacity',
                                                        departementValue === departement.value ? 'opacity-100' : 'opacity-0'
                                                    ]" />
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div class="flex items-end justify-between mt-2">
                        <div class="w-full">
                            <Popover v-model:open="openmodepaiement">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" role="combobox" :aria-expanded="openmodepaiement"
                                        class="h-11 w-full font-normal text-sm transition-all duration-200" :class="[
                                            selectedmodepaiement
                                                ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                                                : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                        ]">
                                        <div class="flex items-center gap-2.5 truncate">
                                            <span :class="[
                                                'text-sm transition-colors truncate',
                                                selectedmodepaiement
                                                    ? 'text-gray-900 dark:text-white font-medium'
                                                    : 'text-gray-500 dark:text-slate-400'
                                            ]">
                                                {{ selectedmodepaiement?.label || "Sélectionner un mode de paiement" }}
                                            </span>
                                        </div>
                                        <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-0">
                                    <Command>
                                        <CommandInput class="h-9" placeholder="Rechercher un mode..." />
                                        <CommandList>
                                            <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun mode
                                                trouvé.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="mode in modepaiements" :key="mode.value"
                                                    :value="mode.value"
                                                    @select="() => { modepaiementValue = mode.value; openmodepaiement = false }"
                                                    class="cursor-pointer">
                                                    <span class="truncate">{{ mode.label }}</span>
                                                    <CheckIcon :class="[
                                                        'ml-auto w-4 h-4 transition-opacity',
                                                        modepaiementValue === mode.value ? 'opacity-100' : 'opacity-0'
                                                    ]" />
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div class="flex items-end justify-between mt-2">
                        <div class="w-full">
                            <Popover v-model:open="openFournisseur">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" role="combobox" :aria-expanded="openFournisseur"
                                        class="h-11 w-full font-normal text-sm transition-all duration-200" :class="[
                                            selectedfournisseur
                                                ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                                                : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                        ]">
                                        <div class="flex items-center gap-2.5 truncate">
                                            <span :class="[
                                                'text-sm transition-colors truncate',
                                                selectedfournisseur
                                                    ? 'text-gray-900 dark:text-white font-medium'
                                                    : 'text-gray-500 dark:text-slate-400'
                                            ]">
                                                {{ selectedfournisseur?.label || "Sélectionner un fournisseur" }}
                                            </span>
                                        </div>
                                        <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-0">
                                    <Command>
                                        <CommandInput class="h-9" placeholder="Rechercher un fournisseur..." />
                                        <CommandList>
                                            <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun
                                                fournisseur trouvé.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="fournisseur in fournisseurs"
                                                    :key="fournisseur.value" :value="fournisseur.value"
                                                    @select="() => { fournisseurValue = fournisseur.value; openFournisseur = false }"
                                                    class="cursor-pointer">
                                                    <span class="truncate">{{ fournisseur.label }}</span>
                                                    <CheckIcon :class="[
                                                        'ml-auto w-4 h-4 transition-opacity',
                                                        fournisseurValue === fournisseur.value ? 'opacity-100' : 'opacity-0'
                                                    ]" />
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <Button @click="createAchat"
                        class="mt-3 h-11 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800">
                        <Plus />
                        Créer
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
import { KeyRoundIcon, ChevronsUpDownIcon, CheckIcon } from 'lucide-vue-next';
import {
    Command, CommandEmpty, CommandGroup,
    CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';
import {
    Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Plus } from "lucide-vue-next";

const currentPageTitle = ref("Achat");
const openAlert = ref(false);

// Produit → mappe sur AchatRequest.designation (Long)
const produits = ref<any[]>([]);
const designationValue = ref<number | null>(null);
const openproduit = ref(false);
const selectedproduit = computed(() => produits.value.find((p: any) => p.value === designationValue.value));

// Prix unitaire + Quantité → AchatRequest.prixUnitaire / quantite (BigDecimal)
const prixUnitaire = ref<number | null>(null);
const quantite = ref<number | null>(null);

// Type de dépense → AchatRequest.typeDepense (Long)
const typeDepenseValue = ref<number | null>(null);
const typeDepenses = ref<any[]>([]);

// Département → AchatRequest.departement (Long)
const opendepartement = ref(false);
const departementValue = ref<number | null>(null);
const departements = ref<any[]>([]);
const selecteddepartement = computed(() => departements.value.find((d: any) => d.value === departementValue.value));

// Mode de paiement → MultipleAchatRequest.modePaiement (Long)
const openmodepaiement = ref(false);
const modepaiementValue = ref<number | null>(null);
const modepaiements = ref<any[]>([]);
const selectedmodepaiement = computed(() => modepaiements.value.find((m: any) => m.value === modepaiementValue.value));

// Fournisseur → MultipleAchatRequest.fournisseur_id (Long)
const openFournisseur = ref(false);
const fournisseurValue = ref<number | null>(null);
const fournisseurs = ref<any[]>([]);
const selectedfournisseur = computed(() => fournisseurs.value.find((f: any) => f.value === fournisseurValue.value));

// Alert
const message = ref("");
const alertTitle = ref("Succès");
type AlertVariant = "success" | "default" | "primary" | "destructive" | null | undefined;
const alertVariant = ref<AlertVariant>("success");

const createAchat = async () => {
    try {
        const response = await api.post("/api/achat/create", {
            
            modePaiement: modepaiementValue.value,
            fournisseur_id: fournisseurValue.value,
            achats: [
                {
                    designation: designationValue.value,
                    prixUnitaire: prixUnitaire.value,
                    quantite: quantite.value,
                    typeDepense: typeDepenseValue.value,
                    departement: departementValue.value,
                }
            ]
        });
        alertTitle.value = "Succès";
        alertVariant.value = "success";
        openAlert.value = true;
        message.value = response?.data?.message || "Achat enregistré avec succès.";
    } catch (error: any) {
        message.value = error.response?.data?.message || "Une erreur est survenue.";
        alertTitle.value = "Erreur";
        alertVariant.value = "destructive";
        openAlert.value = true;
    } finally {
        setTimeout(() => { openAlert.value = false; }, 3000);
        designationValue.value = null;
        prixUnitaire.value = null;
        quantite.value = null;
        typeDepenseValue.value = null;
        departementValue.value = null;
        modepaiementValue.value = null;
        fournisseurValue.value = null;
    }
};

async function fetchproduits() {
    try {
        const response = await api.get('api/produit/all');
        produits.value = response.data.map((p: any) => ({
            value: p.id,
            label: p.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
    }
}

async function fetchtypeDepenses() {
    try {
        const response = await api.get('api/typeDepense/all');
        typeDepenses.value = response.data.map((t: any) => ({
            value: t.id,
            label: t.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des types de dépense:", error);
    }
}

async function fetchdepartement() {
    try {
        const response = await api.get('api/departement/all');
        departements.value = response.data.map((d: any) => ({
            value: d.id,
            label: d.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des départements:", error);
    }
}

async function fetchmodepaiement() {
    try {
        const response = await api.get('api/modePaiement/all');
        modepaiements.value = response.data.map((m: any) => ({
            value: m.id,
            label: m.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des modes de paiement:", error);
    }
}

async function fetchfournisseurs() {
    try {
        const response = await api.get('api/fournisseur/all');
        fournisseurs.value = response.data.map((f: any) => ({
            value: f.id,
            label: f.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des fournisseurs:", error);
    }
}

fetchproduits();
fetchtypeDepenses();
fetchdepartement();
fetchmodepaiement();
fetchfournisseurs();
</script>