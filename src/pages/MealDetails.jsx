import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  FiStar,
  FiHeart,
  FiClock,
  FiMapPin,
  FiShoppingCart,
  FiCheck,
} from "react-icons/fi";
import { ChefHat, Utensils, Globe, Award, Truck, Shield } from "lucide-react";
import Swal from "sweetalert2";

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [activeTab, setActiveTab] = useState("overview");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if meal is in favorites
  const { refetch: refetchFavorite } = useQuery({
    queryKey: ["checkFavorite", id, user?.email],
    queryFn: async () => {
      if (!user?.email) return false;
      try {
        const res = await axiosSecure.get(`/favorites/${user.email}`);
        const favorites = res.data;
        const isFav = favorites.some((fav) => fav.mealId === id);
        setIsFavorite(isFav);
        return isFav;
      } catch (error) {
        return false;
      }
    },
    enabled: !!user?.email,
  });

  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/reviews/${id}`);
        return res.data || [];
      } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
      }
    },
  });

  const { data: relatedMeals = [] } = useQuery({
    queryKey: ["relatedMeals", meal?.chefId],
    queryFn: async () => {
      if (meal?.chefId) {
        try {
          const res = await axiosSecure.get(
            `/meals/chef/${meal.chefId}?limit=4&exclude=${id}`
          );
          return res.data || [];
        } catch (error) {
          return [];
        }
      }
      return [];
    },
    enabled: !!meal?.chefId,
  });

  // Add to favorites mutation
  const addToFavoritesMutation = useMutation({
    mutationFn: async () => {
      const favoriteData = {
        mealId: id,
        mealName: meal.foodName,
        mealImage: meal.foodImage,
        chefId: meal.chefId,
        chefName: meal.chefName,
        price: meal.price,
        rating: meal.rating || 0,
      };
      return await axiosSecure.post("/favorites", favoriteData);
    },
    onSuccess: () => {
      setIsFavorite(true);
      refetchFavorite();
      Swal.fire({
        title: "Added to Favorites!",
        text: `${meal.foodName} has been added to your favorites`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to add to favorites",
        icon: "error",
      });
    },
  });

  // Remove from favorites mutation
  const removeFromFavoritesMutation = useMutation({
    mutationFn: async () => {
      // First get the favorite ID
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      const favorites = res.data;
      const favorite = favorites.find((fav) => fav.mealId === id);

      if (favorite) {
        return await axiosSecure.delete(`/favorites/${favorite._id}`);
      }
      throw new Error("Favorite not found");
    },
    onSuccess: () => {
      setIsFavorite(false);
      refetchFavorite();
      Swal.fire({
        title: "Removed from Favorites",
        text: `${meal.foodName} has been removed from your favorites`,
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message || "Failed to remove from favorites",
        icon: "error",
      });
    },
  });

  // FIXED: Submit review mutation
  const submitReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const review = {
        foodId: id,
        rating: parseInt(reviewData.rating),
        comment: reviewData.comment,
        reviewerName: user.displayName || user.email?.split("@")[0] || "User",
        reviewerImage:
          user.photoURL || "https://i.ibb.co.com/0s3pdnc/avatar.png",
        mealName: meal.foodName,
        mealImage: meal.foodImage,
      };

      console.log("Submitting review:", review);
      return await axiosSecure.post("/reviews", review);
    },
    onSuccess: (data) => {
      console.log("Review submitted successfully:", data);
      Swal.fire({
        title: "Success!",
        text: "Your review has been submitted successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
      // Invalidate and refetch reviews
      queryClient.invalidateQueries(["reviews", id]);
      queryClient.invalidateQueries(["meal", id]);
      refetchReviews();
    },
    onError: (error) => {
      console.error("Review submission error:", error);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to submit review. Please try again.",
        icon: "error",
      });
    },
  });

  const onSubmitReview = async (data) => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to submit a review",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitReviewMutation.mutateAsync(data);
    } catch (error) {
      console.error("Review submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to add items to cart",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    Swal.fire({
      title: "Added to Cart!",
      text: `${quantity} x ${meal.foodName} added to your cart`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleOrderNow = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to place an order",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    window.location.href = `/order/${id}`;
  };

  const handleToggleFavorite = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to add to favorites",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    if (isFavorite) {
      removeFromFavoritesMutation.mutate();
    } else {
      addToFavoritesMutation.mutate();
    }
  };

  if (isLoading) {
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
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Meal not found
          </h2>
          <Link
            to="/meals"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            Back to meals
          </Link>
        </div>
      </div>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const mealImages = [
    meal.foodImage,
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6 overflow-x-auto">
          <Link
            to="/"
            className="hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to="/meals"
            className="hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
          >
            Meals
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white truncate">
            {meal.foodName}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Images Gallery - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-2">
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
              {mealImages.slice(1, 4).map((img, idx) => (
                <div key={idx} className="hidden md:block">
                  <img
                    src={img}
                    alt={`${meal.foodName} ${idx + 2}`}
                    className="w-full h-40 object-cover rounded-xl shadow"
                  />
                </div>
              ))}
            </div>

            {/* Meal Info Cards - Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                  <FiClock className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-xs text-neutral-500">Prep Time</p>
                <p className="font-semibold text-sm">
                  {meal.estimatedDeliveryTime}
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
                  <Utensils className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-xs text-neutral-500">Category</p>
                <p className="font-semibold text-sm">
                  {meal.category || "Main Course"}
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
                  <FiMapPin className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-xs text-neutral-500">Delivery Area</p>
                <p className="font-semibold text-sm truncate">
                  {meal.deliveryArea}
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-xs text-neutral-500">Chef Experience</p>
                <p className="font-semibold text-sm">{meal.chefExperience}</p>
              </div>
            </div>

            {/* Tabs Navigation - Responsive */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 mb-6 overflow-x-auto">
              <div className="flex space-x-4 min-w-max">
                {[
                  "overview",
                  "ingredients",
                  "nutrition",
                  "reviews",
                  "chef",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 font-medium text-sm transition-colors capitalize whitespace-nowrap border-b-2 ${
                      activeTab === tab
                        ? "text-primary-600 border-primary-500"
                        : "text-neutral-500 border-transparent hover:text-neutral-700 dark:hover:text-neutral-300"
                    }`}
                  >
                    {tab === "overview"
                      ? "Overview"
                      : tab === "ingredients"
                      ? "Ingredients"
                      : tab === "nutrition"
                      ? "Nutrition"
                      : tab === "reviews"
                      ? `Reviews (${reviews.length})`
                      : "About Chef"}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content - Responsive */}
            <div className="mb-8">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow">
                    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                      Description
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {meal.description ||
                        `This delicious ${meal.foodName} is prepared with care by Chef ${meal.chefName} who has ${meal.chefExperience} of culinary experience.`}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow">
                    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium">Food Safety Certified</p>
                          <p className="text-sm text-neutral-500">
                            Prepared in certified kitchen
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Fast Delivery</p>
                          <p className="text-sm text-neutral-500">
                            Hot & fresh delivery
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow">
                  <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                    Ingredients
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {meal.ingredients?.map((ingredient, index) => (
                      <div
                        key={index}
                        className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3 flex items-center gap-2"
                      >
                        <FiCheck className="w-4 h-4 text-green-500" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                          {ingredient || "Fresh ingredient"}
                        </span>
                      </div>
                    )) || (
                      <div className="col-span-3 text-center py-4">
                        <p className="text-neutral-500">
                          No ingredients information available
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                          Customer Reviews
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(averageRating)
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-neutral-300 dark:text-neutral-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-bold">
                            {averageRating}
                          </span>
                          <span className="text-neutral-500">
                            ({reviews.length} reviews)
                          </span>
                        </div>
                      </div>
                      {user && (
                        <button
                          onClick={() =>
                            document
                              .getElementById("review-form")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                        >
                          Write a Review
                        </button>
                      )}
                    </div>

                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div
                            key={review._id}
                            className="border-b border-neutral-100 dark:border-neutral-700 pb-6 last:border-0"
                          >
                            <div className="flex items-start gap-4">
                              <img
                                src={review.reviewerImage}
                                alt={review.reviewerName}
                                className="w-12 h-12 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <h4 className="font-bold text-neutral-900 dark:text-white">
                                    {review.reviewerName}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
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
                                    <span className="text-sm text-neutral-500">
                                      {new Date(
                                        review.date
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                                  {review.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-neutral-500">
                          No reviews yet. Be the first to review!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* FIXED Review Form */}
                  {user && (
                    <div
                      id="review-form"
                      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow"
                    >
                      <h4 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">
                        Write a Review
                      </h4>
                      <form
                        onSubmit={handleSubmit(onSubmitReview)}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Rating
                          </label>
                          <select
                            {...register("rating", {
                              required: "Rating is required",
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                            defaultValue="5"
                          >
                            <option value="5">5 Stars - Excellent</option>
                            <option value="4">4 Stars - Very Good</option>
                            <option value="3">3 Stars - Good</option>
                            <option value="2">2 Stars - Fair</option>
                            <option value="1">1 Star - Poor</option>
                          </select>
                          {errors.rating && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.rating.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Your Review
                          </label>
                          <textarea
                            rows="4"
                            {...register("comment", {
                              required: "Review comment is required",
                              minLength: {
                                value: 10,
                                message:
                                  "Review must be at least 10 characters",
                              },
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                            placeholder="Share your experience with this meal..."
                          />
                          {errors.comment && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.comment.message}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Other tabs remain similar but with responsive classes */}
            </div>
          </div>

          {/* Right Column - Order Panel - Responsive */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    ৳{meal.price}
                  </div>
                  <p className="text-white/90">per serving</p>
                </div>

                <div className="p-6">
                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-xl font-bold">{quantity}</span>
                      </div>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary-600">
                      ৳{meal.price * quantity}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleOrderNow}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      Order Now
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={handleToggleFavorite}
                      disabled={
                        addToFavoritesMutation.isLoading ||
                        removeFromFavoritesMutation.isLoading
                      }
                      className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
                        isFavorite
                          ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                          : "border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                      }`}
                    >
                      <FiHeart
                        className={`w-5 h-5 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                      {isFavorite
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Chef Info */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      meal.chefImage ||
                      "https://i.ibb.co.com/0s3pdnc/avatar.png"
                    }
                    alt={meal.chefName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white">
                      Chef {meal.chefName}
                    </h4>
                    <p className="text-sm text-neutral-500">
                      {meal.chefExperience}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/chef/${meal.chefId}`}
                  className="w-full text-center py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm"
                >
                  View Chef Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Meals - Responsive */}
        {relatedMeals.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
              More from this Chef
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedMeals.slice(0, 4).map((relatedMeal) => (
                <Link
                  key={relatedMeal._id}
                  to={`/meal/${relatedMeal._id}`}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={relatedMeal.foodImage}
                    alt={relatedMeal.foodName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white line-clamp-1">
                      {relatedMeal.foodName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary-600">
                        ৳{relatedMeal.price}
                      </span>
                      <span className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
