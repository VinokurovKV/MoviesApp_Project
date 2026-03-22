import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { getCompare, clearCompare } from "../utils/compare";

export default function ComparePanel() {
  const [movies, setMovies] = useState<any[]>([]);

  const load = () => {
    setMovies(getCompare());
  };

  useEffect(() => {
    clearCompare();
  }, []);

  useEffect(() => {
    load();

    window.addEventListener("compareUpdated", load);

    return () => {
      window.removeEventListener("compareUpdated", load);
    };
  }, []);

  if (movies.length === 0) return null;

  return (
    <Box mt={8} mb={6} px={2}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" mb={3}>
          Сравнение фильмов
        </Typography>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Название</TableCell>
              {movies.map((m) => (
                <TableCell key={m.id}>{m.name}</TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell>Год</TableCell>
              {movies.map((m) => (
                <TableCell key={m.id}>{m.year}</TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell>Рейтинг</TableCell>
              {movies.map((m) => (
                <TableCell key={m.id}>
                  {m.rating?.kp ?? "—"}
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell>Жанры</TableCell>
              {movies.map((m) => (
                <TableCell key={m.id}>
                  {m.genres?.map((g: any) => g.name).join(", ")}
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell>Длительность</TableCell>
              {movies.map((m) => (
                <TableCell key={m.id}>
                  {m.movieLength ?? "—"}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}