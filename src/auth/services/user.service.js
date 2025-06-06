import axios from 'axios';

const API_URL = 'https://fake-api-rose-psi.vercel.app/users';

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};
