import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";
import { colors } from "../util/colors";

const CustomStyles = createGlobalStyle`
  body {
    ${tw`antialiased`}
    -webkit-tap-highlight-color: ${theme`colors.purple.500`};
    background: ${colors.bg};
  }

  * {
    font-family: 'Open Sans', sans-serif;
    color: ${colors.text};
  }

  h1, h2 {
    font-family: 'Lobster Two', cursive;
    font-weight: 700;
  }
`;

export const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);
