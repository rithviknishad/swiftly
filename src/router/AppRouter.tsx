import { useRoutes } from "raviger";
import AppContainer from "../components/AppContainer";
import Login from "../components/Login";
import { Signup } from "../components/Signup";
import { User } from "../types/UserTypes";

const routes = {
  //   "/": () => <Home />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  //   "/boards": () => <Boards />,
  //   "/boards/:id": () => <KanbanBoardView />,
  //   "/todos/:id": () => <TodoView />,
};

export default function AppRouter(props: { currentUser: User | null }) {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
