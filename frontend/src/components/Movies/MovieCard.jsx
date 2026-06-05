import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/LocationContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { location } = useLocation();

  const handleClick = () => {
    const originalTitle = movie.title || "";
    const cleanTitle = originalTitle.replace(/:/g, ""); // strip colons
    const formattedTitle = cleanTitle.replace(/\s+/g, "-").toLowerCase();

    // ✅ Prefer MongoDB _id (real API movie); fall back to numeric id (static data)
    const id = movie._id ?? movie.id ?? "";

    navigate(
      `/movies/${location}/${encodeURIComponent(formattedTitle)}/${id}/ticket`,
    );
  };

  // ✅ Support both API shape (posterUrl) and static shape (img)
  const poster = movie.posterUrl || movie.img;

  // Normalise genre: API returns string[], static returns "Action/Drama" string
  const genreText = Array.isArray(movie.genre)
    ? movie.genre.join(" · ")
    : typeof movie.genre === "string"
      ? movie.genre.replace(/\//g, " · ")
      : "";

  return (
    <div className="w-full cursor-pointer group" onClick={handleClick}>
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <img
          src={poster}
          alt={movie.title}
          className="w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 font-semibold text-sm leading-tight line-clamp-2">{movie.title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{genreText}</p>
      {(movie.rating || movie.votes) && (
        <p className="text-xs text-gray-400 mt-0.5">
          {movie.rating && `⭐ ${movie.rating}`}
          {movie.rating && movie.votes && " · "}
          {movie.votes && `${movie.votes} Votes`}
        </p>
      )}
      {movie.age && <p className="text-xs text-gray-500">{movie.age}</p>}
    </div>
  );
};

export default MovieCard;
