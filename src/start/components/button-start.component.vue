<template>
  <span class="button" @click="$emit('start-click')">Inicio</span>
</template>

<style scoped>
.button {
  height: 100%;
  padding: 10px 40px;
  background-color: #6abfe3;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.button:hover {
  background-color: #58a1c8;
}
</style>
