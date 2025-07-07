import axios from "axios";

const API_URL = "https://petback-gxdpftdhgxarbxeu.centralus-01.azurewebsites.net/api/v1/Clients";

export const getClients = () => axios.get(API_URL);
export const createClient = (client) => axios.post(API_URL, client);
export const updateClient = (client) => axios.put(`${API_URL}/${client.id}`, client);
export const deleteClient = (id) => axios.delete(`${API_URL}/${id}`);
