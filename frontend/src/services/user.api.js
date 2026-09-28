import api from "../api/axios";

const userAuth = "auth";

export const getUser = async () => {
  const { data } = await api.get(`${userAuth}/current-user`);
  return data;
};

export const createUser = async (payload) => {
  const { data } = await api.post(`${userAuth}/login`, payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.get(`${userAuth}/users`);
  return data;
};
