<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <div
            class="rounded-2xl w-full border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">

            <div class="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                <div class="flex items-center gap-3">
                    <div
                        class="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/[0.07] flex items-center justify-center shrink-0">
                        <UtensilsCrossedIcon class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                        <h2 class="text-sm font-bold text-gray-900 dark:text-white">Nouvel article</h2>
                        <p class="text-xs text-gray-400 mt-0.5">Remplissez les informations de l'article</p>
                    </div>
                </div>
            </div>

            <div class="p-6">
                <div class="max-w-2xl flex flex-col gap-6">

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        <div class="sm:col-span-2 flex flex-col gap-1.5">
                        <Alert variant="success" class="mb-4" v-if="openSuccessAlert">
                            <KeyRoundIcon />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                L'article a été créé avec succès.
                            </AlertDescription>
                        </Alert>
                            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Nom de l'article <span class="text-red-400">*</span>
                            </label>
                            <Input v-model="form.name" type="text" placeholder="Ex: Panini poulet grillé" :class="[
                                'w-full h-11 px-3.5 rounded-xl border text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition',
                                errors.name ? 'border-red-300 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'
                            ]" />
                            <p v-if="errors.name" class="text-[11px] text-red-400">{{ errors.name }}</p>
                        </div>
                        <div class="sm:col-span-2 flex flex-col gap-1.5">
                            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Référence <span class="text-red-400">*</span>
                            </label>
                            <Input v-model="form.refference" type="text" placeholder="Ex: art 0x123" :class="[
                                'w-full h-11 px-3.5 rounded-xl border text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition',
                                errors.refference ? 'border-red-300 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'
                            ]" />
                            <p v-if="errors.refference" class="text-[11px] text-red-400">{{ errors.refference }}</p>
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Catégorie <span class="text-red-400">*</span>
                            </label>
                            <Popover v-model:open="openCategorie">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" role="combobox" :aria-expanded="openCategorie" :class="[
                                        'h-11 w-full justify-between font-normal text-sm transition-all',
                                        errors.categorie_id ? 'border-red-300 dark:border-red-500' : selectedCategorie ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700'
                                    ]">
                                        <div class="flex items-center gap-2.5 truncate">
                                            <div :class="[
                                                'w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors',
                                                selectedCategorie ? 'bg-gray-900 dark:bg-white' : 'bg-gray-100 dark:bg-white/[0.07]'
                                            ]">
                                                <TagIcon
                                                    :class="['w-3 h-3', selectedCategorie ? 'text-white dark:text-gray-900' : 'text-gray-400']" />
                                            </div>
                                            <span
                                                :class="selectedCategorie ? 'text-gray-900 dark:text-white' : 'text-gray-400'">
                                                {{ selectedCategorie?.label || "Sélectionner une catégorie..." }}
                                            </span>
                                        </div>
                                        <ChevronsUpDownIcon class="w-3.5 h-3.5 opacity-40 shrink-0" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-0">
                                    <Command>
                                        <CommandInput class="h-9" placeholder="Rechercher une catégorie..." />
                                        <CommandList>
                                            <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="cat in categories" :key="cat.value"
                                                    :value="String(cat.value)"
                                                    @select="() => { form.categorie_id = cat.value; openCategorie = false }">
                                                    {{ cat.label }}
                                                    <CheckIcon
                                                        :class="cn('ml-auto w-3.5 h-3.5', form.categorie_id === cat.value ? 'opacity-100' : 'opacity-0')" />
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <p v-if="errors.categorie_id" class="text-[11px] text-red-400">{{ errors.categorie_id }}</p>
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Prix (Ar) <span class="text-red-400">*</span>
                            </label>
                            <div class="relative">
                                <Input v-model="displayValue" @input="formatInput" type="text" min="0" placeholder="0"
                                    :class="[
                                        'w-full h-11 pl-3.5 pr-10 rounded-xl border text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition',
                                        errors.prix ? 'border-red-300 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'
                                    ]" />
                                <span
                                    class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium pointer-events-none">Ar</span>
                            </div>
                            <p v-if="errors.prix" class="text-[11px] text-red-400">{{ errors.prix }}</p>
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Unité <span class="text-red-400">*</span>
                            </label>
                            <Popover v-model:open="openUnite">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" role="combobox" :aria-expanded="openUnite" :class="[
                                        'h-11 w-full justify-between font-normal text-sm transition-all',
                                        errors.unite ? 'border-red-300 dark:border-red-500'
                                            : selectedUnite ? 'border-gray-300 dark:border-gray-600'
                                                : 'border-gray-200 dark:border-gray-700'
                                    ]">
                                        <span
                                            :class="selectedUnite ? 'text-gray-900 dark:text-white' : 'text-gray-400'">
                                            {{ selectedUnite?.label || "Sélectionner une unité..." }}
                                        </span>
                                        <ChevronsUpDownIcon class="w-3.5 h-3.5 opacity-40 shrink-0" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-0">
                                    <Command>
                                        <CommandInput class="h-9" placeholder="Rechercher une unité..." />
                                        <CommandList>
                                            <CommandEmpty>Aucune unité trouvée.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="u in unites" :key="u.value" :value="String(u.value)"
                                                    @select="() => { form.uniter_id = u.value; openUnite = false }">
                                                    {{ u.label }}
                                                    <CheckIcon
                                                        :class="cn('ml-auto w-3.5 h-3.5', form.uniter_id === u.value ? 'opacity-100' : 'opacity-0')" />
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <p v-if="errors.unite" class="text-[11px] text-red-400">{{ errors.unite }}</p>
                        </div>

                    </div>

                    <div
                        class="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                        <Button @click="resetForm" variant="outline" :disabled="isSubmitting" class="h-11">
                            <RotateCwIcon class="w-4 h-4" />
                        </Button>
                        <Button   @click="submitForm" :disabled="isSubmitting" :class="[
                            'h-11  transition-all duration-200',
                            isSubmitting
                                ? 'bg-gray-200 dark:bg-white/[0.07] text-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                        ]">
                            <LoaderIcon v-if="isSubmitting" class="w-4 h-4 animate-spin" />
                            <PlusIcon v-else class="w-4 h-4" />
                            {{ isSubmitting ? 'Enregistrement...' : "Créer l'article" }}
                        </Button>
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
import { CheckIcon, ChevronsUpDownIcon, UtensilsCrossedIcon, TagIcon, PlusIcon, LoaderIcon, RotateCwIcon } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import {
    Command, CommandEmpty, CommandGroup,
    CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';
import {
    Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from "@/components/ui/input";
import api from "@/api/api";

const currentPageTitle = ref("Nouvel article");

interface Category {
    value: string | number;
    label: string;
}

interface Uniter {
    value: string | number;
    label: string;
}

const categories = ref<Category[]>([]);
const unites = ref<Uniter[]>([]);
const openCategorie = ref(false);
const openUnite = ref(false);
const isSubmitting = ref(false);
const rawValue = ref(0);
const displayValue = ref("");

const form = ref({
    name: '',
    categorie_id: '' as string | number,
    prix: null as number | null,
    uniter_id: '' as string | number,
    refference: '',
});

const errors = ref({
    name: '',
    categorie_id: '',
    prix: '',
    uniter_id: '',
    refference: '',
});

const selectedCategorie = computed(() =>
    categories.value.find(c => c.value === form.value.categorie_id)
);

const selectedUnite = computed(() =>
    unites.value.find(u => u.value === form.value.uniter_id)
);

const formatInput = (e: Event) => {
    let val = (e.target as HTMLInputElement).value.replace(/,/g, '');
    let cleanVal = val.replace(/[^0-9.]/g, '');

    const parts = cleanVal.split('.');
    if (parts.length > 2) {
        cleanVal = parts[0] + '.' + parts.slice(1).join('');
    }

    form.value.prix = cleanVal === "" ? 0 : parseFloat(cleanVal);
    rawValue.value = cleanVal === "" ? 0 : parseFloat(cleanVal);

    if (cleanVal === "") {
        displayValue.value = "";
    } else if (cleanVal.endsWith('.')) {
        displayValue.value = new Intl.NumberFormat('en-US').format(Number(parts[0])) + '.';
    } else {
        const [integer, decimal] = cleanVal.split('.');
        const formattedInteger = new Intl.NumberFormat('en-US').format(Number(integer));
        displayValue.value = decimal !== undefined
            ? `${formattedInteger}.${decimal}`
            : formattedInteger;
    }
};

async function fetchCategories() {
    try {
        const response = await api.get('api/article-categorie/all');
        categories.value = response.data.data.map((cat: any) => ({
            value: cat.id,
            label: cat.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
    }
}
fetchCategories();

async function fetchUnites() {
    try {
        const response = await api.get('api/uniter/all');
        unites.value = response.data.data.map((u: any) => ({
            value: u.id,
            label: u.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des unités:", error);
    }
}
fetchUnites();

function validateForm(): boolean {
    errors.value = { name: '', categorie_id: '', prix: '', unite: '', refference: '' };
    let valid = true;

    if (!form.value.name.trim()) {
        errors.value.name = 'Le nom est requis.';
        valid = false;
    }
    if (!form.value.categorie_id) {
        errors.value.categorie_id = 'La catégorie est requise.';
        valid = false;
    }
    if (!form.value.prix || form.value.prix <= 0) {
        errors.value.prix = 'Le prix doit être supérieur à 0.';
        valid = false;
    }
    if (!form.value.uniter_id) {
        errors.value.unite = "L'unité est requise.";
        valid = false;
    }
    if (!form.value.refference.trim()) {
        errors.value.refference = 'La référence est requise.';
        valid = false;
    }

    return valid;
}
const openSuccessAlert = ref(false);



async function submitForm() {
    if (!validateForm()) return;
    isSubmitting.value = true;
    try {
        const response = await api.post('api/article/create', {
            name: form.value.name,
            categorie_id: form.value.categorie_id,
            prix: form.value.prix,
            uniter_id: form.value.uniter_id,
            refference: form.value.refference,
        });
        console.log(response.data.data);
        resetForm();
        openSuccessAlert.value = true;
        setTimeout(() => {
            openSuccessAlert.value = false;
        }, 3000);
    } catch (error) {
        console.error("Erreur lors de la création de l'article:", error);
    } finally {
        isSubmitting.value = false;
    }
}

function resetForm() {
    form.value = {
        name: '',
        categorie_id: '',
        prix: null,
        uniter_id: '',
        refference: '',
    };
    displayValue.value = '';
    errors.value = { name: '', categorie_id: '', prix: '', uniter_id: '', refference: '' };
}
</script>