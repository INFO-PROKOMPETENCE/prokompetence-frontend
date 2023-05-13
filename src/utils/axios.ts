import axios from "axios";
import { store } from "../redux-store/store-manager";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://localhost:3004";
}

axios.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { axios };
