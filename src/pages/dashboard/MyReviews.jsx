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
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">My Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't written any reviews yet.
        </p>
      ) : (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="card-title">{review.mealName || "Meal"}</h3>
                    <div className="rating rating-md my-2">
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
                    <p>{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Update Review",
                          html: `
                            <select id="rating" className="select select-bordered w-full">
                              ${[1, 2, 3, 4, 5]
                                .map(
                                  (n) =>
                                    `<option value="${n}" ${
                                      n === review.rating ? "selected" : ""
                                    }>${n} Star${n > 1 ? "s" : ""}</option>`
                                )
                                .join("")}
                            </select>
                            <textarea id="comment" className="textarea textarea-bordered w-full mt-4">${
                              review.comment
                            }</textarea>
                          `,
                          showCancelButton: true,
                          preConfirm: () => {
                            const rating =
                              document.getElementById("rating").value;
                            const comment =
                              document.getElementById("comment").value;
                            updateMutation.mutate({
                              id: review._id,
                              updatedReview: {
                                rating: parseInt(rating),
                                comment,
                              },
                            });
                          },
                        });
                      }}
                      className="btn btn-warning btn-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Delete Review?",
                          text: "This cannot be undone",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, delete",
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
