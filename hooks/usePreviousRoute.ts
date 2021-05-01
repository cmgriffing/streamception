import { useLocalStorage } from "@rehooks/local-storage";

export const LOCALSTORAGE_PREVIOUS_ROUTE_KEY = "previousRoute";

export default function usePreviousRoute() {
  if (typeof window !== "undefined") {
    return useLocalStorage<string>(LOCALSTORAGE_PREVIOUS_ROUTE_KEY);
  } else {
    return [];
  }
}
