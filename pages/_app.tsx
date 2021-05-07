import "../styles/globals.css";
import { GlobalStyles } from "../components/GlobalStyles";
import { PageContainer } from "../components/common";
import tw from "twin.macro";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Head from "next/head";
import { TokenContext } from "../context/token";
import { useEffect, useState } from "react";
import { LOCALSTORAGE_TOKEN_KEY } from "../util/constants";

const MainNav = dynamic(() => import("../components/MainNav"), { ssr: false });
const InviteButton = dynamic(() => import("../components/InviteButton"), {
  ssr: false,
});

const Title = styled.h1`
  ${tw`text-4xl`}
`;

const Header = styled.header`
  ${tw`flex flex-row justify-between items-center p-4`}
`;

const Footer = styled.footer`
  ${tw`text-center p-8`}
`;

function MyApp({ Component, pageProps }) {
  const tokenState = useState<string>(null);
  const token = tokenState[0];
  const setToken = tokenState[1];

  const [currentToken, setCurrentToken] = useState<string>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

      setToken(localToken);
      setCurrentToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (token && token !== currentToken && typeof window !== "undefined") {
      window.localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
      setCurrentToken(token);
    }
  }, [token, currentToken]);

  return (
    <TokenContext.Provider value={tokenState}>
      <div className="flex flex-col h-screen">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href={
              "https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&family=Open+Sans:wght@300;400;600&display=swap"
            }
            rel="stylesheet"
          />
        </Head>
        <GlobalStyles />
        <PageContainer>
          <Header>
            <Title>Streamception</Title>
            <MainNav />
            <InviteButton />
          </Header>
        </PageContainer>
        <div className="flex flex-col flex-1">
          <Component {...pageProps} />
        </div>
        <Footer>©{new Date().getFullYear()} Streamception</Footer>
      </div>
    </TokenContext.Provider>
  );
}

export default MyApp;
