import http from '../../../shared/services/http-common';  // Importa el objeto http de http-common.js

export class PetApiService {
    constructor() {
        this.endpoint = '/pets';  // Punto final de la API para manejar mascotas
    }

    // Obtener todas las mascotas
    getPets() {
        return http.get(this.endpoint);  // Usa el objeto http ya configurado
    }

    // Buscar mascotas por nombre
    searchPets(query) {
        return http.get(`${this.endpoint}?petName=${query}`);  // Realiza la solicitud GET con el query
    }

    // Crear una nueva mascota
    createPet(pet) {
        return http.post(this.endpoint, pet);  // Usa POST para crear una nueva mascota
    }

    // Actualizar la información de una mascota
    updatePet(pet) {
        return http.put(`${this.endpoint}/${pet.id}`, pet);  // Realiza PUT para actualizar una mascota por ID
    }

    // Eliminar una mascota por ID
    deletePet(id) {
        return http.delete(`${this.endpoint}/${id}`);  // Realiza DELETE para eliminar una mascota por ID
    }
}
