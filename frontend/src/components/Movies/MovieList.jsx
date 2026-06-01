import React from "react";
import { allMovies } from "../../utils/constant";
import MovieCard from "./MovieCard";

const MovieList = ({ filteredMovies }) => {
  // Use filtered list if provided, otherwise show all movies
  const moviesToShow = filteredMovies ?? allMovies;

  return (
    <div className="w-full md:w-3/4 p-4">
      <div className="flex justify-between items-center bg-white px-6 py-6 rounded mb-6">
        <h3 className="font-semibold text-xl text-[#f74362]">
          Upcoming Movies
        </h3>
        <a
          href="#"
          className="text-[#f74362] text-sm font-medium hover:underline"
        >
          Explore Upcoming Movies →
        </a>
      </div>

      {moviesToShow.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg font-medium">
            No movies match the selected filters.
          </p>
          <p className="text-sm mt-1">Try clearing some filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {moviesToShow.map((movie) => (
            <MovieCard key={movie._id ?? movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
