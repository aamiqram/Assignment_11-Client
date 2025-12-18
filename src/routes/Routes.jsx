import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Meals from "../pages/Meals";
import MealDetails from "../pages/MealDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/dashboard/Profile";

import PrivateRoute from "./PrivateRoute";
import Order from "../pages/Order";
import MyOrders from "../pages/dashboard/MyOrders";
import MyReviews from "../pages/dashboard/MyReviews";
import Favorites from "../pages/dashboard/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/meals", element: <Meals /> },
      {
        path: "/meal/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "profile", element: <Profile /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
  {
    path: "/order/:id",
    element: (
      <PrivateRoute>
        <Order />
      </PrivateRoute>
    ),
  },
]);

export default router;
