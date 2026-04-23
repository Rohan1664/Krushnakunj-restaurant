import API from "./api";

export const getOrders = () => API.get("/orders");

export const createOrder = (data) =>
  API.post("/orders", data);

// FIXED (no body needed)
export const updateOrderStatus = (id) =>
  API.put(`/orders/${id}`);

export const deleteOrder = (id) =>
  API.delete(`/orders/${id}`);