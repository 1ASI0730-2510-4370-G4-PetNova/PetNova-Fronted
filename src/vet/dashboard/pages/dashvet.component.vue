<template>
  <div class="dashboard-layout">
    <!-- Barra lateral de navegación -->
    <Menu />

    <!-- Contenido principal del dashboard -->
    <div class="dashboard-content">
      <div class="w-full max-w-7xl mx-auto px-2">
        <h1 class="text-xl font-bold text-indigo-700 mb-4">
          Dashboard Veterinario 🩺
        </h1>

        <!-- Tarjetas resumen -->
        <div class="grid grid-cols-3 gap-3 mb-4">
          <DashboardCard :title="$t('dashboard.totalClients')">
            <div class="flex items-center justify-center gap-2 text-sm">
              <img
                src="@/assets/images/dashvet-dog-icon.png"
                alt="clients"
                class="w-4 h-4"
              />
              <p class="text-lg font-bold text-gray-800">
                {{ dashboardData?.stats.totalClients }}
              </p>
              <img
                src="@/assets/images/dashvet-grafic-icon.png"
                alt="graphic"
                class="w-4 h-4"
              />
            </div>
          </DashboardCard>

          <DashboardCard :title="$t('dashboard.totalStaff')">
            <div class="flex items-center justify-center gap-2 text-sm">
              <img
                src="@/assets/images/dashvet-nurse-icon.png"
                alt="staff"
                class="w-4 h-4"
              />
              <p class="text-lg font-bold text-gray-800">
                {{ dashboardData?.stats.totalStaff }}
              </p>
              <img
                src="@/assets/images/dashvet-grafic-icon.png"
                alt="graphic"
                class="w-4 h-4"
              />
            </div>
          </DashboardCard>

          <DashboardCard :title="$t('dashboard.totalRooms')">
            <div class="flex items-center justify-center gap-2 text-sm">
              <img
                src="@/assets/images/dashvet-house-icon.png"
                alt="rooms"
                class="w-4 h-4"
              />
              <p class="text-lg font-bold text-gray-800">
                {{ dashboardData?.stats.totalRooms }}
              </p>
              <img
                src="@/assets/images/dashvet-grafic-icon.png"
                alt="graphic"
                class="w-4 h-4"
              />
            </div>
          </DashboardCard>
        </div>

        <!-- Últimos pacientes -->
        <div class="w-full flex justify-center mb-4">
          <div class="flex gap-4 items-start max-w-6xl w-full px-2">
            <div class="flex-1">
              <h2 class="text-lg font-semibold mb-2">
                {{ $t("dashboard.latestPatients") }}
              </h2>
              <table
                class="w-full text-left border border-gray-300 rounded-md overflow-hidden text-sm"
              >
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
                  <tr
                    v-for="p in dashboardData?.latestPatients"
                    :key="p.id"
                    class="border-t"
                  >
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
            <div class="flex items-center justify-center w-[60px]">
              <img
                src="@/assets/images/dashvet-analys-icon.png"
                alt="Análisis"
                class="w-6 h-6"
              />
            </div>
          </div>
        </div>

        <!-- Reporte semanal + Notificaciones -->
        <div class="grid grid-cols-3 gap-3 items-stretch">
          <DashboardCard title="Income this week 💰" class="!p-2">
            <div class="flex flex-col items-center gap-1 mt-2">
              <img
                src="@/assets/images/dashvet-money-icon.png"
                alt="Income Icon"
                class="w-4 h-4"
              />
              <span class="text-lg font-extrabold text-green-600"
                >${{ dashboardData?.weeklyReport.income }}</span
              >
            </div>
          </DashboardCard>

          <DashboardCard title="Outcome this week 💸" class="!p-2">
            <div class="flex flex-col items-center gap-1 mt-2">
              <img
                src="@/assets/images/dashvet-cash-icon.png"
                alt="Outcome Icon"
                class="w-4 h-4"
              />
              <span class="text-lg font-extrabold text-red-600"
                >${{ dashboardData?.weeklyReport.outcome }}</span
              >
            </div>
          </DashboardCard>

          <DashboardCard
            :title="$t('dashboard.clientNotifications')"
            class="!p-2"
          >
            <ul class="list-disc pl-3 text-xs">
              <li
                v-for="(n, index) in dashboardData?.notifications"
                :key="index"
                class="mb-1 leading-relaxed"
              >
                {{ n }}
              </li>
            </ul>
          </DashboardCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardCard from "../components/dashboardcard.component.vue";
import { getDashboardData } from "../services/dashboard.service.js";
import Menu from "@/shared/components/menu.component.vue";

const dashboardData = ref(null);

onMounted(async () => {
  dashboardData.value = await getDashboardData();
});
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.dashboard-content {
  flex: 1;
  padding: 0.5rem;
  background-color: #f9fafb;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>
