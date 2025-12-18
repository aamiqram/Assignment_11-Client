import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      Swal.fire("Success!", "Logged in successfully", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error!", "Invalid email or password", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
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
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <p className="text-center mt-4">
            New here?{" "}
            <Link to="/register" className="text-primary">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
