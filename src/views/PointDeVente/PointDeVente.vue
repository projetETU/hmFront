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
                <span class="text-lg font-bold  text-gray-500 dark:text-gray-400">Nouveau point de vente</span>
                <div class="justify-between">

                    <div class="flex grid-cols-2 gap-2 w-full">
                        <Input class=" h-11" v-model="clientName" placeholder="Nom point de vente"></Input>

                        <Popover v-model:open="openClient">
                            <PopoverTrigger as-child>
                                <Button variant="outline" role="combobox" :aria-expanded="openClient"
                                    class="h-11 font-normal text-sm transition-all duration-200" :class="[
                                        selectedClient
                                            ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                                            : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                    ]">
                                    <div class="flex items-center gap-2.5 truncate">
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
                                        <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun client
                                            trouvé.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem v-for="client in clients" :key="client.value"
                                                :value="client.value"
                                                @select="() => { clientValue = client.value; openClient = false }"
                                                class="cursor-pointer">
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

                    <div class="flex items-end justify-between">
                        <div class="w-full">
                            <Input class="mt-2 h-11" v-model="adresse" placeholder="Adresse"></Input>
                        </div>
                    </div>

                    <div class="flex items-end justify-between mt-2">
                        <div class="w-full">
                            <Popover v-model:open="openQuartier">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" role="combobox" :aria-expanded="openQuartier"
                                        class="h-11 w-full font-normal text-sm transition-all duration-200" :class="[
                                            selectedQuartier
                                                ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400'
                                                : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                        ]">
                                        <div class="flex items-center gap-2.5 truncate">
                                            <span :class="[
                                                'text-sm transition-colors truncate',
                                                selectedQuartier
                                                    ? 'text-gray-900 dark:text-white font-medium'
                                                    : 'text-gray-500 dark:text-slate-400'
                                            ]">
                                                {{ selectedQuartier?.label || "Sélectionner un quartier" }}
                                            </span>
                                        </div>
                                        <ChevronsUpDownIcon class="w-4 h-4 opacity-40 shrink-0" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-0">
                                    <Command>
                                        <CommandInput class="h-9" placeholder="Rechercher un quartier..." />
                                        <CommandList>
                                            <CommandEmpty class="py-3 text-sm text-gray-500 text-center">Aucun quartier
                                                trouvé.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="quartier in quartiers" :key="quartier.value"
                                                    :value="quartier.value"
                                                    @select="() => { quartierValue = quartier.value; openQuartier = false }"
                                                    class="cursor-pointer">
                                                    <span class="truncate">{{ quartier.label }}</span>
                                                    <CheckIcon :class="[
                                                        'ml-auto w-4 h-4 transition-opacity',
                                                        quartierValue === quartier.value ? 'opacity-100' : 'opacity-0'
                                                    ]" />
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div class="flex items-end justify-between">
                        <div class="w-full">
                            <Input class="mt-2 h-11" v-model="codeMagasin" placeholder="Code magasin"></Input>
                        </div>
                    </div>

                    <Button :onClick="createPointDeVente"
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

const currentPageTitle = ref("Point de vente");
const openAlert = ref(false);

const clientName = ref("");
const adresse = ref("");
const codeMagasin = ref("");

const clients = ref([]);
const clientValue = ref('');
const openClient = ref(false);
const selectedClient = computed(() => clients.value.find(c => c.value === clientValue.value));

const openQuartier = ref(false);
const quartierValue = ref('');
const quartiers = ref([]);
const selectedQuartier = computed(() => quartiers.value.find(q => q.value === quartierValue.value));

const message = ref("");
const alertTitle = ref("Succès");
type AlertVariant = "success" | "default" | "primary" | "destructive" | null | undefined;
const alertVariant = ref<AlertVariant>("success");

const createPointDeVente = async () => {
    try {
        const response = await api.post("/api/point-de-vente/create", {
            name: clientName.value,
            adresse: adresse.value,
            client_id : clientValue.value,
            quartier_id: quartierValue.value,
            codeMagasin: codeMagasin.value,
            telephone :  "VIDE", 
        });
        alertTitle.value = "Succès";
        alertVariant.value = "success";
        openAlert.value = true;
        message.value = response?.data?.message || "Point de vente créé avec succès.";

    } catch (error) {
        message.value = error.response?.data?.message || "Une erreur est survenue lors de la création.";
        alertTitle.value = "Erreur";
        alertVariant.value = "destructive";
        openAlert.value = true;
        return;
    } finally {
        setTimeout(() => { openAlert.value = false; }, 3000);
        clientName.value = "";
        adresse.value = "";
        quartierValue.value = "";
        codeMagasin.value = "";
    }
};

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
async function fetchQuartier() {
    try {
        const response = await api.get('api/quartier/all');
        quartiers.value = response.data.data.map((quartier: any) => ({
            value: quartier.id,
            label: quartier.name,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des quartiers:", error);
    }
}


fetchClients();
fetchQuartier();
</script>