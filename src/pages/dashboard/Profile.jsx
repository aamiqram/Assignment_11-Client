import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useEffect } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../utils/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Mail,
  MapPin,
  User,
  Shield,
  ChefHat,
  Crown,
  Calendar,
  Award,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [role, roleLoading] = useRole();

  useEffect(() => {
    document.title = "LocalChefBazaar | My Profile";
  }, []);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRequest = async (type) => {
    const requestData = {
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.imageURL,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    await axiosSecure.post("/requests", requestData);
    Swal.fire({
      title: "Request Sent!",
      text: `Your ${type} request has been submitted for admin approval.`,
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  if (roleLoading || isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading profile...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage your account information and role requests
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-primary-500/20">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co.com/0s3pdnc/avatar.png"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-neutral-900 dark:text-white">
                    {user?.displayName || "User"}
                  </h2>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                    <div
                      className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 ${
                        role === "admin"
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          : role === "chef"
                          ? "bg-primary-500/10 text-primary-600 dark:text-primary-400"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {role === "admin" ? (
                        <Crown className="w-4 h-4" />
                      ) : role === "chef" ? (
                        <ChefHat className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      {role.toUpperCase()}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 ${
                        userData?.status === "active"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : userData?.status === "fraud"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      {userData?.status?.toUpperCase() || "ACTIVE"}
                    </div>
                  </div>

                  {/* User Details Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* Email */}
                      <div>
                        <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                          Email Address
                        </label>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-primary-500" />
                          <span className="font-medium text-neutral-900 dark:text-white truncate">
                            {user?.email}
                          </span>
                        </div>
                      </div>

                      {/* Address */}
                      {userData?.address && (
                        <div>
                          <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                            Address
                          </label>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {userData.address}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Chef ID */}
                      {userData?.chefId && (
                        <div>
                          <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                            Chef ID
                          </label>
                          <div className="flex items-center gap-3">
                            <ChefHat className="w-5 h-5 text-primary-500" />
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {userData.chefId}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Account Created */}
                      <div>
                        <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                          Account Created
                        </label>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary-500" />
                          <span className="font-medium text-neutral-900 dark:text-white">
                            {user?.metadata?.creationTime
                              ? new Date(
                                  user.metadata.creationTime
                                ).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Role Upgrade Requests */}
                  <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {role !== "chef" && role !== "admin" && (
                        <button
                          onClick={() => handleRequest("chef")}
                          className="w-full bg-white dark:bg-neutral-800 rounded-xl p-6 text-left hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-500 group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                              <ChefHat className="w-6 h-6 text-primary-500" />
                            </div>
                            <div>
                              <h4 className="font-bold mb-1 text-neutral-900 dark:text-white">
                                Become a Chef
                              </h4>
                              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                Start selling your homemade meals
                              </p>
                            </div>
                          </div>
                        </button>
                      )}
                      {role !== "admin" && (
                        <button
                          onClick={() => handleRequest("admin")}
                          className="w-full bg-white dark:bg-neutral-800 rounded-xl p-6 text-left hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                              <Crown className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                              <h4 className="font-bold mb-1 text-neutral-900 dark:text-white">
                                Become an Admin
                              </h4>
                              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                Help manage the platform
                              </p>
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold mb-4 text-neutral-900 dark:text-white">
                Account Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Verification
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium">
                    Verified
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Account Type
                  </span>
                  <span className="font-medium capitalize text-neutral-900 dark:text-white">
                    {role}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Status
                  </span>
                  <span
                    className={`font-medium ${
                      userData?.status === "active"
                        ? "text-green-600 dark:text-green-400"
                        : userData?.status === "fraud"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {userData?.status?.toUpperCase() || "ACTIVE"}
                  </span>
                </div>
              </div>
            </div>

            {/* Chef Stats */}
            {userData?.chefId && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold mb-4 text-neutral-900 dark:text-white">
                  Chef Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      Chef ID
                    </span>
                    <code className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg text-sm">
                      {userData.chefId}
                    </code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      Experience
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary-500" />
                      {userData.experience || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold mb-4 text-neutral-900 dark:text-white">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-neutral-700 dark:text-neutral-300">
                  Edit Profile
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-neutral-700 dark:text-neutral-300">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-neutral-700 dark:text-neutral-300">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
