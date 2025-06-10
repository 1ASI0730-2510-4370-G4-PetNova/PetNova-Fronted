<template>
  <div class="input">
    <img
      src="../../assets/images/search-icon.png"
      alt="search"
      class="search-icon"
      @click="searchPet"
    />
    <input
      v-model="search"
      type="text"
      :placeholder="$t('mascotas.searcher')"
      required
      @keyup.enter="searchPet"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { fetchPets } from "../services/pet.service";

const search = ref("");
const emit = defineEmits(["pet-found"]);

// Función que se ejecuta cuando el usuario escribe en el campo de búsqueda
const handleInput = () => {
  if (search.value === "") {
    // Si el campo está vacío, emitimos un evento para cargar todas las mascotas
    searchPet();
  }
};

// Función para buscar mascotas por nombre
const searchPet = async () => {
  try {
    // Obtener todas las mascotas
    const allPets = await fetchPets();

    // Si el campo de búsqueda está vacío, devolver todas las mascotas
    if (!search.value.trim()) {
      emit("pet-found", allPets);
      return;
    }

    // Filtrar las mascotas cuyo nombre contenga el término de búsqueda (case-insensitive)
    const filteredPets = allPets.filter((pet) =>
      pet.petName.toLowerCase().includes(search.value.toLowerCase())
    );

    // Emitir el evento con los resultados filtrados
    emit("pet-found", filteredPets);
  } catch (error) {
    // En caso de error, emitir un array vacío
    emit("pet-found", []);
  }
};
</script>

<style scoped>
.input {
  display: flex;
  align-items: center;
  width: 30%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background-color: #eaf7fc;
}
input {
  width: 100%;
  height: 22px;
  border: none;
  outline: none;
  background-color: transparent;
}
input::-webkit-input-placeholder {
  font-size: 20px;
  color: black;
}
.search-icon {
  width: 26px;
  margin-right: 20px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
