<template>
  <article>
    <MenuComponent />
    <section class="main-container">
      <section class="first-container">
        <div class="language-notification">
          <!-- Espacio para mantener layout similar al admin -->
        </div>
      </section>
      <section class="second-container">
        <div class="search-container">
          <img
            src="../../../assets/images/search-icon.png"
            alt="search"
            class="search-icon"
          />
          <input
            v-model="search"
            :placeholder="$t('citas.buscar')"
            class="search-input"
          />
        </div>
        <button class="add-button" @click="openAddAppointmentDialog">
          Add new
        </button>
      </section>

      <table>
        <thead>
          <tr>
            <th>{{ $t("citas.nombre") }}</th>
            <th>{{ $t("citas.inicio") }}</th>
            <th>{{ $t("citas.cliente") }}</th>
            <th>{{ $t("citas.numero") }}</th>
            <th>{{ $t("citas.estado") }}</th>
            <th>{{ $t("citas.tipo-evento") }}</th>
            <th>{{ $t("citas.acciones") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedAppointments.length === 0">
            <td colspan="7" class="no-data">{{ $t("citas.no-disponible") }}</td>
          </tr>
          <tr
            v-for="appointment in paginatedAppointments"
            :key="appointment.id"
          >
            <td>
              <section class="avatar-container">
                <img
                  src="../../../assets/images/register-image.png"
                  alt="avatar"
                  class="avatar"
                />
                <span>{{ appointment.petName }}</span>
              </section>
            </td>
            <td>{{ appointment.startDate }}</td>
            <td>{{ appointment.client }}</td>
            <td>{{ appointment.contactNumber }}</td>
            <td>{{ appointment.status }}</td>
            <td>{{ appointment.eventType }}</td>
            <td class="label-actions">
              <span
                @click="editAppointment(appointment)"
                class="label-edit-action"
              >
                <span>Edit</span>
                <img
                  src="../../../assets/images/edit-table.icon.png"
                  alt="edit"
                  class="action-icon"
                />
              </span>
              <span
                @click="deleteAppointment(appointment)"
                class="label-delete-action"
              >
                <img
                  src="../../../assets/images/delete-table-icon.png"
                  alt="delete"
                  class="action-icon"
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <section class="pagination">
        <section @click="prevPage">
          <img
            src="../../../assets/images/left-icon.png"
            alt="left icon"
            class="icons-pagination"
          />
        </section>
        <section
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          class="pagination-item"
        >
          {{ page }}
        </section>
        <section @click="nextPage">
          <img
            src="../../../assets/images/rigth-icon.png"
            alt="right icon"
            class="icons-pagination"
          />
        </section>
      </section>

      <!-- Botón flotante -->
      <div class="floating-button" @click="openAddAppointmentDialog">
        <span class="plus-icon">+</span>
      </div>
    </section>

    <!-- Diálogo para agregar cita -->
    <PvDialog
      v-model:visible="addAppointmentDialogVisible"
      modal
      :header="$t('citas.crear-cita')"
      :style="{ width: '25rem' }"
    >
      <section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("citas.nombre") }}</label>
          <PvInputText v-model="newAppointment.petName" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("citas.inicio") }}</label>
          <PvInputText v-model="newAppointment.startDate" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("citas.cliente") }}</label>
          <PvInputText v-model="newAppointment.client" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("citas.numero") }}</label>
          <PvInputText
            v-model="newAppointment.contactNumber"
            class="flex-auto"
          />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("citas.estado") }}</label>
          <PvInputText v-model="newAppointment.status" class="flex-auto" />
        </section>
        <section class="flex flex-column">
          <label>{{ $t("citas.tipo-evento") }}</label>
          <PvInputText v-model="newAppointment.eventType" class="flex-auto" />
        </section>
      </section>
      <template #footer>
        <PvButton
          :label="$t('citas.cancelar')"
          text
          severity="secondary"
          @click="addAppointmentDialogVisible = false"
        />
        <PvButton
          :label="$t('citas.guardar')"
          outlined
          severity="danger"
          @click="saveAppointment"
          :disabled="!isValidAppointment(newAppointment)"
        />
      </template>
    </PvDialog>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import MenuComponent from "../../../shared/components/menu-client.component.vue";
import {
  getAppointments,
  createAppointment,
} from "../../../vet/appointments/services/appointment.service";
import { getClients } from "../../../vet/clients/services/client.service";

const search = ref("");
const clients = ref([]);
const appointments = ref([]);
const newAppointment = ref({
  petName: "",
  startDate: "",
  client: "",
  contactNumber: "",
  status: "",
  eventType: "",
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

const isValidAppointment = (appointment) => {
  return (
    appointment.petName &&
    appointment.startDate &&
    appointment.client &&
    appointment.contactNumber &&
    appointment.status &&
    appointment.eventType
  );
};

const saveAppointment = async () => {
  if (!isValidAppointment(newAppointment.value)) return;
  try {
    await createAppointment(newAppointment.value);
  } catch (error) {
    console.log("Error al guardar, pero continuando...");
  }
  addAppointmentDialogVisible.value = false;
  await fetchAppointments();
};

const editAppointment = (appointment) => {
  // Placeholder para editar cita
  console.log("Editar cita:", appointment);
};

const deleteAppointment = (appointment) => {
  // Placeholder para eliminar cita
  console.log("Eliminar cita:", appointment);
};

const totalPages = computed(() =>
  Math.ceil(appointments.value.length / perPage)
);
const paginatedAppointments = computed(() =>
  appointments.value.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  )
);

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

.search-container {
  display: flex;
  align-items: center;
  width: 30%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background-color: #eaf7fc;
}

.search-input {
  width: 100%;
  height: 22px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 20px;
}

.search-input::placeholder {
  font-size: 20px;
  color: black;
}

.search-icon {
  width: 26px;
  margin-right: 20px;
  margin-left: 10px;
  cursor: pointer;
}

.add-button {
  height: 100%;
  padding: 10px 40px;
  background-color: #eaf7fc;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

table {
  padding: 0 20px;
  width: 100%;
  background-color: white;
}

@media (max-width: 1600px) {
  table {
    padding: 0 50px;
    width: 100%;
    background-color: white;
  }
}

th {
  padding: 10px 20px;
  font-weight: 600;
  font-size: 20px;
}

td {
  font-weight: 400;
  font-size: 16px;
  text-align: center;
}

tr {
  height: 60px;
}

.avatar-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 5px;
}

.label-actions {
  display: flex;
  justify-content: center;
  width: 70%;
  margin: auto;
  background-color: #d9d9d9;
  padding: 10px 1px;
  border-radius: 12px;
}

@media (max-width: 1600px) {
  .label-actions {
    width: 100%;
  }
}

.label-edit-action {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.label-delete-action {
  display: flex;
  align-items: center;
  margin-left: 5px;
  cursor: pointer;
}

.action-icon {
  width: 27px;
  margin-left: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 25px;
}

.icons-pagination {
  width: 60px;
  height: 60px;
  margin: 0 10px;
  cursor: pointer;
}

.pagination-item {
  width: 60px;
  height: 60px;
  display: flex;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
  background-color: #6abfe3;
  color: white;
  font-size: 40px;
  cursor: pointer;
}

.floating-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: #6abfe3;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.plus-icon {
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.no-data {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
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
