import { useAppDispath } from "../../shared/redux";
import { logOutThunk } from "./logout-thunk";

export function LogOutBtn() {
  const dispatch = useAppDispath();

  return (
    <button
      className="p-3 border rounded border-rose-500"
      onClick={() => dispatch(logOutThunk())}
    >
      Выход
    </button>
  );
}
