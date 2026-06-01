import m4 from "../assets/m4.avif";
import { useEffect } from "react";
import { filters } from "../utils/constant";
import TheaterTimings from "../components/Movies/TheaterTimings";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../apis";

const fallbackMovie = {
  id: 4,
  title: "F1: The Movie",
  genre: ["Action", "Drama", "Sports"],
  rating: 9.5,
  votes: "250k",
  img: m4,
  languages: ["English", "Hindi", "Tamil", "Telugu"],
  format: ["2D", "IMAX", "3D", "4DX"],
  certification: "UA16+",
  duration: "2h 30m",
  releaseDate: "2025-12-25",
  description:
    "An epic sports drama that follows the journey of an underdog racer as they navigate the high-octane world of Formula 1, overcoming personal obstacles and professional rivalries to chase their championship dreams.",
};

const formatReleaseDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const MovieDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const {
    data: movieResponse,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => await getMovieById(id),
    placeholderData: keepPreviousData,
    enabled: Boolean(id),
  });

  if (isError) {
    console.error(
      "[MovieDetail] Failed to fetch movie by id. Showing fallback movie.",
    );
  }

  const movie = movieResponse?.data?.movie ?? fallbackMovie;
  const poster = movie.posterUrl || movie.img;
  const movieFormats = (Array.isArray(movie.format) ? movie.format : [])
    .map((item) => String(item).trim())
    .filter(Boolean);
  const movieLanguages = (
    Array.isArray(movie.language)
      ? movie.language
      : Array.isArray(movie.languages)
        ? movie.languages
        : []
  )
    .map((item) => String(item).trim())
    .filter(Boolean);
  const movieGenres = Array.isArray(movie.genre)
    ? movie.genre
    : typeof movie.genre === "string"
      ? movie.genre.split("/")
      : [];
  const movieId = movie._id || movie.id || id;

  if (isLoading && !movieResponse?.data?.movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-gray-500">Loading movie details...</p>
      </div>
    );
  }

  return (
    <>
      {/* Movie detail section */}
      <div
        className="relative text-white font-sans px-4 py-10"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for darkness */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Actual content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Poster */}
          <div>
            <img
              src={poster}
              alt={movie.title}
              className="rounded-xl w-52 shadow-xl"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-start flex-1">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <div className="flex flex-col items-start gap-4 mb-3">
              <div className="bg-[#f74362] px-4 py-2 rounded-md flex items-center gap-2 text-sm">
                <span className="text-[#4a4a4a] font-bold">
                  {movie.rating} ⭐
                </span>
                <span className="text-gray-800">{movie.votes} Votes</span>
                <button className="cursor-pointer bg-[#4a4a4a] ml-6 px-4 py-2 rounded-md hover:bg-amber-950">
                  Rate Now
                </button>
              </div>

              {(movieFormats.length > 0 || movieLanguages.length > 0) && (
                <div className="flex items-center gap-3 text-sm mb-4">
                  {movieFormats.length > 0 && (
                    <span className="bg-[#f74362] px-3 py-1 rounded text-gray-700 font-bold">
                      {movieFormats.join(", ")}
                    </span>
                  )}
                  {movieLanguages.length > 0 && (
                    <span className="bg-[#f74362] px-3 py-1 rounded text-gray-700 font-bold">
                      {movieLanguages.join(", ")}
                    </span>
                  )}
                </div>
              )}

              <p className="text-m text-gray-300 mb-4">
                {movie.duration} | {movieGenres.join(", ")} |{" "}
                {movie.certification} | {formatReleaseDate(movie.releaseDate)}
              </p>

              <div>
                <h2 className="text-xl font-bold mb-2">About Movie</h2>
                <p className="text-m text-gray-300 leading-relaxed mb-4">
                  {movie.description}
                </p>
              </div>
            </div>
          </div>

          {/* Share button */}
          <div className="absolute top-0 right-0 cursor-pointer">
            <button className="cursor-pointer bg-[#f74362] px-4 py-2 rounded text-m flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.21c.05-.25.09-.51.09-.78s-.03-.53-.09-.78l7.04-4.15c.54.5 1.25.81 2.05.81 1.66 0 3-1.34 3-3S19.66 2 18 2s-3 1.34-3 3c0 .27.04.52.09.78L7.91 9.93C7.38 9.43 6.67 9.12 5.87 9.12 4.21 9.12 2.87 10.46 2.87 12.12s1.34 3 3 3c.8 0 1.51-.31 2.04-.81l7.13 4.21c-.06.24-.1.49-.1.75 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Show Timings */}
      <div className="max-w-7xl mx-auto mt-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {filters.map((filter, i) => (
            <button
              className="border border-gray-300 px-5 py-1 rounded-lg cursor-pointer text-m hover:bg-[#f74362]"
              key={i}
            >
              {filter}
            </button>
          ))}
        </div>
        <hr className="my-2 border-gray-200" />

        {/* Theater timings */}
        <TheaterTimings movieId={id} location={location}/>
      </div>
    </>
  );
};

export default MovieDetail;
