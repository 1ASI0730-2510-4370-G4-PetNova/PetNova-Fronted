<template>
  <div class="dashboard-layout">
    <!-- Barra lateral de navegación -->
    <MenuClient />

    <!-- Contenido principal del dashboard -->
    <div class="dashboard-content">
      <div class="dashboard-grid">
        <!-- Card 1 -->
        <DashboardCard
          :title="$t('dashboard.vitalStatus')"
          class="h-full"
          style="background-color: #a0aab2"
        >
          <div class="flex justify-around items-center text-center space-x-2">
            <div>
              <img
                src="@/assets/images/dashboard-heard-icon.png"
                alt="Heart"
                class="w-8 h-8 mx-auto mb-1 object-contain"
              />
              <span class="text-xl font-bold text-black">{{
                dashboard.vitalStatus.heartRate
              }}</span>
            </div>
            <div>
              <img
                src="@/assets/images/dashboard-temp-icon.png"
                alt="Temperature"
                class="w-8 h-8 mx-auto mb-1 object-contain"
              />
              <span class="text-xl font-bold text-black">{{
                dashboard.vitalStatus.temperature
              }}</span>
            </div>
            <div>
              <img
                src="@/assets/images/dashboard-dog-icon.png"
                alt="Status"
                class="w-8 h-8 mx-auto mb-1 object-contain"
              />
              <span class="text-xl font-bold text-black">{{
                dashboard.vitalStatus.status
              }}</span>
            </div>
          </div>
        </DashboardCard>

        <!-- Card 2 -->
        <DashboardCard
          :title="$t('dashboard.appointmentsToday')"
          style="background-color: #a0aab2"
        >
          <div
            v-for="appt in dashboard.appointments"
            :key="appt.petName"
            class="mb-3 pb-2 last:pb-0 last:mb-0 rounded-lg p-3 text-white"
            style="background-color: #6abfe3; border-radius: 12px"
          >
            <p class="font-semibold">
              {{ $t("dashboard." + appt.eventType.toLowerCase()) }}
            </p>
            <p>{{ appt.petName }} 🕒 {{ appt.time }}</p>
          </div>
        </DashboardCard>

        <!-- Card 3 -->
        <DashboardCard
          :title="$t('dashboard.collarStatus')"
          style="background-color: #a0aab2"
          class="h-full"
        >
          <div class="flex justify-around items-center text-center space-x-2">
            <div>
              <img
                src="@/assets/images/dashboard-batery-icon.png"
                alt="Battery"
                class="w-8 h-8 mx-auto mb-1 object-contain"
              />
              <p class="text-lg font-bold text-black">
                {{ dashboard.collarStatus.battery }}
              </p>
            </div>
            <div>
              <img
                src="@/assets/images/dashboard-wifi-icon.png"
                alt="Status"
                class="w-8 h-8 mx-auto mb-1 object-contain"
              />
              <p class="text-lg font-bold text-black">
                {{ dashboard.collarStatus.status }}
              </p>
            </div>
            <div>
              <img
                src="@/assets/images/dashboard-clock-icon.png"
                alt="Last Seen"
                class="w-8 h-8 mx-auto mb-1 object-contain"
              />
              <p class="text-lg font-bold text-black">
                {{ dashboard.collarStatus.lastSeen }}
              </p>
            </div>
          </div>
        </DashboardCard>

        <!-- Card 4 -->
        <DashboardCard
          v-if="dashboard.realTimeLocation"
          style="background-color: #a0aab2"
          :title="$t('dashboard.realTimeLocation')"
        >
          <div class="flex items-center space-x-2">
            <img
              src="@/assets/images/dashboard-guaguas-icon.png"
              alt="Location"
              class="w-4 h-4 object-contain"
            />
            <div>
              <p class="text-sm font-semibold">
                🌐 {{ dashboard.collarStatus.location }}
              </p>
              <p class="text-sm font-semibold">
                🌐 steps taken: {{ dashboard.collarStatus.steps }}
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDashboardData } from "../services/Dashboard.service";
import DashboardCard from "../components/DashboardCard.component.vue";
import MenuClient from "@/shared/components/menu-client.component.vue";

const dashboard = ref({
  vitalStatus: {},
  appointments: [],
  collarStatus: {},
  realTimeLocation: null,
});

onMounted(async () => {
  dashboard.value = await getDashboardData();
  console.log("Dashboard cargado:", dashboard.value);
});
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh; /* Altura fija igual que el menú */
  overflow: hidden; /* Sin scroll en el contenedor principal */
}

.dashboard-content {
  flex: 1;
  padding: 0.5rem; /* Reducido de 1rem a 0.5rem */
  background-color: #f9fafb;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra el contenido verticalmente */
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  min-height: calc(100vh - 2rem); /* Altura mínima para asegurar buen tamaño */
  padding: 1rem 0; /* Padding vertical para mejor espaciado */
}
</style>
