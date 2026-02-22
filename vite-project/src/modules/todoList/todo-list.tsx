import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export const getTasks = () => {
  return new Promise<Todo[]>((res) => {
    setTimeout(() => {
      res([
        {
          id: "1",
          text: "todo",
          done: false,
        },
        {
          id: "2",
          text: "todo2",
          done: false,
        },
      ]);
    }, 6000);
  });
};

export const TodoList = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["tasks", "list"],
    queryFn: getTasks,
  });

  if (isPending) return "loading ...";
  if (error) return <div> error : {JSON.stringify(error)}</div>;

  return (
    <div>
      {data?.map((e) => {
        return <div key={e?.id}>{e?.text}</div>;
      })}
    </div>
  );
};
