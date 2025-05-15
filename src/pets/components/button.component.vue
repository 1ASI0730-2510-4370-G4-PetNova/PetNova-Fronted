<template>
  <span class="button" @click="$emit('add-click')">{{ $t('mascotas.agregar') }}</span>
</template>

<style scoped>
.button {
    height: 100%;
    padding: 10px 40px;
    background-color: #EAF7FC;
    border-radius: 10px;
}
</style>
