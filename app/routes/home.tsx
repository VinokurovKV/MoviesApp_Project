import type { Route } from "./+types/home";
import { Typography, Box } from "@mui/material";
import { fetchMovies } from "../api/movies";
import { useLoaderData } from "react-router";

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

      <pre style={{ fontSize: 12 }}>
        {JSON.stringify(data.docs?.slice(0, 3), null, 2)}
      </pre>
    </Box>
  );
}