import { setLocalStorage } from "@/helpers/localStorage";

export function useStorage() {
  return {
    setItem: (key: string, value: unknown) => {
      setLocalStorage(key, value);
    },
    getItem: (key: string) => localStorage.getItem(key),
    getJson: (key: string) => JSON.parse(localStorage.getItem(key) || "{}"),
    getInt: (key: string) => parseInt(localStorage.getItem(key) || "0"),
    getBoolean: (key: string) => localStorage.getItem(key) === "true",
    removeItem: (key: string) => localStorage.removeItem(key),
    clear: () => localStorage.clear(),
  };
}

export function useGetItem() {
  const { getItem } = useStorage();
  return (key: string) => getItem(key);
}

export function useSetItem() {
  const { setItem } = useStorage();
  return (key: string, value: unknown) =>
    setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
}

export function useRemoveItem() {
  const { removeItem } = useStorage();
  return (key: string) => removeItem(key);
}

export function useClear() {
  const { clear } = useStorage();
  return () => clear();
}

export function useGetInt() {
  const { getInt } = useStorage();
  return (key: string) => getInt(key);
}

export function useGetBoolean() {
  const { getBoolean } = useStorage();
  return (key: string) => getBoolean(key);
}

export function useGetJson() {
  const { getJson } = useStorage();
  return (key: string) => getJson(key);
}
