import type { Route } from "./+types/home";
import { Typography, Box } from "@mui/material";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movies App" }
  ];
}

export default function Home() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Фильмы
      </Typography>

      <Typography>
        Здесь будет список фильмов
      </Typography>
    </Box>
  );
}