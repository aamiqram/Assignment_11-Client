import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";

const MyMeals = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedMeal, setSelectedMeal] = useState(null); // for modal

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
      Swal.fire("Deleted!", "Meal removed", "success");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      axiosSecure.put(`/meals/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["myMeals"]);
      setSelectedMeal(null); // close modal
      Swal.fire("Updated!", "Meal updated successfully", "success");
    },
  });

  const handleUpdate = (meal) => {
    setSelectedMeal(meal); // open modal with this meal
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">My Meals</h1>

      <div className="grid gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="card bg-base-100 shadow-xl">
            <div className="card-body flex-row gap-6">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-32 h-32 rounded object-cover"
              />
              <div className="flex-grow">
                <h2 className="card-title">{meal.foodName}</h2>
                <p>৳{meal.price}</p>
                <p className="text-sm text-gray-600">
                  {meal.ingredients.join(", ")}
                </p>
              </div>
              <div className="card-actions flex-col gap-2">
                <button
                  onClick={() => handleUpdate(meal)}
                  className="btn btn-warning btn-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Delete?",
                      text: "This cannot be undone",
                      icon: "warning",
                      showCancelButton: true,
                    }).then((result) => {
                      if (result.isConfirmed) deleteMutation.mutate(meal._id);
                    });
                  }}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {selectedMeal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-6">Update Meal</h3>
            <form onSubmit={handleSubmitUpdate} className="space-y-4">
              <input
                name="foodName"
                defaultValue={selectedMeal.foodName}
                className="input input-bordered w-full"
                required
              />
              <input
                name="price"
                type="number"
                defaultValue={selectedMeal.price}
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="ingredients"
                defaultValue={selectedMeal.ingredients.join(", ")}
                className="textarea textarea-bordered w-full"
                placeholder="Comma separated"
                required
              />
              <input
                name="estimatedDeliveryTime"
                defaultValue={selectedMeal.estimatedDeliveryTime}
                className="input input-bordered w-full"
                required
              />
              <input
                name="chefExperience"
                defaultValue={selectedMeal.chefExperience}
                className="input input-bordered w-full"
                required
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMeal(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyMeals;
