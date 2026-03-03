import { type TodoDto } from "./api";
import { useTodoList } from "./useTodoList";

const isDone = (d: unknown): boolean => d === true || d === "true";

export const TodoList = () => {
  const { todoItems, error, isPending, isPlaceholderData, cursor } =
    useTodoList();

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
                className="shrink-0 px-2.5 py-1.5 text-xs font-medium rounded-md border border-rose-200/70 text-rose-600 bg-white shadow-sm cursor-pointer transition-all duration-200 hover:bg-rose-50 hover:border-rose-300 hover:shadow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-200"
              >
                Удалить
              </button>
            </li>
          );
        })}
      </ul>
      {cursor}

      {/* <div className="flex items-center gap-2 mt-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 bg-white shadow-sm cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:shadow-sm disabled:active:scale-100"
        >
          Prev
        </button>
        <span className="px-2 text-xs select-none text-slate-500">
          Страница {page} из {lastPage}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={isNextDisabled}
          className="px-3 py-1.5 rounded-md border border-teal-500 text-white bg-teal-600 shadow-sm cursor-pointer transition-all duration-200 hover:bg-teal-500 hover:border-teal-500 hover:shadow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600 disabled:hover:border-teal-500 disabled:hover:shadow-sm disabled:active:scale-100"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default TodoList;
