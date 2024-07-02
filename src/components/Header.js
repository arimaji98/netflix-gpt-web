import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addReducer, removeReducer } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { NetflixLogo, SUPPORTED_LANGUAGES, UserLogo } from "../utils/constants";
import { toggleGptSerachView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

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

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSerachView());
  };

  const handleLanguageChange = (event) => {
    dispatch(changeLanguage(event.target.value));
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
      <img className="w-44" src={NetflixLogo} alt="logo" />
      {user && (
        <div className="flex pt-3">
          {showGptSearch && (
            <select
              className="m-2 p-2 bg-gray-900 text-white rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className=" px-2 mx-2 font-semibold text-lg text-purple-800 rounded-md"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage 🏠" : "GPT Search 🔎"}
          </button>
          <div className="h-5 pt-3 pr-2 font-bold text-red-500 text-2xl">
            {user.displayName}
          </div>
          <button onClick={handleProfileButton} className=" flex">
            <img className="w-12 h-12" alt="userIcon" src={UserLogo} />
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
