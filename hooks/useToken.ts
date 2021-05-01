import { useLocalStorage } from "@rehooks/local-storage";

export const LOCALSTORAGE_TOKEN_KEY = "token";

export default function useToken() {
  if (typeof window !== "undefined") {
    return useLocalStorage<string>(LOCALSTORAGE_TOKEN_KEY);
  } else {
    return [];
  }
}
