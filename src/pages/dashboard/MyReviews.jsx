import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../utils/axiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

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
      Swal.fire("Deleted!", "Your review has been removed", "success");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedReview }) =>
      axiosSecure.put(`/reviews/${id}`, updatedReview),
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews"]);
      Swal.fire("Updated!", "Review updated successfully", "success");
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="spinner"></span>
      </div>
    );

  return (
    <div className="min-h-screen pt-20 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-orange-600">
        My Reviews
      </h1>

      {reviews.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">
            You haven't written any reviews yet.
          </p>
          <p className="text-gray-600 mt-4">
            Start ordering meals and share your experience!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div key={review._id} className="card-custom hover-card">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {review.mealName || "Meal"}
                    </h3>
                    <div className="rating rating-lg my-4">
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
                    <p className="text-lg text-gray-700">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-4">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Update Review",
                          html: `
                            <div class="space-y-4">
                              <select id="swal-rating" class="select select-bordered w-full">
                                ${[1, 2, 3, 4, 5]
                                  .map(
                                    (n) =>
                                      `<option value="${n}" ${
                                        n === review.rating ? "selected" : ""
                                      }>
                                        ${n} Star${n > 1 ? "s" : ""}
                                      </option>`
                                  )
                                  .join("")}
                              </select>
                              <textarea id="swal-comment" class="textarea textarea-bordered w-full h-32">${
                                review.comment
                              }</textarea>
                            </div>
                          `,
                          showCancelButton: true,
                          confirmButtonText: "Update",
                          preConfirm: () => {
                            const rating = parseInt(
                              document.getElementById("swal-rating").value
                            );
                            const comment =
                              document.getElementById("swal-comment").value;
                            if (!comment.trim()) {
                              Swal.showValidationMessage("Comment is required");
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
                      className="btn-secondary btn-sm"
                    >
                      Update
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
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteMutation.mutate(review._id);
                          }
                        });
                      }}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
