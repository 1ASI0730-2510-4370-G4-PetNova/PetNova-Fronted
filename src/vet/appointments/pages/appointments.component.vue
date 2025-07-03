<template>
  <article>
    <MenuComponent />
    <section class="main-container">
      <section class="first-container">
        <LanguageSwitch />
        <Notification />
      </section>
      <section class="second-container">
        <Searcher @appointment-found="handleSearchResults" />
        <Button @add-click="openAddDialog" />
      </section>
      <TableComponent :appointments="filteredAppointments" :search="search" />
    </section>
    <PvDialog v-model:visible="createVisible" modal :header="$t('citas.crear-cita')" :style="{ width: '25rem' }">
      <section>
        <section class="flex flex-column mb-1">
          <label>{{ $t('citas.nombre') }}</label>
          <PvInputText v-model="newAppointment.petName" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t('citas.inicio') }}</label>
          <PvInputText v-model="newAppointment.appointmentDate" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t('citas.cliente') }}</label>
          <PvInputText v-model="newAppointment.client" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t('citas.numero') }}</label>
          <PvInputText v-model="newAppointment.contactNumber" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t('citas.estado') }}</label>
          <PvInputText v-model="newAppointment.status" class="flex-auto" />
        </section>
        <section class="flex flex-column">
          <label>{{ $t('citas.tipo-evento') }}</label>
          <PvInputText v-model="newAppointment.eventType" class="flex-auto" />
        </section>
      </section>
      <template #footer>
        <PvButton :label="$t('citas.cancelar')" text severity="secondary" @click="createVisible = false" />
        <PvButton :label="$t('citas.guardar')" outlined severity="danger" @click="createAppointment" :disabled="!isValidAppointment(newAppointment)" />
      </template>
    </PvDialog>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import { createAppointment as createAppointmentService} from '../services/appointment.service.js';
import Appointment from '../models/appointment.model.js';

import MenuComponent from '../../../shared/components/menu.component.vue';
import TableComponent from '../components/table.component.vue';
import Searcher from '../components/searcher.component.vue';
import Button from '../components/button.component.vue';
import Notification from '../components/notification.component.vue';
import LanguageSwitch from '../../../shared/components/language-switcher.component.vue';

const createVisible = ref(false);
const newAppointment = ref(new Appointment());
const filteredAppointments = ref([]);
const search = ref('');

const isValidAppointment = (appointment) => Appointment.isValid(appointment);

const openAddDialog = () => {
  createVisible.value = true;
};

const createAppointment = async () => {
  if (!isValidAppointment(newAppointment.value)) return;
  await createAppointmentService(newAppointment.value);
  window.location.reload()
  createVisible.value = false;
  newAppointment.value = new Appointment();
};

const handleSearchResults = (results) => {
  filteredAppointments.value = results;
};
</script>

<style scoped>
article {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: rgb(235, 235, 235);
}
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 80%;
}
@media (max-width: 1600px) {
  .main-container {
    overflow-x: auto;
  }
}
.first-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 15px 0;
}
.second-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
}

.p-inputtext:focus {
  outline: none;
  box-shadow: none;
  border-color: inherit;
}

.p-inputtext:hover {
  outline: none;
  box-shadow: none;
  border-color: inherit;
}
</style>
