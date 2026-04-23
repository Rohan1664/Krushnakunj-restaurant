import api from "./api";

// GET ALL USERS
export const getUsers = () => api.get("/users");

// DELETE USER
export const deleteUser = (id) =>
  api.delete(`/users/${id}`);