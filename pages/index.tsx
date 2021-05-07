import Head from "next/head";
import tw from "twin.macro";
import styled from "styled-components";
import { colors } from "../util/colors";
import Link from "next/link";
import { SecondaryButton } from "../components/common";

const Hero = styled.div`
  ${tw`flex flex-col flex-1 justify-center items-center relative`}

  background: url("/lines-fractal.png");
  background-size: cover;
`;

const HeroFill = styled.div`
  ${tw`h-full w-full absolute z-0 opacity-70`}

  background: ${colors.bg};
`;

const GetStartedButton = styled(SecondaryButton)`
  ${tw`z-10 mt-8 text-2xl`}
`;

export default function Home() {
  return (
    <>
      <Hero>
        <h1 className="text-8xl z-10">Who streams the streamers?</h1>
        <p className="text-3xl z-10">
          Cleanly manage who you can show on your stream and vice versa.
        </p>
        <GetStartedButton href="/login">Get Started</GetStartedButton>
        <HeroFill />
      </Hero>
    </>
  );
}
