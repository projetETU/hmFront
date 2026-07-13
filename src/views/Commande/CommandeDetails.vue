<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />


    <Alert variant="desctructive" class="mb-6" v-if="openAlertAnnuler">
      <KeyRoundIcon />
      <AlertTitle>Annuler</AlertTitle>
      <AlertDescription>
        La commande a été annuler.
      </AlertDescription>
    </Alert>

    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400">Chargement des détails...</p>
      </div>
    </div>

    <div v-else class="min-h-screen space-y-6 pb-12">
      <div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Commande #{{ commandeNumber }}
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Créée le {{ formatDate(order.createdAt) }}
          </p>

        </div>


        <div class="flex gap-3 w-full md:w-auto" v-if="order.status != 'annuler'">
          <button @click="openEditModal"
            class="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 font-medium text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Mise a jour
          </button>

          <button @click="openPdfModal"
            class="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 font-medium text-emerald-600 transition-all hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8H3m6-4h12" />
            </svg>
            PDF Facture
          </button>
        </div>
      </div>


      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-6">
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 class="font-semibold text-gray-900 dark:text-white">Détails de la commande</h2>
            </div>

            <div class="p-6">
              <div class="space-y-4">

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Statut</span>
                  <span :class="[
                    'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium',
                    {
                      'bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300': order.status === 'en attente',
                      'bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300': order.status === 'en cours',
                      'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300': order.status === 'valider',
                      'bg-red-50 text-red-700 dark:bg-red-500/20 dark:text-red-300': order.status === 'annuler'
                    }
                  ]">
                    <span class="h-2 w-2 rounded-full bg-current"></span>
                    {{ order.status }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">N° de facture</span>
                  <span class="font-mono font-medium text-gray-900 dark:text-white">{{ order.orderNumber }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Client</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ order.clientName }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Point de vente</span>
                  <span class="text-gray-900 dark:text-gray-300">{{ order.pointVenteName || 'N/A' }}</span>
                </div>

              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 class="font-semibold text-gray-900 dark:text-white">Articles</h2>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-800">
                    <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Produit</th>
                    <th class="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Quantité
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Prix
                      unitaire</th>
                    <th class="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.items" :key="item.id"
                    class="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700/50 dark:hover:bg-white/[0.02]">
                    <td class="px-6 py-4">
                      <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.sku }}</div>
                    </td>
                    <td class="px-6 py-4 text-right text-gray-900 dark:text-gray-300">{{ item.quantity }}</td>
                    <td class="px-6 py-4 text-right font-mono text-gray-900 dark:text-gray-300">{{
                      formatPrice(item.unitPrice) }}</td>
                    <td class="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">{{
                      formatPrice(item.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>



        </div>

        <div class="space-y-6">

          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 class="font-semibold text-gray-900 dark:text-white">Récapitulatif</h2>
            </div>

            <div class="space-y-4 p-6">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Sous-total</span>
                <span class="font-mono font-medium text-gray-900 dark:text-white">{{ formatPrice(order.subtotal)
                }}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Remise (0%)</span>
                <span class="font-mono font-medium text-gray-900 dark:text-white">{{ formatPrice(order.remise) }}</span>
              </div>

              <div class="border-t border-gray-200 pt-4 dark:border-gray-800">
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-gray-900 dark:text-white">Montant total</span>
                  <span class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ formatPrice(order.total) }}</span>
                </div>
              </div>


            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 class="font-semibold text-gray-900 dark:text-white">Dates</h2>
            </div>

            <div class="space-y-4 p-6">
              <div>
                <p class="text-xs text-gray-600 dark:text-gray-400">Date de commande</p>
                <p class="mt-1 font-medium text-gray-900 dark:text-white">{{ formatDate(order.createdAt) }}</p>
              </div>

              <div>
                <p class="text-xs text-gray-600 dark:text-gray-400">Date estimée de livraison</p>
                <p class="mt-1 font-medium text-gray-900 dark:text-white">{{ formatDate(order.estimatedDelivery) }}</p>
              </div>

              <div v-if="order.deliveredAt">
                <p class="text-xs text-gray-600 dark:text-gray-400">Date de livraison</p>
                <p class="mt-1 font-medium text-gray-900 dark:text-white">{{ formatDate(order.deliveredAt) }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
            v-if="order.status != 'annuler'">
            <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 class="font-semibold text-gray-900 dark:text-white">Annulation commande</h2>
            </div>

            <div class="space-y-4 p-6">
              <div>
                <Button class="w-full h-11" variant="destructive" @click="annulation(commandeNumber)">Annuler</Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <Modal v-if="showEditModal" @close="showEditModal = false">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[700px]  overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <button @click="showEditModal = false"
            class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
            <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                fill="" />
            </svg>
          </button>
          <div class="px-2 pr-14">
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Ajouter BRM et bon de commande
            </h4>
            <p class="mb-3 text-sm text-gray-500 dark:text-gray-400 lg:mb-2">
              Mettez à jour les informations de votre commande.
            </p>
          </div>
          <Alert variant="success" v-if="openSuccessBRM">
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              {{ message }}
            </AlertDescription>
          </Alert>
          <form class="flex flex-col">
            <div class=" custom-scrollbar overflow-y-auto p-2">

              <div class="mt-7">
                <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Informations de la commande
                </h5>

                <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div class="col-span-2 lg:col-span-1">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Bon de commande
                    </label>
                    <input type="text" v-model="editForm.bonDeCommande" disabled
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      BRM
                    </label>
                    <input type="text" v-model="editForm.brm" :disabled="isBRMEditable"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3  px-2 mt-6 lg:justify-end">
              <button @click="showEditModal = false" type="button"
                class="h-11 flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                Fermer
              </button>
              <button @click="setBrm" type="button"
                class="h-11 flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
                Enregister
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>



    <Modal v-if="showPdfModal" @close="showPdfModal = false">
  <template #body>
    <div
      class="relative w-full max-w-md rounded-3xl bg-white p-6 dark:bg-gray-900"
    >
      <button
        @click="showPdfModal = false"
        class="absolute right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-white/[0.05]"
      >
        <svg
          class="fill-current"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
          />
        </svg>
      </button>

      <div class="mb-6">
        <h4 class="text-2xl font-semibold text-gray-800 dark:text-white">
          Génération PDF
        </h4>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Choisissez le format de facture à générer.
        </p>
      </div>

      <div class="space-y-3">
        <button
          @click="
            generatePDF();
            showPdfModal = false;
          "
          class="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
        >
          Facture Double (Paysage)
        </button>

        <button
          @click="
            generatePDFPortrait();
            showPdfModal = false;
          "
          class="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700"
        >
          Facture Simple (Portrait)
        </button>
      </div>
    </div>
  </template>
</Modal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router';
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import Modal from '@/components/profile/Modal.vue'
import { useCommandeStore } from '@/stores/CommandeStore';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NombresEnToutesLettres } from "nombre-en-toutes-lettres";
import Button from '@/components/ui/Button.vue';
import api from '@/api/api';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { KeyRoundIcon } from '@lucide/vue';


const HmLogo = '/logo.png'
const Signature = '/signature.png'
const route = useRoute();
const commandeId = route.params.id as string;
const commandeStore = useCommandeStore();
const commandeDetails = ref(null);
const isLoading = ref(true);
const openSuccessBRM = ref(false);
const message = ref('');


onMounted(async () => {
  await commandeStore.fetchCommandeDetails(parseInt(commandeId));
  commandeDetails.value = commandeStore.CommandeDetails;
  isLoading.value = false;
});

async function setBrm() {
  try {
    const response = await api.put(`api/commande/setBrm/${commandeId}`, {
      brm: editForm.brm
    });
    openSuccessBRM.value = true;
    message.value = response.data;
    console.log(response);
    setTimeout(() => {
      openSuccessBRM.value = false;
    }, 3000);
    console.log('BRM mis à jour avec succès:', response.data);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du BRM:', error);
  }
}

const currentPageTitle = 'Détails de la commande'
const showEditModal = ref(false)
const showPdfModal = ref(false)

const openPdfModal = () => {
  showPdfModal.value = true
}


const order = reactive({
  orderNumber: '',
  status: 'en attente',
  createdAt: new Date(),
  estimatedDelivery: new Date(),
  deliveredAt: null,

  clientName: '',
  pointVenteName: '',
  clientPhone: '',

  items: [],

  shippingAddress: {
    name: '',
    street: '',
    postalCode: '',
    city: '',
    country: ''
  },

  subtotal: 0,
  shippingCost: 0,
  remise: 0,
  total: 0,

  paymentMethod: 'Carte bancaire',
})


const editForm = reactive({
  clientName: '',
  pointVente: '',
  clientPhone: '',
  status: 'en attente',
  bonDeCommande: '',
  brm: '',
  shippingAddress: {
    name: '',
    street: '',
    postalCode: '',
    city: '',
    country: 'France',

  },
  shippingCost: 0,
  remiseRate: 0
})

const isBRMEditable = ref(true);

watch(commandeDetails, (newVal) => {
  if (newVal && newVal.length > 0) {
    const firstItem = newVal[0];
    const commande = firstItem.commande;
    const client = commande.client;
    const pointVente = commande.pointVente || '';



    // console.log(commande);

    order.orderNumber = commande.numeroFacture;
    order.status = mapStatus(commande.etat);
    order.createdAt = new Date(commande.dateCommande);
    order.clientName = client.name;
    order.pointVenteName = pointVente.name;

    editForm.bonDeCommande = commande.bonDeCommande;
    editForm.brm = commande.brm;

    isBRMEditable.value = !!commande.brm;

    order.items = newVal.map((detail: any) => ({
      id: detail.id,
      name: detail.article.name,
      sku: detail.article.refference,
      quantity: detail.quantite,
      unitPrice: detail.prixUnitaire,
      total: detail.quantite * detail.prixUnitaire
    }));

    // Calculer les totaux
    order.subtotal = order.items.reduce((sum: number, item: any) => sum + item.total, 0);
    order.remise = 0;
    order.total = order.subtotal + order.shippingCost + order.remise;
  }
});
const formatAr = (value: string | number) => {
  const num = Number(value || 0);
  return num.toLocaleString("fr-FR").replace(/\u202f/g, " ") + " Ar";
};
const numberToWordsFr = (num: number): string => {
  return NombresEnToutesLettres(num);
};

const generatePDF = () => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const data = commandeDetails.value;

  if (!Array.isArray(data) || data.length === 0) {
    doc.setFontSize(12);
    doc.text("Pas de données", 20, 20);
    doc.output("dataurlnewwindow");
    return;
  }

  const client = data[0]?.commande?.client?.name || "Client inconnu";
  const numeroFacture = data[0]?.commande?.numeroFacture || "N/A";
  const dateCommande = formatDate(data[0]?.commande?.dateCommande);
  const bon = data[0]?.commande?.bonDeCommande || "N/A";

  const pointVente = data[0]?.commande?.pointVente?.name || "N/A";
  const adresse = data[0]?.commande?.pointVente?.adresse || "N/A";
  const ville = data[0]?.commande?.pointVente?.quartier?.name || "N/A";
  const province =
    data[0]?.commande?.pointVente?.quartier?.ville?.name || "N/A";

  const nif = data[0]?.commande?.client?.nif || "N/A";
  const stat = data[0]?.commande?.client?.stat || "N/A";
  const rc = data[0]?.commande?.client?.rc || "N/A";

  const totalGeneral = Number(order.subtotal || 0);

  // Remise statique pour le moment (à remplacer plus tard par item.remise)

  const rows = data.map((item) => {

    const ref = item.article?.refference || "-";
    const designation = item.article?.categorie.name + " " + item.article?.name || "-";
    const qte = Number(item.quantite || 0);
    const pu = Number(item.prixUnitaire || 0);
    const remise = Number(item.remise || 0);
    const total = qte * pu;

    return [
      ref,
      designation,
      qte,
      remise > 0 ? `${remise}%` : "-",
      `${formatAr(pu)} `,
      `${formatAr(total)} `,
    ];
  });

  const drawFacture = (startX) => {
    // =========================
    // LOGO
    // =========================
    doc.addImage(HmLogo, "PNG", startX + 5, 5, 20, 17);

    // =========================
    // EN TÊTE
    // =========================
    doc.setFontSize(9);

    doc.text("RESTAURATION - SERVICE TRAITEUR", startX + 26, 10);
    doc.text("Cité 67 Ha logt 592 Centre - ouest", startX + 26, 14);
    doc.text("Antananarivo 101", startX + 26, 18);
    doc.text("Tél : 034 44 945 98 - 032 21 758 31", startX + 26, 22);
    doc.text("E-mail : rasolofo.rasamimanana@outlook.fr", startX + 26, 26);

    // =========================
    // INFOS FACTURE
    // =========================
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");

    doc.text(`FACTURE N° : ${numeroFacture}`, startX + 5, 85);

    doc.setFont(undefined, "normal");

    doc.text(`Bon de commande : ${bon}`, startX + 5, 90);

    doc.text(`Date : ${dateCommande}`, startX + 100, 90);

    // =========================
    // ENCADRÉ CLIENT
    // =========================
    doc.roundedRect(startX + 70, 40, 70, 38, 2, 2);

    doc.setFont(undefined, "bold");
    doc.setFontSize(9.5);

    doc.text(`DOIT : ${client}`, startX + 75, 47);

    doc.setFont(undefined, "normal");
    doc.setFontSize(9);

    doc.text(pointVente, startX + 75, 52);

    doc.text(adresse, startX + 75, 57);

    doc.text(`${ville} ${province}`, startX + 75, 62);

    doc.setFont(undefined, "bold");

    doc.text("NIF :", startX + 75, 67);
    doc.setFont(undefined, "normal");
    doc.text(nif, startX + 85, 67);

    doc.setFont(undefined, "bold");
    doc.text("- RC :", startX + 103, 67);
    doc.setFont(undefined, "normal");
    doc.text(rc, startX + 112, 67);

    // STAT
    doc.setFont(undefined, "bold");
    doc.text("STAT :", startX + 75, 72);

    const index = stat.indexOf("du");
    const ligne1 = stat.substring(0, index).trim();
    const ligne2 = stat.substring(index).trim();

    doc.setFont(undefined, "normal");
    
    doc.text(ligne1, startX + 90, 72);
    doc.text(ligne2, startX + 90, 78);

    // =========================
    // TABLEAU
    // =========================
    autoTable(doc, {
      startY: 92,

      margin: {
        left: startX + 5,
        right: 5,
      },

      tableWidth: 132,

      head: [["Réf", "Désignation", "Qté", "Remise", "P.U", "Montant"]],

      body: rows,

      theme: "grid",

      styles: {
        fontSize: 8,
        cellPadding: 1.5,
        lineWidth: 0.2,
        overflow: "linebreak",
      },

      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },

      columnStyles: {
        0: { cellWidth: 14 },  // Réf
        1: { cellWidth: 42 },  // Désignation
        2: { cellWidth: 10, halign: "center" }, // Qté
        3: { cellWidth: 14, halign: "center" }, // Remise
        4: { cellWidth: 22, halign: "right" },  // P.U
        5: { cellWidth: 30, halign: "right" },  // Montant
      },
    });

    const finalY = doc.lastAutoTable.finalY;

    // =========================
    // TOTAL
    // =========================
    doc.setFont(undefined, "bold");
    doc.setFontSize(10);

    doc.text(
      `${formatAr(totalGeneral)} `,
      startX + 98,
      finalY + 8
    );
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);

    doc.text(
      `Arrêtée la présente facture à la somme de : ${numberToWordsFr(
        totalGeneral
      )} Ariary`,
      startX + 5,
      finalY + 20,
      {
        maxWidth: 100,
      }
    );

    doc.addImage(Signature, "PNG", startX + 100, finalY + 30, 28, 14);
    doc.setFontSize(8);

    doc.text(
      "NIF : 3002812241 - CF 0108708/DGI-G DU 01/04/2019 / STAT 56101 11 2002 0 04949",
      startX + 68,
      196,
      {
        align: "center",
      }
    );
  };

  drawFacture(3);

  doc.setDrawColor(120);
  doc.setLineWidth(0.3);

  doc.line(148.5, 5, 148.5, 200);

  drawFacture(151);

  doc.output("dataurlnewwindow");
};

