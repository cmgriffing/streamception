import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { LOCALSTORAGE_PREVIOUS_ROUTE_KEY } from "../../hooks/usePreviousRoute";
import styled from "styled-components";
import { colors } from "../../util/colors";
import { SecondaryButton } from "../common";
import tw from "twin.macro";
import { TokenContext } from "../../context/token";
const Paragraph = styled.p`
  color: ${colors.bg};
`;

const ChannelName = styled.b`
  ${tw`p-1 rounded shadow`}

  background: ${colors.text};
  color: ${colors.bg};
  font-weight: 700;
`;

export default function InviteContent({ clientId, redirectUrl }) {
  const router = useRouter();
  const [token] = useContext(TokenContext);
  const axios = useAxios(token);
  const { twitchId } = router.query;
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    if (token) {
      axios.post(`/api/get-twitch-details/${twitchId}`).then((result) => {
        setChannelName(result.data.channelName);
      });
    }
  }, []);

  function handleAcceptanceClick() {
    if (token) {
      axios
        .post("/api/set-permission", {
          twitchId,
          allowed: true,
        })
        .then(() => {
          router.push("/dashboard/guest");
        });
    } else {
      window.localStorage.setItem(
        LOCALSTORAGE_PREVIOUS_ROUTE_KEY,
        `/invite/${twitchId}`
      );

      const url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=user_read`;

      window.location.href = url;
    }
  }
  if (token) {
    return (
      <>
        <Paragraph>
          Allow <ChannelName>{channelName}</ChannelName> to watch your stream on
          their own?
        </Paragraph>

        <div className="pt-4 text-center">
          <SecondaryButton
            onClick={() => {
              handleAcceptanceClick();
            }}
          >
            Proceed
          </SecondaryButton>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Paragraph>
          You are about to allow a streamer to show your stream on theirs. We
          need you to log in first.
        </Paragraph>

        <div className="pt-4 text-center">
          <SecondaryButton
            onClick={() => {
              handleAcceptanceClick();
            }}
          >
            Proceed
          </SecondaryButton>
        </div>
      </>
    );
  }
}
