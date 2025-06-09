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
          <section class="avatar-container">
            <img
              src="../../assets/images/register-image.png"
              alt="avatar"
              class="avatar"
            />
            {{ pet.petName }}
          </section>
        </td>
        <td>{{ pet.birdDate }}</td>
        <td>{{ pet.registrationDate }}</td>
        <td>{{ pet.animalBreed }}</td>
        <td>{{ pet.gender }}</td>
        <td>{{ pet.hc }}</td>
        <td class="label-actions">
          <span @click="openEditDialog(pet)" class="label-edit-action">
            <span>{{ $t("mascotas.editar") }}</span>
            <img
              src="../../assets/images/edit-table.icon.png"
              alt="edit"
              class="action-icon"
            />
          </span>
          <span @click="openDeleteDialog(pet)" class="label-delete-action">
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
    :header="$t('mascotas.editar-mascota')"
    :style="{ width: '60rem', maxWidth: '90vw' }"
    class="pet-registration-dialog"
  >
    <div class="pet-registration-container">
      <div class="pet-form-container">
        <h2>{{ $t("mascotas.edicion") }}</h2>

        <!-- Campo HC de solo lectura -->
        <div class="form-group">
          <label>{{ $t("mascotas.hc") }}:</label>
          <input
            v-model="editedPet.hc"
            class="form-control disabled-input"
            disabled
          />
        </div>

        <div class="form-group">
          <label>{{ $t("mascotas.nombre") }}:</label>
          <input v-model="editedPet.petName" class="form-control" />
        </div>

        <div class="form-group">
          <label>{{ $t("mascotas.tipo-mascota") }}:</label>
          <input v-model="editedPet.animalType" class="form-control" />
        </div>

        <div class="form-group">
          <label>{{ $t("mascotas.raza") }}:</label>
          <input v-model="editedPet.animalBreed" class="form-control" />
        </div>

        <div class="form-group gender-group">
          <label>{{ $t("mascotas.genero") }}:</label>
          <div class="gender-options">
            <button
              :class="['gender-btn', editedPet.gender === 'M' ? 'active' : '']"
              @click="editedPet.gender = 'M'"
            >
              M
            </button>
            <button
              :class="['gender-btn', editedPet.gender === 'F' ? 'active' : '']"
              @click="editedPet.gender = 'F'"
            >
              F
            </button>
            <button
              :class="[
                'gender-btn',
                editedPet.gender === 'Other' ? 'active' : '',
              ]"
              @click="editedPet.gender = 'Other'"
            >
              {{ $t("mascotas.otro") }}
            </button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label>{{ $t("mascotas.registro") }}:</label>
            <input
              type="date"
              v-model="editedPet.registrationDate"
              class="form-control"
            />
          </div>
          <div class="form-group half">
            <label>{{ $t("mascotas.cumpleanos") }}:</label>
            <input
              type="date"
              v-model="editedPet.birdDate"
              class="form-control"
            />
          </div>
        </div>

        <div class="form-group">
          <label>{{ $t("mascotas.propietario") }}:</label>
          <input v-model="editedPet.owner" class="form-control" />
        </div>

        <div class="form-actions">
          <button class="cancel-btn" @click="editVisible = false">
            {{ $t("mascotas.cancelar") }}
          </button>
          <button
            class="update-btn"
            @click="savePet"
            :disabled="!isValidPet(editedPet)"
          >
            {{ $t("mascotas.actualizar") }}
          </button>
        </div>
      </div>

      <div class="pet-photo-container">
        <div class="photo-upload-area">
          <img
            v-if="editedPetPhoto"
            :src="editedPetPhoto"
            alt="Vista previa de la foto de mascota"
            class="photo-preview"
          />
          <img
            v-else-if="editedPet.photo"
            :src="editedPet.photo"
            alt="Foto de mascota"
            class="photo-preview"
          />
          <div v-else class="photo-placeholder"></div>
        </div>
        <button class="save-photo-btn" @click="uploadEditPhoto">
          {{ $t("mascotas.guardar-foto") }}
        </button>
      </div>
    </div>
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
import { ref, computed, watch } from "vue";
import axios from "axios";

