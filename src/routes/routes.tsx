import { createBrowserRouter } from "react-router";
import Login from "../components/Login/Login";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import LandingPage from "./../LandingPage/LandingPage";
import  Dashboard  from "../components/Dashboard";

const routes = createBrowserRouter([
    { path: "/", Component: LandingPage },
    { path: "/login", Component: Login },
    { path: "/signup", Component: SignUpPage },
    { path: "/dashboard", Component: Dashboard},
  ]);

  export default routes;
