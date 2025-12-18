import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

// Public Pages
import Home from "../pages/Home";
import Meals from "../pages/Meals";
import MealDetails from "../pages/MealDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// User Dashboard
import Profile from "../pages/dashboard/Profile";
import MyOrders from "../pages/dashboard/MyOrders";
import MyReviews from "../pages/dashboard/MyReviews";
import Favorites from "../pages/dashboard/Favorites";

// Chef Dashboard
import CreateMeal from "../pages/dashboard/chef/CreateMeal";
import MyMeals from "../pages/dashboard/chef/MyMeals";
import OrderRequests from "../pages/dashboard/chef/OrderRequests";

// Admin Dashboard
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageRequests from "../pages/dashboard/admin/ManageRequests";
import PlatformStatistics from "../pages/dashboard/admin/PlatformStatistics";

// Private Pages
import Order from "../pages/Order";

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
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <Order />
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
      // Common
      { path: "profile", element: <Profile /> },

      // User Routes
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "favorites", element: <Favorites /> },

      // Chef Routes
      { path: "create-meal", element: <CreateMeal /> },
      { path: "my-meals", element: <MyMeals /> },
      { path: "order-requests", element: <OrderRequests /> },

      // Admin Routes
      { path: "manage-users", element: <ManageUsers /> },
      { path: "manage-requests", element: <ManageRequests /> },
      { path: "stats", element: <PlatformStatistics /> },
    ],
  },
]);

export default router;
