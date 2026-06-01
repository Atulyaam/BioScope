import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/LocationContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { location } = useLocation();

  const handleClick = () => {
    const originalTitle = movie.title || "";
    const cleanTitle = originalTitle.includes(":")
      ? originalTitle.replace(/:/g, "")
      : originalTitle;
    const formatedTitle = cleanTitle.replace(/\s+/g, "-").toLowerCase();
    const id = movie._id ?? movie.id ?? "";
    navigate(
      `/movies/${location}/${encodeURIComponent(formatedTitle)}/${id}/ticket`,
    );
  };

  return (
    <div className="w-full cursor-pointer" onClick={handleClick}>
      <img src={movie.img} alt={movie.title} className="rounded-lg shadow-md" />
      <p className="mt-2 font-medium">{movie.title}</p>
      <p className="text-xs text-gray-500">
        {movie.rating}| {movie.votes}
      </p>
      <p className="text-sm text-gray-600">{movie.age}</p>
      <p>{movie.languages}</p>
    </div>
  );
};

export default MovieCard;
