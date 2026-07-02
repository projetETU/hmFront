<template>
  <admin-layout>
    <div class="space-y-6">
      <div class="w-full space-y-5">
        <ecommerce-metrics  :clients="clients" :point-de-vente="pointDeVente" />
        <monthly-target />
      </div>

      <div class="grid lg:grid-cols-12 gap-4 md:gap-6">
        <div class="col-span-12 xl:col-span-7">
          
        </div>

        <div class="col-span-12">
          <statistics-chart />
        </div>

        <div class="col-span-12 sm:col-span-4 xl:col-span-12">
          <recent-orders />
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/api/api'


import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import MonthlyTarget from '../components/ecommerce/MonthlySale.vue'


import StatisticsChart from '../components/ecommerce/StatisticsChart.vue'
import RecentOrders from '../components/ecommerce/RecentOrders.vue'

const loading = ref(false)
const clients = ref(null)
const pointDeVente = ref(null)
const errorMsg = ref('')


onMounted(async () => {
  loading.value = true
  try {
    const [apiClients, apiPointDeVente] = await Promise.all([
      api.get('api/client/count'),
      api.get('api/point-de-vente/count')
    ])
    clients.value = apiClients.data.data
    pointDeVente.value = apiPointDeVente.data.data

  } catch (err: any) {
    errorMsg.value = "Erreur lors du chargement"
  } finally {
    loading.value = false
  }
})
</script>