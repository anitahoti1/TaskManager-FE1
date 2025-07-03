
import { createBrowserRouter } from "react-router";
import Login from "../components/Login/Login";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import  Dashboard  from "../components/Dashboard/Dashboard";
import ProtectedRoute from "./../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./../components/PublicRoute/PublicRoute";
import LandingPage from "../components/LandingPage/LandingPage";
import TasksDashboard from "../components/TasksDashboard/TasksDashboard";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import AdminRoute from "../components/ProtectedRoute/AdminRoute";


const routes = createBrowserRouter([

    { path: "/login", element: <PublicRoute><Login/></PublicRoute> },
    { path: "/", Component: LandingPage },
    { path: "/signup", Component: SignUpPage },
    { path: "/dashboard", element: <ProtectedRoute><Dashboard/></ProtectedRoute>},
    { path: "/tasksdashboard", element: <ProtectedRoute><TasksDashboard/></ProtectedRoute>},
    { path: "/admin", element: <AdminRoute><AdminDashboard /></AdminRoute> }


  ]);
  export default routes;
