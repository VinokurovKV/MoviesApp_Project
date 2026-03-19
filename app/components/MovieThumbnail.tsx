import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router";

type Props = {
  movie: any;
};

export default function MovieThumbnail({ movie }: Props) {
  const navigate = useNavigate();

  const title =
    movie.name ||
    movie.alternativeName ||
    "Без названия";

  const rating = movie.rating?.kp
    ? movie.rating.kp.toFixed(1)
    : "—";

  const hasImage = !!movie.poster?.url;

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      {hasImage ? (
        <CardMedia
          component="img"
          height="300"
          image={movie.poster.url}
          alt={title}
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

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {movie.year || "—"}
        </Typography>

        <Box display="flex" alignItems="center" gap={0.5}>
          <StarIcon sx={{ color: "#f5c518", fontSize: 18 }} />
          <Typography variant="body2">
            {rating}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}