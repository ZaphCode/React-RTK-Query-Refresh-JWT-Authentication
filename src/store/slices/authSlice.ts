import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

interface AuthState {
  user: User;
  access_token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  user: {
    id: "",
    username: "",
    email: "",
    age: 0,
    role: "user",
  },
  authenticated: false,
  access_token: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<User>) => ({
      ...state,
      authenticated: true,
      user: payload,
    }),
    refreshToken: (
      state,
      { payload }: PayloadAction<string>
    ) => ({
      ...state,
      access_token: payload,
    }),
    logout: (state) => initialState,
  },
});

export default authSlice.reducer;

export const { login, logout, refreshToken } = authSlice.actions;
