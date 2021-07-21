import Link from "next/link";
import { useState, useEffect } from "react";
import {
  CenteredContainer,
  CenteredCard,
  TwitchButton,
} from "../components/common";
import styled from "styled-components";
import { colors } from "../util/colors";
import tw from "twin.macro";

const Title = styled.h2`
  ${tw`text-3xl mb-4 text-center`}

  color: ${colors.bg};
`;

export default function Login({ redirectUrl, clientId }) {
  return (
    <CenteredContainer>
      <CenteredCard>
        <Title>Login or Signup</Title>
        <div className="pt-4 text-center">
          <TwitchButton
            as="a"
            href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=user_read`}
          >
            Login with Twitch <img src="/twitch-logo.png" />
          </TwitchButton>
        </div>
      </CenteredCard>
    </CenteredContainer>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      clientId: process.env.TWITCH_CLIENT_ID,
      redirectUrl: process.env.TWITCH_REDIRECT_URL,
    },
  };
}
