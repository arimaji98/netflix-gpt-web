import React, { useEffect } from "react";
import { TMDB_API_KEY } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      TMDB_API_KEY
    );

    const jsonData = await data.json();

    const trailer = jsonData.results.filter(
      (video) => video.type === "Trailer"
    );
    const filteredTrailer = trailer.length
      ? trailer.filter((video) => video.name === "Official Trailer")
      : jsonData.results[0];
    dispatch(addMovieTrailer(filteredTrailer[0]));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
