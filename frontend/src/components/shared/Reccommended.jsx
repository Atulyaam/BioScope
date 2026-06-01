import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { movies } from "../../utils/constant";
import { getRecommendedMovies } from "../../apis";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/LocationContext";

const Reccommended = () => {
  const navigate = useNavigate();
  const { location } = useLocation();
  const handleNavigate = (movie) => {
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

  // API Call
  const { data: recMovies, isError } = useQuery({
    queryKey: ["recommendedMovies"],
    queryFn: async () => {
      return await getRecommendedMovies();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    console.error("[Reccommended] ❌ API call failed — showing fallback data");
  }

  const recommendedMovies = recMovies?.data?.topMovie ?? movies;
  console.log(
    "[Reccommended]",
    recMovies?.data?.topMovie
      ? "✅ Real API data"
      : "⚠️ Using fallback mock data",
    recommendedMovies,
  );

  return (
    <div className="w-full py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="items-center flex justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recommended Movies</h2>
          <span className="text-md text-red-500 cursor-pointer hover:underline font-medium">
            See All
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recommendedMovies.map((movie, index) => (
            <div
              className="rounded overflow-hidden cursor-pointer "
              key={movie._id ?? index}
              onClick={() => handleNavigate(movie)}
            >
              <div className="relative">
                <img
                  src={movie.img || movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-75 object-cover rounded"
                />
              </div>
              <div className="bg-black text-white text-sm px-2 py-2 flex items-center justify-between">
                <span>⭐ {movie.rating}/10</span>
                <span>{movie.votes} Votes</span>
              </div>
              <div className="px-2 py-1">
                <h3 className="font-semibold text-lg"> {movie.title}</h3>
                <p className="text-md text-gray-500">
                  {Array.isArray(movie.genre)
                    ? movie.genre.join(" · ")
                    : movie.genre?.replaceAll("/", " · ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reccommended;
