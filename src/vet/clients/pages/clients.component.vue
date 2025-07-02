<template>
  <article>
    <MenuComponent />
    <section class="main-container">
      <section class="first-container">
        <LanguageSwitch />
        <Notification />
      </section>
      <section class="second-container">
        <Searcher @client-found="handleSearchResults" />
        <Button @add-click="openAddDialog" />
      </section>
      <TableComponent :clients="filteredClients" :search="search" />
    </section>
    <PvDialog
      v-model:visible="createVisible"
      modal
      :header="$t('clientes.crear-cliente')"
      :style="{ width: '25rem' }"
    >
      <section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("clientes.nombre") }}</label>
          <PvInputText v-model="newClient.fullName" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("clientes.telefono") }}</label>
          <PvInputText v-model="newClient.phone" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("clientes.correo") }}</label>
          <PvInputText v-model="newClient.email" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("clientes.direccion") }}</label>
          <PvInputText v-model="newClient.address" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("clientes.estado") }}</label>
          <PvInputText v-model="newClient.status" class="flex-auto" />
        </section>
        <section class="flex flex-column">
          <label>{{ $t("clientes.hc") }}</label>
          <PvInputText v-model="newClient.hc" class="flex-auto" />
        </section>
      </section>
      <template #footer>
        <PvButton
          :label="$t('clientes.cancelar')"
          text
          severity="secondary"
          @click="createVisible = false"
        />
        <PvButton
          :label="$t('clientes.guardar')"
          outlined
          severity="danger"
          @click="createClient"
          :disabled="!isValidClient(newClient)"
        />
      </template>
    </PvDialog>
  </article>
</template>

<script setup>
import { ref } from "vue";
import { createClient as createClientService } from "../services/client.service.js";
import Client from "../models/client.model.js";

import MenuComponent from "../../../shared/components/menu.component.vue";
import TableComponent from "../components/table.component.vue";
import Searcher from "../components/searcher.component.vue";
import Button from "../components/button.component.vue";
import Notification from "../components/notification.component.vue";
import LanguageSwitch from "../../../shared/components/language-switcher.component.vue";

const createVisible = ref(false);
const newClient = ref(new Client());
const filteredClients = ref([]);
const search = ref("");

const isValidClient = (client) => Client.isValid(client);

const openAddDialog = () => {
  createVisible.value = true;
};

const createClient = async () => {
  if (!isValidClient(newClient.value)) return;
  await createClientService(newClient.value);
  window.location.reload();
  createVisible.value = false;
  newClient.value = new Client();
};

const handleSearchResults = (results) => {
  filteredClients.value = results;
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
