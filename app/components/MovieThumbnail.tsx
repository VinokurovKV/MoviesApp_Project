import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import FavoriteModal from "./FavoriteModal";

type Props = {
  movie: any;
};

export default function MovieThumbnail({ movie }: Props) {
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(movie.id));
  }, [movie.id]);

  const title =
    movie.name ||
    movie.alternativeName ||
    "Без названия";

  const rating = movie.rating?.kp
    ? movie.rating.kp.toFixed(1)
    : "—";

  const hasImage = !!movie.poster?.url;

  const handleClickFavorite = (e: any) => {
    e.stopPropagation();

    if (favorite) {
        const updated = toggleFavorite(movie);
        setFavorite(updated.some((m: any) => m.id === movie.id));
    } else {
        setOpen(true);
    }
    };

    const handleConfirm = () => {
    const updated = toggleFavorite(movie);
    setFavorite(updated.some((m: any) => m.id === movie.id));
    setOpen(false);
    };

  return (
    <>
      <Card
        onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{
          position: "relative",
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
        <Box position="absolute" top={8} right={8} zIndex={1}>
          <IconButton
            onClick={handleClickFavorite}
            sx={{
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": { bgcolor: "white" },
            }}
          >
            {favorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>

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

      <FavoriteModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={title}
      />
    </>
  );
}