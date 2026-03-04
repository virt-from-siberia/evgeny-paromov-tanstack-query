import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance";

// const BASE_URL = "http://localhost:3000";

export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
  userId: string;
};

export type TodoListResponse = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: TodoDto[];
};

export const totoListApi = {
  baseKey: "tasks",
  getTodoListQueryOptions: () => {
    return queryOptions({
      queryKey: [totoListApi.baseKey, "list"],
      queryFn: (meta) =>
        jsonApiInstance<TodoDto[]>(`/tasks`, {
          signal: meta.signal,
        }),
    });
  },

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: [totoListApi.baseKey, "list"],
      queryFn: (meta) =>
        jsonApiInstance<TodoListResponse>(
          `/tasks?_page=${meta?.pageParam}&_per_page=10`,
          {
            signal: meta.signal,
          },
        ),
      initialPageParam: 1,
      getNextPageParam: (result) => result?.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },

  createTodo: ({ done, text, userId, id }: TodoDto) => {
    return jsonApiInstance<TodoDto>(`/tasks`, {
      method: "POST",
      json: { done, text, userId, id },
    });
  },
  updateTodo: (id: string, data: Partial<TodoDto>) => {
    return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
      method: "PATCH",
      json: data,
    });
  },
  deleteTodo: (id: string) => {
    return jsonApiInstance<unknown>(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
