import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import axiosSecure from "../../utils/axiosSecure";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Register = () => {
  const {
    createUser,
    loginWithGoogle,
    loginWithFacebook,
    loading,
    syncUserToDB,
  } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false,
  });

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
      const userCredential = await createUser(data.email, data.password);

      // Update Firebase profile with name & photo
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: imageUrl,
      });

      // Sync user to MongoDB
      await axiosSecure.put("/users", {
        name: data.name,
        email: data.email,
        image: imageUrl,
        address: data.address,
        phone: data.phone || "",
      });

      // Sync to DB again to ensure user is created
      await syncUserToDB(auth.currentUser);

      Swal.fire({
        icon: "success",
        title: "Welcome to LocalChefBazaar!",
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
        text:
          err.code === "auth/email-already-in-use"
            ? "This email is already registered. Try logging in instead."
            : err.message || "Something went wrong",
      });
    }
  };

  const handleGoogleSignUp = async () => {
    setSocialLoading((prev) => ({ ...prev, google: true }));
    try {
      const result = await loginWithGoogle();

      // Check if this is a new user
      const isNewUser =
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime;

      if (isNewUser) {
        // For new Google users, we need to get additional info
        const { value: formValues } = await Swal.fire({
          title: "Complete Your Profile",
          html: `
            <input id="swal-input1" class="swal2-input" placeholder="Your Address" required>
            <input id="swal-input2" class="swal2-input" placeholder="Phone Number (Optional)">
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Continue",
          preConfirm: () => {
            return [
              document.getElementById("swal-input1").value,
              document.getElementById("swal-input2").value,
            ];
          },
        });

        if (formValues) {
          const [address, phone] = formValues;

          // Sync user with additional info
          await axiosSecure.put("/users", {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
            address: address,
            phone: phone || "",
          });
        }

        Swal.fire({
          icon: "success",
          title: "Welcome to LocalChefBazaar!",
          text: "Account created with Google successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "Logged in with Google successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Sign Up Failed",
        text:
          err.code === "auth/account-exists-with-different-credential"
            ? "This email is already registered with another method. Try logging in instead."
            : err.message || "Failed to sign up with Google",
      });
    } finally {
      setSocialLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const handleFacebookSignUp = async () => {
    setSocialLoading((prev) => ({ ...prev, facebook: true }));
    try {
      const result = await loginWithFacebook();

      const isNewUser =
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime;

      if (isNewUser) {
        // For new Facebook users, get additional info
        const { value: formValues } = await Swal.fire({
          title: "Complete Your Profile",
          html: `
            <input id="swal-input1" class="swal2-input" placeholder="Your Address" required>
            <input id="swal-input2" class="swal2-input" placeholder="Phone Number (Optional)">
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Continue",
          preConfirm: () => {
            return [
              document.getElementById("swal-input1").value,
              document.getElementById("swal-input2").value,
            ];
          },
        });

        if (formValues) {
          const [address, phone] = formValues;

          await axiosSecure.put("/users", {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
            address: address,
            phone: phone || "",
          });
        }

        Swal.fire({
          icon: "success",
          title: "Welcome to LocalChefBazaar!",
          text: "Account created with Facebook successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "Logged in with Facebook successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Facebook Sign Up Failed",
        text:
          err.code === "auth/account-exists-with-different-credential"
            ? "This email is already registered with another method"
            : err.message || "Failed to sign up with Facebook",
      });
    } finally {
      setSocialLoading((prev) => ({ ...prev, facebook: false }));
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

          {/* Social Sign Up Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleGoogleSignUp}
              disabled={socialLoading.google || loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-primary/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {socialLoading.google ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FcGoogle className="w-5 h-5" />
              )}
              {socialLoading.google
                ? "Creating account..."
                : "Sign up with Google"}
            </button>

            <button
              onClick={handleFacebookSignUp}
              disabled={socialLoading.facebook || loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-blue-500/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {socialLoading.facebook ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FaFacebook className="w-5 h-5 text-blue-600" />
              )}
              {socialLoading.facebook
                ? "Creating account..."
                : "Sign up with Facebook"}
            </button>
          </div>

          <div className="divider">OR</div>

          {/* Email Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
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

            {/* Phone (Optional) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Phone Number</span>
                <span className="label-text-alt text-neutral-500">
                  Optional
                </span>
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="+1 (555) 123-4567"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={loading}
              />
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
                    const file = e.target.files[0];
                    if (file.size > 5 * 1024 * 1024) {
                      Swal.fire({
                        icon: "error",
                        title: "File too large",
                        text: "Maximum file size is 5MB",
                      });
                      e.target.value = "";
                      return;
                    }
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="file-input file-input-bordered w-full"
                disabled={loading}
              />
              {imagePreview && (
                <div className="mt-4">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-lg mx-auto border-4 border-white shadow-lg">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="text-center text-sm text-neutral-500 mt-2">
                    Preview
                  </p>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Address</span>
              </label>
              <input
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 5,
                    message: "Please enter a valid address",
                  },
                })}
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
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)/,
                    message:
                      "Password must contain at least one letter and one number",
                  },
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
              <label className="label">
                <span className="label-text-alt text-neutral-500">
                  At least 6 characters with letters and numbers
                </span>
              </label>
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
                  required: "Please confirm your password",
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

            {/* Terms and Conditions */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: "You must accept the terms and conditions",
                  })}
                  className="checkbox checkbox-primary"
                  disabled={loading}
                />
                <span className="label-text">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-error text-sm mt-1">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-0.5 w-full py-3 text-lg font-semibold mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
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
