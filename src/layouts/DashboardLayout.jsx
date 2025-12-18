import { Outlet, Link } from "react-router-dom";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const [role, roleLoading] = useRole();

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300 lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-primary drawer-button"
          >
            Menu
          </label>
        </div>
        <div className="p-10">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Common for all */}
          <li>
            <Link to="/dashboard/profile">My Profile</Link>
          </li>

          {/* Customer Links */}
          {role === "user" && (
            <>
              <li>
                <Link to="/dashboard/my-orders">My Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/my-reviews">My Reviews</Link>
              </li>
              <li>
                <Link to="/dashboard/favorites">Favorite Meals</Link>
              </li>
            </>
          )}

          {/* Chef Links */}
          {role === "chef" && (
            <>
              <li>
                <Link to="/dashboard/create-meal">Create Meal</Link>
              </li>
              <li>
                <Link to="/dashboard/my-meals">My Meals</Link>
              </li>
              <li>
                <Link to="/dashboard/order-requests">Order Requests</Link>
              </li>
            </>
          )}

          {/* Admin Links */}
          {role === "admin" && (
            <>
              <li>
                <Link to="/dashboard/manage-users">Manage Users</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-requests">Manage Requests</Link>
              </li>
              <li>
                <Link to="/dashboard/stats">Platform Statistics</Link>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <Link to="/">← Back to Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
