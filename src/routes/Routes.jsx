import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

// Public Pages
import Home from "../pages/Home";
import Meals from "../pages/Meals";
import MealDetails from "../pages/MealDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Privacy from "../pages/Privacy";
import TermsPage from "../pages/TermsPage";
import HelpSupport from "../pages/HelpSupport";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

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
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/meals", element: <Meals /> },
      { path: "/meal/:id", element: <MealDetails /> }, // NOW PUBLIC
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/blog", element: <Blog /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <TermsPage /> },
      { path: "/help", element: <HelpSupport /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
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
