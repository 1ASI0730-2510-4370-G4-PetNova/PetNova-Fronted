<template>
  <article>
    <MenuComponent />
    <section class="main-container">
      <section class="first-container">
        <LanguageSwitch />
        <Notification />
      </section>

      <section class="second-container">
        <Searcher @client-found="filteredClients = $event" />
        <Button @add-click="createVisible = true" />
      </section>

      <TableComponent
          :clients="filteredClients"
          @edit="openEditDialog"
          @delete="openDeleteDialog"
      />
    </section>

    <!-- CREAR CLIENTE -->
    <PvDialog v-model:visible="createVisible" modal :header="$t('clientes.crear-cliente')" :style="{ width: '25rem' }">
      <section>
        <PvInputText v-model="newClient.firstName" placeholder="Nombre" />
        <PvInputText v-model="newClient.lastName" placeholder="Apellido" />
        <PvInputText v-model="newClient.phone" placeholder="Teléfono" />
        <PvInputText v-model="newClient.email" placeholder="Email" />
      </section>
      <template #footer>
        <PvButton :label="$t('clientes.cancelar')" @click="createVisible = false" />
        <PvButton :label="$t('clientes.guardar')" @click="createClient" :disabled="!isValidClient(newClient)" />
      </template>
    </PvDialog>

    <!-- EDITAR CLIENTE -->
    <PvDialog v-model:visible="editVisible" modal :header="$t('clientes.editar-cliente')" :style="{ width: '25rem' }">
      <section>
        <PvInputText v-model="editedClient.firstName" placeholder="Nombre" />
        <PvInputText v-model="editedClient.lastName" placeholder="Apellido" />
        <PvInputText v-model="editedClient.phone" placeholder="Teléfono" />
        <PvInputText v-model="editedClient.email" placeholder="Email" />
      </section>
      <template #footer>
        <PvButton :label="$t('clientes.cancelar')" @click="editVisible = false" />
        <PvButton :label="$t('clientes.guardar')" @click="saveClient" :disabled="!isValidClient(editedClient)" />
      </template>
    </PvDialog>

    <!-- ELIMINAR CLIENTE -->
    <PvDialog v-model:visible="deleteVisible" modal :header="$t('clientes.eliminar-cliente')" :style="{ width: '25rem' }">
      <p>{{ $t("clientes.estas-seguro") }}</p>
      <template #footer>
        <PvButton :label="$t('clientes.cancelar')" @click="deleteVisible = false" />
        <PvButton :label="$t('clientes.eliminar')" @click="confirmDelete" />
      </template>
    </PvDialog>
  </article>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Client from "../models/client.model.js";
import {
  getClients,
  createClient as createClientService,
  updateClient,
  deleteClient,
} from "../services/client.service.js";

import MenuComponent from "../../../shared/components/menu.component.vue";
import TableComponent from "../components/table.component.vue";
import Button from "../components/button.component.vue";
import Notification from "../components/notification.component.vue";
import LanguageSwitch from "../../../shared/components/language-switcher.component.vue";
import Searcher from "../components/searcher.component.vue";

const clients = ref([]);
const filteredClients = ref([]);
const newClient = ref(new Client());
const editedClient = ref(new Client());
const clientToDelete = ref(null);

const createVisible = ref(false);
const editVisible = ref(false);
const deleteVisible = ref(false);

const isValidClient = (client) => Client.isValid(client);

const fetchClients = async () => {
  const { data } = await getClients();
  clients.value = data;
  filteredClients.value = data;
};

const createClient = async () => {
  await createClientService(newClient.value);
  newClient.value = new Client();
  createVisible.value = false;
  await fetchClients();
};

const openEditDialog = (client) => {
  editedClient.value = { ...client };
  editVisible.value = true;
};

const saveClient = async () => {
  await updateClient(editedClient.value);
  editVisible.value = false;
  await fetchClients();
};

const openDeleteDialog = (client) => {
  clientToDelete.value = client;
  deleteVisible.value = true;
};

const confirmDelete = async () => {
  await deleteClient(clientToDelete.value.id);
  deleteVisible.value = false;
  await fetchClients();
};

onMounted(fetchClients);
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
