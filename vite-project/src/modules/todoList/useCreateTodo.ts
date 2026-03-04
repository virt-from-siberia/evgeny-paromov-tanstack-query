import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { totoListApi } from "./api";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: totoListApi.createTodo,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [totoListApi.baseKey, "list"],
      });
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");

    createTodoMutation.mutate(
      {
        text,
        done: false,
        userId: "1",
        id: nanoid(),
      },
      {},
    );

    e.currentTarget.reset();
    // createTodo(text);
  };

  return {
    handleCreate,
    isPending: createTodoMutation.isPending,
    isFetching: useIsFetching(totoListApi.getTodoListQueryOptions()) > 0,
  };
};
