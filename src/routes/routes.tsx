
import { createBrowserRouter } from "react-router";
import Login from "../components/Login/Login";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import  Dashboard  from "../components/Dashboard";
import ProtectedRoute from "./../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./../components/PublicRoute/PublicRoute";


const routes = createBrowserRouter([
    { path: "/", element: <PublicRoute><Login/></PublicRoute> },
    { path: "/signup", Component: SignUpPage },
    { path: "/dashboard", element: <ProtectedRoute><Dashboard/></ProtectedRoute>},


  ]);

  export default routes;