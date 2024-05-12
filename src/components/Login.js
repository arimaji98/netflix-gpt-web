import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData, checkValidName } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const name = useRef();
  const [nameErrMessage, setNameErrMessage] = useState(null);
  const email = useRef();
  const password = useRef();
  const [errMessage, setErrMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const dataMsg = checkValidData(email.current.value, password.current.value);
    setErrMessage(dataMsg);

    const nameMsg = checkValidName(name.current?.value);
    setNameErrMessage(nameMsg);

    if (!isSignInForm) {
      if (nameMsg || dataMsg) return;

      //Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode);
        });
    } else {
      if (dataMsg) return;

      //Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode, errMessage);
        });
    }
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
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-4/12 my-44 mx-auto p-10 right-0 left-0 bg-black bg-opacity-80"
      >
        <h1 className=" text-white text-3xl font-bold my-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-3 my-4 w-full bg-gray-700 placeholder-slate-300"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-3 my-4 w-full bg-gray-700 placeholder-slate-300"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 my-4 w-full bg-gray-700 placeholder-slate-300"
        />
        {!isSignInForm && (
          <p className="text-red-600 font-bold text-lg py-3">
            {nameErrMessage}
          </p>
        )}
        <p className="text-red-600 font-bold text-lg py-3">{errMessage}</p>
        <button
          className="p-3 my-6 bg-red-600 rounded-md w-full"
          onClick={handleButtonClick}
        >
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
