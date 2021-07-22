import { Route } from "react-router-dom";
import Certificates from "../features/certificate/Certificates";

const routerConfig = [
  {
    key: "home",
    path: "/",
    exact: true,
    children: () => <div>Home</div>
  },
  {
    key: "certificate",
    path: "/certificate",
    exact: false,
    children: () => <Certificates/>
  },
  {
    key: "error",
    path: "*",
    exact: false,
    children: () => <div>Not found page</div>
  },
]

const AppRouter = routerConfig.map((router) => (
  <Route
    key={router.key}
    path={router.path}
    exact={router.exact}
    children={router.children}
  />
));

export default AppRouter;