const generatePDFPortrait = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const data = commandeDetails.value;

  if (!Array.isArray(data) || data.length === 0) {
    doc.setFontSize(12);
    doc.text("Pas de données", 20, 20);
    doc.output("dataurlnewwindow");
    return;
  }

  const client = data[0]?.commande?.client?.name || "Client inconnu";
  const numeroFacture = data[0]?.commande?.numeroFacture || "N/A";
  const dateCommande = formatDate(data[0]?.commande?.dateCommande);
  const bon = data[0]?.commande?.bonDeCommande || "N/A";

  const pointVente = data[0]?.commande?.pointVente?.name || "N/A";
  const adresse = data[0]?.commande?.pointVente?.adresse || "N/A";
  const ville = data[0]?.commande?.pointVente?.quartier?.name || "N/A";
  const province = data[0]?.commande?.pointVente?.quartier?.ville?.name || "N/A";

  const nif = data[0]?.commande?.client?.nif || "N/A";
  const stat = data[0]?.commande?.client?.stat || "N/A";
  const rc = data[0]?.commande?.client?.rc || "N/A";

  const totalGeneral = Number(order.subtotal || 0);

  const rows = data.map((item) => {
    const ref = item.article?.refference || "-";
    const designation = (item.article?.categorie?.name + " " + item.article?.name) || "-";
    const qte = Number(item.quantite || 0);
    const pu = Number(item.prixUnitaire || 0);
    const total = qte * pu;

    return [ref, designation, qte, `${formatAr(pu)}`, `${formatAr(total)}`];
  });

  doc.addImage(HmLogo, "PNG", 10, 8, 25, 20);

  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.text("RESTAURATION - SERVICE TRAITEUR", 40, 14);
  doc.text("Cité 67 Ha logt 592 Centre - ouest", 40, 18);
  doc.text("Antananarivo 101", 40, 22);
  doc.text("Tél : 034 44 945 98 - 032 21 758 31", 40, 26);
  doc.text("E-mail : rasolofo.rasamimanana@outlook.fr", 40, 30);

  doc.setFontSize(9);
  doc.setFont(undefined, "bold");
  doc.text(`FACTURE N° : ${numeroFacture}`, 10, 42);

  doc.setFont(undefined, "normal");
  doc.text(`Bon de commande : ${bon}`, 10, 48);
  doc.text(`Date : ${dateCommande}`, 130, 48);

  // ===========================
  // ENCADRÉ CLIENT
  // ===========================
  doc.roundedRect(110, 55, 90, 45, 2, 2);

  doc.setFont(undefined, "bold");
  doc.setFontSize(9.5);
  doc.text(`DOIT : ${client}`, 115, 63);

  doc.setFont(undefined, "normal");
  doc.setFontSize(9);
  doc.text(pointVente, 115, 69);
  doc.text(adresse, 115, 75);
  doc.text(`${ville} ${province}`, 115, 81);

  // NIF
  doc.setFont(undefined, "bold");
  doc.text("NIF :", 115, 87);
  doc.setFont(undefined, "normal");
  doc.text(nif, 125, 87);

  // RC
  doc.setFont(undefined, "bold");
  doc.text("- RC :", 145, 87);
  doc.setFont(undefined, "normal");
  doc.text(rc, 155, 87);

  // STAT
  doc.setFont(undefined, "bold");
  doc.text("STAT :", 115, 93);
  doc.setFont(undefined, "normal");
  doc.text(stat, 127, 93);

  autoTable(doc, {
    startY: 103,

    margin: { left: 10, right: 10 },

    head: [["Réf", "Désignation", "Qté", "P.U", "Montant"]],
    body: rows,

    theme: "grid",

    styles: {
      fontSize: 8.5,
      cellPadding: 2,
      lineWidth: 0.2,
      overflow: "linebreak",
    },

    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },

    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 80 },
      2: { cellWidth: 18, halign: "center" },
      3: { cellWidth: 32, halign: "right" },
      4: { cellWidth: 40, halign: "right" },
    },
  });

  const finalY = doc.lastAutoTable.finalY;


  doc.setFont(undefined, "bold");
  doc.setFontSize(10);
  doc.text("TOTAL :", 130, finalY + 10);
  doc.text(`${formatAr(totalGeneral)}`, 200, finalY + 10, { align: "right" });

  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(
    `Arrêtée la présente facture à la somme de : ${numberToWordsFr(totalGeneral)} Ariary`,
    10,
    finalY + 22,
    { maxWidth: 130 }
  );

  doc.addImage(Signature, "PNG", 155, finalY + 18, 35, 18);

  doc.setFontSize(7.5);
  doc.setTextColor(120);
  doc.text(
    "NIF : 3002812241 - CF 0108708/DGI-G DU 01/04/2019 / STAT 56101 11 2002 0 04949",
    105,
    287,
    { align: "center" }
  );
  doc.setTextColor(0);

  doc.output("dataurlnewwindow");
};

