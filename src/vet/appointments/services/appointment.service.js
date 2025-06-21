import http from '../../../shared/services/http-common';  // Importa el objeto http de http-common.js

export class AppointmentApiService {
    constructor() {
        this.endpoint = '/appointments';  // Punto final de la API para manejar citas
    }

    // Obtener todas las citas
    getAppointments() {
        return http.get(this.endpoint);  // Usa el objeto http ya configurado
    }

    // Buscar citas por nombre completo
    searchAppointments(query) {
        return http.get(`${this.endpoint}?fullName=${query}`);  // Realiza la solicitud GET con el query
    }

    // Crear una nueva cita
    createAppointment(appointment) {
        return http.post(this.endpoint, appointment);  // Usa POST para crear una nueva cita
    }

    // Actualizar la información de una cita
    updateAppointment(appointment) {
        return http.put(`${this.endpoint}/${appointment.id}`, appointment);  // Realiza PUT para actualizar una cita por ID
    }

    // Eliminar una cita por ID
    deleteAppointment(id) {
        return http.delete(`${this.endpoint}/${id}`);  // Realiza DELETE para eliminar una cita por ID
    }
}
