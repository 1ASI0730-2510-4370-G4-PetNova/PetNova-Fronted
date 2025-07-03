<template>
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
        <td colspan="8" class="no-data">{{ $t("mascotas.no-disponible") }}</td>
      </tr>
      <tr v-for="pet in paginatedPets" :key="pet.id">
        <td>
          <section
            class="avatar-container"
            @click="goToHistory(pet.id)"
            style="cursor: pointer"
          >
            <img
              src="../../../assets/images/register-image.png"
              alt="avatar"
              class="avatar"
            />
            <span style="text-decoration: underline; color: #000000">{{
              pet.name
            }}</span>
          </section>
        </td>
        <td>{{ pet.dateOfBirth }}</td>
        <td>{{ pet.registrationDate }}</td>
        <td>{{ pet.breed }}</td>
        <td>{{ pet.gender }}</td>
        <td>{{ pet.hc }}</td>
        <td class="label-actions">
          <span @click="openEditDialog(pet)" class="label-edit-action">
            <span>{{ $t("mascotas.editar") }}</span>
            <img
              src="../../../assets/images/edit-table.icon.png"
              alt="edit"
              class="action-icon"
            />
          </span>
          <span @click="openDeleteDialog(pet)" class="label-delete-action">
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

  <PvDialog
    v-model:visible="editVisible"
    modal
    :header="$t('mascotas.editar-mascota')"
    :style="{ width: '25rem' }"
  >
    <section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("mascotas.nombre") }}</label>
        <PvInputText v-model="editedPet.name" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("mascotas.cumpleanos") }}</label>
        <PvInputText v-model="editedPet.dateOfBirth" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("mascotas.registro") }}</label>
        <PvInputText v-model="editedPet.registrationDate" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("mascotas.raza") }}</label>
        <PvInputText v-model="editedPet.breed" class="flex-auto" />
      </section>
      <section class="flex flex-column mb-1">
        <label>{{ $t("mascotas.genero") }}</label>
        <PvInputText v-model="editedPet.gender" class="flex-auto" />
      </section>
      <section class="flex flex-column">
        <label>{{ $t("mascotas.hc") }}</label>
        <PvInputText v-model="editedPet.hc" class="flex-auto" />
      </section>
    </section>
    <template #footer>
      <PvButton
        :label="$t('mascotas.cancelar')"
        text
        severity="secondary"
        @click="editVisible = false"
      />
      <PvButton
        :label="$t('mascotas.guardar')"
        outlined
        severity="danger"
        @click="savePet"
        :disabled="!isValidPet(editedPet)"
      />
    </template>
  </PvDialog>

  <PvDialog
    v-model:visible="deleteVisible"
    modal
    :header="$t('mascotas.eliminar-mascota')"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block">{{
      $t("mascotas.estas-seguro")
    }}</span>
    <template #footer>
      <PvButton
        :label="$t('mascotas.cancelar')"
        text
        severity="secondary"
        @click="deleteVisible = false"
      />
      <PvButton
        :label="$t('mascotas.eliminar')"
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
import { useRouter } from "vue-router";

const router = useRouter();

const goToHistory = (petId) => {
  router.push({ name: "PetHistory", params: { id: petId } });
};

const pets = ref([]);
const search = ref("");
const currentPage = ref(1);
const perPage = 5;
const editVisible = ref(false);
const deleteVisible = ref(false);
const editedPet = ref({});
const petToDelete = ref(null);

const fetchPets = async () => {
  const res = await axios.get("https://fake-api-rose-psi.vercel.app/pets");
  pets.value = res.data;
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

const filteredPets = computed(() => {
  return pets.value.filter((pet) =>
    pet.petName.toLowerCase().includes(search.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredPets.value.length / perPage)
);
const paginatedPets = computed(() =>
  filteredPets.value.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  )
);

const openEditDialog = (pet) => {
  editedPet.value = { ...pet };
  editVisible.value = true;
};

const savePet = async () => {
  if (!isValidPet(editedPet.value)) return;
  try {
    await axios.put(
      `https://fake-api-rose-psi.vercel.app/pets/${editedPet.value.id}`,
      editedPet.value
    );
  } catch (error) {
    console.log("Error al guardar, pero continuando...");
  }
  editVisible.value = false;
  await fetchPets();
};

const openDeleteDialog = (pet) => {
  petToDelete.value = pet;
  deleteVisible.value = true;
};

const confirmDelete = async () => {
  await axios.delete(
    `https://fake-api-rose-psi.vercel.app/pets/${petToDelete.value.id}`
  );
  deleteVisible.value = false;
  fetchPets();
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

onMounted(fetchPets);
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
