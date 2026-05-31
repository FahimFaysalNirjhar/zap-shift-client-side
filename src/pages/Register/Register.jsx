import React from "react";

const Register = () => {
  return (
    <div>
      <form
        action="
    "
      >
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

            <input id="photo" type="file" accept="image/*" className="hidden" />
          </div>

          <label className="label font-extrabold">Name</label>
          <input type="text" className="input w-full" placeholder="Name" />

          <label className="label mt-2 font-extrabold">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />

          <label className="label mt-2 font-extrabold">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
          />

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

          <button className="btn btn-outline w-full">
            Register with Google
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
