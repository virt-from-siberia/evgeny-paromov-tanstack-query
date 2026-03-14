import { useMutation, useQueryClient } from "@tanstack/react-query";
import { totoListApi } from "./api";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: totoListApi.updateTodo,
    onMutate: async (newTodo, context) => {
      await context.client.cancelQueries({
        queryKey: [totoListApi.baseKey],
      });

      const previousTodos = context.client.getQueryData(
        totoListApi.getTodoListQueryOptions().queryKey,
      );

      // Optimistically update to the new value
      context.client.setQueryData(
        totoListApi.getTodoListQueryOptions().queryKey,
        (old) =>
          old?.map((todo) =>
            todo.id === newTodo.id
              ? {
                  ...todo,
                  ...newTodo,
                }
              : todo,
          ),
      );

      return { previousTodos };
    },

    onError: (_, __, context) => {
      if (context)
        queryClient.setQueryData(
          totoListApi.getTodoListQueryOptions().queryKey,
          context.previousTodos,
        );
    },
    // Always refetch after error or success:
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [totoListApi.baseKey],
      }),
  });

  const toggleTodo = (id: string, done: boolean) => {
    updateTodoMutation.mutate({
      id,
      done: !done,
    });
  };

  return {
    toggleTodo: toggleTodo,
  };
};
