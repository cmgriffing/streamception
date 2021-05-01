import Link from "next/link";
import { useState, useEffect } from "react";
import { CenteredContainer, CenteredCard } from "../components/common";

export default function Login({ redirectUrl, clientId }) {
  return (
    <CenteredContainer>
      <CenteredCard>
        <h1 className="text-5xl z-10">Login or Signup</h1>
        <p>Either way just click the button below.</p>
        <Link
          href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=user_read`}
        >
          Login
        </Link>
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
