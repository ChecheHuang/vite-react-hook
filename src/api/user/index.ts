import { http } from "@/utils/request";
import { RoleData, User } from "@/store/modules/tokenSlice";
export const login = (data: { username: string; password: string }) => {
  return http.post<{
    token: string;
    expireTime: number;
    route: RoleData;
    user: User;
  }>("/login", data);
};
