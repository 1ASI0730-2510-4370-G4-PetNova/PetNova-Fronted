<template>
  <div class="history-cards">
    <PetHistoryCard
        v-for="item in preventiveHistory"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :date="item.date"
    />
  </div>

  <div v-if="preventiveHistory.length === 0" class="no-history">
    <p>No preventive care records available for this pet.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import PetHistoryCard from '../components/pet-history-card.component.vue';

const props = defineProps({
  medicalHistory: Array
});

const preventiveHistory = computed(() =>
    props.medicalHistory.filter(item => item.type === 'preventive')
);
</script>

<style scoped>
.history-cards {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.no-history {
  font-size: 1.2rem;
  color: #888;
  text-align: center;
  padding: 2rem;
}
</style>