import http from '../../../shared/services/http-common';  // Importa el objeto http de http-common.js

export class ClientApiService {
    constructor() {
        this.endpoint = '/clients';  // Punto final de la API para manejar clientes
    }

    // Obtener todos los clientes
    getClients() {
        return http.get(this.endpoint);  // Usa el objeto http ya configurado
    }

    // Buscar clientes por nombre completo
    searchClients(query) {
        return http.get(`${this.endpoint}?fullName=${query}`);  // Realiza la solicitud GET con el query
    }

    // Crear un nuevo cliente
    createClient(client) {
        return http.post(this.endpoint, client);  // Usa POST para crear un nuevo cliente
    }

    // Actualizar la información de un cliente
    updateClient(client) {
        return http.put(`${this.endpoint}/${client.id}`, client);  // Realiza PUT para actualizar un cliente por ID
    }

    // Eliminar un cliente por ID
    deleteClient(id) {
        return http.delete(`${this.endpoint}/${id}`);  // Realiza DELETE para eliminar un cliente por ID
    }
}

