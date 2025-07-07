<template>
  <table class="appointment-table">
    <thead>
    <tr>
      <th>{{ $t("citas.nombre") }}</th>
      <th>{{ $t("citas.inicio") }}</th>
      <th>{{ $t("citas.cliente") }}</th>
      <th>{{ $t("citas.numero") }}</th>
      <th>{{ $t("citas.estado") }}</th>
      <th>{{ $t("citas.tipo-evento") }}</th>
      <th>{{ $t("citas.acciones") }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="appointments.length === 0">
      <td colspan="7" class="no-data">{{ $t("citas.no-disponible") }}</td>
    </tr>
    <tr v-for="appointment in appointments" :key="appointment.id">
      <td>{{ appointment.petName }}</td>
      <td>{{ formatDate(appointment.startDate) }}</td>
      <td>{{ appointment.clientName }}</td>
      <td>{{ appointment.contactNumber }}</td>
      <td>{{ appointment.status }}</td>
      <td>{{ appointment.type }}</td>
      <td class="actions">
          <span @click="$emit('edit', appointment)" class="action edit" title="Editar">
            <i class="pi pi-pencil"></i>
          </span>
        <span @click="$emit('delete', appointment)" class="action delete" title="Eliminar">
            <i class="pi pi-trash"></i>
          </span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['appointments']);
defineEmits(['edit', 'delete']);

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "-" : date.toLocaleString();
};
</script>

<style scoped>
.appointment-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Segoe UI", sans-serif;
  font-size: 14px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px #0000000a;
}

.appointment-table th {
  background-color: #f5f5f5;
  text-align: left;
  padding: 12px;
  color: #333;
  font-weight: 600;
}

.appointment-table td {
  padding: 12px;
  border-top: 1px solid #eee;
  color: #444;
}

.appointment-table .actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.appointment-table .action {
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.2s;
  font-size: 16px;
}

.appointment-table .action.edit {
  color: #2c7be5;
}
.appointment-table .action.edit:hover {
  background-color: #e8f0fe;
}

.appointment-table .action.delete {
  color: #e55353;
}
.appointment-table .action.delete:hover {
  background-color: #fdecea;
}

.no-data {
  text-align: center;
  color: #888;
  padding: 20px;
  font-style: italic;
}
</style>
