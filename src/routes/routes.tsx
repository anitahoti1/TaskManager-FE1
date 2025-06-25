
import { createBrowserRouter } from "react-router";
import Login from "../components/Login/Login";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import  Dashboard  from "../components/Dashboard";
import ProtectedRoute from "./../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./../components/PublicRoute/PublicRoute";
import LandingPage from "../components/LandingPage/LandingPage";
import TasksDashboard from "../components/TasksDashboard/TasksDashboard";


const routes = createBrowserRouter([
    { path: "/", Component: LandingPage },
    { path: "/login", Component: Login },
    { path: "/signup", Component: SignUpPage },
    { path: "/tasksdashboard", Component: TasksDashboard }
  ]);

  export default routes;
