<template>
  <admin-layout>
    <h1 class="p-6 font-black text-3xl">
      Fournisseur : {{ nomFournisseur }}
    </h1>
    <div class="space-y-6">
      <div class="w-full space-y-5">
        <AchatDetails :fournisseur="nomFournisseur" />
      </div>

      <div class="grid lg:grid-cols-12 gap-4 md:gap-6">
        <div class="col-span-12 xl:col-span-7">
        </div>

        <div class="col-span-12">
          
          <TableAchat :fournisseur="nomFournisseur" />
        </div>
      </div>
    </div>
  </admin-layout>
</template>
<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import AchatDetails from '@/components/ecommerce/AchatDetails.vue'
import TableAchat from '@/components/tables/basic-tables/TableDetailsAchatFournisseur.vue'; 
import { useRoute } from 'vue-router';

const route = useRoute();
const nomFournisseur = route.params.fournisseur as string;

</script>