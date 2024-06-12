import axios from "axios";

export const baseURL = "https://bill-management-backend.vercel.app/api/";

// Create an Axios instance
const api = axios.create({
  baseURL,
});

export const setAuthToken = (token: string) => {

  if (token) {
    api.defaults.headers.common["Authorization"] = `TOKEN ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
