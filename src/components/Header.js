import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addReducer, removeReducer } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { NetflixLogo, UserLogo } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [showOption, setShowOption] = useState(false);
  const handleProfileButton = () => {
    setShowOption(!showOption);
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(
          addReducer({ uid: uid, email: email, displayName: displayName })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeReducer());
        navigate("/");
      }
    });
    // Unsubscribe when component unmounts
    return () => unsubscribe(); // written acc. to firebase doc
  }, []);

  return (
    <div className="absolute px-8 w-screen py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={NetflixLogo}
        alt="logo"
      />
      {user && (
        <div className="flex pt-3">
          <div className="h-5 pt-2 pr-2 font-bold text-red-500 text-2xl">
            {user.displayName}
          </div>
          <button onClick={handleProfileButton} className=" flex">
            <img
              className="w-12 h-12"
              alt="userIcon"
              src={UserLogo}
            />
            {showOption && <span className="pt-3">◀️</span>}
            {!showOption && <span className="pt-3">▶️</span>}
          </button>
          {showOption && (
            <button
              className="h-6 pt-3 font-bold text-red-500"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
