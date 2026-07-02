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
                class="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
                <div class="flex items-end justify-between">
                    <div class="w-full">
                        <span class="text-lg font-bold text-gray-500 dark:text-gray-400">Nouveau Client</span>

                        <Input class="mt-2 h-11" v-model="clientName" placeholder="Nom du client"></Input>
                        <Button :onClick="createClient"
                            class="mt-3 h-11 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800">
                            Creer
                        </Button>
                    </div>
                </div>
            </div>

        </div>

    </AdminLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import Input from "@/components/ui/input/Input.vue";
import api from "@/api/api";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { KeyRoundIcon } from '@lucide/vue';

const currentPageTitle = ref("Client");
const openAlert = ref(false);

const clientName = ref("");
const clients = ref([]);


const message = ref("");
const alertTitle = ref("Succès");
type AlertVariant = "success" | "default" | "primary" | "destructive" | null | undefined;
const alertVariant = ref<AlertVariant>("success");
const createClient = async () => {
    try {
        const response = await api.post("api/client/create", {
            name: clientName.value,
        });
        alertTitle.value = "Succès";
        alertVariant.value = "success";
        openAlert.value = true;
        message.value = response?.data?.message || "Une erreur est survenue lors de la création du client.";

    } catch (error) {
        message.value = error.response?.data?.message || "Une erreur est survenue lors de la création du client.";
        alertTitle.value = "Erreur";
        alertVariant.value = "destructive";
        openAlert.value = true;

        return;
    } finally {

        setTimeout(() => {
            openAlert.value = false;
        }, 3000);

        clientName.value = "";
    }
};

const fetchClients = async () => {
    try {
        const response = await api.get("api/client/all");
        clients.value = response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des clients:", error);
    }
};

fetchClients();

</script>