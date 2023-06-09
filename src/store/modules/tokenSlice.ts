import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface TokenState {
  token?: string;
  route?: RoleData;
  user?: User;
  pending: boolean | null;
  error: boolean;
}
interface RouteItem {
  label?: string;
  hidden?: boolean;
  accessRole?: UserRole[];
}
export interface RoleData {
  [path: string]: RouteItem;
}
type UserRole = "ADMIN" | "USER";
export interface User {
  username: string;
  role: UserRole;
}
const storedData = localStorage.getItem("data");
const data = storedData ? JSON.parse(storedData) : null;

const initialState: TokenState = {
  token: data?.token,
  route: data?.route,
  user: data?.user,
  pending: null,
  error: false,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    updateStart(state) {
      state.pending = true;
    },
    updateSuccess(
      state,
      action: PayloadAction<{
        token?: string;
        route?: RoleData;
        user?: User;
      }>
    ) {
      const data = action.payload;
      const { token, route, user }=data;
      localStorage.setItem("data", JSON.stringify(data));
      state.pending = false;
      state.token = token;
      state.route = route;
      state.user = user;
    },
    updateRoute(state,action){
      const { token, user } = state;
      const route = action.payload
      console.log(route);
      localStorage.setItem("data", JSON.stringify({ token, route, user }));
      state.route=route
    },
    updateError(state) {
      state.error = true;
      state.pending = false;
    },
  },
});
export const { updateStart, updateSuccess, updateError, updateRoute } =
  tokenSlice.actions;
export default tokenSlice.reducer;
