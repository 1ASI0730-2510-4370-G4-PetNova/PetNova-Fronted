import http from '../../shared/services/http-common';

const API_URL = '/Auth';

export const getUsers = async () => {
  const response = await http.get(API_URL);
  return response.data;
};

export const createUser = async (user) => {
  const response = await http.post(`${API_URL}/register`, user);
  return response.data;
};

export const login = async (user) => {
  const data = {
    usernameOrEmail: user.email,
    password: user.password
  }

  const response = await http.post(`${API_URL}/login`, data);
  return response.data;
};
