import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData, checkValidName } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addReducer } from "../utils/userSlice";
import { LoginHeaderNetflixLogo } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
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
          updateProfile(user, {
            displayName: name.current.value,
            // photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addReducer({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
            });
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
        <img src={LoginHeaderNetflixLogo} alt="logo" />
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
