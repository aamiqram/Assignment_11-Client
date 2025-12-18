import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axiosSecure from "../../../utils/axiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";

const CreateMeal = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const {
    data: userData,
    isLoading: userLoading,
    error,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (userLoading) return <LoadingSpinner />;
  if (error || !userData?.chefId) {
    return (
      <div className="alert alert-error">
        <span>You must be an approved chef to create meals.</span>
      </div>
    );
  }

  const onSubmit = async (data) => {
    // Default fallback
    let foodImage = "https://i.ibb.co.com/placeholder-meal.jpg"; // nice food placeholder

    try {
      // Check if image file is selected
      if (data.foodImage && data.foodImage[0]) {
        const formData = new FormData();
        formData.append("image", data.foodImage[0]);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );

        // Critical: Check if upload succeeded
        if (!res.ok) {
          const errorText = await res.text();
          console.error("ImgBB upload failed:", errorText);
          Swal.fire(
            "Upload Failed",
            "Image upload failed. Using placeholder.",
            "warning"
          );
        } else {
          const imgData = await res.json();

          // Safe check: make sure data.display_url exists
          if (imgData?.data?.display_url) {
            foodImage = imgData.data.display_url;
          } else {
            console.error("Unexpected ImgBB response:", imgData);
            Swal.fire(
              "Warning",
              "Image uploaded but no URL received. Using placeholder.",
              "warning"
            );
          }
        }
      }

      // Prepare meal data
      const mealData = {
        foodName: data.foodName,
        chefName: user.displayName || "Chef",
        foodImage,
        price: parseFloat(data.price),
        rating: 0,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: userData.chefId,
        userEmail: user.email,
      };

      // Send to server
      await axiosSecure.post("/meals", mealData);
      Swal.fire("Success!", "Meal created successfully!", "success");
      reset();
    } catch (error) {
      console.error("Error creating meal:", error);
      Swal.fire("Error", "Failed to create meal. Please try again.", "error");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">Create New Meal</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <input
          {...register("foodName", { required: true })}
          placeholder="Food Name"
          className="input input-bordered w-full"
        />
        <input
          type="file"
          {...register("foodImage", { required: true })}
          className="file-input w-full"
        />
        <input
          {...register("price", { required: true })}
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
        />
        <textarea
          {...register("ingredients")}
          placeholder="Ingredients (comma separated)"
          className="textarea textarea-bordered w-full"
        />
        <input
          {...register("estimatedDeliveryTime")}
          placeholder="Estimated Delivery Time"
          className="input input-bordered w-full"
        />
        <input
          {...register("chefExperience")}
          placeholder="Your Experience"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary btn-lg">
          Create Meal
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
