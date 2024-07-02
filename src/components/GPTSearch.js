import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { LoginHeaderNetflixLogo } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src={LoginHeaderNetflixLogo} alt="logo" />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
