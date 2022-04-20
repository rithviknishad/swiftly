import { navigate } from "raviger";
import { useState } from "react";
import { signup } from "../utils/ApiUtils";
import AuthBase from "./AuthBase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signup({ email, username, password1, password2 });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthBase>
      <div className="w-full max-w-lg divide-y divide-gray-200">
        <h1 className="text-4xl my-2">Sign Up</h1>
        <form className="py-14" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg p-2 my-2 flex-1 autofill:!bg-gray-600 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            />
          </div>
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
            <label htmlFor="password1">Password</label>
            <input
              type="password1"
              name="password1"
              id="password1"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg p-2 my-2 flex-1 autofill:!bg-gray-600 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password2"
              name="password2"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg p-2 my-2 flex-1 autofill:!bg-gray-600 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            />
          </div>
          <div className="my-12">
            <button
              className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              type="submit"
            >
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Sign Up
              </span>
            </button>
          </div>
        </form>
      </div>
    </AuthBase>
  );
}
