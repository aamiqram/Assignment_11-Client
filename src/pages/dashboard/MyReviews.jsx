import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../utils/axiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FiStar, FiEdit, FiTrash2, FiCalendar, FiMeh } from "react-icons/fi";

const MyReviews = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId) => axiosSecure.delete(`/reviews/${reviewId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews"]);
      Swal.fire({
        title: "Deleted!",
        text: "Your review has been removed",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedReview }) =>
      axiosSecure.put(`/reviews/${id}`, updatedReview),
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews"]);
      Swal.fire({
        title: "Updated!",
        text: "Review updated successfully",
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
            Loading your reviews...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
            My Reviews
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage and edit your meal reviews
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mx-auto mb-6">
              <FiMeh className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-3">
              No reviews yet
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Start ordering meals and share your experience with our community!
            </p>
            <a
              href="/meals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
            >
              Browse Meals
            </a>
          </div>
        ) : (
          <div className="grid gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={
                              review.reviewerImage ||
                              "https://i.ibb.co.com/0s3pdnc/avatar.png"
                            }
                            alt={review.reviewerName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                            {review.mealName || "Meal"}
                          </h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Reviewed by {review.reviewerName}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-neutral-300 dark:text-neutral-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-bold text-neutral-900 dark:text-white">
                          {review.rating}.0
                        </span>
                      </div>

                      {/* Comment */}
                      <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-4">
                        "{review.comment}"
                      </p>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 md:w-auto">
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Update Review",
                            html: `
                              <div class="space-y-4">
                                <div>
                                  <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Rating</label>
                                  <select id="swal-rating" class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">
                                    ${[1, 2, 3, 4, 5]
                                      .map(
                                        (n) =>
                                          `<option value="${n}" ${
                                            n === review.rating
                                              ? "selected"
                                              : ""
                                          }>
                                            ${n} Star${n > 1 ? "s" : ""}
                                          </option>`
                                      )
                                      .join("")}
                                  </select>
                                </div>
                                <div>
                                  <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Comment</label>
                                  <textarea id="swal-comment" class="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white h-32">${
                                    review.comment
                                  }</textarea>
                                </div>
                              </div>
                            `,
                            showCancelButton: true,
                            confirmButtonText: "Update",
                            confirmButtonColor: "#f97316",
                            cancelButtonColor: "#6b7280",
                            preConfirm: () => {
                              const rating = parseInt(
                                document.getElementById("swal-rating").value
                              );
                              const comment =
                                document.getElementById("swal-comment").value;
                              if (!comment.trim()) {
                                Swal.showValidationMessage(
                                  "Comment is required"
                                );
                              }
                              return { rating, comment };
                            },
                          }).then((result) => {
                            if (result.isConfirmed) {
                              updateMutation.mutate({
                                id: review._id,
                                updatedReview: {
                                  rating: result.value.rating,
                                  comment: result.value.comment,
                                },
                              });
                            }
                          });
                        }}
                        disabled={updateMutation.isPending}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-primary-500 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      >
                        <FiEdit className="w-4 h-4" />
                        {updateMutation.isPending ? "Updating..." : "Update"}
                      </button>

                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Delete Review?",
                            text: "This action cannot be undone",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, delete it",
                            confirmButtonColor: "#ef4444",
                            cancelButtonColor: "#6b7280",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteMutation.mutate(review._id);
                            }
                          });
                        }}
                        disabled={deleteMutation.isPending}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        {deleteMutation.isPending ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
