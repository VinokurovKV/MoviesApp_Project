import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import Filters from "../components/Filters";
import MovieThumbnail from "../components/MovieThumbnail";
import { fetchMovies } from "../api/movies";
import ComparePanel from "../components/ComparePanel";

export async function loader({ request }: any) {
  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page") || 1);
  const rating = url.searchParams.get("rating") || "1-10";
  const year = url.searchParams.get("year") || "1900-2025";
  const genres = url.searchParams.getAll("genres");

  const data = await fetchMovies(page, {
    rating,
    year,
    genres,
  });

  return { data, page };
}

export default function Home() {
  const { data, page } = useLoaderData() as any;

  const [movies, setMovies] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const loadingRef = useRef(false);
  const prevHeightRef = useRef(0);

  useEffect(() => {
    if (page === 1) {
      setMovies(data.docs);
    } else {
      setMovies((prev) => [...prev, ...data.docs]);
    }

    loadingRef.current = false;

    if (prevHeightRef.current) {
      window.scrollTo(0, prevHeightRef.current);
    }
  }, [data, page]);

  const handleScroll = () => {
    if (loadingRef.current) return;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      loadingRef.current = true;

      prevHeightRef.current = window.scrollY;

      const nextPage = page + 1;

      const params = new URLSearchParams(searchParams);
      params.set("page", String(nextPage));

      navigate(`/?${params.toString()}`, {
        preventScrollReset: true,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleApplyFilters = (filters: any) => {
    const params = new URLSearchParams();

    params.set("page", "1");
    params.set("rating", filters.rating);
    params.set("year", filters.year);

    filters.genres?.forEach((g: string) => {
      params.append("genres", g);
    });

    navigate(`/?${params.toString()}`);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Фильмы
      </Typography>

      <ComparePanel />

      <Filters onApply={handleApplyFilters} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={2}
      >
        {movies.map((movie: any) => (
          <MovieThumbnail key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
}