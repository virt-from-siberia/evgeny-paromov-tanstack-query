import TodoList from "../modules/todoList/todo-list";
import "./index.css";
import { useUser } from "../modules/auth/use-user";
import { Login } from "../modules/auth/login";
import { LogOutBtn } from "../modules/auth/LogOutBtn";

export function App() {
  const user = useUser();

  if (user.isLoading) {
    return <div>Loading</div>;
  }

  if (user.data) {
    return (
      <>
        <LogOutBtn />
        <TodoList />
      </>
    );
  } else {
    return <Login />;
  }
}
