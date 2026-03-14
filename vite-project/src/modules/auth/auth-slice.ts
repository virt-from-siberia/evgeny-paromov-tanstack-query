import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../shared/redux";

type AuthState = {
  userId: string | null;
  loginError?: string;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId") ?? null,
  } as AuthState,
  selectors: {
    userId: (state) => state.userId,
    loginError: (state) => state.loginError,
  },
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{
        userId: string;
      }>,
    ) => {
      state.userId = action.payload.userId;
      state.loginError = undefined;
    },
    removeUser: (state) => {
      localStorage.removeItem("userId");
      state.userId = null;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.loginError = action.payload;
    },
  },
}).injectInto(rootReducer);
