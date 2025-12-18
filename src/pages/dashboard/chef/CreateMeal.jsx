import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axiosSecure from "../../../utils/axiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const CreateMeal = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const { data: userData } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  if (userData?.status === "fraud") {
    return (
      <div className="alert alert-error">Fraud users cannot create meals.</div>
    );
  }

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.foodImage[0]);

    const imgRes = await fetch(
      `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_KEY`,
      {
        method: "POST",
        body: formData,
      }
    );
    const imgData = await imgRes.json();

    const mealData = {
      foodName: data.foodName,
      chefName: user.displayName,
      foodImage: imgData.data.display_url,
      price: parseFloat(data.price),
      rating: 0,
      ingredients: data.ingredients.split(",").map((i) => i.trim()),
      estimatedDeliveryTime: data.estimatedDeliveryTime,
      chefExperience: data.chefExperience,
      chefId: userData.chefId,
      userEmail: user.email,
    };

    await axiosSecure.post("/meals", mealData);
    Swal.fire("Success!", "Meal created successfully", "success");
    reset();
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
