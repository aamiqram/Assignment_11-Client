import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axiosSecure from "../../../utils/axiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import {
  FiUpload,
  FiDollarSign,
  FiClock,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";
import { ChefHat } from "lucide-react";

const CreateMeal = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    data: userData,
    isLoading: userLoading,
    error,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (userLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading chef information...
          </p>
        </div>
      </div>
    );

  if (error || !userData?.chefId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 px-6">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
            <FiAlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
            Access Denied
          </h1>
          {userData?.status === "fraud" ? (
            <>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Your account has been marked as fraud.
              </p>
              <p className="text-neutral-500 dark:text-neutral-400">
                Fraudulent chefs are not allowed to create meals.
              </p>
            </>
          ) : (
            <p className="text-neutral-600 dark:text-neutral-300">
              You must be an approved chef to create meals.
            </p>
          )}
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    let foodImage =
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop";

    try {
      if (data.foodImage && data.foodImage[0]) {
        const formData = new FormData();
        formData.append("image", data.foodImage[0]);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (res.ok) {
          const imgData = await res.json();
          if (imgData?.data?.display_url) {
            foodImage = imgData.data.display_url;
          }
        }
      }

      const mealData = {
        foodName: data.foodName,
        chefName: user.displayName || "Chef",
        foodImage,
        price: parseFloat(data.price),
        rating: 0,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: userData.chefId,
        userEmail: user.email,
        deliveryArea: data.deliveryArea || "City-wide",
      };

      await axiosSecure.post("/meals", mealData);
      Swal.fire({
        title: "Success!",
        text: "Meal created successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating meal:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to create meal. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
            Create New Meal
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Share your culinary creations with the community
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Meal Name & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Meal Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <ChefHat className="w-5 h-5 text-neutral-400" />
                  </div>
                  <input
                    {...register("foodName", { required: true })}
                    placeholder="Delicious Pasta Alfredo"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Price
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FiDollarSign className="w-5 h-5 text-neutral-400" />
                  </div>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    placeholder="250"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Meal Image
              </label>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-full lg:w-64">
                  <label className="cursor-pointer">
                    <div className="w-full h-48 lg:h-64 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-300 group bg-neutral-50 dark:bg-neutral-800">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <>
                          <FiUpload className="w-12 h-12 text-neutral-400 group-hover:text-primary-500 mb-4" />
                          <span className="text-neutral-500 group-hover:text-primary-500">
                            Upload Image
                          </span>
                          <span className="text-xs text-neutral-400 mt-2">
                            JPG, PNG, GIF up to 5MB
                          </span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      {...register("foodImage")}
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setImagePreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Upload a high-quality photo of your meal. A good image helps
                    attract more customers. Recommended size: 800x600px. Max
                    file size: 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Ingredients
              </label>
              <textarea
                {...register("ingredients")}
                placeholder="Chicken, Rice, Vegetables, Spices (comma separated)"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors h-32"
              />
              <p className="text-sm text-neutral-500 mt-2">
                Separate each ingredient with a comma
              </p>
            </div>

            {/* Delivery & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Estimated Delivery Time
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FiClock className="w-5 h-5 text-neutral-400" />
                  </div>
                  <input
                    {...register("estimatedDeliveryTime")}
                    placeholder="30-45 minutes"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Your Experience
                </label>
                <input
                  {...register("chefExperience")}
                  placeholder="5 years of cooking experience"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                />
              </div>
            </div>

            {/* Delivery Area */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Delivery Area
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <FiPackage className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  {...register("deliveryArea")}
                  placeholder="City-wide delivery"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Create Meal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMeal;
