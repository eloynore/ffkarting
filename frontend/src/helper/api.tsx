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
