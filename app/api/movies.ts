import axios from "axios";

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

const api = axios.create({
  baseURL: "https://api.kinopoisk.dev/v1.4",
  headers: {
    "X-API-KEY": API_KEY,
  },
});

export async function fetchMovieById(id: string) {
  const res = await api.get(`/movie/${id}`);
  return res.data;
}

export async function fetchMovies(page: number, filters?: any) {
  const params: any = {
    page,
    limit: 50,
    "rating.kp": filters?.rating || "1-10",
    year: filters?.year || "1900-2025",
  };

  if (filters?.genres?.length) {
    params["genres.name"] = filters.genres;
  }

  const res = await api.get("/movie", { params });

  return res.data;
}