<template>
  <table class="client-table">
    <thead>
    <tr>
      <th>{{ $t("clientes.nombre") }}</th>
      <th>{{ $t("clientes.apellido") }}</th>
      <th>{{ $t("clientes.telefono") }}</th>
      <th>{{ $t("clientes.correo") }}</th>
      <th>{{ $t("clientes.acciones") }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="clients.length === 0">
      <td colspan="5" class="no-data">{{ $t("clientes.no-disponible") }}</td>
    </tr>
    <tr v-for="client in clients" :key="client.id">
      <td>{{ client.firstName }}</td>
      <td>{{ client.lastName }}</td>
      <td>{{ client.phone }}</td>
      <td>{{ client.email }}</td>
      <td class="actions">
          <span @click="$emit('edit', client)" class="action edit" title="Editar">
            <i class="pi pi-pencil"></i>
          </span>
        <span @click="$emit('delete', client)" class="action delete" title="Eliminar">
            <i class="pi pi-trash"></i>
          </span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(["clients"]);
defineEmits(["edit", "delete"]);
</script>

<style scoped>
.client-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Segoe UI", sans-serif;
  font-size: 14px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px #0000000a;
}

.client-table th {
  background-color: #f5f5f5;
  text-align: left;
  padding: 12px;
  color: #333;
  font-weight: 600;
}

.client-table td {
  padding: 12px;
  border-top: 1px solid #eee;
  color: #444;
}

.client-table .actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.client-table .action {
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.2s;
  font-size: 16px;
}

.client-table .action.edit {
  color: #2c7be5;
}
.client-table .action.edit:hover {
  background-color: #e8f0fe;
}

.client-table .action.delete {
  color: #e55353;
}
.client-table .action.delete:hover {
  background-color: #fdecea;
}

.no-data {
  text-align: center;
  color: #888;
  padding: 20px;
  font-style: italic;
}
</style>
