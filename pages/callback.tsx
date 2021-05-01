import tw from "twin.macro";
import styled from "styled-components";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const CallbackContainer = styled.div`
  ${tw`flex flex-col flex-1 justify-center items-center relative bg-cover`}
`;

const CallbackCard = styled.div`
  ${tw`p-12 w-96`}
`;

const TwitchTokenHandler = dynamic(
  () => import("../components/TwitchTokenHandler"),
  { ssr: false }
);

export default function Callback() {
  return (
    <CallbackContainer>
      <TwitchTokenHandler />
      <CallbackCard>
        <h2 className="text-4xl z-10">Logging in...</h2>
      </CallbackCard>
    </CallbackContainer>
  );
}
