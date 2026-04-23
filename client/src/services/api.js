import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("userInfo");

  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }

  return req;
});

export default API;