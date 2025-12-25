import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  FiEdit,
  FiTrash2,
  FiDollarSign,
  FiClock,
  FiPlus,
} from "react-icons/fi";

const MyMeals = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedMeal, setSelectedMeal] = useState(null);

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["myMeals", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals?chefEmail=${user.email}`);
      return res.data.meals || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/meals/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myMeals"]);
      Swal.fire({
        title: "Deleted!",
        text: "Meal removed successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      axiosSecure.put(`/meals/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["myMeals"]);
      setSelectedMeal(null);
      Swal.fire({
        title: "Updated!",
        text: "Meal updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleUpdate = (meal) => {
    setSelectedMeal(meal);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      foodName: formData.get("foodName"),
      price: parseFloat(formData.get("price")),
      ingredients: formData
        .get("ingredients")
        .split(",")
        .map((i) => i.trim()),
      estimatedDeliveryTime: formData.get("estimatedDeliveryTime"),
      chefExperience: formData.get("chefExperience"),
    };

    updateMutation.mutate({ id: selectedMeal._id, updatedData });
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading your meals...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              My Meals
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manage and update your homemade meals
            </p>
          </div>
          <a
            href="/dashboard/create-meal"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
          >
            <FiPlus className="w-5 h-5" />
            Add New Meal
          </a>
        </div>

        {meals.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mx-auto mb-6">
              <FiPlus className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-3">
              No meals yet
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Start creating your first meal to share with the community!
            </p>
            <a
              href="/dashboard/create-meal"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
            >
              Create Your First Meal
            </a>
          </div>
        ) : (
          <div className="grid gap-6 max-w-6xl mx-auto">
            {meals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Meal Image */}
                  <div className="md:w-64 flex-shrink-0">
                    <img
                      src={meal.foodImage}
                      alt={meal.foodName}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>

                  {/* Meal Info */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                          {meal.foodName}
                        </h2>
                        <div className="flex items-center gap-4 flex-wrap mb-4">
                          <div className="flex items-center gap-2">
                            <FiDollarSign className="w-4 h-4 text-primary-500" />
                            <span className="text-2xl font-bold text-primary-600">
                              ৳{meal.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiClock className="w-4 h-4 text-neutral-400" />
                            <span className="text-neutral-600 dark:text-neutral-400">
                              {meal.estimatedDeliveryTime}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {meal.ingredients
                            .slice(0, 3)
                            .map((ingredient, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-primary-500/10 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                              >
                                {ingredient}
                              </span>
                            ))}
                          {meal.ingredients.length > 3 && (
                            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-full text-sm">
                              +{meal.ingredients.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdate(meal)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary-500 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                        >
                          <FiEdit className="w-4 h-4" />
                          Update
                        </button>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Delete this meal?",
                              text: "This action cannot be undone",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, delete it",
                              confirmButtonColor: "#ef4444",
                              cancelButtonColor: "#6b7280",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteMutation.mutate(meal._id);
                              }
                            });
                          }}
                          disabled={deleteMutation.isPending}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-500">Experience</p>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {meal.chefExperience}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500">Rating</p>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {meal.rating || "No ratings yet"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Update Modal */}
        {selectedMeal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Update Meal
                  </h3>
                  <button
                    onClick={() => setSelectedMeal(null)}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleSubmitUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Meal Name
                      </label>
                      <input
                        name="foodName"
                        defaultValue={selectedMeal.foodName}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Price
                      </label>
                      <input
                        name="price"
                        type="number"
                        defaultValue={selectedMeal.price}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Ingredients (comma separated)
                    </label>
                    <textarea
                      name="ingredients"
                      defaultValue={selectedMeal.ingredients.join(", ")}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors h-32"
                      placeholder="Chicken, Rice, Vegetables, Spices"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Estimated Delivery Time
                      </label>
                      <input
                        name="estimatedDeliveryTime"
                        defaultValue={selectedMeal.estimatedDeliveryTime}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Chef Experience
                      </label>
                      <input
                        name="chefExperience"
                        defaultValue={selectedMeal.chefExperience}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <button
                      type="button"
                      onClick={() => setSelectedMeal(null)}
                      className="px-6 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updateMutation.isPending}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                    >
                      {updateMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMeals;
