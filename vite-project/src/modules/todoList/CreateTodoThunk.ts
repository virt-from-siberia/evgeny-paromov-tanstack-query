import type { AppThunk } from "../../shared/redux";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../shared/api/query-client";
import { totoListApi, type TodoDto } from "./api";
import { authSlice } from "../auth/auth-slice";
import { nanoid } from "nanoid";
import { authApi } from "../auth/api";

export const createTodoThunk =
  (text: string): AppThunk =>
  async (dispatch, getState) => {
    const userId = authSlice.selectors.userId(getState());

    if (!userId) {
      throw new Error("User not found");
    }
    const user = await queryClient.fetchQuery(authApi.getUserById(userId));

    const newTodo: TodoDto = {
      text: `${text}. Owner: ${user?.login}`,
      done: false,
      userId,
      id: nanoid(),
    };

    const prevTasks = queryClient.getQueryData<TodoDto[]>(
      totoListApi.getTodoListQueryOptions().queryKey,
    );

    queryClient.cancelQueries({
      queryKey: [totoListApi.baseKey],
    });

    queryClient.setQueryData(
      totoListApi.getTodoListQueryOptions().queryKey,
      (tasks) => [...(tasks ?? []), newTodo],
    );

    try {
      await new MutationObserver(queryClient, {
        mutationFn: totoListApi.createTodo,
      }).mutate(newTodo);
    } catch (error) {
      queryClient.setQueryData(
        totoListApi.getTodoListQueryOptions().queryKey,
        prevTasks,
      );
    } finally {
      queryClient.invalidateQueries({
        queryKey: [totoListApi.baseKey],
      });
    }
  };

export const useCreateTodoLoading = () =>
  useMutation({
    mutationKey: ["createTodo"],
  }).isPending;
