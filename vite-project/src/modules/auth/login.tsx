import React from "react";
import { useAppDispath, useAppSelector } from "../../shared/redux";
import { loginThunk, useLoginLoading } from "./login-thunk";
import { authSlice } from "./auth-slice";

export function Login() {
  const dispatch = useAppDispath();

  const loginError = useAppSelector(authSlice.selectors.loginError);
  const isLoading = useLoginLoading();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    dispatch(
      loginThunk(
        formData.get("login")?.toString() ?? "",
        formData.get("password")?.toString() ?? "",
      ),
    );
  };

  return (
    <div className="container p-5 mx-auto mt-10 border rounded-lg border-slate-500">
      <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
        <h1 className="text-xl text-bold">Login</h1>
        <input
          className="p-5 border rounded border-slate-500"
          name="login"
        ></input>
        <input
          className="p-5 border rounded border-slate-500"
          name="password"
        ></input>

        {loginError && (
          <div className="p-3 text-white rounded bg-rose-500">{loginError}</div>
        )}

        <button
          disabled={isLoading}
          className="p-5 text-white bg-teal-500 rounded disabled:bg-slate-300"
        >
          Вход
        </button>
      </form>
    </div>
  );
}
