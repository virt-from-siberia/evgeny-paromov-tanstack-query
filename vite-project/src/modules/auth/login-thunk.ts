import type { AppThunk } from "../../shared/redux";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../shared/api/query-client";
import { authApi } from "./api";
import { authSlice } from "./auth-slice";

export const loginThunk =
  (login: string, password: string): AppThunk =>
  async (dispatch, getState) => {
    const mutationResult = await new MutationObserver(queryClient, {
      mutationKey: ["login"],
      mutationFn: authApi.loginUser,
    }).mutate({
      login,
      password,
    });

    if (mutationResult) {
      dispatch(
        authSlice.actions.addUser({
          userId: mutationResult.id,
        }),
      );
      queryClient.setQueryData(
        authApi.getUserById(mutationResult.id).queryKey,
        mutationResult,
      );
      localStorage.setItem("userId", mutationResult.id);
    }

    dispatch(authSlice.actions.setError("Пароль и Логин неверные"));
  };

export const useLoginLoading = () =>
  useMutation({
    mutationKey: ["login"],
  }).isPending;
