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
      <TableComponent
        :key="refreshKey"
        :pets="filteredPets"
        :search="search"
        :toast="toast"
        @refresh-pets="loadPets"
      />

      <!-- Botón circular con signo + -->
      <div class="circular-button-container">
        <button class="circular-button" @click="openAddDialog">
          <i class="pi pi-plus"></i>
        </button>
      </div>
    </section>

    <!-- Diálogo modificado para agregar mascota con nuevo diseño -->
    <PvDialog
      v-model:visible="createVisible"
      modal
      :header="$t('mascotas.crear-mascota')"
      :style="{ width: '60rem', maxWidth: '90vw' }"
      class="pet-registration-dialog"
    >
      <div class="pet-registration-container">
        <div class="pet-form-container">
          <h2>{{ $t("mascotas.registro") }}</h2>

          <!-- Campo HC de solo lectura -->
          <div class="form-group">
            <label>{{ $t("mascotas.hc") }}:</label>
            <input
              v-model="newPet.hc"
              class="form-control disabled-input"
              disabled
            />
          </div>

          <div class="form-group">
            <label>{{ $t("mascotas.nombre") }}:</label>
            <input v-model="newPet.petName" class="form-control" />
          </div>

          <div class="form-group">
            <label>{{ $t("mascotas.tipo-mascota") }}:</label>
            <input v-model="newPet.animalType" class="form-control" />
          </div>

          <div class="form-group">
            <label>{{ $t("mascotas.raza") }}:</label>
            <input v-model="newPet.animalBreed" class="form-control" />
          </div>

          <div class="form-group gender-group">
            <label>{{ $t("mascotas.genero") }}:</label>
            <div class="gender-options">
              <button
                :class="['gender-btn', newPet.gender === 'M' ? 'active' : '']"
                @click="newPet.gender = 'M'"
              >
                M
              </button>
              <button
                :class="['gender-btn', newPet.gender === 'F' ? 'active' : '']"
                @click="newPet.gender = 'F'"
              >
                F
              </button>
              <button
                :class="[
                  'gender-btn',
                  newPet.gender === 'Other' ? 'active' : '',
                ]"
                @click="newPet.gender = 'Other'"
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
                v-model="newPet.registrationDate"
                class="form-control"
              />
            </div>
            <div class="form-group half">
              <label>{{ $t("mascotas.cumpleanos") }}:</label>
              <input
                type="date"
                v-model="newPet.birdDate"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group">
            <label>{{ $t("mascotas.propietario") }}:</label>
            <input v-model="newPet.owner" class="form-control" />
          </div>

          <div class="form-actions">
            <button class="cancel-btn" @click="createVisible = false">
              {{ $t("mascotas.cancelar") }}
            </button>
            <button
              class="create-btn"
              @click="createPet"
              :disabled="!isValidPet(newPet)"
            >
              {{ $t("mascotas.crear") }}
            </button>
          </div>
        </div>

        <div class="pet-photo-container">
          <div class="photo-upload-area">
            <img
              v-if="photoPreview"
              :src="photoPreview"
              alt="Vista previa de la foto de mascota"
              class="photo-preview"
            />
            <div v-else class="photo-placeholder"></div>
          </div>
          <button class="save-photo-btn" @click="uploadPhoto">
            {{ $t("mascotas.guardar-foto") }}
          </button>
        </div>
      </div>
    </PvDialog>

    <!-- Añadir el componente Toast para mostrar notificaciones -->
    <PvToast position="bottom-right" />
  </article>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import {
  fetchPets,
  createPet as createPetService,
} from "../services/pet.service";
import Pet from "../models/pet.model";

// Importaciones existentes
import MenuComponent from "../../shared/components/menu.component.vue";
import TableComponent from "../components/table.component.vue";
import Searcher from "../components/searcher.component.vue";
import Button from "../components/button.component.vue";
import Notification from "../components/notification.component.vue";
import LanguageSwitch from "../../shared/components/language-switcher.component.vue";

const createVisible = ref(false);
const newPet = ref(new Pet());
const filteredPets = ref([]);
const allPets = ref([]);
const search = ref("");
const photoPreview = ref(null);
const refreshKey = ref(0);

// Para usar los mensajes toast
const toast = inject("toast");

const isValidPet = (pet) => Pet.isValid(pet);

// Cargar todas las mascotas al montar el componente
onMounted(async () => {
  await loadPets();
});

// Función para cargar las mascotas desde la API
const loadPets = async () => {
  try {
    const data = await fetchPets();
    allPets.value = data;
    filteredPets.value = data;

    // Forzar la actualización de la tabla
    refreshKey.value++;

    return data;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail:
        "No se pudieron cargar las mascotas: " +
        (error.message || "Error desconocido"),
      life: 3000,
    });
  }
};

