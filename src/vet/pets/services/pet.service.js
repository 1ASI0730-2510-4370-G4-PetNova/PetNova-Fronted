import axios from "axios";

const API_URL = "https://petback-gxdpftdhgxarbxeu.centralus-01.azurewebsites.net/api/Pet";

export const getPets = () => axios.get(API_URL);

export const createPet = (pet) => axios.post(API_URL, pet);

export const updatePet = (pet) => axios.put(`${API_URL}/${pet.id}`, pet);

export const deletePet = (id) => axios.delete(`${API_URL}/${id}`);
