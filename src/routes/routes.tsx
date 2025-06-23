import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import SignUpPage from "../components/SignUpPage/SignUpPage";

const routes = createBrowserRouter([
    { path: "/login", Component: Login },
    { path: "/signup", Component: SignUpPage },
  ]);

  export default routes;