import type { RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",
    file: "routes/home.tsx",
  },
  {
    path: "movie/:id",
    file: "routes/movie.tsx",
  },
] satisfies RouteConfig;