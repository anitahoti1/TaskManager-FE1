import { createBrowserRouter } from "react-router";
import Login from "../components/Login/Login";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import LandingPage from "./../LandingPage/LandingPage";

const routes = createBrowserRouter([
    { path: "/", Component: LandingPage },
    { path: "/login", Component: Login },
    { path: "/signup", Component: SignUpPage },
  ]);

  export default routes;
