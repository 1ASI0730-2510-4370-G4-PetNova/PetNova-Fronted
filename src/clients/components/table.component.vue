<template>
  <table>
    <thead>
      <tr>
        <th>{{ $t('clientes.nombre') }}</th>
        <th>{{ $t('clientes.telefono') }}</th>
        <th>{{ $t('clientes.correo') }}</th>
        <th>{{ $t('clientes.direccion') }}</th>
        <th>{{ $t('clientes.estado') }}</th>
        <th>{{ $t('clientes.hc') }}</th>
        <th>{{ $t('clientes.acciones') }}</th>
      </tr>
    </thead>
    <tbody>
  <tr v-if="paginatedClients.length === 0">
    <td colspan="8" class="no-data">{{ $t('clientes.no-disponible') }}</td>
  </tr>
  <tr v-for="client in paginatedClients" :key="client.id">
    <td>
      <section class="avatar-container">
        <img src="../../assets/images/register-image.png" alt="avatar" class="avatar" />
        {{ client.fullName }}
      </section>
    </td>
    <td>{{ client.phone }}</td>
    <td>{{ client.email }}</td>
    <td>{{ client.address }}</td>
    <td>{{ client.status }}</td>
    <td>{{ client.hc }}</td>
    <td class="label-actions">
      <span @click="openEditDialog(client)" class="label-edit-action">
        <span>{{ $t('clientes.editar') }}</span>
        <img src="../../assets/images/edit-table.icon.png" alt="edit" class="action-icon" />
      </span>
      <span @click="openDeleteDialog(client)" class="label-delete-action">
        <img src="../../assets/images/delete-table-icon.png" alt="delete" class="action-icon" />
      </span>
    </td>
  </tr>
</tbody>
  </table>

  <section class="pagination">
    <section @click="prevPage">
      <img src="../../assets/images/left-icon.png" alt="left icon" class="icons-pagination" />
    </section>
    <section v-for="page in totalPages" :key="page" @click="currentPage = page" class="pagination-item">
      {{ page }}
    </section>
    <section @click="nextPage">
      <img src="../../assets/images/rigth-icon.png" alt="right icon" class="icons-pagination" />
    </section>
  </section>

  <PvDialog v-model:visible="editVisible" modal :header="$t('clientes.editar-cliente')" :style="{ width: '25rem' }">
    <section>
      <section class="flex flex-column mb-1">
        <label>{{ $t('clientes.nombre') }}</label>
        <PvInputText v-model="editedClient.fullName" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t('clientes.telefono') }}</label>
        <PvInputText v-model="editedClient.phone" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t('clientes.correo') }}</label>
        <PvInputText v-model="editedClient.email" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t('clientes.direccion') }}</label>
        <PvInputText v-model="editedClient.address" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t('clientes.estado') }}</label>
        <PvInputText v-model="editedClient.status" class="flex-auto" />
      </section>
      <section class="flex flex-column">
        <label>{{ $t('clientes.hc') }}</label>
        <PvInputText v-model="editedClient.hc" class="flex-auto" />
      </section>
    </section>
    <template #footer>
      <PvButton :label="$t('clientes.cancelar')" text severity="secondary" @click="editVisible = false" />
      <PvButton :label="$t('clientes.guardar')" outlined severity="danger" @click="saveClient" :disabled="!isValidClient(editedClient)" />
    </template>
  </PvDialog>

  <PvDialog v-model:visible="deleteVisible" modal :header="$t('clientes.eliminar-cliente')" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block">{{ $t('clientes.estas-seguro') }}</span>
    <template #footer>
      <PvButton :label="$t('clientes.cancelar')" text severity="secondary" @click="deleteVisible = false" />
      <PvButton :label="$t('clientes.eliminar')" outlined severity="danger" @click="confirmDelete" />
    </template>
  </PvDialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const clients = ref([]);
const search = ref('');
const currentPage = ref(1);
const perPage = 5;
const editVisible = ref(false);
const deleteVisible = ref(false);
const editedClient = ref({});
const clientToDelete = ref(null);

const fetchClients = async () => {
  const res = await axios.get('https://fake-api-rose-psi.vercel.app/clients');
  clients.value = res.data;
};

const isValidClient = (client) => {
  return client.fullName && client.phone && client.email && client.address && client.status && client.hc;
};

const filteredClients = computed(() => {
  return clients.value.filter(client => client.fullName.toLowerCase().includes(search.value.toLowerCase()));
});

const totalPages = computed(() => Math.ceil(filteredClients.value.length / perPage));
const paginatedClients = computed(() => filteredClients.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage));

const openEditDialog = (client) => {
  editedClient.value = { ...client };
  editVisible.value = true;
};

const saveClient = async () => {
  if (!isValidClient(editedClient.value)) return;
  await axios.put(`https://fake-api-rose-psi.vercel.app/clients/${editedClient.value.id}`, editedClient.value);
  editVisible.value = false;
  fetchClients();
};

const openDeleteDialog = (client) => {
  clientToDelete.value = client;
  deleteVisible.value = true;
};

const confirmDelete = async () => {
  await axios.delete(`http://localhost:3000/clients/${clientToDelete.value.id}`);
  deleteVisible.value = false;
  fetchClients();
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

onMounted(fetchClients);
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
  background-color: #D9D9D9;
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
  background-color: #6ABFE3;
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