import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import axiosSecure from "../../utils/axiosSecure";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Register = () => {
  const { createUser, loading } = useAuth();
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

      // Upload image to ImgBB if selected
      if (data.profileImage?.[0]) {
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
        if (imgData.data?.display_url) {
          imageUrl = imgData.data.display_url;
        }
      }

      // Create Firebase user
      await createUser(data.email, data.password);

      // Update Firebase profile with name & photo
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: imageUrl,
      });

      // Sync user to MongoDB (token sent via axiosSecure interceptor)
      await axiosSecure.put("/users", {
        name: data.name,
        email: data.email,
        image: imageUrl,
        address: data.address,
      });

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Account created successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="card-custom w-full max-w-lg p-10">
        <h2 className="text-center text-4xl font-bold text-orange-600 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="your@email.com"
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Profile Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("profileImage")}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="file-input file-input-bordered w-full"
              disabled={loading}
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Address</span>
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              placeholder="Your delivery address"
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="••••••••"
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="••••••••"
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
