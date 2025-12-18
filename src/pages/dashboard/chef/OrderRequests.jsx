import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import useAuth from "../../../hooks/useAuth";

const OrderRequests = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user data to get chefId
  const { data: userData } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch orders only if chefId exists
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["chefOrders", userData?.chefId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/chef/${userData.chefId}`);
      return res.data;
    },
    enabled: !!userData?.chefId,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/orders/${id}`, { orderStatus: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chefOrders"] });
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">Order Requests</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{order.mealName}</h2>
              <p>Quantity: {order.quantity}</p>
              <p>Customer: {order.userEmail}</p>
              <p>Address: {order.userAddress}</p>
              <p>
                Status:{" "}
                <span className="badge badge-warning">{order.orderStatus}</span>
              </p>
              <div className="card-actions mt-4">
                <button
                  onClick={() =>
                    updateStatus.mutate({ id: order._id, status: "cancelled" })
                  }
                  disabled={order.orderStatus !== "pending"}
                  className="btn btn-error"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    updateStatus.mutate({ id: order._id, status: "accepted" })
                  }
                  disabled={order.orderStatus !== "pending"}
                  className="btn btn-warning"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    updateStatus.mutate({ id: order._id, status: "delivered" })
                  }
                  disabled={order.orderStatus !== "accepted"}
                  className="btn btn-success"
                >
                  Deliver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderRequests;
