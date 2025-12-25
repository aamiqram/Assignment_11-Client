import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import Swal from "sweetalert2";
import {
  FiUser,
  FiMail,
  FiClock,
  FiCheck,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";

const ManageRequests = () => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  const handleAction = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/requests/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
      Swal.fire({
        title: "Success!",
        text: `Request has been ${status}`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleApprove = (id, requestType, userEmail) => {
    Swal.fire({
      title: "Approve this request?",
      text: `This will make the user a ${requestType}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAction.mutate({ id, status: "approved" });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAction.mutate({ id, status: "rejected" });
      }
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading requests...
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
            Manage Role Requests
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Approve or reject user role upgrade requests
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-3">
              No pending requests
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              All role requests have been processed. Check back later for new
              requests.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-700/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      User Details
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      Request Type
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      Request Time
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr
                      key={req._id}
                      className="border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img
                              src={
                                req.image ||
                                "https://i.ibb.co.com/0s3pdnc/avatar.png"
                              }
                              alt={req.userName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://i.ibb.co.com/0s3pdnc/avatar.png";
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-white">
                              {req.userName}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-neutral-500">
                              <FiMail className="w-3 h-3" />
                              {req.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            req.requestType === "chef"
                              ? "bg-primary-500/10 text-primary-600 dark:text-primary-400"
                              : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          }`}
                        >
                          {req.requestType}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${
                            req.requestStatus === "pending"
                              ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                              : req.requestStatus === "approved"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {req.requestStatus === "pending" && (
                            <FiAlertCircle className="w-3 h-3" />
                          )}
                          {req.requestStatus === "approved" && (
                            <FiCheck className="w-3 h-3" />
                          )}
                          {req.requestStatus === "rejected" && (
                            <FiX className="w-3 h-3" />
                          )}
                          {req.requestStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                          <FiClock className="w-4 h-4" />
                          {new Date(req.requestTime).toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {req.requestStatus === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleApprove(
                                  req._id,
                                  req.requestType,
                                  req.userEmail
                                )
                              }
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors"
                            >
                              <FiCheck className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(req._id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                              <FiX className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-neutral-400 text-sm">
                            Processed
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
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {
                      requests.filter((r) => r.requestStatus === "pending")
                        .length
                    }
                  </div>
                  <div className="text-sm text-neutral-500">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      requests.filter((r) => r.requestStatus === "approved")
                        .length
                    }
                  </div>
                  <div className="text-sm text-neutral-500">Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {
                      requests.filter((r) => r.requestStatus === "rejected")
                        .length
                    }
                  </div>
                  <div className="text-sm text-neutral-500">Rejected</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRequests;
