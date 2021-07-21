import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LOCALSTORAGE_TWITCH_ID_KEY } from "../hooks/useTwitchId";
import { LOCALSTORAGE_TWITCH_NAME_KEY } from "../hooks/useChannelName";
import useAxios from "../hooks/useAxios";
import usePreviousRoute from "../hooks/usePreviousRoute";
import { TokenContext } from "../context/token";
import { LOCALSTORAGE_TOKEN_KEY } from "../util/constants";
import { writeStorage } from "@rehooks/local-storage";

export default function BaseTwitchTokenHandler() {
  const router = useRouter();
  const [previousRoute] = usePreviousRoute();
  const [token, setToken] = useContext(TokenContext);
  const axios = useAxios(token);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.location.hash.split("&")[0]?.substring(14);
      writeStorage(LOCALSTORAGE_TOKEN_KEY, token);
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.get(`/api/get-twitch-details`).then((response: any) => {
        writeStorage(LOCALSTORAGE_TWITCH_ID_KEY, response.data.twitchId);
        writeStorage(LOCALSTORAGE_TWITCH_NAME_KEY, response.data.channelName);
      });
    }
  }, [token]);

  useEffect(() => {
    if (!previousRoute && !isNavigating) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
      setIsNavigating(true);
    } else if (previousRoute && !isNavigating) {
      router.push(previousRoute);
    }
  }, [previousRoute, isNavigating]);

  return <span></span>;
}
