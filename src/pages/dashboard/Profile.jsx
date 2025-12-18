import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useEffect } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../utils/axiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();

  useEffect(() => {
    document.title = "LocalChefBazaar | My Profile";
  }, []);

  const handleRequest = async (type) => {
    const requestData = {
      userName: user.displayName,
      userEmail: user.email,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    await axiosSecure.post("/requests", requestData);
    Swal.fire(
      "Request Sent!",
      `Your ${type} request has been submitted.`,
      "info"
    );
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">My Profile</h1>

      <div className="card bg-base-100 shadow-xl max-w-2xl">
        <div className="card-body items-center text-center">
          <img
            src={user.photoURL || "https://i.ibb.co.com/avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-6"
          />
          <h2 className="text-3xl font-bold">{user.displayName || "User"}</h2>
          <p className="text-xl">{user.email}</p>
          <div className="badge badge-primary badge-lg mt-4">
            {role.toUpperCase()}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 w-full">
            {role !== "chef" && role !== "admin" && (
              <button
                onClick={() => handleRequest("chef")}
                className="btn btn-outline btn-secondary"
              >
                Be a Chef
              </button>
            )}
            {role !== "admin" && (
              <button
                onClick={() => handleRequest("admin")}
                className="btn btn-outline btn-accent"
              >
                Be an Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
