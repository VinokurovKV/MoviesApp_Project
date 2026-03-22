const KEY = "compare";

export function getCompare(): any[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function toggleCompare(movie: any) {
  let list = getCompare();

  const exists = list.some((m) => m.id === movie.id);

  if (exists) {
    list = list.filter((m) => m.id !== movie.id);
  } else {
    if (list.length === 2) {
      list.shift();
    }
    list.push(movie);
  }

  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("compareUpdated"));

  return list;
}

export function isInCompare(id: number) {
  return getCompare().some((m) => m.id === id);
}

export function clearCompare() {
  localStorage.removeItem("compare");
  window.dispatchEvent(new Event("compareUpdated"));
}