import axios from 'axios';
const API_URL = 'https://petnova-api.azurewebsites.net/appointments';

export const getAppointments = () => axios.get(API_URL);
export const searchAppointments = (query) => axios.get(`${API_URL}?fullName=${query}`);
export const createAppointment = (appointment) => axios.post(API_URL, appointment);
export const updateAppointment = (appointment) => axios.put(`${API_URL}/${appointment.id}`, appointment);
export const deleteAppointment = (id) => axios.delete(`${API_URL}/${id}`);
