import { useAppDispath } from "../../shared/redux";
import { createTodoThunk, useCreateTodoLoading } from "./CreateTodoThunk";

export const useCreateTodo = () => {
  const appDispatch = useAppDispath();
  const isLoading = useCreateTodoLoading();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const text = String(formData.get("text") ?? "").trim();

    if (!text) {
      return;
    }

    await appDispatch(createTodoThunk(text));
    form.reset();
  };

  return {
    handleCreate,
    isLoading,
  };
};
