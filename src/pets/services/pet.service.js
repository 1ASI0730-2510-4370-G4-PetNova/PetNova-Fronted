import axios from "axios";
const API_URL = "https://fake-api-rose-psi.vercel.app/pets";

export const fetchPets = async () => {
  try {
    console.log("📡 fetchPets: Llamando a la API...");
    const response = await axios.get(API_URL);
    console.log("📡 fetchPets: Respuesta recibida:", response.status);
    return response.data;
  } catch (error) {
    console.error("📡 ❌ Error en fetchPets:", error);
    throw error;
  }
};

export const searchPets = (query) => axios.get(`${API_URL}?petName=${query}`);

export const createPet = async (pet) => {
  console.log("📡 createPet: Inicio de creación...");
  try {
    const petToSave = { ...pet };

    console.log("📡 createPet: Objeto a enviar:", petToSave);

    if (petToSave.photo && petToSave.photo.length > 1000) {
      console.log("📡 createPet: Procesando foto larga...");
      // La foto es muy grande
      delete petToSave.photo;
      // Asignar una URL predeterminada
      petToSave.photoUrl = "default-photo-url";
    }

    const response = await axios.post(API_URL, petToSave);
    return response.data;
  } catch (error) {
    console.error("📡 ❌ Error en createPet:", error);

    // Si el error es 500 y la API sigue creando la mascota a pesar del error
    // podríamos retornar un objeto simulado para evitar que la UI muestre error
    if (error.response && error.response.status === 500) {
      console.warn(
        "📡 ⚠️ Error 500 recibido pero posiblemente la operación fue exitosa"
      );
      // No propagar el error para que la UI muestre éxito
      // return { ...pet, id: 'temp-id' };
    }

    throw error;
  }
};

export const updatePet = (pet) => axios.put(`${API_URL}/${pet.id}`, pet);
export const deletePet = async (id) => {
  console.log(`📡 deletePet: Iniciando eliminación de mascota ${id}...`);
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log(`📡 deletePet: Mascota ${id} eliminada correctamente`);
    return response.data;
  } catch (error) {
    console.error(`📡 ❌ Error en deletePet para mascota ${id}:`, error);

    // Si el error es 500, similar a createPet, podría ser un falso negativo
    if (error.response && error.response.status === 500) {
      console.warn(
        `📡 ⚠️ Error 500 recibido al eliminar mascota ${id}, verificando...`
      );

      // Implementar verificación aquí si quieres centralizar la lógica
      // o simplemente propagar el error para manejarlo en el componente
    }

    throw error;
  }
};
