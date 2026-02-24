import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client";
import { TodoList } from "../modules/todoList/todo-list";
import "./index.css";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}
