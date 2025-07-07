<template>
  <div class="history-cards">
    <PetHistoryCard
        v-for="item in clinicalHistory"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :date="item.date"
    />
  </div>

  <div v-if="clinicalHistory.length === 0" class="no-history">
    <p>No clinical history available for this pet.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import PetHistoryCard from '../components/pet-history-card.component.vue';

const props = defineProps({
  medicalHistory: {
    type: Array,
    required: true
  }
});

const clinicalHistory = computed(() =>
    props.medicalHistory.filter(item => item.type === 'clinical')
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
