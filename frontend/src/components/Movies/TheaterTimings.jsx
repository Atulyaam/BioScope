import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "../../context/LocationContext";
import dayjs from "dayjs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShowsByMovieAndLocation } from "../../apis";

const TheaterTimings = ({ movieId, activeFilters = [] }) => {
  const navigate = useNavigate();
  const { location, loading: locationLoading } = useLocation();
  const params = useParams();
  const routeState = params.state;
  // movieName comes from the MovieDetail route: /movies/:state/:movieName/:id/ticket
  const routeMovieName = params.movieName ?? "movie";

  // derive effective location: context -> route param -> stored preference
  const storedLocation =
    typeof window !== "undefined" ? localStorage.getItem("userLocation") : null;
  const effectiveLocation = location || routeState || storedLocation || null;

  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);
  const formattedDate = selectedDate.format("DD-MM-YYYY");

  const next7days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));
  const { data: showData, isError, isFetching } = useQuery({
    queryKey: ["show", movieId, effectiveLocation, formattedDate],
    queryFn: async () =>
      await getShowsByMovieAndLocation(
        movieId,
        effectiveLocation,
        formattedDate,
      ),
    placeholderData: keepPreviousData,
    enabled: Boolean(movieId) && Boolean(effectiveLocation),
  });

  if (isError) {
    console.error(
      "[TheaterTimings] failed to fetch shows for movie",
      movieId,
      "location",
      effectiveLocation,
    );
  }

  // Backend returns an array directly: [{ movie, theater: { theaterDetails, shows } }]
  // Axios wraps it under response.data, so showData?.data is the array
  const serverTheatres = Array.isArray(showData?.data) ? showData.data : null;
  let theatresList = [];
  if (serverTheatres && serverTheatres.length > 0) {
    // server returns grouped shows: { movie, theater: { theaterDetails, shows } }
    theatresList = serverTheatres.map((g) => {
      const details = g.theater?.theaterDetails || {};
      const shows = g.theater?.shows || [];
      // Movie languages — the movie doc is populated on g.movie
      const movieDoc = g.movie || {};
      const movieLanguages = Array.isArray(movieDoc.languages)
        ? movieDoc.languages
        : Array.isArray(movieDoc.language)
          ? movieDoc.language
          : [];
      return {
        name: details.name || "",
        cancellation: details.cancellation || "",
        img: details.logo || details.img || "",
        theaterId: details._id || "",   // ✅ capture real theater _id
        languages: movieLanguages,
        timings: shows.map((s) => ({
          time: s.startTime || "",
          label: s.formate || "",
          audioType: s.audioType || "",
          showId: s._id || "",          // ✅ real show _id from DB
          availability: s.availabilityStatus || "AVAILABLE",
        })),
      };
    });
  }

  // ─── Filter logic ────────────────────────────────────────────────────────
  // Separate active filters into language vs format/audio buckets
  const LANGUAGE_FILTERS = ["Hindi", "English", "Tamil", "Telugu"];
  const FORMAT_FILTERS   = ["2D", "3D", "IMAX", "4DX", "Dolby"];

  const activeLangs    = activeFilters.filter((f) => LANGUAGE_FILTERS.includes(f));
  const activeFormats  = activeFilters.filter((f) => FORMAT_FILTERS.includes(f));

  let filteredList = theatresList;

  if (activeFilters.length > 0) {
    filteredList = theatresList
      .map((theatre) => {
        let timings = theatre.timings;

        // Format/audio filter — keep only slots whose label OR audioType matches
        if (activeFormats.length > 0) {
          timings = timings.filter((slot) =>
            activeFormats.some((f) =>
              slot.label.toUpperCase().includes(f.toUpperCase()) ||
              slot.audioType.toUpperCase().includes(f.toUpperCase())
            )
          );
        }

        // Language filter — hide the whole theatre if movie language doesn't match
        // The movie doc is embedded in each group; check theatre name as proxy
        // (language data comes from the movie, not the show slot)
        // We handle this by checking `theatre.languages` if available,
        // otherwise we keep the theatre (can't filter without data)
        if (activeLangs.length > 0 && theatre.languages) {
          const theatreLangs = theatre.languages.map((l) => l.toLowerCase());
          const matches = activeLangs.some((lang) =>
            theatreLangs.includes(lang.toLowerCase())
          );
          if (!matches) return null;
        }

        return { ...theatre, timings };
      })
      .filter((t) => t !== null && t.timings.length > 0);
  }
  // ─────────────────────────────────────────────────────────────────────────

  // Availability colour config
  const availabilityConfig = {
    AVAILABLE:   { dot: "bg-green-500",  border: "border-green-500",  text: "text-green-600",  label: "Available" },
    FAST_FILLING:{ dot: "bg-orange-400", border: "border-orange-400", text: "text-orange-500", label: "Fast Filling" },
    FULL:        { dot: "bg-red-500",    border: "border-red-500",    text: "text-red-600",    label: "Full" },
  };

  return (
    <>
      <hr className="my-2 border-gray-200" />

      {/* Availability legend */}
      <div className="flex items-center gap-5 px-2 my-3">
        {Object.values(availabilityConfig).map((cfg) => (
          <div key={cfg.label} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </div>
        ))}
      </div>

      {/* Date selector */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto my-4 px-2">
        {next7days.map((date, i) => {
          const isSelected = selectedDate.isSame(date, "day");
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`flex cursor-pointer flex-col border border-gray-200 items-center px-3 py-2 rounded-lg min-w-[50px] ${
                isSelected
                  ? "bg-[#f74362] text-white font-semibold"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <span className="text-sm font-black">{date.format("D")}</span>
              <span className="text-xs">{date.format("ddd")}</span>
              <span className="text-[10px]">
                {date.format("MMM").toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Theatre listings */}
      <div className="space-y-8 px-4 mb-10">
        {locationLoading && !effectiveLocation && (
          <div className="text-center text-gray-400">
            Detecting your location...
          </div>
        )}
        {!locationLoading && !effectiveLocation && (
          <div className="text-center text-gray-500">
            Please select a location to see available shows.
          </div>
        )}
        {isFetching && effectiveLocation && (
          <div className="text-center text-gray-400">
            Loading shows for {effectiveLocation}...
          </div>
        )}
        {!isFetching && effectiveLocation && filteredList.length === 0 && (
          <div className="text-center text-gray-500">
            {activeFilters.length > 0
              ? <>No shows match the selected filters (<strong>{activeFilters.join(", ")}</strong>) for {formattedDate}.</>
              : <>No shows available for <strong>{effectiveLocation}</strong> on {formattedDate}.</>
            }
          </div>
        )}

        {filteredList.map((theatre, i) => (
          <div key={i}>
            {/* Theatre header */}
            <div className="flex items-start gap-3 mb-3">
              <img
                src={theatre.img}
                alt={theatre.name}
                className="w-8 h-8 object-contain"
              />
              <div>
                <p className="font-semibold">{theatre.name}</p>
                <p className="text-sm text-[#f74362]">{theatre.cancellation}</p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex flex-wrap gap-3 ml-11">
              {theatre.timings.map((slot, j) => {
                const cfg = availabilityConfig[slot.availability] ?? availabilityConfig.AVAILABLE;
                const isFull = slot.availability === "FULL";
                return (
                  <button
                    key={j}
                    disabled={isFull}
                    onClick={() => {
                      if (isFull) return;

                      // Build the seat layout URL with real DB IDs
                      const url = `/movies/${movieId}/${routeMovieName}/${effectiveLocation}/theater/${theatre.theaterId}/shows/${slot.showId}/seat-layout`;
                      console.log("[TheaterTimings] Navigating to:", url, {
                        movieId,
                        routeMovieName,
                        effectiveLocation,
                        theaterId: theatre.theaterId,
                        showId: slot.showId,
                      });

                      // ✅ Allow viewing seat layout without login.
                      // Auth is only required at checkout/payment step.
                      navigate(url);
                    }}
                    className={`border cursor-pointer rounded-[16px] px-6 py-2 text-sm flex flex-col items-center justify-center gap-1 transition-all
                      ${cfg.border} ${isFull ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                  >
                    <span className="leading-tight font-semibold">
                      {slot.time}
                    </span>
                    <span className="text-[10px] text-gray-500 font-black">
                      {[slot.label, slot.audioType].filter(Boolean).join(" • ")}
                    </span>
                    <span className={`flex items-center gap-1 text-[9px] font-bold ${cfg.text}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TheaterTimings;