const mapStatus = (etat: string): string => {
  const statusMap: { [key: string]: string } = {
    'EN_ATTENTE': 'en attente',
    'EN_COURS': 'en cours',
    'LIVREE': 'livrée',
    'ANNULEE': 'annuler'
  };
  return statusMap[etat] || etat.toLowerCase();
}

const commandeNumber = computed(() => {
  if (!commandeDetails.value || commandeDetails.value.length === 0) return '';
  return commandeDetails.value[0].commande.id;
})

const openAlertAnnuler = ref(false);
const annulation = async (c: string | number) => {
  try {
    const response = await api.put(`api/commande/anuller/${c}`);
    order.status = 'annuler';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    openAlertAnnuler.value = true;
    setTimeout(() => {
      openAlertAnnuler.value = false
    }, 3000)
    return response;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
}



const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'MGA'
  }).format(price)
}

const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

// Gestion du modal
const openEditModal = () => {
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const saveChanges = () => {
  Object.assign(order, {
    clientName: editForm.clientName,
    pointVente: editForm.pointVente,
    clientPhone: editForm.clientPhone,
    status: editForm.status,
    shippingAddress: { ...editForm.shippingAddress },
    shippingCost: editForm.shippingCost
  })

  closeEditModal()
  console.log('Modifications enregistrées')
}


</script>

<style scoped>
/* Les styles sont maintenant gérés par le composant Modal */
</style>