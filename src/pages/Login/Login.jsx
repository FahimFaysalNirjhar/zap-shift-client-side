import React from "react";
import SocialIcons from "../Auth/SocialIcons";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        if (!result.user.emailVerified) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: "Email not verified",
            text: "Some features may be limited",
            showConfirmButton: false,
            timer: 2500,
          });
        }
        navigate(location?.state || "/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset w-full">
          <label className="label mt-2 font-extrabold">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-[#c1121f] text-sm">Email is required</p>
          )}

          <label className="label mt-2 font-extrabold">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/~`])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/~`]{6,}$/,
                message:
                  "Password must be at least 6 characters long and contain uppercase, lowercase, number, and special character",
              },
            })}
          />
          {errors.password && (
            <p className="text-[#c1121f] text-sm">{errors.password.message}</p>
          )}

          <button className="btn mt-4 bg-lime-400 border-none text-black hover:bg-lime-500">
            Login
          </button>

          <p className="text-center mt-4 text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-amber-500 font-bold">
              Register
            </a>
          </p>

          <div className="divider">Or</div>

          <SocialIcons></SocialIcons>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
