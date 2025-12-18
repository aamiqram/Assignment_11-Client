import { Link } from "react-router-dom";
import { FaHome, FaListAlt } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-base-content/60 mb-8 max-w-md mx-auto">
          The page you requested does not exist. Use the navigation to return
          home.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline px-6 py-3 flex items-center gap-2"
          >
            <ArrowLeft />
            Go Back
          </button>
          <Link to="/" className="btn btn-primary gap-2">
            <FaHome />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
