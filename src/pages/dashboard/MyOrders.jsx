import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../utils/axiosSecure";
import useAuth from "../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();

  const { data: orders = [] } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{order.mealName}</h2>
                <p>Quantity: {order.quantity}</p>
                <p>Total: ৳{order.price * order.quantity}</p>
                <p>
                  Status:{" "}
                  <span className="badge badge-warning">
                    {order.orderStatus}
                  </span>
                </p>
                <p>
                  Payment:{" "}
                  <span className="badge badge-error">
                    {order.paymentStatus}
                  </span>
                </p>
                <p>Address: {order.userAddress}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
