import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { FiPackage, FiDollarSign, FiMapPin } from "react-icons/fi";
import { ChefHat } from "lucide-react";

const Order = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
    document.title = "LocalChefBazaar | Place Order";
  }, []);

  const quantity = watch("quantity") || 1;

  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      return res.data;
    },
  });

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (currentUser?.status === "fraud") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 px-6">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
            <ChefHat className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
            Access Restricted
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">
            Your account has been marked as fraud. You are not allowed to place
            orders.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const totalPrice = meal.price * data.quantity;

    const result = await Swal.fire({
      title: "Confirm Your Order?",
      text: `Your total price is ৳${totalPrice}. Do you want to confirm?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm!",
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      const orderData = {
        foodId: meal._id,
        mealName: meal.foodName,
        price: meal.price,
        quantity: parseInt(data.quantity),
        chefId: meal.chefId,
        userEmail: user.email,
        userAddress: data.userAddress,
      };

      await axiosSecure.post("/orders", orderData);
      Swal.fire({
        title: "Success!",
        text: "Order placed successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/dashboard/my-orders");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading meal details...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
            Confirm Your Order
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Review and confirm your delicious meal order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meal Preview Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <p className="text-2xl font-bold text-primary-600">
                  ৳{meal.price}
                </p>
                <p className="text-sm text-neutral-500">per plate</p>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                {meal.foodName}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <ChefHat className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Chef</p>
                    <p className="font-medium">{meal.chefName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FiPackage className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Experience</p>
                    <p className="font-medium">{meal.chefExperience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Meal Name
                  </label>
                  <input
                    value={meal.foodName}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Price per plate
                  </label>
                  <input
                    value={`৳${meal.price}`}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  {...register("quantity")}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Total Price
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiDollarSign className="w-5 h-5 text-primary-500" />
                  </div>
                  <input
                    value={`৳${meal.price * quantity}`}
                    readOnly
                    className="w-full px-12 py-4 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 text-2xl font-bold text-primary-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Your Email
                </label>
                <input
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4">
                    <FiMapPin className="w-5 h-5 text-neutral-400" />
                  </div>
                  <textarea
                    {...register("userAddress", { required: true })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                    placeholder="House, Road, Area, City"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
