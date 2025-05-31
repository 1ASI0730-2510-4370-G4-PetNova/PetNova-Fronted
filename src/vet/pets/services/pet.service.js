import axios from 'axios';
const API_URL = 'https://fake-api-rose-psi.vercel.app/pets';

export const getPets = () => axios.get(API_URL);
export const searchPets = (query) => axios.get(`${API_URL}?petName=${query}`);
export const createPet = (pet) => axios.post(API_URL, pet);
export const updatePet = (pet) => axios.put(`${API_URL}/${pet.id}`, pet);
export const deletePet = (id) => axios.delete(`${API_URL}/${id}`);
