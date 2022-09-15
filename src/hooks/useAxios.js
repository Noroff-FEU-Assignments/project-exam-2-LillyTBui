import { useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { API_URL } from "../constants/api";

const url = API_URL;

function useAxios() {
  const [auth] = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = auth.token;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}

export default useAxios;
