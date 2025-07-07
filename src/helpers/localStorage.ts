export const setLocalStorage = (key: string, value: unknown) => {
  // if exists, update
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
  localStorage.setItem(
    key,
    typeof value === "object" ? JSON.stringify(value) : String(value),
  );
};
