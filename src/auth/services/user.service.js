import http from '../../../shared/services/http-common';  // Importa el objeto http de http-common.js

export class UserApiService {
    constructor() {
        this.endpoint = '/users';  // Punto final de la API para manejar usuarios
    }

    // Obtener todos los usuarios
    getUsers() {
        return http.get(this.endpoint)  // Usa el objeto http ya configurado
            .then(response => response.data);  // Retorna los datos de la respuesta
    }

    // Crear un nuevo usuario
    createUser(user) {
        return http.post(this.endpoint, user)  // Usa POST para crear un nuevo usuario
            .then(response => response.data);  // Retorna los datos de la respuesta
    }
}
