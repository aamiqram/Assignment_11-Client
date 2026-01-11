import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiHome,
  FiCompass,
} from "react-icons/fi";
import { ChefHat } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <ChefHat className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                LocalChef
                <span className="text-neutral-900 dark:text-white">Bazaar</span>
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
                Homemade happiness delivered
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 font-medium"
            >
              <FiHome className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/meals"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 font-medium"
            >
              <FiCompass className="w-4 h-4" />
              Discover Meals
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/blog"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 font-medium"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 font-medium"
            >
              Contact
            </Link>
            <Link
              to="/help"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 font-medium"
            >
              Help
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 ml-2"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FiMoon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              ) : (
                <FiSun className="w-5 h-5 text-yellow-500" />
              )}
            </button>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="ml-4 flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary-200 dark:border-primary-700 bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-neutral-700 transition-all duration-300 font-medium"
                >
                  Dashboard
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 focus:outline-none group"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden ring-2 ring-primary-500/20 group-hover:ring-primary-500/40 transition-all duration-300">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co.com/0s3pdnc/avatar.png"
                          }
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden animate-fadeIn z-50">
                      <div className="p-6 border-b border-neutral-100 dark:border-neutral-700">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary-500/30">
                            <img
                              src={
                                user.photoURL ||
                                "https://i.ibb.co.com/0s3pdnc/avatar.png"
                              }
                              alt={user.displayName || "User"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-neutral-900 dark:text-white truncate text-lg">
                              {user.displayName || "User"}
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-4 px-6 py-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-300 text-neutral-700 dark:text-neutral-300"
                        >
                          <FiUser className="w-5 h-5" />
                          <span className="font-medium">My Profile</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-4 px-6 py-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-300 mt-1"
                        >
                          <FiLogOut className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 ml-4">
                <Link
                  to="/login"
                  className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors font-medium px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
            ) : (
              <FiMenu className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-16 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-lg animate-fadeIn">
            <div className="px-4 py-6">
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 py-4 px-6 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 text-neutral-700 dark:text-neutral-300 font-medium"
                >
                  <FiHome className="w-5 h-5" />
                  Home
                </Link>
                <Link
                  to="/meals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 py-4 px-6 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 text-neutral-700 dark:text-neutral-300 font-medium"
                >
                  <FiCompass className="w-5 h-5" />
                  Discover Meals
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 py-4 px-6 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 text-neutral-700 dark:text-neutral-300 font-medium"
                    >
                      <FiUser className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 py-4 px-6 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 text-neutral-700 dark:text-neutral-300 font-medium"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 py-4 px-6 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 text-left font-medium"
                    >
                      <FiLogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 py-4 px-6 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 text-neutral-700 dark:text-neutral-300 font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 mt-2"
                    >
                      Create Account
                    </Link>
                  </>
                )}

                <div className="pt-6 mt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-between gap-3 py-4 px-6 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 w-full"
                  >
                    <div className="flex items-center gap-4">
                      {theme === "light" ? (
                        <>
                          <FiMoon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                          <span className="font-medium">Dark Mode</span>
                        </>
                      ) : (
                        <>
                          <FiSun className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium">Light Mode</span>
                        </>
                      )}
                    </div>
                    <div
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        theme === "dark" ? "bg-primary-500" : "bg-neutral-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transform transition-all duration-300 ${
                          theme === "dark" ? "translate-x-7" : "translate-x-1"
                        } translate-y-0.5`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
