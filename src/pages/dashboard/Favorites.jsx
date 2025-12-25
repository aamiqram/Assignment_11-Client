import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../utils/axiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FiHeart, FiTrash2, FiDollarSign, FiCalendar } from "react-icons/fi";
import { ChefHat } from "lucide-react";

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
      Swal.fire({
        title: "Removed!",
        text: "Meal removed from favorites",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading favorites...
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
            Favorite Meals
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Your saved meals for quick access
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mx-auto mb-6">
              <FiHeart className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-3">
              No favorites yet
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Explore our meals and add your favorites for quick access later!
            </p>
            <a
              href="/meals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
            >
              Browse Meals
            </a>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      Meal Details
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      Chef
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      Price
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      Added On
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {favorites.map((fav) => (
                    <tr
                      key={fav._id}
                      className="border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <Link
                          to={`/meal/${fav.mealId}`}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={
                                fav.mealImage ||
                                "https://i.ibb.co.com/placeholder.jpg"
                              }
                              alt={fav.mealName}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-500 transition-colors">
                              {fav.mealName}
                            </p>
                            <p className="text-sm text-neutral-500">
                              View Details
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center">
                            <ChefHat className="w-5 h-5 text-primary-500" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-white">
                              {fav.chefName}
                            </p>
                            <p className="text-sm text-neutral-500">
                              ID: {fav.chefId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FiDollarSign className="w-5 h-5 text-primary-500" />
                          <span className="font-bold text-xl text-primary-600">
                            ৳{fav.price}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4 text-neutral-400" />
                          <span className="text-neutral-600 dark:text-neutral-400">
                            {new Date(fav.addedTime).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/order/${fav.mealId}`}
                            className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors text-sm"
                          >
                            Order
                          </Link>
                          <button
                            onClick={() => {
                              Swal.fire({
                                title: "Remove from favorites?",
                                text: "This meal will be removed from your favorites",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Yes, remove",
                                confirmButtonColor: "#ef4444",
                                cancelButtonColor: "#6b7280",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteMutation.mutate(fav._id);
                                }
                              });
                            }}
                            disabled={deleteMutation.isPending}
                            className="p-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
