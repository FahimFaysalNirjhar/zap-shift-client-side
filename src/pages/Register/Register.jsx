import React from "react";
import SocialIcons from "../Auth/SocialIcons";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleRegistration = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset w-full">
          {/* Profile Photo Upload */}
          <div className="flex justify-start mb-4">
            <label htmlFor="photo" className="cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden flex items-center justify-center bg-gray-100 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </label>

            <input
              id="photo"
              {...register("photo", { required: true })}
              type="file"
              accept="image/*"
              className="hidden"
            />
            {errors.photo?.type === "required" && (
              <p className="text-[#c1121f] text-sm">Please upload a photo.</p>
            )}
          </div>

          <label className="label font-extrabold">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-[#c1121f] text-sm">Name is required</p>
          )}

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
            Register
          </button>

          <p className="text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-amber-500 font-bold">
              Login
            </a>
          </p>

          <div className="divider">Or</div>
          <SocialIcons />
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
