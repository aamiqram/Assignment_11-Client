import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const { login, loginWithGoogle, loginWithFacebook, demoLogin, loading } =
    useAuth();
  const navigate = useNavigate();
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "Logged in successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Invalid email or password",
      });
    }
  };

  const handleDemoLogin = async () => {
    try {
      await demoLogin();
      Swal.fire({
        icon: "success",
        title: "Demo Login Successful!",
        text: "Welcome to LocalChefBazaar demo",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Demo Login Failed",
        text: err.message || "Something went wrong",
      });
    }
  };

  const handleGoogleLogin = async () => {
    setSocialLoading((prev) => ({ ...prev, google: true }));
    try {
      const result = await loginWithGoogle();

      // Check if this is a new user
      const isNewUser =
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime;

      if (isNewUser) {
        Swal.fire({
          icon: "info",
          title: "Welcome!",
          text: "Your Google account has been linked successfully",
          timer: 2000,
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
        title: "Google Login Failed",
        text: err.message || "Failed to login with Google",
      });
    } finally {
      setSocialLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const handleFacebookLogin = async () => {
    setSocialLoading((prev) => ({ ...prev, facebook: true }));
    try {
      const result = await loginWithFacebook();

      const isNewUser =
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime;

      if (isNewUser) {
        Swal.fire({
          icon: "info",
          title: "Welcome!",
          text: "Your Facebook account has been linked successfully",
          timer: 2000,
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
        title: "Facebook Login Failed",
        text:
          err.code === "auth/account-exists-with-different-credential"
            ? "This email is already registered with another method"
            : err.message || "Failed to login with Facebook",
      });
    } finally {
      setSocialLoading((prev) => ({ ...prev, facebook: false }));
    }
  };

  // Auto-fill demo credentials for testing
  const fillDemoCredentials = () => {
    const demoEmail =
      import.meta.env.VITE_DEMO_EMAIL || "demo@localchefbazaar.com";
    const demoPassword =
      import.meta.env.VITE_DEMO_PASSWORD || "demopassword123";

    setValue("email", demoEmail);
    setValue("password", demoPassword);

    Swal.fire({
      title: "Demo Credentials Filled",
      html: `
        <div class="text-left">
          <p><strong>Email:</strong> ${demoEmail}</p>
          <p><strong>Password:</strong> ${demoPassword}</p>
          <p class="text-sm text-gray-500 mt-2">Click "Login" to continue</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Got it",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <div className="card bg-base-100 w-full max-w-md shadow-xl p-8 md:p-10">
        <div className="card-body p-0">
          <h2 className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
            Welcome Back
          </h2>
          <p className="text-center text-neutral-500 dark:text-neutral-400 mb-8">
            Login to your LocalChefBazaar account
          </p>

          {/* Demo Login Section */}
          <div className="mb-6">
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full mb-3 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-semibold hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Logging in...
                </>
              ) : (
                "Try Demo Account"
              )}
            </button>

            <button
              onClick={fillDemoCredentials}
              className="w-full py-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Fill Demo Credentials
            </button>
          </div>

          <div className="divider">OR</div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleGoogleLogin}
              disabled={socialLoading.google || loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-primary/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {socialLoading.google ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FcGoogle className="w-5 h-5" />
              )}
              {socialLoading.google ? "Connecting..." : "Continue with Google"}
            </button>

            <button
              onClick={handleFacebookLogin}
              disabled={socialLoading.facebook || loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-blue-500/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {socialLoading.facebook ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FaFacebook className="w-5 h-5 text-blue-600" />
              )}
              {socialLoading.facebook
                ? "Connecting..."
                : "Continue with Facebook"}
            </button>
          </div>

          <div className="divider">OR</div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                placeholder="Enter your email"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
                <Link
                  to="/forgot-password"
                  className="label-text-alt text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-0.5 w-full py-3 text-lg font-semibold mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                "Login with Email"
              )}
            </button>
          </form>

          <div className="divider my-8">OR</div>

          <p className="text-center text-neutral-600 dark:text-neutral-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent font-semibold hover:text-primary/80 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
