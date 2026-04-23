import API from "./api";

// GET ALL
export const getProducts = () => API.get("/products");

// GET SINGLE
export const getProductById = (id) => API.get(`/products/${id}`);

// CREATE
export const createProduct = (data) => API.post("/products", data);

// UPDATE
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);

// DELETE
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);