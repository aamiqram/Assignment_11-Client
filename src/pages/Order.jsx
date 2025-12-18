import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Order = () => {
  const { id } = useParams(); // meal id
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

  const onSubmit = async (data) => {
    const totalPrice = meal.price * data.quantity;

    const result = await Swal.fire({
      title: "Confirm Order?",
      text: `Your total price is ৳${totalPrice}. Do you want to confirm?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm!",
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
      Swal.fire("Success!", "Order placed successfully!", "success");
      navigate("/dashboard/my-orders");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">
        Confirm Your Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full h-80 object-cover rounded-xl"
          />
          <div className="mt-6 space-y-2">
            <p className="text-2xl font-bold">{meal.foodName}</p>
            <p className="text-xl text-primary">৳{meal.price} per plate</p>
            <p>
              <strong>Chef:</strong> {meal.chefName} ({meal.chefId})
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="label">Meal Name</label>
                <input
                  value={meal.foodName}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Price per plate</label>
                <input
                  value={`৳${meal.price}`}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Quantity</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  {...register("quantity")}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Total Price</label>
                <input
                  value={`৳${meal.price * quantity}`}
                  readOnly
                  className="input input-bordered w-full font-bold text-xl text-primary"
                />
              </div>

              <div>
                <label className="label">Your Email</label>
                <input
                  value={user.email}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("userAddress", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="House, Road, Area, City"
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full">
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
