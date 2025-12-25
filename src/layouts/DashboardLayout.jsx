import { Outlet, Link, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import {
  Home,
  User,
  ShoppingBag,
  Star,
  Heart,
  PlusCircle,
  Utensils,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChefHat,
} from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [role, roleLoading] = useRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = {
    common: [{ path: "/dashboard/profile", label: "My Profile", icon: User }],
    user: [
      { path: "/dashboard/my-orders", label: "My Orders", icon: ShoppingBag },
      { path: "/dashboard/my-reviews", label: "My Reviews", icon: Star },
      { path: "/dashboard/favorites", label: "Favorites", icon: Heart },
    ],
    chef: [
      {
        path: "/dashboard/create-meal",
        label: "Create Meal",
        icon: PlusCircle,
      },
      { path: "/dashboard/my-meals", label: "My Meals", icon: Utensils },
      {
        path: "/dashboard/order-requests",
        label: "Order Requests",
        icon: Package,
      },
    ],
    admin: [
      { path: "/dashboard/manage-users", label: "Manage Users", icon: Users },
      {
        path: "/dashboard/manage-requests",
        label: "Manage Requests",
        icon: Settings,
      },
      { path: "/dashboard/stats", label: "Statistics", icon: BarChart3 },
    ],
  };

  const getMenuItems = () => {
    const items = [...menuItems.common];
    if (role === "user") items.push(...menuItems.user);
    if (role === "chef") items.push(...menuItems.chef);
    if (role === "admin") items.push(...menuItems.admin);
    return items;
  };

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-neutral-900 dark:text-white">
              LocalChef<span className="text-primary-600">Bazaar</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 min-h-screen fixed left-0 top-0 pt-20">
          <div className="p-6">
            {/* User Info */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary-500/20">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co.com/0s3pdnc/avatar.png"
                      }
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border-2 border-white dark:border-neutral-800"></div>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white">
                    Welcome back!
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 capitalize">
                    {role} Dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {getMenuItems().map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-500"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}

              <div className="pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-500 transition-all"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Back to Home</span>
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-neutral-800 animate-fade-in overflow-y-auto">
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* User Info */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary-500/20">
                        <img
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co.com/0s3pdnc/avatar.png"
                          }
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border-2 border-white dark:border-neutral-800"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 dark:text-white">
                        Welcome back!
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 capitalize">
                        {role} Dashboard
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {getMenuItems().map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-500"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}

                  <div className="pt-8 border-t border-neutral-200 dark:border-neutral-700">
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-500 transition-all"
                    >
                      <Home className="w-5 h-5" />
                      <span className="font-medium">Back to Home</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-screen pt-6 lg:pt-20">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
