import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyMeals = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: meals = [] } = useQuery({
    queryKey: ["myMeals", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals?chefEmail=${user.email}`);
      return res.data.meals;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/meals/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myMeals"]);
      Swal.fire("Deleted!", "Meal removed", "success");
    },
  });

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">My Meals</h1>
      <div className="grid gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="card bg-base-100 shadow-xl">
            <div className="card-body flex-row">
              <img src={meal.foodImage} alt="" className="w-32 h-32 rounded" />
              <div className="flex-grow">
                <h2 className="card-title">{meal.foodName}</h2>
                <p>৳{meal.price}</p>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-warning">Update</button>
                <button
                  onClick={() => deleteMutation.mutate(meal._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMeals;
