import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../utils/axiosSecure";
import useAuth from "../../hooks/useAuth";
import CheckoutForm from "../../components/payment/CheckoutForm";
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading your orders...
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
            My Orders
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track and manage all your orders in one place
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mx-auto mb-6">
              <FiPackage className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-3">
              No orders yet
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Start exploring delicious meals and place your first order!
            </p>
            <a
              href="/meals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
            >
              Browse Meals
            </a>
          </div>
        ) : (
          <div className="grid gap-6 max-w-6xl mx-auto">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                            {order.mealName}
                          </h2>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                              <FiPackage className="w-4 h-4 text-neutral-400" />
                              <span className="text-neutral-600 dark:text-neutral-400">
                                Quantity: {order.quantity}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiClock className="w-4 h-4 text-neutral-400" />
                              <span className="text-neutral-600 dark:text-neutral-400">
                                {new Date(order.orderTime).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary-600">
                            ৳{order.price * order.quantity}
                          </p>
                          <p className="text-sm text-neutral-500">
                            Total Amount
                          </p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-neutral-500">
                            Order Status:
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                              order.orderStatus === "accepted"
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : order.orderStatus === "pending"
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                : order.orderStatus === "delivered"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}
                          >
                            {order.orderStatus === "accepted" ? (
                              <FiCheckCircle className="w-4 h-4" />
                            ) : order.orderStatus === "pending" ? (
                              <FiClock className="w-4 h-4" />
                            ) : order.orderStatus === "delivered" ? (
                              <FiPackage className="w-4 h-4" />
                            ) : (
                              <FiXCircle className="w-4 h-4" />
                            )}
                            {order.orderStatus.charAt(0).toUpperCase() +
                              order.orderStatus.slice(1)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-neutral-500">
                            Payment:
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                              order.paymentStatus === "paid"
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}
                          >
                            {order.paymentStatus === "paid" ? (
                              <FiCheckCircle className="w-4 h-4" />
                            ) : (
                              <FiAlertCircle className="w-4 h-4" />
                            )}
                            {order.paymentStatus.charAt(0).toUpperCase() +
                              order.paymentStatus.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-neutral-500 mb-1">
                            Chef ID
                          </p>
                          <p className="font-medium text-neutral-900 dark:text-white">
                            {order.chefId}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 mb-1">
                            Delivery Address
                          </p>
                          <p className="font-medium text-neutral-900 dark:text-white">
                            {order.userAddress}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Section */}
                    {order.orderStatus === "accepted" &&
                      order.paymentStatus === "Pending" && (
                        <div className="lg:w-96 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-700 pt-6 lg:pt-0 lg:pl-8">
                          <h3 className="font-bold mb-4 text-neutral-900 dark:text-white">
                            Complete Payment
                          </h3>
                          <CheckoutForm
                            order={order}
                            onSuccess={handlePaymentSuccess}
                          />
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
