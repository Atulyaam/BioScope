import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL ?? "/api/v1";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// 🔍 Log every outgoing request
axiosInstance.interceptors.request.use((config) => {
  console.log(
    `[API REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
  );
  return config;
});

// 🔍 Log every response or error
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      `[API RESPONSE] ${response.status} ${response.config.url}`,
      response.data,
    );
    return response;
  },
  (error) => {
    console.error(
      `[API ERROR] ${error.config?.url}`,
      error.message,
      error.response?.data,
    );
    return Promise.reject(error);
  },
);

/**
 * Fetch shows for a given movie, location, and date.
 * @param {string} movieId
 * @param {string} locationId
 * @param {string} date - formatted as "DD-MM-YYYY"
 */
export const getShowsByMovieAndLocation = (movieId, locationId, date) => {
  return axiosInstance.get(`/shows`, {
    // include both keys to match backend expectations
    params: { movieId, date, state: locationId, locationId },
  });
};

export const getRecommendedMovies = () => {
  console.log("[getRecommendedMovies] Calling /movies/recommended...");
  return axiosInstance.get(`/movies/recommended`);
};

export const getMovieById = (id) => {
  return axiosInstance.get(`/movies/${id}`);
};
