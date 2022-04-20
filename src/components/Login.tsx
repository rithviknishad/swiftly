import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { login } from "../utils/ApiUtils";
import { isAuthenticated, setAuthToken } from "../utils/StorageUtils";
import AuthBase from "./AuthBase";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login({ username, password });
      setAuthToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) navigate("/");
  }, []);

  return (
    <AuthBase>
      <div className="w-full max-w-lg">
        <h1 className="text-4xl my-2">Log in</h1>
        <form className="py-14" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg p-2 my-2 flex-1 autofill:!bg-gray-600 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg p-2 my-2 flex-1 autofill:!bg-gray-600 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            />
          </div>
          <div className="my-12">
            <button
              className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              type="submit"
            >
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Log In
              </span>
            </button>
          </div>
        </form>
      </div>
    </AuthBase>
  );
}
