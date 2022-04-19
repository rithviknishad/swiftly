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
        <h1 className="text-2xl my-2 text-gray-700">Sign Up</h1>
        <form className="py-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
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
              className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
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
              className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
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
              className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            />
          </div>
          <div className="mb-4">
            <button
              className="w-full border-2 border-gray-200 rounded-xl p-3 my-2 flex-1 text-white bg-[#2244BA]"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </AuthBase>
  );
}
