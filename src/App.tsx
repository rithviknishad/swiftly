import React, { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { User } from "./types/UserTypes";
import { me } from "./utils/ApiUtils";

const getCurrentUser = async (setCurrentUser: (user: User) => void) =>
  setCurrentUser(await me());

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return <AppRouter currentUser={currentUser} />;
}
