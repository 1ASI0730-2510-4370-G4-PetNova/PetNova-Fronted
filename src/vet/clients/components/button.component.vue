<template>
  <span class="button" @click="$emit('add-click')">{{
    $t("clientes.agregar")
  }}</span>
</template>

<style scoped>
.button {
  height: 100%;
  padding: 10px 40px;
  background-color: #eaf7fc;
  border-radius: 10px;
}
</style>
