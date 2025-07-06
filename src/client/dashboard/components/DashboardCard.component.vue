<template>
  <div class="dashboard-card h-full">
    <h2 class="text-xl font-semibold text-indigo-600 mb-4">{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({ title: String });
</script>

<style scoped>
.dashboard-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px; /* Reducido de 12px a 8px */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más pequeña */
  padding: 0.75rem; /* Reducido de 1rem a 0.75rem */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
}

.dashboard-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Sombra hover reducida */
}

.dashboard-card h2 {
  color: #4f46e5;
  font-weight: 600;
  font-size: 1rem; /* Reducido de 1.25rem a 1rem */
  margin-bottom: 0.5rem; /* Reducido de 1rem a 0.5rem */
}

.dashboard-card p {
  font-size: 0.875rem; /* Reducido de 1.125rem a 0.875rem */
  color: #374151;
  margin-bottom: 0.25rem; /* Reducido de 0.5rem a 0.25rem */
}

.dashboard-card p:last-child {
  margin-bottom: 0;
}
</style>
