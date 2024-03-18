import axios, { AxiosResponse } from "axios";

export default class HttpService {
  api_url: string;
  constructor() {
    this.api_url = "http://127.0.0.1:8000/api/v1/";
  }

  async get(
    endpoint?: string,
    params?: { [key: string]: any },
    headers?: { [key: string]: any }
  ): Promise<AxiosResponse> {
    const url = endpoint ? this.api_url.concat(endpoint) : this.api_url;
    const options = { params, headers };
    return await axios.get(url, options);
  }
}

const API_BASE_URL = "http://127.0.0.1:8000/api/v1/"; // Replace with your API base URL

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
    console.log("Error fetching races");
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
