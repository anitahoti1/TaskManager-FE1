import { createBrowserRouter } from "react-router";
import Login from "../components/Login/Login";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import LandingPage from "./../LandingPage/LandingPage";
import  Dashboard  from "../components/Dashboard";
import TasksDashboard from "../components/TasksDashboard/TasksDashboard";

const routes = createBrowserRouter([
    { path: "/", Component: TasksDashboard },
    { path: "/login", Component: Login },
    { path: "/signup", Component: SignUpPage },
    { path: "/dashboard", Component: Dashboard},
  ]);

  export default routes;
