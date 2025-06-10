<template>
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
        <td colspan="8" class="no-data">{{ $t("citas.no-disponible") }}</td>
      </tr>
      <tr v-for="appointment in paginatedAppointments" :key="appointment.id">
        <td>
          <section class="avatar-container">
            <img
              src="../../assets/images/register-image.png"
              alt="avatar"
              class="avatar"
            />
            {{ appointment.petName }}
          </section>
        </td>
        <td>{{ appointment.startDate }}</td>
        <td>{{ appointment.client }}</td>
        <td>{{ appointment.contactNumber }}</td>
        <td>{{ appointment.status }}</td>
        <td>{{ appointment.eventType }}</td>
        <td class="label-actions">
          <span @click="openEditDialog(appointment)" class="label-edit-action">
            <span>Edit</span>
            <img
              src="../../assets/images/edit-table.icon.png"
              alt="edit"
              class="action-icon"
            />
          </span>
          <span
            @click="openDeleteDialog(appointment)"
            class="label-delete-action"
          >
            <img
              src="../../assets/images/delete-table-icon.png"
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
        src="../../assets/images/left-icon.png"
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
        src="../../assets/images/rigth-icon.png"
        alt="right icon"
        class="icons-pagination"
      />
    </section>
  </section>

  <PvDialog
    v-model:visible="editVisible"
    modal
    :header="$t('citas.editar-cita')"
    :style="{ width: '25rem' }"
  >
    <section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("citas.nombre") }}</label>
        <PvInputText v-model="editedAppointment.petName" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("citas.inicio") }}</label>
        <PvInputText v-model="editedAppointment.startDate" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("citas.cliente") }}</label>
        <PvInputText v-model="editedAppointment.client" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("citas.numero") }}</label>
        <PvInputText
          v-model="editedAppointment.contactNumber"
          class="flex-auto"
        />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("citas.estado") }}</label>
        <PvInputText v-model="editedAppointment.status" class="flex-auto" />
      </section>
      <section class="flex flex-column">
        <label>{{ $t("citas.tipo-evento") }}</label>
        <PvInputText v-model="editedAppointment.eventType" class="flex-auto" />
      </section>
    </section>
    <template #footer>
      <PvButton
        :label="$t('citas.cancelar')"
        text
        severity="secondary"
        @click="editVisible = false"
      />
      <PvButton
        :label="$t('citas.guardar')"
        outlined
        severity="danger"
        @click="saveAppointment"
        :disabled="!isValidAppointment(editedAppointment)"
      />
    </template>
  </PvDialog>

  <PvDialog
    v-model:visible="deleteVisible"
    modal
    :header="$t('citas.eliminar-cita')"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block">{{
      $t("citas.estas-seguro")
    }}</span>
    <template #footer>
      <PvButton
        :label="$t('citas.cancelar')"
        text
        severity="secondary"
        @click="deleteVisible = false"
      />
      <PvButton
        :label="$t('citas.eliminar')"
        outlined
        severity="danger"
        @click="confirmDelete"
      />
    </template>
  </PvDialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const appointments = ref([]);
const search = ref("");
const currentPage = ref(1);
const perPage = 5;
const editVisible = ref(false);
const deleteVisible = ref(false);
const editedAppointment = ref({});
const appointmentToDelete = ref(null);

const fetchAppointments = async () => {
  const res = await axios.get(
    "https://fake-api-rose-psi.vercel.app/appointments"
  );
  appointments.value = res.data;
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

const filteredAppointments = computed(() => {
  return appointments.value.filter((appointment) =>
    appointment.petName.toLowerCase().includes(search.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredAppointments.value.length / perPage)
);
const paginatedAppointments = computed(() =>
  filteredAppointments.value.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  )
);

const openEditDialog = (appointment) => {
  editedAppointment.value = { ...appointment };
  editVisible.value = true;
};

const saveAppointment = async () => {
  if (!isValidAppointment(editedAppointment.value)) return;
  await axios.put(
    `https://fake-api-rose-psi.vercel.app/appointments/${editedAppointment.value.id}`,
    editedAppointment.value
  );
  editVisible.value = false;
  fetchAppointments();
};

const openDeleteDialog = (appointment) => {
  appointmentToDelete.value = appointment;
  deleteVisible.value = true;
};

const confirmDelete = async () => {
  await axios.delete(
    `https://fake-api-rose-psi.vercel.app/appointments/${appointmentToDelete.value.id}`
  );
  deleteVisible.value = false;
  fetchAppointments();
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

onMounted(fetchAppointments);
</script>

<style scoped>
table {
  padding: 0 20px;
  width: 100%;
  background-color: white;
}

hr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #000000;
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
  border-radius: 50;
  margin-right: 5px;
  border-radius: 20px;
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
  table {
    padding: 0 50px;
    width: 100%;
    background-color: white;
  }

  .label-actions {
    width: 100%;
  }
}

.label-edit-action {
  display: flex;
  align-items: center;
}

.label-delete-action {
  display: flex;
  align-items: center;
  margin-left: 5px;
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
