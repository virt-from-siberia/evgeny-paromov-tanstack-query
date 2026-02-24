import { useQuery } from "@tanstack/react-query";
import { totoListApi } from "./api";
import { useState } from "react";

const isDone = (d: unknown): boolean => d === true || d === "true";

export const TodoList = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending } = useQuery({
    queryKey: ["tasks", "list"],
    queryFn: totoListApi.getTodoList,
  });

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
      <ul className="flex flex-col gap-1 overflow-hidden bg-white border rounded-lg shadow-sm border-slate-200/80">
        {data?.map((e) => {
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
                className="px-2 py-1 text-xs font-medium transition-colors rounded shrink-0 text-slate-500 hover:text-rose-500 hover:bg-rose-50/80"
              >
                Удалить
              </button>
            </li>
          );
        })}
      </ul>
      <button>prev</button>
      <button>next</button>
    </div>
  );
};
