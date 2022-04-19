import { Redirect, useRoutes } from "raviger";
import AppContainer from "../components/AppContainer";
import Boards from "../components/Boards";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { User } from "../types/UserTypes";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/home": () => <Redirect to="/" />,
  "/boards": () => <Boards />,
  //   "/boards/:id": () => <KanbanBoardView />,
  //   "/todos/:id": () => <TodoView />,
};

export default function AppRouter(props: { currentUser: User | null }) {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
