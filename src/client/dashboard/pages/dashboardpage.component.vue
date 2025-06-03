<template>
  <div class="max-h-screen p-4 bg-gray-50">
    <div
        class="grid grid-cols-2 gap-2 h-full"
        style="grid-template-rows: 1fr 1fr;"
    >

      <!-- Card 1 -->
      <DashboardCard :title="$t('dashboard.vitalStatus')" class="h-full">
        <p class="text-lg mb-1">❤️ {{ dashboard.vitalStatus.heartRate }}</p>
        <p class="text-lg mb-1">🌡️ {{ dashboard.vitalStatus.temperature }}</p>
        <p class="text-lg">📈 {{ dashboard.vitalStatus.status }}</p>
      </DashboardCard>

      <!-- Card 2 -->
      <DashboardCard :title="$t('dashboard.appointmentsToday')" class="h-full">
        <div
            v-for="appt in dashboard.appointments"
            :key="appt.petName"
            class="mb-3 border-b border-gray-200 pb-2 last:border-none last:pb-0"
        >
          <p class="font-semibold">{{ $t('dashboard.' + appt.eventType.toLowerCase()) }}</p>
          <p class="text-indigo-700">{{ appt.petName }}         🕒                {{ appt.time }}</p>
        </div>
      </DashboardCard>

      <!-- Card 3 -->
      <DashboardCard :title="$t('dashboard.collarStatus')" class="h-full">
        <p class="text-lg mb-1">📍 {{ dashboard.collarStatus.location }}</p>
        <p class="text-lg mb-1">🔋 {{ dashboard.collarStatus.battery }}</p>
        <p class="text-lg mb-1">📶 {{ dashboard.collarStatus.status }}</p>
        <p class="text-lg mb-1">🕒 {{ dashboard.collarStatus.lastSeen }}</p>
        <p class="text-lg">👣 {{ dashboard.collarStatus.steps }} steps</p>
      </DashboardCard>

      <!-- Card 4 -->
      <DashboardCard
          v-if="dashboard.realTimeLocation"
          :title="$t('dashboard.realTimeLocation')"
          class="h-full"
      >
        <p class="text-lg mb-1">
          🌐 {{ dashboard.realTimeLocation.latitude }},
          {{ dashboard.realTimeLocation.longitude }}
        </p>
        <p class="text-sm mb-1 text-gray-600">
          🕒 {{ dashboard.realTimeLocation.timestamp }}
        </p>
        <p class="text-lg">📡 {{ dashboard.realTimeLocation.status }}</p>
      </DashboardCard>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {getDashboardData} from '../services/Dashboard.service'
import DashboardCard from '../components/DashboardCard.component.vue'

const dashboard = ref({
  vitalStatus: {},
  appointments: [],
  collarStatus: {}
})

onMounted(async () => {
  dashboard.value = await getDashboardData()
  console.log('Dashboard cargado:', dashboard.value)
})
</script>
