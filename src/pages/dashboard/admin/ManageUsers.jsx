import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import Swal from "sweetalert2";

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
      Swal.fire("Success!", "User marked as fraud", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update user", "error");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="spinner"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-orange-600">
        Manage Users
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-orange-100">
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Status</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-orange-50 transition">
                <td>{u.name || "N/A"}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge badge-primary">
                    {u.role || "user"}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      u.status === "fraud" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {u.status || "active"}
                  </span>
                </td>
                <td>
                  {u.role !== "admin" && u.status !== "fraud" && (
                    <button
                      onClick={() => makeFraud.mutate(u.email)}
                      disabled={makeFraud.isPending}
                      className="btn btn-error btn-sm"
                    >
                      {makeFraud.isPending ? "..." : "Make Fraud"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
