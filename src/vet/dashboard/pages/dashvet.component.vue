<template>
  <div class="w-full max-w-7xl mx-auto px-4">
    <h1 class="text-2xl font-bold text-indigo-700">Dashboard Veterinario 🩺</h1>

    <!-- Tarjetas resumen -->
    <div class="grid grid-cols-3 gap-4">
      <DashboardCard :title="$t('dashboard.totalClients')">
        <div class="flex items-center justify-center gap-4 text-sm">
          <img src="@/assets/images/dashvet-dog-icon.png" alt="clients" class="w-4 h-4" />
          <p class="text-2xl font-bold text-gray-800 relative top-[2px]">
            {{ dashboardData?.stats.totalClients }}
          </p>
          <img src="@/assets/images/dashvet-grafic-icon.png" alt="rooms" class="w-4 h-4" />
        </div>
      </DashboardCard>

      <DashboardCard :title="$t('dashboard.totalStaff')">
        <div class="flex items-center justify-center gap-4 text-sm">
          <img src="@/assets/images/dashvet-nurse-icon.png" alt="staff" class="w-4 h-4" />
          <p class="text-2xl font-bold text-gray-800 relative top-[2px]">
            {{ dashboardData?.stats.totalStaff }}</p>
          <img src="@/assets/images/dashvet-grafic-icon.png" alt="rooms" class="w-4 h-4" />
        </div>
      </DashboardCard>

      <DashboardCard :title="$t('dashboard.totalRooms')">
        <div class="flex items-center justify-center gap-4 text-sm">
          <img src="@/assets/images/dashvet-house-icon.png" alt="rooms" class="w-4 h-4" />
          <p class="text-2xl font-bold text-gray-800 relative top-[2px]">
            {{ dashboardData?.stats.totalRooms }}</p>
          <img src="@/assets/images/dashvet-grafic-icon.png" alt="rooms" class="w-4 h-4" />
        </div>
      </DashboardCard>
    </div>

    <!-- Últimos pacientes -->
    <div class="flex items-start gap-6 mb-6 w-full">
      <!-- Tabla -->
      <div class="w-4/5">
        <h2 class="text-2xl font-semibold mb-4">{{ $t('dashboard.latestPatients') }}</h2>
        <table class="w-full text-left border border-gray-300 rounded-md overflow-hidden text-lg">
          <thead class="bg-gray-100">
          <tr>
            <th class="p-4">ID</th>
            <th class="p-4">Tipo</th>
            <th class="p-4">Dueño</th>
            <th class="p-4">Ciudad</th>
            <th class="p-4">Fecha</th>
            <th class="p-4">Estado</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="p in dashboardData?.latestPatients" :key="p.id" class="border-t">
            <td class="p-5">{{ p.id }}</td>
            <td class="p-5">{{ p.kind }}</td>
            <td class="p-5">{{ p.owner }}</td>
            <td class="p-5">{{ p.city }}</td>
            <td class="p-5">{{ p.date }}</td>
            <td class="p-5">{{ p.status }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Imagen -->
      <div class="w-1/3 flex justify-center">
        <img src="@/assets/images/dashvet-analys-icon.png" alt="Análisis" class="w-7 h-7" />
      </div>
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
