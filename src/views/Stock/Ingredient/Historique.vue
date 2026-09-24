<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Historique des mouvements de stock">
        <TableHistoriqueMvt  />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
import TableHistoriqueMvt from "@/components/tables/basic-tables/TableHistoriqueMvt.vue";
const currentPageTitle = ref("Historique des mouvements de stock");
</script>
