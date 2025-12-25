import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FiPackage,
  FiCheck,
  FiX,
  FiTruck,
  FiUser,
  FiMapPin,
} from "react-icons/fi";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading order requests...
          </p>
        </div>
      </div>
    );

  const statusConfig = {
    pending: {
      icon: FiPackage,
      color:
        "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
      label: "Pending",
    },
    accepted: {
      icon: FiCheck,
      color:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      label: "Accepted",
    },
    preparing: {
      icon: FiPackage,
      color:
        "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      label: "Preparing",
    },
    delivered: {
      icon: FiTruck,
      color:
        "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
      label: "Delivered",
    },
    cancelled: {
      icon: FiX,
      color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      label: "Cancelled",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            Order Requests
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage incoming orders from customers
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
              Your customers will appear here once they start ordering your
              meals.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 max-w-6xl mx-auto">
            {orders.map((order) => {
              const status =
                statusConfig[order.orderStatus] || statusConfig.pending;
              const StatusIcon = status.icon;

              return (
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
                                <span className="text-2xl font-bold text-primary-600">
                                  ৳{order.price * order.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`px-4 py-2 rounded-full border ${status.color} flex items-center gap-2`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            {status.label}
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <FiUser className="w-6 h-6 text-blue-500" />
                              </div>
                              <div>
                                <p className="font-medium text-neutral-900 dark:text-white">
                                  Customer
                                </p>
                                <p className="text-sm text-neutral-500">
                                  {order.userEmail}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <FiMapPin className="w-6 h-6 text-green-500" />
                              </div>
                              <div>
                                <p className="font-medium text-neutral-900 dark:text-white">
                                  Delivery Address
                                </p>
                                <p className="text-sm text-neutral-500">
                                  {order.userAddress}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Time */}
                        <div className="text-sm text-neutral-500">
                          Order placed:{" "}
                          {new Date(order.orderTime).toLocaleString()}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-700 pt-6 lg:pt-0 lg:pl-8">
                        <h3 className="font-bold mb-4 text-neutral-900 dark:text-white">
                          Update Status
                        </h3>
                        <div className="space-y-3">
                          <button
                            onClick={() =>
                              updateStatus.mutate({
                                id: order._id,
                                status: "cancelled",
                              })
                            }
                            disabled={order.orderStatus !== "pending"}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                              order.orderStatus !== "pending"
                                ? "opacity-50 cursor-not-allowed bg-neutral-100 dark:bg-neutral-700 text-neutral-400"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                          >
                            <FiX className="w-4 h-4" />
                            Cancel Order
                          </button>
                          <button
                            onClick={() =>
                              updateStatus.mutate({
                                id: order._id,
                                status: "accepted",
                              })
                            }
                            disabled={order.orderStatus !== "pending"}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                              order.orderStatus !== "pending"
                                ? "opacity-50 cursor-not-allowed bg-neutral-100 dark:bg-neutral-700 text-neutral-400"
                                : "bg-yellow-500 text-white hover:bg-yellow-600"
                            }`}
                          >
                            <FiCheck className="w-4 h-4" />
                            Accept Order
                          </button>
                          <button
                            onClick={() =>
                              updateStatus.mutate({
                                id: order._id,
                                status: "delivered",
                              })
                            }
                            disabled={order.orderStatus !== "accepted"}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                              order.orderStatus !== "accepted"
                                ? "opacity-50 cursor-not-allowed bg-neutral-100 dark:bg-neutral-700 text-neutral-400"
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                          >
                            <FiTruck className="w-4 h-4" />
                            Mark as Delivered
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderRequests;