const props = defineProps({
  pets: {
    type: Array,
    required: true,
  },
  search: {
    type: String,
    default: "",
  },
  toast: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["refresh-pets"]);

const currentPage = ref(1);
const perPage = 5;
const editVisible = ref(false);
const deleteVisible = ref(false);
const editedPet = ref({});
const editedPetPhoto = ref(null);
const petToDelete = ref(null);

watch(
  () => props.pets,
  () => {
    currentPage.value = 1;
  },
  { deep: true }
);

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
  return props.pets.filter((pet) =>
    pet.petName.toLowerCase().includes(props.search.toLowerCase())
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
  editedPetPhoto.value = null;
  editVisible.value = true;
};

const savePet = async () => {
  if (!isValidPet(editedPet.value)) {
    if (props.toast) {
      props.toast.add({
        severity: "warn",
        summary: "Formulario incompleto",
        detail: "Por favor complete todos los campos requeridos",
        life: 3000,
      });
    }
    return;
  }

  try {
    // Mostrar notificación de carga
    let loading;
    if (props.toast) {
      loading = props.toast.add({
        severity: "info",
        summary: "Procesando",
        detail: "Actualizando mascota...",
        life: 3000,
      });
    }

    // Si hay una nueva foto, actualizar
    if (editedPetPhoto.value) {
      editedPet.value.photo = editedPetPhoto.value;
    }

    // Realizar la petición PUT
    await axios.put(
      `https://fake-api-rose-psi.vercel.app/pets/${editedPet.value.id}`,
      editedPet.value
    );

    // Cerrar el diálogo
    editVisible.value = false;

    // Eliminar notificación de carga
    if (props.toast && loading) {
      props.toast.remove(loading);
    }

    // Mostrar notificación de éxito
    if (props.toast) {
      props.toast.add({
        severity: "success",
        summary: "Éxito",
        detail: "¡Mascota actualizada correctamente!",
        life: 3000,
      });
    }

    // Actualizar la lista de mascotas
    emit("refresh-pets");
  } catch (error) {
    console.error("Error al actualizar mascota:", error);

    // Verificar si es el error 500 específico
    if (error.response && error.response.status === 500) {
      console.log(
        "⚠️ Error 500 detectado, verificando si la mascota fue actualizada..."
      );

      try {
        // Esperar un momento
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Verificar si la actualización fue exitosa
        const response = await axios.get(
          "https://fake-api-rose-psi.vercel.app/pets"
        );
        const updatedPets = response.data;

        // Buscar la mascota actualizada
        const updatedPet = updatedPets.find((p) => p.id === editedPet.value.id);

        if (updatedPet) {
          // Comparar los datos para ver si se actualizó
          if (
            updatedPet.petName === editedPet.value.petName &&
            updatedPet.animalBreed === editedPet.value.animalBreed
          ) {
            console.log(
              "✅ La mascota parece haber sido actualizada a pesar del error"
            );

            editVisible.value = false;

            if (props.toast) {
              props.toast.add({
                severity: "success",
                summary: "Éxito",
                detail: "¡Mascota actualizada correctamente!",
                life: 3000,
              });
            }

            emit("refresh-pets");
            return;
          }
        }
      } catch (verifyError) {
        console.error("Error al verificar actualización:", verifyError);
      }
    }

    // Mostrar mensaje de error
    if (props.toast) {
      props.toast.add({
        severity: "error",
        summary: "Error",
        detail: "No se pudo actualizar la mascota",
        life: 3000,
      });
    }
  }
};

const uploadEditPhoto = () => {
  // Función para cargar foto en modo edición
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editedPetPhoto.value = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
};

const openDeleteDialog = (pet) => {
  petToDelete.value = pet;
  deleteVisible.value = true;
};

const confirmDelete = async () => {
  console.log("⭐ Inicio de confirmDelete para mascota:", petToDelete.value);

  // Referencia para verificar después si la eliminación funcionó
  const petIdToDelete = petToDelete.value.id;

  try {
    console.log(
      `🔄 Enviando petición DELETE a API para mascota ${petIdToDelete}...`
    );
    await axios.delete(
      `https://fake-api-rose-psi.vercel.app/pets/${petIdToDelete}`
    );
    console.log("✅ Mascota eliminada correctamente");
    deleteVisible.value = false;

    // Mostrar notificación de éxito
    if (props.toast) {
      props.toast.add({
        severity: "success",
        summary: "Éxito",
        detail: "Mascota eliminada correctamente",
        life: 3000,
      });
    }

    // Notificar al componente padre para recargar la lista
    emit("refresh-pets");
  } catch (error) {
    console.error("❌ Error al eliminar mascota:", error);

    // Verificar si es el error 500 específico (como en createPet)
    if (error.response && error.response.status === 500) {
      console.log(
        "⚠️ Error 500 detectado, verificando si la mascota fue eliminada..."
      );

      try {
        // Esperar un momento para dar tiempo al backend
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Hacer una petición para verificar si la mascota sigue existiendo
        console.log(
          `🔄 Verificando si la mascota ${petIdToDelete} sigue existiendo...`
        );
        const response = await axios.get(
          "https://fake-api-rose-psi.vercel.app/pets"
        );
        const allPets = response.data;

        // Buscar si la mascota eliminada sigue en la lista
        const petStillExists = allPets.some((pet) => pet.id === petIdToDelete);

        if (!petStillExists) {
          console.log(
            "✅ La mascota parece haber sido eliminada a pesar del error 500"
          );
          deleteVisible.value = false;

          // Mostrar notificación de éxito
          if (props.toast) {
            props.toast.add({
              severity: "success",
              summary: "Éxito",
              detail: "Mascota eliminada correctamente",
              life: 3000,
            });
          }

          // Notificar al componente padre para recargar la lista
          emit("refresh-pets");
          return;
        }
      } catch (verifyError) {
        console.error(
          "❌ Error al verificar si la mascota fue eliminada:",
          verifyError
        );
      }
    }

    // Mostrar mensaje de error
    if (props.toast) {
      props.toast.add({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar la mascota. Intente nuevamente.",
        life: 3000,
      });
    }
  }
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
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

/* Agregar estilo para el botón de actualizar */
.update-btn {
  padding: 8px 16px;
  background-color: #3b82f6; /* Un azul diferente para distinguirlo */
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.update-btn:hover {
  background-color: #2563eb;
}

.update-btn:disabled {
  background-color: #b3b3b3;
  cursor: not-allowed;
}

/* Otros estilos para mantener la coherencia con el diálogo de crear */
.pet-registration-dialog :deep(.p-dialog-header) {
  border-bottom: none;
}

.pet-registration-container {
  display: flex;
  gap: 20px;
}

.pet-form-container {
  flex: 1;
  padding-right: 20px;
}

.pet-photo-container {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-upload-area {
  width: 100%;
  height: 250px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
}

.photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.save-photo-btn {
  background-color: #1e3c72;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  width: 100%;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f0f7ff;
}

.form-row {
  display: flex;
  gap: 15px;
}

.half {
  flex: 1;
}

.gender-group {
  margin-bottom: 20px;
}

.gender-options {
  display: flex;
  gap: 10px;
}

.gender-btn {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
}

.gender-btn.active {
  background-color: #1e3c72;
  color: white;
  border-color: #1e3c72;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #6abfe3;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

/* Estilo para el input desactivado */
.disabled-input {
  background-color: #f0f0f0;
  color: #333;
  cursor: not-allowed;
  border: 1px solid #ddd;
}
</style>
