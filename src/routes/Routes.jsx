import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";
import Meals from "../pages/Meals";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/meals", element: <Meals /> },
      
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  
]);

export default router;
