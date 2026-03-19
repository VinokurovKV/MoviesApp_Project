import axios from "axios";

const API_URL = "https://api.kinopoisk.dev/v1.4/movie";

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export const fetchMovies = async (page: number = 1) => {
  const response = await axios.get(API_URL, {
    headers: {
      "X-API-KEY": API_KEY,
    },
    params: {
      page,
      limit: 20,
    },
  });

  return response.data;
};