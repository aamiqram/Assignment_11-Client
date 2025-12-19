import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="navbar-custom">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-orange-600 hover:text-orange-700 transition flex items-center gap-3"
        >
          LocalChefBazaar 🍳
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <Link to="/" className="hover:text-orange-600 transition font-medium">
            Home
          </Link>
          <Link
            to="/meals"
            className="hover:text-orange-600 transition font-medium"
          >
            Meals
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-orange-600 transition font-medium"
              >
                Dashboard
              </Link>

              {/* Dropdown with Manual State */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <div className="w-12 h-12 rounded-full ring-4 ring-orange-500 overflow-hidden shadow-lg hover:ring-orange-600 transition">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co.com/0s3pdnc/avatar.png"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-4 z-50">
                    <div className="px-6 py-4 border-b border-gray-200 text-center">
                      <p className="font-bold text-lg text-gray-800">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-6 py-3 hover:bg-orange-50 transition rounded-lg mx-2"
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 transition rounded-lg mx-2"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Click outside to close */}
              {dropdownOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-orange-600 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary px-8 py-3 text-lg font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
