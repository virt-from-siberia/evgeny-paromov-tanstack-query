import { useMutation, useQueryClient } from "@tanstack/react-query";
import { totoListApi, type TodoDto } from "./api";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: totoListApi.deleteTodo,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [totoListApi.baseKey, "list"],
      });
    },
    onSuccess: (_, deletedId) => {
      const todos = queryClient.getQueryData<TodoDto[]>(
        totoListApi.getTodoListQueryOptions().queryKey,
      );
      if (todos) {
        queryClient.setQueryData(
          totoListApi.getTodoListQueryOptions().queryKey,
          todos.filter((item) => item.id !== deletedId),
        );
      }
    },
  });

  return {
    handleDelete: (id: string) => deleteTodoMutation.mutate(id),
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  };
};
