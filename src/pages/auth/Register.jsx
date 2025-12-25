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
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <div className="card bg-base-100 w-full max-w-lg shadow-xl p-8 md:p-10">
        <div className="card-body p-0">
          <h2 className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
            Create Your Account
          </h2>
          <p className="text-center text-neutral-500 dark:text-neutral-400 mb-8">
            Join LocalChefBazaar today
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Your full name"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={loading}
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="your@email.com"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Profile Image</span>
                <span className="label-text-alt text-neutral-500">
                  Optional
                </span>
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
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-lg mx-auto">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Address</span>
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                placeholder="Your delivery address"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={loading}
              />
              {errors.address && (
                <p className="text-error text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                placeholder="••••••••"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="••••••••"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-1 w-full py-3 text-lg font-semibold mt-6"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="divider my-8">OR</div>

          <p className="text-center text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent font-semibold hover:text-primary/80 transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
