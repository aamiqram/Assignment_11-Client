import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/payment/CheckoutForm";

const MyOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user.email}`);
      return res.data;
    },
  });

  const handlePaymentSuccess = () => {
    queryClient.invalidateQueries(["myOrders"]);
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
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
                  <span
                    className={`badge ${
                      order.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>

                {/* Show Pay button only if accepted and not paid */}
                {order.orderStatus === "accepted" &&
                  order.paymentStatus === "Pending" && (
                    <div className="mt-6">
                      <h3 className="font-bold mb-4">Complete Payment</h3>
                      <Elements>
                        <CheckoutForm
                          order={order}
                          onSuccess={handlePaymentSuccess}
                        />
                      </Elements>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
