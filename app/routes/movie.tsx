import { useLoaderData } from "react-router";
import { Box, Typography, Chip } from "@mui/material";
import { fetchMovieById } from "../api/movies";

export async function loader({ params }: any) {
  const data = await fetchMovieById(params.id);
  return { movie: data };
}

export default function MoviePage() {
  const { movie } = useLoaderData() as any;

  return (
    <Box p={3}>
      <Box display="flex" gap={4} flexWrap="wrap">
        <Box>
          {movie.poster?.url ? (
            <img
              src={movie.poster.url}
              alt={movie.name}
              style={{ width: 300, borderRadius: 8 }}
            />
          ) : (
            <Box
              width={300}
              height={450}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#eee"
            >
              Нет постера
            </Box>
          )}
        </Box>

        <Box maxWidth={600}>
          <Typography variant="h4" mb={2}>
            {movie.name || "Без названия"}
          </Typography>

          <Typography mb={2}>
            {movie.description || "Нет описания"}
          </Typography>

          <Typography mb={1}>
            Рейтинг: {movie.rating?.kp || "—"}
          </Typography>

          <Typography mb={1}>
            Год: {movie.year || "—"}
          </Typography>

          <Typography mb={2}>
            Дата выхода: {movie.premiere?.world || "—"}
          </Typography>

          <Box display="flex" gap={1} flexWrap="wrap">
            {movie.genres?.map((g: any) => (
              <Chip key={g.name} label={g.name} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}