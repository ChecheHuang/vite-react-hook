import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookies } from "@/utils/cookies";
interface TokenState {
  token: string;
  pending: boolean | null;
  error: boolean;
}

const initialState: TokenState = {
  token: getCookies("token") || "",
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
    updateSuccess(state, action: PayloadAction<string>) {
      state.pending = false;
      state.token = action.payload;
    },
    updateError(state) {
      state.error = true;
      state.pending = false;
    },
  },
});
export const { updateStart, updateSuccess, updateError } = tokenSlice.actions;
export default tokenSlice.reducer;
