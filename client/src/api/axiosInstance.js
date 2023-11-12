import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const api = axios.create({
  baseURL: baseURL + "/api",
  // baseURL: `http://176.58.116.208/api`,
});

const request = (config) => {
  const token = localStorage.getItem("token");
  if (!token && config.url !== "/users/admin/login") {
    return window.location.replace("/");
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const response = (config) => {
  if (config && config.data && config.data.token) {
    localStorage.setItem("token", config.data.token);
  }
  return config;
};

api.interceptors.request.use(request);
api.interceptors.response.use(response);

export default api;
