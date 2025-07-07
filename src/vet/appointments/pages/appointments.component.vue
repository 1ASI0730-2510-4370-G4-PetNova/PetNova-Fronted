<template>
  <article>
    <MenuComponent />
    <section class="main-container">
      <section class="first-container">
        <LanguageSwitch />
        <Notification />
      </section>

      <section class="second-container">
        <Searcher @appointment-found="filteredAppointments = $event" />
        <Button @add-click="createVisible = true" />
      </section>

      <TableComponent
          :appointments="filteredAppointments"
          @edit="openEditDialog"
          @delete="openDeleteDialog"
      />
    </section>

    <!-- CREAR CITA -->
    <PvDialog v-model:visible="createVisible" modal :header="$t('citas.crear-cita')" :style="{ width: '25rem' }">
      <section>
        <PvInputText v-model="newAppointment.petName" placeholder="Nombre Mascota" />
        <PvInputText v-model="newAppointment.clientName" placeholder="Nombre Cliente" />
        <PvInputText v-model="newAppointment.contactNumber" placeholder="Teléfono" />
        <PvInputText v-model="newAppointment.startDate" placeholder="Fecha de inicio" />
        <PvInputText v-model="newAppointment.status" placeholder="Estado" />
        <PvInputText v-model="newAppointment.type" placeholder="Tipo de evento" />
      </section>
      <template #footer>
        <PvButton :label="$t('citas.cancelar')" @click="createVisible = false" />
        <PvButton :label="$t('citas.guardar')" @click="createAppointment" :disabled="!isValidAppointment(newAppointment)" />
      </template>
    </PvDialog>

    <!-- EDITAR CITA -->
    <PvDialog v-model:visible="editVisible" modal :header="$t('citas.editar-cita')" :style="{ width: '25rem' }">
      <section>
        <PvInputText v-model="editedAppointment.petName" placeholder="Nombre Mascota" />
        <PvInputText v-model="editedAppointment.clientName" placeholder="Nombre Cliente" />
        <PvInputText v-model="editedAppointment.contactNumber" placeholder="Teléfono" />
        <PvInputText v-model="editedAppointment.startDate" placeholder="Fecha de inicio" />
        <PvInputText v-model="editedAppointment.status" placeholder="Estado" />
        <PvInputText v-model="editedAppointment.type" placeholder="Tipo de evento" />
      </section>
      <template #footer>
        <PvButton :label="$t('citas.cancelar')" @click="editVisible = false" />
        <PvButton :label="$t('citas.guardar')" @click="saveAppointment" :disabled="!isValidAppointment(editedAppointment)" />
      </template>
    </PvDialog>

    <!-- ELIMINAR CITA -->
    <PvDialog v-model:visible="deleteVisible" modal :header="$t('citas.eliminar-cita')" :style="{ width: '25rem' }">
      <p>{{ $t("citas.estas-seguro") }}</p>
      <template #footer>
        <PvButton :label="$t('citas.cancelar')" @click="deleteVisible = false" />
        <PvButton :label="$t('citas.eliminar')" @click="confirmDelete" />
      </template>
    </PvDialog>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Appointment from '../models/appointment.model.js';
import {
  getAppointments,
  createAppointment as createAppointmentService,
  updateAppointment,
  deleteAppointment
} from '../services/appointment.service.js';

import MenuComponent from '../../../shared/components/menu.component.vue';
import TableComponent from '../components/table.component.vue';
import Searcher from '../components/searcher.component.vue';
import Button from '../components/button.component.vue';
import Notification from '../components/notification.component.vue';
import LanguageSwitch from '../../../shared/components/language-switcher.component.vue';

const appointments = ref([]);
const filteredAppointments = ref([]);
const newAppointment = ref(new Appointment());
const editedAppointment = ref(new Appointment());
const appointmentToDelete = ref(null);

const createVisible = ref(false);
const editVisible = ref(false);
const deleteVisible = ref(false);

const isValidAppointment = (appointment) => Appointment.isValid(appointment);

const fetchAppointments = async () => {
  const { data } = await getAppointments();
  appointments.value = data;
  filteredAppointments.value = data;
};

const createAppointment = async () => {
  await createAppointmentService(newAppointment.value);
  newAppointment.value = new Appointment();
  createVisible.value = false;
  await fetchAppointments();
};

const openEditDialog = (appointment) => {
  editedAppointment.value = { ...appointment };
  editVisible.value = true;
};

const saveAppointment = async () => {
  await updateAppointment(editedAppointment.value);
  editVisible.value = false;
  await fetchAppointments();
};

const openDeleteDialog = (appointment) => {
  appointmentToDelete.value = appointment;
  deleteVisible.value = true;
};

const confirmDelete = async () => {
  await deleteAppointment(appointmentToDelete.value.id);
  deleteVisible.value = false;
  await fetchAppointments();
};

onMounted(fetchAppointments);
</script>

<style scoped>
/* igual que el original */
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
