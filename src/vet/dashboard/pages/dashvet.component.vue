<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold text-indigo-700">Dashboard Veterinario 🩺</h1>

    <!-- Tarjetas resumen -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <DashboardCard :title="$t('dashboard.totalClients')">
        <p>{{ dashboardData?.stats.totalClients }}</p>
      </DashboardCard>
      <DashboardCard :title="$t('dashboard.totalStaff')">
        <p>{{ dashboardData?.stats.totalStaff }}</p>
      </DashboardCard>
      <DashboardCard :title="$t('dashboard.totalRooms')">
        <p>{{ dashboardData?.stats.totalRooms }}</p>
      </DashboardCard>
    </div>

    <!-- Últimos pacientes -->
    <div>
      <h2 class="text-xl font-semibold mb-2">{{ $t('dashboard.latestPatients') }}</h2>
      <table class="w-full text-left border border-gray-300 rounded-md overflow-hidden">
        <thead class="bg-gray-100">
        <tr>
          <th class="p-2">ID</th>
          <th class="p-2">Tipo</th>
          <th class="p-2">Dueño</th>
          <th class="p-2">Ciudad</th>
          <th class="p-2">Fecha</th>
          <th class="p-2">Estado</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="p in dashboardData?.latestPatients" :key="p.id" class="border-t">
          <td class="p-2">{{ p.id }}</td>
          <td class="p-2">{{ p.kind }}</td>
          <td class="p-2">{{ p.owner }}</td>
          <td class="p-2">{{ p.city }}</td>
          <td class="p-2">{{ p.date }}</td>
          <td class="p-2">{{ p.status }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Reporte semanal -->
    <div>
      <DashboardCard :title="$t('dashboard.weeklyReport')">
        <p><strong>{{ $t('dashboard.income') }}:</strong> ${{ dashboardData?.weeklyReport.income }}</p>
        <p><strong>{{ $t('dashboard.outcome') }}:</strong> ${{ dashboardData?.weeklyReport.outcome }}</p>
      </DashboardCard>
    </div>

    <!-- Notificaciones -->
    <div>
      <DashboardCard :title="$t('dashboard.clientNotifications')">
        <ul class="list-disc pl-5">
          <li v-for="(n, index) in dashboardData?.notifications" :key="index">
            {{ n }}
          </li>
        </ul>
      </DashboardCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardCard from '../components/dashboardcard.component.vue'
import { getDashboardData } from '../services/dashboard.service.js'


const dashboardData = ref(null)

onMounted(async () => {
  dashboardData.value = await getDashboardData()
})
</script>
