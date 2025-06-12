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
    <!-- Contenedor externo que centra todo -->
    <div class="w-full flex justify-center mb-6">
      <!-- Contenedor interno limitado -->
      <div class="flex gap-6 items-start max-w-6xl w-full px-4">
        <!-- Tabla -->
        <div class="flex-1">
          <h2 class="text-2xl font-semibold mb-4">{{ $t('dashboard.latestPatients') }}</h2>
          <table class="w-full text-left border border-gray-300 rounded-md overflow-hidden text-lg">
            <thead class="bg-gray-100">
            <tr>
              <th class="p-6 ">ID</th>
              <th class="p-6">Tipo</th>
              <th class="p-6">Dueño</th>
              <th class="p-6">Ciudad</th>
              <th class="p-6">Fecha</th>
              <th class="p-6">Estado</th>
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

        <!-- Imagen alineada correctamente -->
        <div class="flex items-center justify-center w-[100px]">
          <img src="@/assets/images/dashvet-analys-icon.png" alt="Análisis" class="w-8 h-8" />
        </div>
      </div>
    </div>

    <!-- Reporte semanal + Notificaciones como fila horizontal -->
    <div class="grid grid-cols-3 gap-4 my-6 items-stretch">
      <!-- Income -->
      <DashboardCard title="Income this week 💰" class="!p-2 max-w-[180px]">
        <div class="flex flex-col items-center gap-2 mt-4">
          <img src="@/assets/images/dashvet-money-icon.png" alt="Income Icon" class="w-2 h-2" />
          <span class="text-4xl font-extrabold text-green-600">${{ dashboardData?.weeklyReport.income }}</span>
        </div>
      </DashboardCard>

      <!-- Outcome -->
      <DashboardCard title="Outcome this week 💸" class="!p-2 max-w-[180px]">
        <div class="flex flex-col items-center gap-2 mt-4">
          <img src="@/assets/images/dashvet-cash-icon.png" alt="Outcome Icon" class="w-2 h-2" />
          <span class="text-4xl font-extrabold text-red-600">${{ dashboardData?.weeklyReport.outcome }}</span>
        </div>
      </DashboardCard>

      <!-- Notificaciones -->
      <DashboardCard :title="$t('dashboard.clientNotifications')" class="!p-4">
        <ul class="list-disc pl-5 text-base">
          <li
              v-for="(n, index) in dashboardData?.notifications"
              :key="index"
              class="mb-6 leading-relaxed"
          >
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
