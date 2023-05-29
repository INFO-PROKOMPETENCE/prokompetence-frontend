import axios from "axios";
import { store } from "../redux-store/store-manager";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://84.201.158.99";
}

axios.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      window.location.replace("/login");
    }
  }
);

export { axios };
