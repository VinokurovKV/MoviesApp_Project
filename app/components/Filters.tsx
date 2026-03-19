import { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const GENRES = [
  "драма",
  "комедия",
  "боевик",
  "триллер",
  "ужасы",
  "мелодрама",
  "фантастика",
  "приключения",
  "аниме",
  "мультфильм",
];

export default function Filters({ onApply }: any) {
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState<string[]>([]);

  const apply = () => {
    const params: any = {};

    const hasRating = rating.includes("-");
    const hasYear = year.includes("-");

    params.rating = hasRating ? rating : "1-10";
    params.year = hasYear ? year : "1900-2025";

    if (genres.length > 0) {
      params.genres = genres;
    }

    onApply(params);
  };

  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
      <TextField
        label="Рейтинг"
        placeholder="7-10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <TextField
        label="Год"
        placeholder="2000-2020"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <TextField
        select
        label="Жанры"
        SelectProps={{
          multiple: true,
          value: genres,
          onChange: (e) => setGenres(e.target.value as string[]),
        }}
        sx={{ minWidth: 200 }}
      >
        {GENRES.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={apply}>
        Применить
      </Button>
    </Box>
  );
}