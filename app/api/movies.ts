import axios from "axios";

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

const getApiUrl = () => {
  if (typeof window === "undefined") {
    return "https://api.kinopoisk.dev/v1.4/movie";
  }

  return "/api/v1.4/movie";
};

export const fetchMovies = async (page: number = 1) => {
  const response = await axios.get(getApiUrl(), {
    headers: {
      "X-API-KEY": API_KEY,
    },
    params: {
      page,
      limit: 50,
    },
  });

  return response.data;
};