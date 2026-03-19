import { Box } from "@mui/material";
import MovieThumbnail from "./MovieThumbnail";
import { memo } from "react";

type Props = {
  movies: any[];
};

function MoviesGrid({ movies }: Props) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={2}
    >
      {movies.map((movie: any) => (
        <MovieThumbnail key={movie.id} movie={movie} />
      ))}
    </Box>
  );
}

export default memo(MoviesGrid);