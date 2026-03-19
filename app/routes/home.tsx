import type { Route } from "./+types/home";
import { Typography, Box, Grid } from "@mui/material";
import { fetchMovies } from "../api/movies";
import { useLoaderData } from "react-router";
import MovieThumbnail from "../components/MovieThumbnail";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Movies App" }];
}

export async function loader() {
  const data = await fetchMovies(1);
  return data;
}

export default function Home() {
  const data = useLoaderData() as any;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Фильмы
      </Typography>

      <Grid container spacing={2}>
        {data.docs?.map((movie: any) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 3 }}
            key={movie.id}
          >
            <MovieThumbnail movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}