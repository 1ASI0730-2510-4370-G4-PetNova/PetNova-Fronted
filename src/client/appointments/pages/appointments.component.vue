<template>
  <div class="appointments-container">
    <MenuComponent />
    <div class="appointments-content">
      <h1>{{ $t('citas.nombre') }}</h1>
      <input v-model="search" class="search-input" placeholder="Buscar" />
      <button class="add-appointment-button" @click="openAddAppointmentDialog">{{ $t('citas.agregar') }}</button>

      <table class="appointments-table">
        <thead>
          <tr>
            <th>{{ $t('citas.nombre-mascota') }}</th>
            <th>{{ $t('citas.fecha-inicio') }}</th>
            <th>{{ $t('citas.cliente') }}</th>
            <th>{{ $t('citas.telefono') }}</th>
            <th>{{ $t('citas.estado') }}</th>
            <th>{{ $t('citas.tipo-evento') }}</th>
            <th>{{ $t('citas.acciones') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedAppointments.length === 0">
            <td colspan="7" class="no-data">{{ $t('citas.no-disponible') }}</td>
          </tr>
          <tr v-for="appointment in paginatedAppointments" :key="appointment.id">
            <td>{{ appointment.petName }}</td>
            <td>{{ appointment.startDate }}</td>
            <td>{{ appointment.clientName }}</td>
            <td>{{ appointment.contactNumber }}</td>
            <td>{{ appointment.status }}</td>
            <td>{{ appointment.eventType }}</td>
            <td class="actions">
              <button @click="editAppointment(appointment)" class="edit-button">{{ $t('citas.editar') }}</button>
              <button @click="deleteAppointment(appointment)" class="delete-button">{{ $t('citas.eliminar') }}</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="prevPage">{{ $t('prev') }}</button>
        <span v-for="page in totalPages" :key="page" @click="currentPage = page" class="pagination-item">
          {{ page }}
        </span>
        <button @click="nextPage">{{ $t('next') }}</button>
      </div>
    </div>

    <!-- Diálogo para agregar cita -->
    <PvDialog v-model:visible="addAppointmentDialogVisible" header="Crear Cita" :style="{ width: '30rem' }">
      <section class="form-section">
        <label>{{ $t('citas.nombre-mascota') }}</label>
        <PvInputText v-model="newAppointment.petName" class="input-field" placeholder=" " />

        <label>{{ $t('citas.fecha-inicio') }}</label>
        <PvInputText v-model="newAppointment.startDate" class="input-field" placeholder="DD/MM/YYYY" />

        <label>{{ $t('citas.cliente') }}</label>
        <PvInputText v-model="newAppointment.clientName" class="input-field" placeholder=" " />

        <label>{{ $t('citas.telefono') }}</label>
        <PvInputText v-model="newAppointment.contactNumber" class="input-field" placeholder=" " />

        <label>{{ $t('citas.estado') }}</label>
        <PvInputText v-model="newAppointment.status" class="input-field" placeholder=" " />

        <label>{{ $t('citas.tipo-evento') }}</label>
        <PvInputText v-model="newAppointment.eventType" class="input-field" placeholder=" " />
      </section>

      <template #footer>
        <PvButton label="Cancelar" @click="addAppointmentDialogVisible = false" class="cancel-button"/>
        <PvButton label="Guardar" @click="saveAppointment" class="save-button"/>
      </template>
    </PvDialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MenuComponent from '../../../shared/components/menu-client.component.vue';
import { getAppointments, createAppointment } from '../../../vet/appointments/services/appointment.service';
import { getClients } from '../../../vet/clients/services/client.service';

const search = ref('');
const clients = ref([]);
const appointments = ref([]);
const newAppointment = ref({
  petName: '',
  startDate: '',
  clientName: '',
  contactNumber: '',
  status: '',
  eventType: ''
});
const addAppointmentDialogVisible = ref(false);
const currentPage = ref(1);
const perPage = 5;

const fetchClients = async () => {
  const { data } = await getClients();
  clients.value = data;
};

const fetchAppointments = async () => {
  const { data } = await getAppointments();
  appointments.value = data;
};

const openAddAppointmentDialog = () => {
  addAppointmentDialogVisible.value = true;
};

const saveAppointment = async () => {
  if (!newAppointment.value.petName || !newAppointment.value.startDate) return;
  await createAppointment(newAppointment.value);
  addAppointmentDialogVisible.value = false;
  fetchAppointments();
};

const totalPages = computed(() => Math.ceil(appointments.value.length / perPage));
const paginatedAppointments = computed(() => appointments.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage));

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

onMounted(fetchClients);
onMounted(fetchAppointments);
</script>

<style scoped>
.appointments-container {
  display: flex;
}

.appointments-content {
  flex: 1;
  padding: 20px;
}

.search-input {
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
}

.add-appointment-button {
  padding: 10px 20px;
  background-color: #6abfe3;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.appointments-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.appointments-table th,
.appointments-table td {
  padding: 10px;
  text-align: center;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination-item {
  cursor: pointer;
  margin: 0 5px;
}

.save-button,
.cancel-button {
  padding: 10px 20px;
  background-color: #6abfe3;
  color: white;
  border-radius: 5px;
  border: none;
}

.save-button:hover,
.cancel-button:hover {
  background-color: #4a90b7;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
