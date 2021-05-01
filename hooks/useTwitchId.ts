import { useLocalStorage } from "@rehooks/local-storage";

export const LOCALSTORAGE_TWITCH_ID_KEY = "twitchId";

export default function useTwitchId() {
  if (typeof window !== "undefined") {
    return useLocalStorage<string>(LOCALSTORAGE_TWITCH_ID_KEY);
  } else {
    return [];
  }
}
