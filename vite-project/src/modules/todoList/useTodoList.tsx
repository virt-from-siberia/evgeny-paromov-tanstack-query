import { useQuery } from "@tanstack/react-query";
import { totoListApi } from "./api";

export const useTodoList = () => {
  const {
    data: todoItems,
    error,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...totoListApi.getTodoListQueryOptions(),
    // Do not mutate React Query cache data in-place.
    select: (data) => [...data].reverse(),
  });

  return {
    todoItems,
    error,
    isPending,
    isPlaceholderData,
  };
};
