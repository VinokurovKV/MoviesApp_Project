import { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import MovieThumbnail from "../components/MovieThumbnail";
import { getFavorites } from "../utils/favorites";

export default function Favorites() {
  const [movies, setMovies] = useState<any[]>([]);

  const load = () => {
    const data = getFavorites();
    setMovies(data);
  };

  useEffect(() => {
    load();

    const handler = () => load();

    window.addEventListener("favoritesUpdated", handler);

    return () => {
      window.removeEventListener("favoritesUpdated", handler);
    };
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" mb={3}>
        Избранное
      </Typography>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={movie.id}>
            <MovieThumbnail movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}