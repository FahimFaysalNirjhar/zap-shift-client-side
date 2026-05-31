import React from "react";
import SocialIcons from "../Auth/SocialIcons";

const Login = () => {
  return (
    <div>
      <form
        action="
    "
      >
        <fieldset className="fieldset w-full">
          <label className="label mt-2 font-extrabold">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />

          <label className="label mt-2 font-extrabold">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
          />

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
