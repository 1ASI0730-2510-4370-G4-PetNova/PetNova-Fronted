<template>
  <div class="input">
    <img
        src="../../assets/images/search-icon.png"
        alt="search"
        class="search-icon"
        @click="searchUser"
    />
    <input
        v-model="search"
        type="text"
        placeholder="Search by name or keyword"
        required
    />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';

const search = ref('');
const emit = defineEmits(['search-result']);

const searchUser = async () => {
  if (!search.value.trim()) return;
  try {
    // Ajustar endpoint según tipo de búsqueda en Inicio
    const { data } = await axios.get(
        `https://fake-api-rose-psi.vercel.app/home-search?query=${search.value.trim()}`
    );
    emit('search-result', data);
  } catch (error) {
    console.error('Search error:', error);
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
