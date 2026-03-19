const KEY = "favorites";

export function getFavorites(): any[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function isFavorite(id: number) {
  return getFavorites().some((m) => m.id === id);
}

export function toggleFavorite(movie: any) {
  const favorites = getFavorites();

  let updated;

  if (favorites.some((m) => m.id === movie.id)) {
    updated = favorites.filter((m) => m.id !== movie.id);
  } else {
    updated = [...favorites, movie];
  }

  localStorage.setItem(KEY, JSON.stringify(updated));

  window.dispatchEvent(new Event("favoritesUpdated"));

  return updated;
}