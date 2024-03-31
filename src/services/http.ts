import axios, { AxiosHeaderValue, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from "axios";

import { localStorageAuthToken } from "./localStorage";

import CONFIG from "../config";

class HTTPService {
  baseURL: string | undefined = undefined;

  authToken: string | undefined | null = localStorageAuthToken.get();

  axiosInstance: AxiosInstance | undefined = undefined;

  constructor() {
    this.setBaseURL(CONFIG.API.BASE_URL);
    this.createAxiosInstance();
  }

  getBaseURL(): string {
    return this.baseURL ?? "";
  }

  setBaseURL(newBaseUrl: string) {
    this.baseURL = newBaseUrl;
  }

  getAuthToken(): string {
    return this.authToken ?? "";
  }

  setAuthToken(newAuthToken: string): void {
    this.authToken = newAuthToken;
    localStorageAuthToken.set(newAuthToken);
  }

  clearAuthToken(): void {
    this.authToken = undefined;
    localStorageAuthToken.delete();
  }

  createAxiosInstance(): void {
    const instance = axios.create({
      baseURL: this.baseURL ?? "",
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const updatedConfig = config;
        const savedAuthToken = this.getAuthToken();
        if (savedAuthToken) {
          updatedConfig.headers["auth-token"] = savedAuthToken;
        } else if (
          updatedConfig.headers &&
          Object.prototype.hasOwnProperty.call(
            updatedConfig.headers,
            "auth-token"
          )
        ) {
          delete updatedConfig.headers["auth-token"];
        }

        return updatedConfig;
      },
      (error) => error
    );

    this.axiosInstance = instance;
  }

  get(urlPath: string, params: Record<string, any> | null = null) {
    if (params) {
      return this.axiosInstance?.get(urlPath, { params });
    }
    return this.axiosInstance?.get(urlPath);
  }

  post(
    urlPath: string,
    payload: Record<string, any> | null = null,
    params: Record<string, any> | null = null
  ) {
    if (params) {
      return this.axiosInstance?.post(urlPath, payload, { params });
    }
    return this.axiosInstance?.post(urlPath, payload);
  }

  patch(
    urlPath: string,
    payload: Record<string, any> | null = null,
    params: Record<string, any> | null = null
  ) {
    if (params) {
      return this.axiosInstance?.patch(urlPath, payload, { params });
    }
    return this.axiosInstance?.patch(urlPath, payload);
  }

  put(
    urlPath: string,
    payload: Record<string, any> | null = null,
    params: Record<string, any> | null = null
  ) {
    if (params) {
      return this.axiosInstance?.put(urlPath, payload, { params });
    }
    return this.axiosInstance?.put(urlPath, payload);
  }

  delete(urlPath: string, params: Record<string, any> | null = null) {
    if (params) {
      return this.axiosInstance?.delete(urlPath, { params });
    }
    return this.axiosInstance?.delete(urlPath);
  }
}

const http = new HTTPService();

export default http;
