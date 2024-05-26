import axios from "axios";

const API_BASE_URL = "http://192.168.0.31:8000/api/v1/"; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const getData = async (
  endpoint: string,
  params?: { [key: string]: any },
  headers?: { [key: string]: any }
) => {
  try {
    const options = { params, headers };
    const response = await apiService.get(endpoint, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getImage = async (
  endpoint: string,
  params?: { [key: string]: any },
  headers?: { [key: string]: any }
) => {
  try {
    const options = { params, headers };
    const result = await axios.get(endpoint, options);
    return result;
  } catch (error) {
    return false;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const body = { username: username, password: password };
    const response = await apiService.post("login", body);
    return response;
  } catch (error) {
    console.error(error);
  }
  return false;
};
