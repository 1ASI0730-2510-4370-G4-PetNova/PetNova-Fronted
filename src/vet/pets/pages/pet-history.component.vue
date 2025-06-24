<template>
  <article>
    <MenuComponent />
    <section class="main-container">
      <section class="first-container">
        <LanguageSwitch />
        <Notification />
      </section>

      <div class="history-content">
        <h1>Pet medical history form</h1>

        <div class="history-header">
          <div class="history-tabs">
            <!-- luciana's comment: Buttons to switch between clinical and preventive care tabs -->
            <button :class="{ active: isActive('clinical') }" @click="navigateTo('clinical')">
              🐾 Clinical Management
            </button>
            <button :class="{ active: isActive('preventive') }" @click="navigateTo('preventive')">
              🛡️ Preventive Care
            </button>
          </div>

          <!-- luciana's comment: Description text below the tabs -->
          <span class="history-description">
            Timeline of medical procedures and treatments
          </span>

          <!-- luciana's comment: Button to trigger PDF download of pet medical history -->
          <button class="download-btn" @click="downloadHistory">
            Download history
          </button>
        </div>

        <!-- luciana's comment: Outlet for nested routes displaying medical history details -->
        <router-view :medicalHistory="medicalHistory" />
      </div>
    </section>
  </article>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import MenuComponent from '../../../shared/components/menu.component.vue';
import Notification from '../components/notification.component.vue';
import LanguageSwitch from '../../../shared/components/language-switcher.component.vue';
import { generatePetHistoryPDF } from '../services/generate-pet-history-pdf.service.js';

const router = useRouter();
const route = useRoute();

const petId = route.params.id;
const medicalHistory = ref([]);

// luciana's comment: Navigate to the selected history section (clinical or preventive)
const navigateTo = (section) => {
  router.push(`/pets/${petId}/history/${section}`);
};

// luciana's comment: Check if the given section is currently active based on the route
const isActive = (section) => {
  return route.path.includes(section);
};

// luciana's comment: Handle download button click, generate PDF if history exists
const downloadHistory = () => {
  if (medicalHistory.value.length === 0) {
    alert('No medical history to download.');
    return;
  }

  const petName = route.query.name || 'Pet';
  generatePetHistoryPDF(petName, medicalHistory.value);
};

// luciana's comment: Fetch medical history data for the pet on component mount
onMounted(async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/medicalHistories?petId=${petId}`);
    medicalHistory.value = data;
  } catch (error) {
    console.error('Error fetching medical history:', error);
  }
});
</script>

<style scoped>
article {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem 2rem 2rem 2rem;
  background-color: #f9f9f9;
  overflow-y: auto;
}

.first-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.history-content {
  width: 100%;
  padding: 0 2rem;
  margin: 0 auto;
}

.history-content h1 {
  font-size: 2.4rem;
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 700;
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.history-tabs button {
  background-color: #cce6f7;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.history-tabs .active {
  background-color: #84c3f7;
  font-weight: bold;
}

.history-description {
  flex: 1;
  text-align: center;
  font-size: 1.05rem;
  color: #444;
}

.download-btn {
  background-color: #e1effa;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.95rem;
}

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
