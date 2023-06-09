import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import { getCookies } from "./cookies";
export interface Result<T> {
  code?: number;
  status: string;
  data: T;
  message?: string;
}

const request: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 3000,
});

//請求攔截
request.interceptors.request.use((config) => {
  //請求前
  const token = getCookies("token");
  if (config && config?.headers && token) {
    config.headers.token = token;
  }
  return config;
}),
  (error: AxiosError) => {
    return Promise.reject(error);
  };

//響應攔截
request.interceptors.response.use((response: AxiosResponse) => {
  //請求後
  if (response?.data?.status === "success") {
    return response.data;
  }
  throw new Error(response.data?.message || "請求錯誤");
}),
  (error: AxiosError) => {
    return Promise.reject(error);
  };

export type MethodType = "get" | "post" | "put" | "delete" | "patch";
type HttpMethodMap = {
  [key in MethodType]: <T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ) => Promise<Result<T>>;
};
export const http: HttpMethodMap = {
  get: request.get,
  post: request.post,
  patch: request.patch,
  put: request.put,
  delete: request.delete,
};
export default request;

// export const http = {
//   get<T>(url: string, data?: object): Promise<T> {
//     return request.get(url, data);
//   },
//   post<T>(
//     url: string,
//     data?: object,
//     config?: AxiosRequestConfig
//   ): Promise<Result<T>> {
//     return request.post(url, data, config);
//   },
//   patch<T>(
//     url: string,
//     data?: object,
//     config?: AxiosRequestConfig
//   ): Promise<Result<T>> {
//     return request.patch(url, data, config);
//   },
//   put<T>(
//     url: string,
//     data?: object,
//     config?: AxiosRequestConfig
//   ): Promise<Result<T>> {
//     return request.put(url, data, config);
//   },
//   delete<T>(url: string, data?: object): Promise<Result<T>> {
//     return request.delete(url, data);
//   },
// };
