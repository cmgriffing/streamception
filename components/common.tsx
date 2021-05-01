import styled, { css } from "styled-components";
import tw from "twin.macro";
import { breakpoints } from "../util/breakpoints";

export const PageContainer = styled.div`
  ${tw`mx-auto`}
  ${Object.values(breakpoints).map((value) => {
    return css`
      @media (min-width: ${value}px) {
        width: ${value}px;
      }
    `;
  })}
`;

export const CenteredContainer = styled.div`
  ${tw`flex flex-col flex-1 justify-center items-center relative bg-cover`}
`;

export const CenteredCard = styled.div`
  ${tw`p-12 w-96`}
`;
