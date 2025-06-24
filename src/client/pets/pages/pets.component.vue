<template>
  <div class="clients-container">
    <MenuComponent />
    <div class="clients-content">
      <h1>{{ $t('clientes.nombre') }}</h1>
      <input v-model="search" class="search-input" placeholder="Buscar" />
      <button class="add-pet-button" @click="openAddPetDialog">{{ $t('mascotas.agregar') }}</button>

      <table class="clients-table">
        <thead>
          <tr>
            <th>{{ $t('mascotas.nombre') }}</th>
            <th>{{ $t('mascotas.cumpleanos') }}</th>
            <th>{{ $t('mascotas.registro') }}</th>
            <th>{{ $t('mascotas.raza') }}</th>
            <th>{{ $t('mascotas.genero') }}</th>
            <th>{{ $t('mascotas.hc') }}</th>
            <th>{{ $t('mascotas.acciones') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedPets.length === 0">
            <td colspan="7" class="no-data">{{ $t('mascotas.no-disponible') }}</td>
          </tr>
          <tr v-for="pet in paginatedPets" :key="pet.id">
            <td>{{ pet.petName }}</td>
            <td>{{ pet.birdDate }}</td>
            <td>{{ pet.registrationDate }}</td>
            <td>{{ pet.animalBreed }}</td>
            <td>{{ pet.gender }}</td>
            <td>{{ pet.hc }}</td>
            <td class="actions">
              <button @click="editPet(pet)" class="edit-button">{{ $t('mascotas.editar') }}</button>
              <button @click="deletePet(pet)" class="delete-button">{{ $t('mascotas.eliminar') }}</button>
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

    <!-- Diálogo para agregar mascota -->
    <PvDialog v-model:visible="addPetDialogVisible" header="Crear Mascota" :style="{ width: '30rem' }">
      <section class="form-section">
        <label>{{ $t('mascotas.nombre') }}</label>
        <PvInputText v-model="newPet.petName" class="input-field" placeholder=" " />
        
        <label>{{ $t('mascotas.cumpleanos') }}</label>
        <PvInputText v-model="newPet.birdDate" class="input-field" placeholder="DD/MM/YYYY" />
        
        <label>{{ $t('mascotas.registro') }}</label>
        <PvInputText v-model="newPet.registrationDate" class="input-field" placeholder="DD/MM/YYYY" />
        
        <label>{{ $t('mascotas.raza') }}</label>
        <PvInputText v-model="newPet.animalBreed" class="input-field" placeholder=" " />
        
        <label>{{ $t('mascotas.genero') }}</label>
        <PvInputText v-model="newPet.gender" class="input-field" placeholder=" " />
        
        <label>{{ $t('mascotas.hc') }}</label>
        <PvInputText v-model="newPet.hc" class="input-field" placeholder=" " />
      </section>
      
      <template #footer>
        <PvButton label="Cancelar" @click="addPetDialogVisible = false" class="cancel-button"/>
        <PvButton label="Guardar" @click="savePet" class="save-button"/>
      </template>
    </PvDialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MenuComponent from '../../../shared/components/menu-client.component.vue';
import { getPets, createPet } from '../../../vet/pets/services/pet.service';
import { getClients } from '../../../vet/clients/services/client.service';

const search = ref('');
const clients = ref([]);
const pets = ref([]);
const newPet = ref({
  petName: '',
  birdDate: '',
  registrationDate: '',
  animalBreed: '',
  gender: '',
  hc: ''
});
const addPetDialogVisible = ref(false);
const currentPage = ref(1);
const perPage = 5;

const fetchClients = async () => {
  const { data } = await getClients();
  clients.value = data;
};

const fetchPets = async () => {
  const { data } = await getPets();
  pets.value = data;
};

const openAddPetDialog = () => {
  addPetDialogVisible.value = true;
};

const savePet = async () => {
  if (!newPet.value.petName || !newPet.value.birdDate) return;
  await createPet(newPet.value);
  addPetDialogVisible.value = false;
  fetchPets();
};

const totalPages = computed(() => Math.ceil(pets.value.length / perPage));
const paginatedPets = computed(() => pets.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage));

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

onMounted(fetchClients);
onMounted(fetchPets);
</script>

<style scoped>
.clients-container {
  display: flex;
}

.clients-content {
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

.add-pet-button {
  padding: 10px 20px;
  background-color: #6abfe3;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.clients-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.clients-table th,
.clients-table td {
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
