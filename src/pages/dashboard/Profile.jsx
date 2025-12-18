import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import  useAuth  from "../../hooks/useAuth";
import axiosSecure from "../../utils/axiosSecure";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const MyProfile = () => {
  useDocumentTitle("My Profile");
  const { user, userData } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleBeChef = async () => {
    const result = await Swal.fire({
      title: "Become a Chef?",
      text: "Your request will be sent to admin for approval",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      confirmButtonText: "Yes, apply!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setSubmitting(true);
      try {
        await axiosSecure.post("/requests", {
          userName: userData.name,
          userEmail: userData.email,
          requestType: "chef",
          requestStatus: "pending",
        });

        Swal.fire({
          icon: "success",
          title: "Request Submitted!",
          text: "Admin will review your request soon",
          confirmButtonColor: "#FF6B6B",
        });
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error("You already have a pending request");
        } else {
          toast.error("Failed to submit request");
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBeAdmin = async () => {
    const result = await Swal.fire({
      title: "Become an Admin?",
      text: "Your request will be sent to admin for approval",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      confirmButtonText: "Yes, apply!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setSubmitting(true);
      try {
        await axiosSecure.post("/requests", {
          userName: userData.name,
          userEmail: userData.email,
          requestType: "admin",
          requestStatus: "pending",
        });

        Swal.fire({
          icon: "success",
          title: "Request Submitted!",
          text: "Admin will review your request soon",
          confirmButtonColor: "#FF6B6B",
        });
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error("You already have a pending request");
        } else {
          toast.error("Failed to submit request");
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">My Profile</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-2xl"
      >
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={userData?.image || user?.photoURL}
            alt={userData?.name}
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="text-lg font-semibold">{userData?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-lg font-semibold">{userData?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
              <p className="text-lg font-semibold capitalize">
                <span
                  className={`px-3 py-1 rounded-full ${
                    userData?.role === "admin"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                      : userData?.role === "chef"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  }`}
                >
                  {userData?.role}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p className="text-lg font-semibold">
                <span
                  className={`px-3 py-1 rounded-full ${
                    userData?.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {userData?.status}
                </span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
            <p className="text-lg">{userData?.address}</p>
          </div>

          {userData?.role === "chef" && userData?.chefId && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Chef ID
              </p>
              <p className="text-lg font-semibold text-primary">
                {userData.chefId}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          {userData?.role !== "chef" && userData?.role !== "admin" && (
            <button
              onClick={handleBeChef}
              disabled={submitting}
              className="btn btn-primary flex-1 disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Become a Chef"}
            </button>
          )}
          {userData?.role !== "admin" && (
            <button
              onClick={handleBeAdmin}
              disabled={submitting}
              className="btn btn-outline flex-1 disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Become an Admin"}
            </button>
          )}
          {userData?.role === "admin" && (
            <p className="text-center w-full text-gray-600 dark:text-gray-400 italic">
              You have full admin access
            </p>
          )}
          {userData?.role === "chef" && userData?.role !== "admin" && (
            <button
              onClick={handleBeAdmin}
              disabled={submitting}
              className="btn btn-outline w-full disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Become an Admin"}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
