import axios from "axios";

const API_URL = "https://petback-gxdpftdhgxarbxeu.centralus-01.azurewebsites.net/api/Appointments";

export const getAppointments = () => axios.get(API_URL);

export const createAppointment = (appointment) => axios.post(API_URL, appointment);

export const updateAppointment = (appointment) => axios.put(`${API_URL}/${appointment.id}`, appointment);
export const deleteAppointment = (id) => axios.delete(`${API_URL}/${id}`);

