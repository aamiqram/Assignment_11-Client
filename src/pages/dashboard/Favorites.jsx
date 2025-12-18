import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../utils/axiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (favId) => axiosSecure.delete(`/favorites/${favId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
      Swal.fire("Removed!", "Meal removed from favorites", "success");
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">Favorite Meals</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          No favorite meals yet. Explore and add some!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Meal Name</th>
                <th>Chef</th>
                <th>Price</th>
                <th>Added On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((fav) => (
                <tr key={fav._id}>
                  <td>
                    <Link
                      to={`/meal/${fav.mealId}`}
                      className="link link-primary"
                    >
                      {fav.mealName}
                    </Link>
                  </td>
                  <td>
                    {fav.chefName} ({fav.chefId})
                  </td>
                  <td>৳{fav.price}</td>
                  <td>{new Date(fav.addedTime).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Remove from favorites?",
                          icon: "question",
                          showCancelButton: true,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteMutation.mutate(fav._id);
                          }
                        });
                      }}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Favorites;
