import API from "./api";

// ✅ GET PRODUCTS (pagination + search)
export const getProducts = (page = 1, keyword = "") =>
  API.get(`/products?page=${page}&keyword=${keyword}`);

// GET SINGLE
export const getProductById = (id) =>
  API.get(`/products/${id}`);

// CREATE
export const createProduct = (data) =>
  API.post("/products", data);

// UPDATE
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);

// DELETE
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);