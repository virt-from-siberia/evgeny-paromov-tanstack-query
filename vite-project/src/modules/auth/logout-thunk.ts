import type { AppThunk } from "../../shared/redux";
import { queryClient } from "../../shared/api/query-client";
import { authSlice } from "./auth-slice";

export const logOutThunk = (): AppThunk => async (dispatch) => {
  dispatch(authSlice.actions.removeUser());
  queryClient.removeQueries();

  dispatch(authSlice.actions.setError("Пароль и Логин неверные"));
};