// Generar el siguiente número HC basado en los existentes
const getNextHcNumber = () => {
  // Encontrar el número HC más alto y sumar 1
  const highestHc = allPets.value.reduce((max, pet) => {
    const hcNum = parseInt(pet.hc, 10) || 0;
    return hcNum > max ? hcNum : max;
  }, 0);

  // Retornar el siguiente número como string
  return String(highestHc + 1);
};

const openAddDialog = async () => {
  // Resetear el formulario con una nueva instancia
  newPet.value = new Pet();

  // Generar automáticamente el siguiente HC
  newPet.value.hc = getNextHcNumber();

  photoPreview.value = null;
  createVisible.value = true;
};

const createPet = async () => {
  if (!isValidPet(newPet.value)) {
    toast.add({
      severity: "warn",
      summary: "Formulario incompleto",
      detail: "Por favor complete todos los campos requeridos",
      life: 3000,
    });
    return;
  }

  // Crear una copia del objeto para no modificar el original
  const petToSave = { ...newPet.value };

  // Si tienes una foto, incluirla en el objeto mascota
  if (photoPreview.value) {
    petToSave.photo = photoPreview.value;
  }

  // Mostrar spinner o indicador de carga
  const loadingMsg = {
    severity: "info",
    summary: "Procesando",
    detail: "Creando mascota...",
    life: 3000,
  };

  let loading;
  try {
    loading = toast.add(loadingMsg);
  } catch (toastError) {
    // Error silencioso
  }

  try {
    await createPetService(petToSave);
    // Continuamos como si fuera exitoso
    handleSuccessfulCreation(loading);
  } catch (error) {
    // Verificar si es el error 500 específico que sabemos que aún así crea la mascota
    if (error.message && error.message.includes("500")) {
      // Intentamos cargar las mascotas para verificar si se creó
      try {
        // Esperar un momento para dar tiempo a que el backend procese la operación
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Cargar mascotas y verificar si nuestra mascota está ahí
        const currentPets = await fetchPets();

        // Buscar una mascota con características similares (creada recientemente)
        const foundPet = currentPets.find(
          (p) =>
            p.petName === petToSave.petName &&
            p.animalBreed === petToSave.animalBreed
        );

        if (foundPet) {
          handleSuccessfulCreation(loading);
          return;
        }
      } catch (verifyError) {
        // Error silencioso
      }
    }

    // Si llegamos aquí, el error no es el caso especial o la verificación falló
    handleFailedCreation(error, loading);
  }
};

// Función auxiliar para manejar la creación exitosa
const handleSuccessfulCreation = async (loading) => {
  // Quitar el mensaje de carga
  if (loading) {
    try {
      toast.remove(loading);
    } catch (removeError) {
      // Error silencioso
    }
  }

  // Mostrar mensaje de éxito
  try {
    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "¡Mascota creada correctamente!",
      life: 5000,
    });
  } catch (successToastError) {
    // Error silencioso
  }

  // Actualizar las mascotas en la vista
  try {
    await loadPets();
  } catch (loadError) {
    // Error silencioso
  }

  // Cerrar el diálogo y limpiar el formulario
  createVisible.value = false;
  newPet.value = new Pet();
  photoPreview.value = null;
};

// Función auxiliar para manejar la creación fallida
const handleFailedCreation = (error, loading) => {
  // Quitar el mensaje de carga en caso de error
  if (loading) {
    try {
      toast.remove(loading);
    } catch (removeError) {
      // Error silencioso
    }
  }

  // Mostrar mensaje de error
  try {
    toast.add({
      severity: "error",
      summary: "Error",
      detail:
        "No se pudo crear la mascota: " +
        (error.message || JSON.stringify(error) || "Error desconocido"),
      life: 5000,
    });
  } catch (errorToastError) {
    // Error silencioso
  }
};

const uploadPhoto = () => {
  // Aquí puedes implementar la lógica para subir fotos
  // Por ejemplo, puedes usar un input file oculto y activarlo:
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        photoPreview.value = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
};

const handleSearchResults = (results) => {
  filteredPets.value = results;
  refreshKey.value++;
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

/* Nuevos estilos para el formulario de registro */
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

.create-btn {
  padding: 8px 16px;
  background-color: #1e3c72;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.create-btn:disabled {
  background-color: #b3b3b3;
  cursor: not-allowed;
}

/* Estilo para el input desactivado */
.disabled-input {
  background-color: #f0f0f0;
  color: #333;
  cursor: not-allowed;
  border: 1px solid #ddd;
}
</style>
