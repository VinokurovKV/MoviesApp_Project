import type { Route } from "./+types/home";
import { Typography, Box } from "@mui/material";
import { fetchMovies } from "../api/movies";
import { useLoaderData } from "react-router";
import MovieThumbnail from "../components/MovieThumbnail";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Movies App" }];
}

export async function loader() {
  const data = await fetchMovies(1);
  return data;
}

export default function Home() {
  const data = useLoaderData() as any;

  const [movies, setMovies] = useState(data.docs);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading
      ) {
        setLoading(true);

        const newData = await fetchMovies(page);

        setMovies((prev: any) => [...prev, ...newData.docs]);
        setPage((prev) => prev + 1);

        setLoading(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Фильмы
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={2}
      >
        {movies.map((movie: any) => (
          <MovieThumbnail key={movie.id} movie={movie} />
        ))}
      </Box>

      {loading && (
        <Typography align="center" sx={{ mt: 2 }}>
          Загрузка...
        </Typography>
      )}
    </Box>
  );
}