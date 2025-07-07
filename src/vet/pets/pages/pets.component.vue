<template>
  <article>
    <MenuComponent />
    <section class="main-container">
      <section class="first-container">
        <LanguageSwitch />
        <Notification />
      </section>

      <section class="second-container">
        <Searcher @pet-found="filteredPets = $event" />
        <Button @add-click="createVisible = true" />
      </section>

      <TableComponent
          :pets="filteredPets"
          @edit="openEditDialog"
          @delete="openDeleteDialog"
      />
    </section>

    <!-- CREAR MASCOTA -->
    <PvDialog v-model:visible="createVisible" modal :header="$t('mascotas.crear-mascota')" :style="{ width: '25rem' }">
      <section>
        <PvInputText v-model="newPet.name" placeholder="Nombre" />
        <PvInputText v-model="newPet.breed" placeholder="Raza" />
        <PvInputText v-model="newPet.dateOfBirth" placeholder="Nacimiento (YYYY-MM-DD)" />
        <PvInputText v-model="newPet.dateRegistered" placeholder="Fecha de Registro (YYYY-MM-DD)" />
        <PvDropdown v-model="newPet.gender" :options="genderOptions" optionLabel="label" optionValue="value" placeholder="Género" />
        <PvInputText v-model="newPet.clientId" placeholder="ID del Cliente" />
      </section>
      <template #footer>
        <PvButton :label="$t('mascotas.cancelar')" @click="createVisible = false" />
        <PvButton :label="$t('mascotas.guardar')" @click="createPet" :disabled="!isValidPet(newPet)" />
      </template>
    </PvDialog>

    <!-- EDITAR MASCOTA -->
    <PvDialog v-model:visible="editVisible" modal :header="$t('mascotas.editar-mascota')" :style="{ width: '25rem' }">
      <section>
        <PvInputText v-model="editedPet.name" placeholder="Nombre" />
        <PvInputText v-model="editedPet.breed" placeholder="Raza" />
        <PvInputText v-model="editedPet.dateOfBirth" placeholder="Nacimiento (YYYY-MM-DD)" />
        <PvInputText v-model="editedPet.dateRegistered" placeholder="Fecha de Registro (YYYY-MM-DD)" />
        <PvDropdown v-model="editedPet.gender" :options="genderOptions" optionLabel="label" optionValue="value" placeholder="Género" />
        <PvInputText v-model="editedPet.clientId" placeholder="ID del Cliente" />
      </section>
      <template #footer>
        <PvButton :label="$t('mascotas.cancelar')" @click="editVisible = false" />
        <PvButton :label="$t('mascotas.guardar')" @click="savePet" :disabled="!isValidPet(editedPet)" />
      </template>
    </PvDialog>

    <!-- ELIMINAR MASCOTA -->
    <PvDialog v-model:visible="deleteVisible" modal :header="$t('mascotas.eliminar-mascota')" :style="{ width: '25rem' }">
      <p>{{ $t("mascotas.estas-seguro") }}</p>
      <template #footer>
        <PvButton :label="$t('mascotas.cancelar')" @click="deleteVisible = false" />
        <PvButton :label="$t('mascotas.eliminar')" @click="confirmDelete" />
      </template>
    </PvDialog>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Pet from '../models/pet.model.js';
import {
  getPets,
  createPet as createPetService,
  updatePet,
  deletePet
} from '../services/pet.service.js';

import MenuComponent from '../../../shared/components/menu.component.vue';
import TableComponent from '../components/table.component.vue';
import Button from '../components/button.component.vue';
import Notification from '../components/notification.component.vue';
import LanguageSwitch from '../../../shared/components/language-switcher.component.vue';
import Searcher from '../components/searcher.component.vue';

const pets = ref([]);
const filteredPets = ref([]);
const newPet = ref(new Pet());
const editedPet = ref(new Pet());
const petToDelete = ref(null);

const createVisible = ref(false);
const editVisible = ref(false);
const deleteVisible = ref(false);

const genderOptions = [
  { label: 'Macho', value: 1 },
  { label: 'Hembra', value: 2 }
];

const isValidPet = (pet) => Pet.isValid(pet);

const fetchPets = async () => {
  const { data } = await getPets();
  pets.value = data;
  filteredPets.value = data;
};

const createPet = async () => {
  await createPetService(newPet.value);
  newPet.value = new Pet();
  createVisible.value = false;
  await fetchPets();
};

const openEditDialog = (pet) => {
  editedPet.value = { ...pet };
  editVisible.value = true;
};

const savePet = async () => {
  await updatePet(editedPet.value);
  editVisible.value = false;
  await fetchPets();
};

const openDeleteDialog = (pet) => {
  petToDelete.value = pet;
  deleteVisible.value = true;
};

const confirmDelete = async () => {
  await deletePet(petToDelete.value.id);
  deleteVisible.value = false;
  await fetchPets();
};

onMounted(fetchPets);
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
</style>
