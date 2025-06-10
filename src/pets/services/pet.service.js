import axios from "axios";
const API_URL = "https://fake-api-rose-psi.vercel.app/pets";

export const fetchPets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchPets = (query) => axios.get(`${API_URL}?petName=${query}`);

export const createPet = async (pet) => {
  try {
    const petToSave = { ...pet };

    if (petToSave.photo && petToSave.photo.length > 1000) {
      // La foto es muy grande
      delete petToSave.photo;
      // Asignar una URL predeterminada
      petToSave.photoUrl = "default-photo-url";
    }

    const response = await axios.post(API_URL, petToSave);
    return response.data;
  } catch (error) {
    // Si el error es 500 y la API sigue creando la mascota a pesar del error
    if (error.response && error.response.status === 500) {
      // No propagar el error para que la UI muestre éxito
      // return { ...pet, id: 'temp-id' };
    }

    throw error;
  }
};

export const updatePet = (pet) => axios.put(`${API_URL}/${pet.id}`, pet);

export const deletePet = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    // Si el error es 500, similar a createPet, podría ser un falso negativo
    if (error.response && error.response.status === 500) {
      // Implementar verificación aquí si quieres centralizar la lógica
      // o simplemente propagar el error para manejarlo en el componente
    }

    throw error;
  }
};
