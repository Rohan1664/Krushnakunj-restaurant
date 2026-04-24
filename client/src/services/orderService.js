import API from "./api";

// GET ORDERS (pagination + search + filter)
export const getOrders = (page = 1, keyword = "", status = "") =>
  API.get(`/orders?page=${page}&keyword=${keyword}&status=${status}`);

// CREATE ORDER
export const createOrder = (data) =>
  API.post("/orders", data);

// UPDATE STATUS
export const updateOrderStatus = (id) =>
  API.put(`/orders/${id}`);

// DELETE ORDER
export const deleteOrder = (id) =>
  API.delete(`/orders/${id}`);