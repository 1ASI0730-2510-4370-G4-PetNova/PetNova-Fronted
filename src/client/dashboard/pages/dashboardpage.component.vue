<template>
  <div class="min-h-screen p-4 bg-gray-50">
    <div class="dashboard-grid">
      <!-- Card 1 -->
      <DashboardCard :title="$t('dashboard.vitalStatus')" class="h-full"   style="background-color: #A0AAB2;"
      >
        <div class="flex justify-around items-center text-center space-x-4">
          <!-- Imagen 1 -->
          <div>
            <img
                src="@/assets/images/dashboard-heard-icon.png"
                alt="Heart"
                class="w-12 h-12 mx-auto mb-1 object-contain"
            />
            <span class="text-3xl font-bold text-black">{{ dashboard.vitalStatus.heartRate }}</span>
          </div>

          <!-- Imagen 2 -->
          <div>
            <img
                src="@/assets/images/dashboard-temp-icon.png"
                alt="Temperature"
                class="w-12 h-12 mx-auto mb-1 object-contain"
            />
            <span class="text-3xl font-bold text-black">{{ dashboard.vitalStatus.temperature }}</span>
          </div>

          <!-- Imagen 3 -->
          <div>
            <img
                src="@/assets/images/dashboard-dog-icon.png"
                alt="Status"
                class="w-11 h-11 mx-auto mb-1 object-contain"
            />
            <span class="text-3xl font-bold text-black">{{ dashboard.vitalStatus.status }}</span>
          </div>
        </div>
      </DashboardCard>


      <!-- Card 2 -->
      <DashboardCard :title="$t('dashboard.appointmentsToday')"   style="background-color: #A0AAB2;"
      >
        <div
            v-for="appt in dashboard.appointments"
            :key="appt.petName"
            class="mb-3 pb-2 last:pb-0 last:mb-0 rounded-lg p-3 text-white "
            style="background-color: #6ABFE3;border-radius: 12px;"
        >
          <p class="font-semibold">{{ $t('dashboard.' + appt.eventType.toLowerCase()) }}</p>
          <p>
            {{ appt.petName }} 🕒 {{ appt.time }}
          </p>
        </div>
      </DashboardCard>


      <!-- Card 3 -->
      <DashboardCard :title="$t('dashboard.collarStatus')"   style="background-color: #A0AAB2;"
                      class="h-full">
        <div class="flex justify-around items-center text-center space-x-4">
          <!-- Imagen Batería -->
          <div>
            <img
                src="@/assets/images/dashboard-batery-icon.png"
                alt="Battery"
                class="w-12 h-12 mx-auto mb-1 object-contain"
            />
            <p class="text-2xl font-bold text-black">{{ dashboard.collarStatus.battery }}</p>
          </div>

          <!-- Imagen Estado -->
          <div>
            <img
                src="@/assets/images/dashboard-wifi-icon.png"
                alt="Status"
                class="w-12 h-12 mx-auto mb-1 object-contain"
            />
            <p class="text-2xl font-bold text-black">{{ dashboard.collarStatus.status }}</p>
          </div>

          <!-- Imagen Última conexión -->
          <div>
            <img
                src="@/assets/images/dashboard-clock-icon.png"
                alt="Last Seen"
                class="w-12 h-12 mx-auto mb-1 object-contain"
            />
            <p class="text-2xl font-bold text-black">{{ dashboard.collarStatus.lastSeen }}</p>
          </div>
        </div>
      </DashboardCard>




       <!-- Card 4 -->
      <DashboardCard
          v-if="dashboard.realTimeLocation"
          style="background-color: #A0AAB2;"

          :title="$t('dashboard.realTimeLocation')"
      >
        <div class="flex items-center space-x-4">
          <!-- Imagen a la izquierda -->
          <img
              src="@/assets/images/dashboard-guaguas-icon.png"
              alt="Location"
              class="w-6 h-6 object-contain"
          />
          <!-- Texto a la derecha en columna -->
          <div>
            <p class="text-lg font-semibold">
              🌐 {{ dashboard.collarStatus.location }}
            </p>
            <p class="h-25"></p>  <!-- espacio vacío de 3 líneas -->
            <p class="text-lg font-semibold">
              🌐 steps taken: {{ dashboard.collarStatus.steps }}
            </p>
          </div>
        </div>
      </DashboardCard>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDashboardData } from '../services/Dashboard.service'
import DashboardCard from '../components/DashboardCard.component.vue'

const dashboard = ref({
  vitalStatus: {},
  appointments: [],
  collarStatus: {},
  realTimeLocation: null,
})

onMounted(async () => {
  dashboard.value = await getDashboardData()
  console.log('Dashboard cargado:', dashboard.value)
})
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  grid-template-rows: repeat(2, 1fr); /* 2 filas de igual altura */
  gap: 20px;
  height: calc(100vh - 2rem); /* altura total disponible menos padding */
}

</style>
