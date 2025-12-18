import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import Swal from "sweetalert2";

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
      Swal.fire("Success!", `Request has been ${status}`, "success");
    },
  });

  const handleApprove = (id, requestType, userEmail) => {
    Swal.fire({
      title: "Approve this request?",
      text: `This will make the user a ${requestType}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
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
    }).then((result) => {
      if (result.isConfirmed) {
        handleAction.mutate({ id, status: "rejected" });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">Manage Role Requests</h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Request Type</th>
                <th>Status</th>
                <th>Request Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.userName}</td>
                  <td>{req.userEmail}</td>
                  <td>
                    <span className="badge badge-primary">
                      {req.requestType}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        req.requestStatus === "pending"
                          ? "badge-warning"
                          : req.requestStatus === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {req.requestStatus}
                    </span>
                  </td>
                  <td>{new Date(req.requestTime).toLocaleString()}</td>
                  <td>
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
                          className="btn btn-success btn-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="btn btn-error btn-sm"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
