import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import Swal from "sweetalert2";
import {
  FiUser,
  FiMail,
  FiShield,
  FiAlertTriangle,
  FiCheck,
  FiX,
} from "react-icons/fi";

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const makeFraud = useMutation({
    mutationFn: (email) => axiosSecure.patch(`/users/fraud/${email}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        title: "Success!",
        text: "User marked as fraud",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to update user",
        icon: "error",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
      case "chef":
        return "bg-primary-500/10 text-primary-600 dark:text-primary-400";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "fraud":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      default:
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            Manage Users
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            View and manage all platform users
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-neutral-700/50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                    User
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                    Role
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={
                              user.image ||
                              "https://i.ibb.co.com/0s3pdnc/avatar.png"
                            }
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">
                            {user.name || "N/A"}
                          </p>
                          {user.chefId && (
                            <p className="text-xs text-neutral-500">
                              Chef ID: {user.chefId}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FiMail className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-900 dark:text-white truncate max-w-[200px]">
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
                          user.role || "user"
                        )}`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          user.status || "active"
                        )}`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {user.role !== "admin" && user.status !== "fraud" ? (
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Mark as Fraud?",
                              text: "This user will be restricted from placing orders",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, mark as fraud",
                              confirmButtonColor: "#ef4444",
                              cancelButtonColor: "#6b7280",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                makeFraud.mutate(user.email);
                              }
                            });
                          }}
                          disabled={makeFraud.isPending}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <FiAlertTriangle className="w-4 h-4" />
                          {makeFraud.isPending ? "Processing..." : "Mark Fraud"}
                        </button>
                      ) : (
                        <span className="text-neutral-400 text-sm">
                          No actions available
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="border-t border-neutral-200 dark:border-neutral-700 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {users.length}
                </div>
                <div className="text-sm text-neutral-500">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {users.filter((u) => u.role === "chef").length}
                </div>
                <div className="text-sm text-neutral-500">Chefs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {users.filter((u) => u.role === "admin").length}
                </div>
                <div className="text-sm text-neutral-500">Admins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {users.filter((u) => u.status === "fraud").length}
                </div>
                <div className="text-sm text-neutral-500">Fraud Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
