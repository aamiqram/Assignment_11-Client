import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      let imageUrl = "https://i.ibb.co.com/0s3pdnc/avatar.png";
      if (data.profileImage[0]) {
        const formData = new FormData();
        formData.append("image", data.profileImage[0]);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );
        const imgData = await res.json();
        imageUrl = imgData.data.display_url;
      }

      await createUser(data.email, data.password);
      await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          image: imageUrl,
          address: data.address,
        }),
      });

      Swal.fire("Success!", "Account created successfully", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error!", err.message || "Registration failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("profileImage")}
                onChange={(e) => {
                  if (e.target.files[0])
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                }}
                className="file-input file-input-bordered"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-full h-48 object-cover rounded"
                />
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">Address</label>
              <input
                {...register("address", { required: "Address is required" })}
                className="input input-bordered"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="input input-bordered"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
