import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, userData, logoutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle between light and dark mode
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  // Logout handler with toast notification
  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully!");
      setDropdownOpen(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary font-bold" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/meals"
        className={({ isActive }) => (isActive ? "text-primary font-bold" : "")}
      >
        Meals
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-primary flex items-center gap-2"
        >
          🍳 LocalChefBazaar
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">{navLinks}</div>

        {/* Right Side: Theme Toggle + User Menu/Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={(e) => handleTheme(e.target.checked)}
              checked={theme === "dark"}
            />
            <FiSun className="swap-off fill-current w-6 h-6" />
            <FiMoon className="swap-on fill-current w-6 h-6" />
          </label>

          {/* User Menu (if logged in) */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-circle btn-ghost"
              >
                <img
                  src={userData?.image || user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-xl border border-base-300 py-2 z-50">
                  <div className="px-4 py-2 border-b border-base-300">
                    <p className="font-semibold truncate">{user.displayName}</p>
                    <p className="text-sm text-base-content/60 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-base-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-base-200 text-error"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Auth Buttons (if not logged in)
            <div className="hidden md:flex gap-2">
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden btn btn-ghost btn-square"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-4 space-y-3">
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
