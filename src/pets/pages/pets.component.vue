<template>
  <article>
    <MenuComponent />
    <section class="main-container">
      <section class="first-container">
        <LanguageSwitch />
        <Notification />
      </section>
      <section class="second-container">
        <Searcher @pet-found="handleSearchResults" />
        <Button @add-click="openAddDialog" />
      </section>
      <TableComponent :pets="filteredPets" :search="search" />

      <!-- Botón circular con signo + -->
      <div class="circular-button-container">
        <button class="circular-button" @click="openAddDialog">
          <i class="pi pi-plus"></i>
        </button>
      </div>
    </section>
    <PvDialog
      v-model:visible="createVisible"
      modal
      :header="$t('mascotas.crear-mascota')"
      :style="{ width: '25rem' }"
    >
      <section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("mascotas.nombre") }}</label>
          <PvInputText v-model="newPet.petName" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("mascotas.cumpleanos") }}</label>
          <PvInputText v-model="newPet.birdDate" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("mascotas.registro") }}</label>
          <PvInputText v-model="newPet.registrationDate" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("mascotas.raza") }}</label>
          <PvInputText v-model="newPet.animalBreed" class="flex-auto" />
        </section>
        <section class="flex flex-column mb-1">
          <label>{{ $t("mascotas.genero") }}</label>
          <PvInputText v-model="newPet.gender" class="flex-auto" />
        </section>
        <section class="flex flex-column">
          <label>{{ $t("mascotas.hc") }}</label>
          <PvInputText v-model="newPet.hc" class="flex-auto" />
        </section>
      </section>
      <template #footer>
        <PvButton
          :label="$t('mascotas.cancelar')"
          text
          severity="secondary"
          @click="createVisible = false"
        />
        <PvButton
          :label="$t('mascotas.guardar')"
          outlined
          severity="danger"
          @click="createPet"
          :disabled="!isValidPet(newPet)"
        />
      </template>
    </PvDialog>
  </article>
</template>

<script setup>
import { ref } from "vue";
import { createPet as createPetService } from "../services/pet.service";
import Pet from "../models/pet.model";

import MenuComponent from "../../shared/components/menu.component.vue";
import TableComponent from "../components/table.component.vue";
import Searcher from "../components/searcher.component.vue";
import Button from "../components/button.component.vue";
import Notification from "../components/notification.component.vue";
import LanguageSwitch from "../../shared/components/language-switcher.component.vue";

const createVisible = ref(false);
const newPet = ref(new Pet());
const filteredPets = ref([]);
const search = ref("");

const isValidPet = (pet) => Pet.isValid(pet);

const openAddDialog = () => {
  createVisible.value = true;
};

const createPet = async () => {
  if (!isValidPet(newPet.value)) return;
  await createPetService(newPet.value);
  window.location.reload();
  createVisible.value = false;
  newPet.value = new Pet();
};

const handleSearchResults = (results) => {
  filteredPets.value = results;
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

.circular-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.circular-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #0066cc;
  color: white;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.2s;
}

.circular-button:hover {
  background-color: #0052a3;
  transform: scale(1.05);
}

.circular-button:active {
  transform: scale(0.95);
}

.circular-button i {
  margin: 0;
  padding: 0;
}
</style>
