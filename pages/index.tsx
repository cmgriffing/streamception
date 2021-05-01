import Head from "next/head";
import tw from "twin.macro";
import styled from "styled-components";
import { colors } from "../util/colors";
import Link from "next/link";

const Hero = styled.div`
  ${tw`flex flex-col flex-1 justify-center items-center relative`}

  background: url("https://www.fillmurray.com/g/800/800");
  background-size: cover;
`;

const HeroFill = styled.div`
  ${tw`h-full w-full absolute z-0 opacity-70`}

  background: ${colors.bg};
`;

export default function Home() {
  return (
    <>
      <Hero>
        <h1 className="text-8xl z-10">Who streams the streamers?</h1>
        <p className="text-3xl z-10">
          Cleanly manage who you can show on your stream and vice versa.
        </p>
        <Link href="/login">
          <a className="text-5xl z-10">Get Started</a>
        </Link>
        <HeroFill />
      </Hero>
    </>
  );
}
