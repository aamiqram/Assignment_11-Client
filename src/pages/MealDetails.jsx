import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  // Set dynamic title
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
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "reviews" ||
          query.queryKey[0] === "recentReviews" ||
          query.queryKey[0] === "myReviews",
      });
      Swal.fire("Success!", "Review submitted successfully!", "success");
      reset();
    },
  });

  const addFavoriteMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/favorites", {
        userEmail: user.email,
        mealId: meal._id,
        mealName: meal.foodName,
        chefId: meal.chefId,
        chefName: meal.chefName,
        price: meal.price,
      });
    },
    onSuccess: () => {
      Swal.fire("Added!", "Meal added to favorites", "success");
    },
    onError: () => {
      Swal.fire("Info", "Already in favorites", "info");
    },
  });

  const onSubmitReview = (data) => {
    const review = {
      foodId: id,
      reviewerName: user.displayName || "Anonymous",
      reviewerImage: user.photoURL || "https://i.ibb.co.com/avatar.png",
      rating: parseInt(data.rating),
      comment: data.comment,
    };
    addReviewMutation.mutate(review);
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen py-10 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-96 object-cover rounded-xl"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{meal.foodName}</h1>
          <p className="text-2xl font-bold text-primary mb-4">৳{meal.price}</p>
          <p>
            <strong>Chef:</strong> {meal.chefName} ({meal.chefId})
          </p>
          <p>
            <strong>Experience:</strong> {meal.chefExperience}
          </p>
          <p>
            <strong>Delivery Area:</strong> {meal.deliveryArea}
          </p>
          <p>
            <strong>Estimated Time:</strong> {meal.estimatedDeliveryTime}
          </p>
          <p className="mt-4">
            <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addFavoriteMutation.mutate()}
              className="btn btn-outline btn-secondary"
            >
              ❤️ Add to Favorite
            </button>
            <Link to={`/order/${id}`} className="btn btn-primary">
              Order Now
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Reviews</h2>

        {/* Add Review Form */}
        <div className="card bg-base-100 shadow-xl p-6 mb-10">
          <h3 className="text-xl font-bold mb-4">Give Review</h3>
          <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
            <select
              {...register("rating", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <textarea
              {...register("comment", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Your comment..."
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
        </div>

        {/* Existing Reviews */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first!</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="card bg-base-100 shadow-md p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold">{review.reviewerName}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="rating ml-auto">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        disabled
                        checked={i < review.rating}
                      />
                    ))}
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
