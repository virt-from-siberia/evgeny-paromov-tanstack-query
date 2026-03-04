import { useTodoList } from "./useTodoList";
import { useCreateTodo } from "./useCreateTodo";
import type { TodoDto } from "./api";
import { useDeleteTodo } from "./useDeteteTodo";

const isDone = (d: unknown): boolean => d === true || d === "true";

export const TodoList = () => {
  const { todoItems, error, isPending, isPlaceholderData } = useTodoList();
  const { handleDelete, getIsPending } = useDeleteTodo();

  const {
    handleCreate,
    isPending: isCreatePending,
    isFetching,
  } = useCreateTodo();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[160px] text-slate-400 text-sm">
        <span className="animate-pulse">Загрузка...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-xl p-3 mx-auto text-sm text-red-600 border border-red-100 rounded-lg bg-red-50/80">
        Ошибка: {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <div className="max-w-xl p-5 mx-auto">
      <h1 className="mb-4 text-xl font-medium tracking-tight text-slate-700">
        Список задач
      </h1>

      <form
        className="flex gap-2 mb-5 form-control"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleCreate(e);
        }}
      >
        <input
          type="text"
          name="text"
          className="p-2 border border-teal-500 rounded input"
        />
        <button
          className="p-2 border border-teal-500 rounded input disabled:opacity-50"
          type="submit"
          disabled={isCreatePending || isFetching}
        >
          Создать
        </button>
      </form>
      <ul
        className={
          "flex flex-col gap-1 overflow-hidden bg-white border rounded-lg shadow-sm border-slate-200/80" +
          (isPlaceholderData ? " opacity-50" : "")
        }
      >
        {todoItems?.map((e: TodoDto) => {
          const done = isDone(e?.done);
          return (
            <li
              key={e?.id}
              className={`
                flex items-center gap-2.5 px-3 py-2 border-b border-slate-100 last:border-b-0
                transition-colors
                ${done ? "bg-slate-50/60" : "hover:bg-slate-50/40"}
              `}
            >
              <input
                type="checkbox"
                checked={done}
                readOnly
                className="w-4 h-4 rounded cursor-default shrink-0 border-slate-300 text-emerald-500 focus:ring-emerald-400 focus:ring-1"
              />
              <span
                className={`flex-1 text-sm text-slate-700 min-w-0 ${
                  done ? "line-through text-slate-500" : ""
                }`}
              >
                {e?.text}
              </span>
              <button
                type="button"
                className="shrink-0 px-2.5 py-1.5 text-xs font-medium rounded-md border border-rose-200/70 text-rose-600 bg-white shadow-sm cursor-pointer transition-all duration-200 hover:bg-rose-50 hover:border-rose-300 hover:shadow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-200 disabled:opacity-50"
                onClick={() => handleDelete(e?.id)}
                disabled={getIsPending(e?.id)}
              >
                Удалить
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
