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
            :placeholder="$t('mascotas.buscar')"
            class="search-input"
          />
        </div>
        <button class="add-button" @click="openAddPetDialog">
          {{ $t("mascotas.agregar") }}
        </button>
      </section>

      <table>
        <thead>
          <tr>
            <th>{{ $t("mascotas.nombre") }}</th>
            <th>{{ $t("mascotas.cumpleanos") }}</th>
            <th>{{ $t("mascotas.registro") }}</th>
            <th>{{ $t("mascotas.raza") }}</th>
            <th>{{ $t("mascotas.genero") }}</th>
            <th>{{ $t("mascotas.hc") }}</th>
            <th>{{ $t("mascotas.acciones") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedPets.length === 0">
            <td colspan="7" class="no-data">
              {{ $t("mascotas.no-disponible") }}
            </td>
          </tr>
          <tr v-for="pet in paginatedPets" :key="pet.id">
            <td>
              <section class="avatar-container">
                <img
                  src="../../../assets/images/register-image.png"
                  alt="avatar"
                  class="avatar"
                />
                <span>{{ pet.petName }}</span>
              </section>
            </td>
            <td>{{ pet.birdDate }}</td>
            <td>{{ pet.registrationDate }}</td>
            <td>{{ pet.animalBreed }}</td>
            <td>{{ pet.gender }}</td>
            <td>{{ pet.hc }}</td>
            <td class="label-actions">
              <span @click="editPet(pet)" class="label-edit-action">
                <span>{{ $t("mascotas.editar") }}</span>
                <img
                  src="../../../assets/images/edit-table.icon.png"
                  alt="edit"
                  class="action-icon"
                />
              </span>
              <span @click="deletePet(pet)" class="label-delete-action">
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
      <div class="floating-button" @click="openAddPetDialog">
        <span class="plus-icon">+</span>
      </div>
    </section>

    <!-- Diálogo para agregar mascota -->
    <PvDialog
      v-model:visible="addPetDialogVisible"
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
          @click="addPetDialogVisible = false"
        />
        <PvButton
          :label="$t('mascotas.guardar')"
          outlined
          severity="danger"
          @click="savePet"
          :disabled="!isValidPet(newPet)"
        />
      </template>
    </PvDialog>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import MenuComponent from "../../../shared/components/menu-client.component.vue";
import { getPets, createPet } from "../../../vet/pets/services/pet.service";
import { getClients } from "../../../vet/clients/services/client.service";

const search = ref("");
const clients = ref([]);
const pets = ref([]);
const newPet = ref({
  petName: "",
  birdDate: "",
  registrationDate: "",
  animalBreed: "",
  gender: "",
  hc: "",
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
  if (!isValidPet(newPet.value)) return;
  try {
    await createPet(newPet.value);
  } catch (error) {
    console.log("Error al crear, pero continuando...");
  }
  addPetDialogVisible.value = false;
  newPet.value = {
    petName: "",
    birdDate: "",
    registrationDate: "",
    animalBreed: "",
    gender: "",
    hc: "",
  };
  await fetchPets();
};

const isValidPet = (pet) => {
  return (
    pet.petName &&
    pet.birdDate &&
    pet.registrationDate &&
    pet.animalBreed &&
    pet.gender &&
    pet.hc
  );
};

const editPet = (pet) => {
  // Función para editar mascota - placeholder
  console.log("Editar mascota:", pet);
};

const deletePet = (pet) => {
  // Función para eliminar mascota - placeholder
  console.log("Eliminar mascota:", pet);
};

const totalPages = computed(() => Math.ceil(pets.value.length / perPage));
const paginatedPets = computed(() =>
  pets.value.slice(
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
  background-color: #eaf7fc;
  border: none;
  border-radius: 10px;
  padding: 10px 40px;
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
  border-radius: 4px;
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

@media (max-width: 1600px) {
  .main-container {
    overflow-x: auto;
  }

  .label-actions {
    width: 100%;
  }
}
</style>
