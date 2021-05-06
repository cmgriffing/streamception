import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { writeStorage } from "@rehooks/local-storage";
import useToken, { LOCALSTORAGE_TOKEN_KEY } from "../hooks/useToken";
import { LOCALSTORAGE_TWITCH_ID_KEY } from "../hooks/useTwitchId";
import { LOCALSTORAGE_TWITCH_NAME_KEY } from "../hooks/useChannelName";
import useAxios from "../hooks/useAxios";
import usePreviousRoute from "../hooks/usePreviousRoute";

export default function BaseTwitchTokenHandler() {
  const router = useRouter();
  const [previousRoute] = usePreviousRoute();
  const [token, setToken] = useState("");
  const axios = useAxios(token);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.location.hash.split("&")[0]?.substring(14);
      window.localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.get(`/api/get-twitch-details`).then((response: any) => {
        window.localStorage.setItem(
          LOCALSTORAGE_TWITCH_ID_KEY,
          response.data.twitchId
        );
        window.localStorage.setItem(
          LOCALSTORAGE_TWITCH_NAME_KEY,
          response.data.channelName
        );
      });
    }
  }, [token]);

  useEffect(() => {
    if (!previousRoute || !token) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
      return;
    }
    if (previousRoute.indexOf("/invite") > -1) {
      const routeParts = previousRoute.split("/");
      const twitchId = routeParts[routeParts.length - 1];
      axios
        .post(`/add-host`, {
          twitchId,
        })
        .then(() => {
          router.push("/dashboard/guest");
        })
        .catch(() => {
          // query param on url?
          router.push("/dashboard/guest?error");
        });
    }
  }, [previousRoute, token]);

  return <span></span>;
}
