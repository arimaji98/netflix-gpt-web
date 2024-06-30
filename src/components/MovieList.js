import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-5">
      <h1 className="text-2xl py-5 font-semibold text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} posterPath={movie.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
