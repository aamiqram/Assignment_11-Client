import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
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
      Swal.fire("Updated!", "User marked as fraud", "success");
    },
  });

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <span
                    className={`badge ${
                      u.status === "fraud" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td>
                  {u.role !== "admin" && u.status !== "fraud" && (
                    <button
                      onClick={() => makeFraud.mutate(u.email)}
                      className="btn btn-error btn-sm"
                    >
                      Make Fraud
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
