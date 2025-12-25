import { Link } from "react-router-dom";
import { Home, Search, ChefHat, ArrowLeft, Compass } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "LocalChefBazaar | Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-900 dark:to-neutral-800 px-4 py-12">
      <div className="text-center max-w-2xl">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-primary-500/10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <ChefHat className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
                Page Not Found
              </h1>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-white mb-6">
          Oops! Something's missing...
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Don't
          worry, we've got plenty of delicious meals waiting for you!
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for meals, chefs, or categories..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            to="/meals"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
          >
            <Compass className="w-5 h-5" />
            Browse Meals
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">
            Quick Links
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/"
              className="text-primary-600 dark:text-primary-500 hover:underline text-sm"
            >
              Home
            </Link>
            <Link
              to="/meals"
              className="text-primary-600 dark:text-primary-500 hover:underline text-sm"
            >
              All Meals
            </Link>
            <Link
              to="/dashboard"
              className="text-primary-600 dark:text-primary-500 hover:underline text-sm"
            >
              Dashboard
            </Link>
            <Link
              to="/help"
              className="text-primary-600 dark:text-primary-500 hover:underline text-sm"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
