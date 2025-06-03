<template>
  <div class="dashboard-card h-full">
    <h2 class="text-xl font-semibold text-indigo-600 mb-4">{{ title }}</h2>
    <slot></slot>
  </div>
</template>



<script setup>
defineProps({ title: String })
</script>
<style scoped>
/* DashboardCard.component.vue style */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  grid-auto-rows: 500px; /* altura fija para igualar altura */
  gap: 20px;
}
.dashboard-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1rem; /* <-- más compacto */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 70px;
  width: 700px;
}



.dashboard-card:hover {
  box-shadow: 0 10px 15px rgba(0,0,0,0.15);
}

.dashboard-card h2 {
  color: #4f46e5; /* indigo-600 */
  font-weight: 600;
  font-size: 1.25rem; /* 20px */
  margin-bottom: 1rem;
}

.dashboard-card p {
  font-size: 1.125rem; /* 18px */
  color: #374151; /* gray-700 */
  margin-bottom: 0.5rem;
}

/* Para quitar el margen del último párrafo dentro de cada card */
.dashboard-card p:last-child {
  margin-bottom: 0;
}
</style>
