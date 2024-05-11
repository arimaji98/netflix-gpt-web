import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ff5587c5-1052-47cf-974b-a97e3b4f0656/065df910-dec3-46ae-afa8-7ad2b52dce40/IN-en-20240506-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form className="absolute w-4/12 my-44 mx-auto p-10 right-0 left-0 bg-black bg-opacity-80">
        <h1 className=" text-white text-3xl font-bold my-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Name"
            className="p-3 my-4 w-full bg-gray-700 placeholder-slate-300"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="p-3 my-4 w-full bg-gray-700 placeholder-slate-300"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 my-4 w-full bg-gray-700 placeholder-slate-300"
        />
        <button className="p-3 my-6 bg-red-600 rounded-md w-full">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-3 text-white cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix ? Sign Up now"
            : "Already registered user ? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
