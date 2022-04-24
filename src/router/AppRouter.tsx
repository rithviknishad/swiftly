import { Redirect, useRoutes } from "raviger";
import React from "react";
import AppContainer from "../components/AppContainer";
import Boards from "../components/Boards";
import Home from "../components/Home";
import KanbanBoardView from "../components/KanbanBoardView";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { User } from "../types/UserTypes";

const routes = {
  // Redirects
  "/home": () => <Redirect to="/" />,

  // Routes
  "/": () => <Home />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/boards": () => <Boards />,
  "/boards/:id": ({ id }: { id: string }) => (
    <KanbanBoardView boardId={Number(id)} />
  ),
  //   "/todos/:id": () => <TodoView />,
};

export default function AppRouter(props: { currentUser: User | null }) {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
