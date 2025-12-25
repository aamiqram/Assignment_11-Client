import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  FiStar,
  FiHeart,
  FiClock,
  FiMapPin,
  FiShoppingCart,
  FiCalendar,
} from "react-icons/fi";
import { ChefHat } from "lucide-react";

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("details");

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    document.title = "LocalChefBazaar | Meal Details";
  }, []);

  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      document.title = `LocalChefBazaar | ${res.data.foodName}`;
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async (review) => {
      await axiosSecure.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      queryClient.invalidateQueries({ queryKey: ["recentReviews"] });
      Swal.fire({
        title: "Success!",
        text: "Review submitted successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
    },
  });

  const addFavoriteMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/favorites", {
        userEmail: user.email,
        mealId: meal._id,
        mealName: meal.foodName,
        mealImage: meal.foodImage,
        chefId: meal.chefId,
        chefName: meal.chefName,
        
        price: meal.price,
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: "Added!",
        text: "Meal added to favorites",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Already Added",
        text: "This meal is already in your favorites",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const onSubmitReview = (data) => {
    const review = {
      foodId: id,
      reviewerName: user.displayName || "Anonymous",
      reviewerImage: user.photoURL || "https://i.ibb.co.com/0s3pdnc/avatar.png",
      rating: parseInt(data.rating),
      comment: data.comment,
    };
    addReviewMutation.mutate(review);
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

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings";

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image & Basic Info */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <p className="text-3xl font-bold text-primary-600">
                  ৳{meal.price}
                </p>
                <p className="text-sm text-neutral-500">per plate</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                  <FiStar className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-sm text-neutral-500">Rating</p>
                <p className="font-bold text-lg">{averageRating}</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
                  <FiClock className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-neutral-500">Delivery Time</p>
                <p className="font-bold text-lg">
                  {meal.estimatedDeliveryTime}
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
                  <ChefHat className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-sm text-neutral-500">Experience</p>
                <p className="font-bold text-lg">{meal.chefExperience}</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-2">
                  <FiMapPin className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-sm text-neutral-500">Delivery Area</p>
                <p className="font-bold text-lg truncate">
                  {meal.deliveryArea}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
                {meal.foodName}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={
                        meal.chefImage ||
                        "https://i.ibb.co.com/0s3pdnc/avatar.png"
                      }
                      alt={meal.chefName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{meal.chefName}</p>
                    <p className="text-sm text-neutral-500">
                      Chef ID: {meal.chefId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-neutral-200 dark:border-neutral-700">
              <nav className="flex gap-4">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-3 px-1 font-medium transition-colors ${
                    activeTab === "details"
                      ? "text-primary-600 border-b-2 border-primary-500"
                      : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`pb-3 px-1 font-medium transition-colors ${
                    activeTab === "ingredients"
                      ? "text-primary-600 border-b-2 border-primary-500"
                      : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-3 px-1 font-medium transition-colors ${
                    activeTab === "reviews"
                      ? "text-primary-600 border-b-2 border-primary-500"
                      : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="pt-4">
              {activeTab === "details" && (
                <div className="space-y-4">
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    This delicious homemade meal is prepared with care by Chef{" "}
                    {meal.chefName}
                    who has {meal.chefExperience} of culinary experience.
                    Perfect for {meal.category || "any occasion"}.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Available: {meal.availability || "Daily"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiMapPin className="w-5 h-5 text-neutral-400" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Delivery Area: {meal.deliveryArea}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div className="space-y-4">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Fresh ingredients used in this meal:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                      >
                        {ingredient.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    What people are saying about this meal:
                  </p>
                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.slice(0, 3).map((review) => (
                        <div
                          key={review._id}
                          className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-sm"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={review.reviewerImage}
                              alt={review.reviewerName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium">
                                {review.reviewerName}
                              </p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-neutral-300 dark:text-neutral-600"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-500 text-center py-8">
                      No reviews yet. Be the first to review!
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => addFavoriteMutation.mutate()}
                disabled={addFavoriteMutation.isPending}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                <FiHeart className="w-5 h-5" />
                {addFavoriteMutation.isPending
                  ? "Adding..."
                  : "Add to Favorites"}
              </button>
              <Link
                to={`/order/${id}`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FiShoppingCart className="w-5 h-5" />
                Order Now
              </Link>
            </div>

            {/* Add Review Form */}
            {user && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm mt-8">
                <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
                <form
                  onSubmit={handleSubmit(onSubmitReview)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      {...register("rating", { required: true })}
                      className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                    >
                      <option value="">Select Rating</option>
                      {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>
                          {num} Star{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    {...register("comment", { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                    placeholder="Share your experience..."
                    rows="3"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={addReviewMutation.isPending}
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                  >
                    {addReviewMutation.isPending
                      ? "Submitting..."
                      : "Submit Review"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
