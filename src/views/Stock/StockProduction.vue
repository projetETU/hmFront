<template>
  <admin-layout>
    <div class="space-y-6">
      <div class="w-full space-y-5">
        <AchatDetails  />
        
      </div>

      <div class="grid lg:grid-cols-12 gap-4 md:gap-6">
        <div class="col-span-12 xl:col-span-7">
          
        </div>

        <div class="col-span-12">
          <statistics-chart />
        </div>

        
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import AchatDetails from '@/components/ecommerce/AchatDetails.vue'
import StatisticsChart from '@/components/ecommerce/StatisticsChart.vue'
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();
const articleId = route.params.articleId as string;

</script>