import axios from "axios";
const API_URL = "https://fake-api-rose-psi.vercel.app/clients";

export const getClients = () => axios.get(API_URL);
export const searchClients = (query) =>
  axios.get(`${API_URL}?fullName=${query}`);
export const createClient = (client) => axios.post(API_URL, client);
export const updateClient = (client) =>
  axios.put(`${API_URL}/${client.id}`, client);
export const deleteClient = (id) => axios.delete(`${API_URL}/${id}`);
