import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email Required",
        text: "Please enter your email address",
      });
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      Swal.fire({
        icon: "success",
        title: "Check Your Email",
        text: "Password reset link has been sent to your email",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Send",
        text: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <div className="card bg-base-100 w-full max-w-md shadow-xl p-8 md:p-10">
        <div className="card-body p-0">
          <h2 className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
            Reset Password
          </h2>
          <p className="text-center text-neutral-500 dark:text-neutral-400 mb-8">
            Enter your email to receive a password reset link
          </p>

          {sent ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <svg
                  className="w-20 h-20 text-green-500 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Check Your Email</h3>
              <p className="text-neutral-600 mb-6">
                We've sent a password reset link to{" "}
                <span className="font-semibold">{email}</span>. Please check
                your inbox and follow the instructions.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-neutral-500">
                  Didn't receive the email? Check your spam folder or
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Try again with a different email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 w-full py-3 text-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending Reset Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}

          <div className="divider my-8"></div>

          <p className="text-center text-neutral-600 dark:text-neutral-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent font-semibold hover:text-primary/80 transition-colors"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
