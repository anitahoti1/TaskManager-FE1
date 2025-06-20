import { createBrowserRouter } from "react-router";
import Login from "../components/Login/Login";
import SignUpPage from "../components/SignUpPage/SignUpPage";

const routes = createBrowserRouter([
    { path: "/", Component: Login },
    { path: "/signup", Component: SignUpPage },
  ]);

  export default routes;