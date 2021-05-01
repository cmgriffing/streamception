import { useLocalStorage } from "@rehooks/local-storage";

export const LOCALSTORAGE_TWITCH_NAME_KEY = "twitchName";

export default function useChannelName() {
  if (typeof window !== "undefined") {
    return useLocalStorage<string>(LOCALSTORAGE_TWITCH_NAME_KEY);
  } else {
    return [];
  }
}
