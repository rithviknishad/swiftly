import { Redirect, useRoutes } from "raviger";
import React, { ReactNode, Suspense } from "react";
import AppContainer from "../components/AppContainer";
import { User } from "../types/UserTypes";

const Signup = React.lazy(() => import("../components/Signup"));
const Login = React.lazy(() => import("../components/Login"));
const Home = React.lazy(() => import("../components/Home"));
const Boards = React.lazy(() => import("../components/Boards"));
const KanbanBoardView = React.lazy(
  () => import("../components/KanbanBoardView")
);

function LazyLoaded(props: { child: ReactNode }) {
  return <Suspense fallback={<div>fetching...</div>}>{props.child}</Suspense>;
}

const routes = {
  // Redirects
  "/home": () => <Redirect to="/" />,

  // Routes
  "/": () => <LazyLoaded child={<Home />} />,
  "/login": () => <LazyLoaded child={<Login />} />,
  "/signup": () => <LazyLoaded child={<Signup />} />,
  "/boards": () => <LazyLoaded child={<Boards />} />,
  "/boards/:id": ({ id }: { id: string }) => (
    <KanbanBoardView boardId={Number(id)} />
  ),
  //   "/todos/:id": () => <TodoView />,
};

export default function AppRouter(props: { currentUser: User | null }) {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
