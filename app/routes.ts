import { route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("/movie/:id", "routes/movie.tsx"),
  route("/favorites", "routes/favorites.tsx"),
];