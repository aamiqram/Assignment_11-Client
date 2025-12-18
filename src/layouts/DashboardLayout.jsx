import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

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
          <li>
            <Link to="/dashboard/profile">My Profile</Link>
            <li>
              <Link to="/dashboard/my-orders">My Orders</Link>
            </li>
          </li>
          {/* Role-based links will be added conditionally later */}
          <li>
            <Link to="/">Back to Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
