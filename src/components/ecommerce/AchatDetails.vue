<template>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">


            <div>
                <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">Payer</h4>
            </div>
            <div class="mt-5 space-y-2">
                <Input class="h-11" v-model="payer"></Input>
                <Button class="h-11 w-full" @click="setPayer">Payer</Button>
            </div>


        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <svg class="fill-gray-800 dark:fill-white/90" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857L11.3296 20.9149L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z"
                        fill="" />
                </svg>
            </div>

            <div class="flex items-end justify-between mt-5">
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Nombre achat</span>
                    <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ details?.nombreAchats
                        }}</h4>
                </div>


            </div>

        </div>


        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <svg class="fill-gray-800 dark:fill-white/90" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857L11.3296 20.9149L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z"
                        fill="" />
                </svg>
            </div>

            <div class=" items-end justify-between mt-5">
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Solde</span>
                    <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ details?.restant }} Ar
                    </h4>

                </div>
                <Progress :model-value="pourcent" class="w-[100%] h-11 mt-1" />


            </div>


        </div>


        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <svg class="fill-gray-800 dark:fill-white/90" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857L11.3296 20.9149L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z"
                        fill="" />
                </svg>
            </div>

            <div class="flex items-end justify-between mt-5">
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Total general</span>
                    <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ details?.totalMontant
                        }} Ar
                    </h4>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Button from '../ui/Button.vue';
import Input from '../ui/input/Input.vue';


import { useRoute } from 'vue-router';
import api from '@/api/api.ts';
import { Progress } from '@/components/ui/progress'


interface AchatParFournisseur {
    fournisseur: string
    totalMontant: number
    payer: number
    restant: number
}
const route = useRoute();
const nomFournisseur = route.params.fournisseur as string;
const achatsDetails = ref<AchatParFournisseur[]>([]);
const progress = ref(13)
const payer = ref('')
const pourcent = computed(() => {
    if (!details.value || details.value.totalMontant === 0) return 0
    return Math.round((details.value.payer * 100) / details.value.totalMontant)
})
onMounted(async () => {
    try {
        const response = await api.get(`api/achat/details/fournisseur/${nomFournisseur}`)
        achatsDetails.value = response.data
        progress.value = pourcent.value
        payer.value = ''
    } catch (error) {
        console.log(error)
    }
})
const details = computed(() => achatsDetails.value[0] ?? null);
async function setPayer() {
    try {
        await api.put(`api/achat/editDetails/fournisseur/${nomFournisseur}`, {
            payer: payer.value.replace(/\s/g, '').replace(',', '.')
        });
        
        // Recharger les données
        const response = await api.get(`api/achat/details/fournisseur/${nomFournisseur}`)
        achatsDetails.value = response.data
        payer.value = ''
        
    } catch (error) {
        console.error('Erreur lors de la mise à jour du details:', error);
    }
}</script>