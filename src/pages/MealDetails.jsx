import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  FiStar,
  FiHeart,
  FiClock,
  FiMapPin,
  FiShoppingCart,
  FiCalendar,
  FiUser,
  FiPackage,
  FiCheck,
} from "react-icons/fi";
import { ChefHat, Utensils, Globe, Award, Truck, Shield } from "lucide-react";
import Swal from "sweetalert2";

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [activeTab, setActiveTab] = useState("overview");
  const [quantity, setQuantity] = useState(1);

  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
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

  const { data: relatedMeals = [] } = useQuery({
    queryKey: ["relatedMeals", meal?.chefId],
    queryFn: async () => {
      if (meal?.chefId) {
        const res = await axiosSecure.get(
          `/meals/chef/${meal.chefId}?limit=4&exclude=${id}`
        );
        return res.data.meals || [];
      }
      return [];
    },
    enabled: !!meal?.chefId,
  });

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

  // Multiple images for the meal
  const mealImages = [
    meal.foodImage,
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&auto=format&fit=crop",
  ];

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

    // Add to cart logic here
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8">
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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Basic Info */}
          <div className="lg:col-span-2">
            {/* Images Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="md:col-span-2">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={mealImages[0]}
                    alt={meal.foodName}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </div>
              {mealImages.slice(1).map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={img}
                    alt={`${meal.foodName} ${idx + 2}`}
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Meal Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                  <FiClock className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-sm text-neutral-500">Prep Time</p>
                <p className="font-bold">{meal.estimatedDeliveryTime}</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
                  <Utensils className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-neutral-500">Category</p>
                <p className="font-bold">{meal.category || "Main Course"}</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
                  <FiMapPin className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-sm text-neutral-500">Delivery Area</p>
                <p className="font-bold truncate">{meal.deliveryArea}</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-sm text-neutral-500">Chef Experience</p>
                <p className="font-bold">{meal.chefExperience}</p>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 mb-8">
              <nav className="flex gap-8 overflow-x-auto">
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
                    className={`pb-4 font-medium transition-colors capitalize whitespace-nowrap ${
                      activeTab === tab
                        ? "text-primary-600 border-b-2 border-primary-500"
                        : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
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
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                      Description
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {meal.description ||
                        `This delicious ${
                          meal.foodName
                        } is prepared with care by Chef ${
                          meal.chefName
                        } who has ${
                          meal.chefExperience
                        } of culinary experience. Each ingredient is carefully selected for freshness and quality, ensuring a memorable dining experience. Perfect for ${
                          meal.category || "any occasion"
                        }.`}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
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
                      <div className="flex items-center gap-3">
                        <FiCheck className="w-5 h-5 text-primary-500" />
                        <div>
                          <p className="font-medium">Fresh Ingredients</p>
                          <p className="text-sm text-neutral-500">
                            Locally sourced produce
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Cuisine Type</p>
                          <p className="text-sm text-neutral-500">
                            {meal.cuisine || "Bangladeshi"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                    Ingredients
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Fresh ingredients used in this meal:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {meal.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3 flex items-center gap-2"
                      >
                        <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {ingredient.trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "nutrition" && (
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white">
                    Nutritional Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        350
                      </div>
                      <div className="text-sm text-neutral-500">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        25g
                      </div>
                      <div className="text-sm text-neutral-500">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        12g
                      </div>
                      <div className="text-sm text-neutral-500">Fat</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        45g
                      </div>
                      <div className="text-sm text-neutral-500">Carbs</div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-neutral-500">
                    * Nutritional values are approximate and may vary based on
                    specific ingredients used.
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                          Customer Reviews
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2">
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
                          </div>
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
                            className="border-b border-neutral-100 dark:border-neutral-700 pb-6 last:border-0 last:pb-0"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <img
                                src={review.reviewerImage}
                                alt={review.reviewerName}
                                className="w-12 h-12 rounded-full"
                              />
                              <div>
                                <p className="font-bold text-neutral-900 dark:text-white">
                                  {review.reviewerName}
                                </p>
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
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
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

                  {/* Review Form */}
                  {user && (
                    <div
                      id="review-form"
                      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm"
                    >
                      <h4 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">
                        Write a Review
                      </h4>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Rating
                          </label>
                          <select className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white">
                            <option value="">Select Rating</option>
                            <option value="5">5 Stars - Excellent</option>
                            <option value="4">4 Stars - Very Good</option>
                            <option value="3">3 Stars - Good</option>
                            <option value="2">2 Stars - Fair</option>
                            <option value="1">1 Star - Poor</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Your Review
                          </label>
                          <textarea
                            rows="4"
                            className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                            placeholder="Share your experience with this meal..."
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                        >
                          Submit Review
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "chef" && (
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-6 mb-8">
                    <img
                      src={
                        meal.chefImage ||
                        "https://i.ibb.co.com/0s3pdnc/avatar.png"
                      }
                      alt={meal.chefName}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">
                        Chef {meal.chefName}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-500 mb-2">
                        Professional Chef
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <FiStar className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">4.8</span>
                          <span className="text-neutral-500">
                            (120+ reviews)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiPackage className="w-4 h-4 text-blue-500" />
                          <span className="text-neutral-500">
                            150+ meals served
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {meal.chefBio ||
                      `With ${meal.chefExperience} of experience in traditional and modern cuisine, Chef ${meal.chefName} brings passion and creativity to every dish. Specializing in homemade meals that taste just like home, each recipe is crafted with love and attention to detail.`}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <p className="font-bold text-neutral-900 dark:text-white">
                        Specialties
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        {meal.cuisine ||
                          "Bangladeshi Cuisine, Traditional Dishes"}
                      </p>
                    </div>
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <p className="font-bold text-neutral-900 dark:text-white">
                        Years Cooking
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        {meal.chefExperience}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Price Header */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    ৳{meal.price}
                  </div>
                  <p className="text-white/90">per serving</p>
                </div>

                <div className="p-6">
                  {/* Quantity Selector */}
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

                  {/* Total Price */}
                  <div className="flex justify-between items-center mb-6 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary-600">
                      ৳{meal.price * quantity}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleOrderNow}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      Order Now
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    >
                      <FiPackage className="w-5 h-5" />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => {
                        if (!user) {
                          Swal.fire({
                            title: "Login Required",
                            text: "Please login to add to favorites",
                            icon: "info",
                          });
                          return;
                        }
                        // Add to favorites logic
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <FiHeart className="w-5 h-5" />
                      Add to Favorites
                    </button>
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                    <h4 className="font-bold mb-4 text-neutral-900 dark:text-white">
                      Delivery Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FiMapPin className="w-5 h-5 text-neutral-400" />
                        <div>
                          <p className="text-sm text-neutral-500">
                            Delivery Area
                          </p>
                          <p className="font-medium">{meal.deliveryArea}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiClock className="w-5 h-5 text-neutral-400" />
                        <div>
                          <p className="text-sm text-neutral-500">
                            Estimated Time
                          </p>
                          <p className="font-medium">
                            {meal.estimatedDeliveryTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chef Info Card */}
              <div className="mt-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6">
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
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                  Specializing in {meal.cuisine || "traditional cuisine"} with a
                  passion for homemade meals.
                </p>
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

        {/* Related Meals Section */}
        {relatedMeals.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-900 dark:text-white">
              More from this Chef
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedMeals.slice(0, 4).map((relatedMeal) => (
                <div
                  key={relatedMeal._id}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link to={`/meal/${relatedMeal._id}`}>
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
