import "../styles/globals.css";
import { GlobalStyles } from "../components/GlobalStyles";
import { PageContainer } from "../components/common";
import tw from "twin.macro";
import styled from "styled-components";
import dynamic from "next/dynamic";

const MainNav = dynamic(() => import("../components/MainNav"), { ssr: false });

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
  return (
    <div className="flex flex-col h-screen">
      <GlobalStyles />
      <PageContainer>
        <Header>
          <Title>Streamception</Title>
          <MainNav />
        </Header>
      </PageContainer>
      <div className="flex flex-col flex-1">
        <Component {...pageProps} />
      </div>
      <Footer>©{new Date().getFullYear()} Streamception</Footer>
    </div>
  );
}

export default MyApp;
