<template>
  <div class="card">
    <div class="card-info">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
    <div class="card-date"><strong>{{ date }}</strong></div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  date: String
});
</script>

<style scoped>
.card {
  width: 100%;
  background-color: #e6f3fa;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 2rem 1.5rem;
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-3px);
}

.card-info h3 {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
}

.card-info p {
  font-size: 1.2rem;
  margin: 0.5rem 0 0 0;
  color: #333;
}

.card-date {
  font-size: 1.1rem;
  font-weight: 500;
}
</style>