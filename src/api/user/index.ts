import { http } from "@/utils/request";

export const login = (data: { username: string; password: string }) => {
  return http.post<{
    token: string;
    expireTime: number;
  }>("/login", data);
};
