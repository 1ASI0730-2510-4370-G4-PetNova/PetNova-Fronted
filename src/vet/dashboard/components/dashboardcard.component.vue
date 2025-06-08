<template>
  <div class="dashboard-card bg-white rounded-lg shadow-sm border p-3 h-full">
    <h2 class="text-base font-medium text-indigo-600 mb-2 text-center">{{ title }}</h2>
    <slot></slot>
  </div>
</template>


<script setup>
defineProps({ title: String })
</script>

<style scoped>
.dashboard-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
}
.dashboard-card:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}
.dashboard-card h2 {
  color: #4f46e5;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.dashboard-card p {
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 0.5rem;
}
.dashboard-card p:last-child {
  margin-bottom: 0;
}
</style>
