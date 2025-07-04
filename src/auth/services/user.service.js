import axios from 'axios';

const API_URL = 'https://app-250703230222.azurewebsites.net';

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/api/Auth/users`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(`${API_URL}/api/Auth/register`, user);
  return response.data;
};

export const loginUser = async ({ usernameOrEmail, password }) => {
  const response = await axios.post(`${API_URL}/api/Auth/login`, {
  usernameOrEmail,
      password,
});
return response.data;
};