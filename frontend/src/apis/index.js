import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/**
 * Fetch shows for a given movie, location, and date.
 * @param {string} movieId
 * @param {string} locationId
 * @param {string} date - formatted as "DD-MM-YYYY"
 */
export const getShowsByMovieAndLocation = (movieId, locationId, date) => {
  return axiosInstance.get(`/shows`, {
    params: { movieId, locationId, date },
  });
};
