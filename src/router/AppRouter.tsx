import { useRoutes } from "raviger";
import AppContainer from "../components/AppContainer";

const routes = {
  //   "/": () => <Home />,
  //   "/login": () => <Login />,
  //   "/signup": () => <SignUp />,
  //   "/boards": () => <Boards />,
  //   "/boards/:id": () => <KanbanBoardView />,
  //   "/todos/:id": () => <TodoView />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
