<template>
  <span class="button" @click="$emit('add-click')">
    {{ $t("citas.agregar") }}
  </span>
</template>

<script setup></script>

<style scoped>
.button {
  height: 100%;
  padding: 10px 40px;
  background-color: #eaf7fc;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #d4effa;
}
</style>
