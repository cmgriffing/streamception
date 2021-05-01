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
    color: ${colors.text};
  }
`;

export const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);
