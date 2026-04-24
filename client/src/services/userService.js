import api from "./api";

// GET USERS (pagination + search)
export const getUsers = (page = 1, keyword = "") =>
  api.get(`/users?page=${page}&keyword=${keyword}`);

// DELETE USER
export const deleteUser = (id) =>
  api.delete(`/users/${id}`);