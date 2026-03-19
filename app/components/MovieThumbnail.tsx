import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

type Props = {
  movie: any;
};

export default function MovieThumbnail({ movie }: Props) {
  const hasImage = !!movie.poster?.url;

  return (
    <Card sx={{ height: "100%" }}>
      {hasImage ? (
        <CardMedia
          component="img"
          height="300"
          image={movie.poster.url}
          alt={movie.name}
        />
      ) : (
        <Box
          height={300}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
          }}
        >
          <Box textAlign="center">
            <ImageIcon sx={{ fontSize: 40, color: "#1976d2" }} />
            <Typography variant="body2" color="text.secondary">
              Нет постера
            </Typography>
          </Box>
        </Box>
      )}

      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>
          {movie.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {movie.year}
        </Typography>

        <Typography variant="body2">
          {movie.rating?.kp || "—"}
        </Typography>
      </CardContent>
    </Card>
  );
}