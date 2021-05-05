import styled, { css } from "styled-components";
import tw from "twin.macro";
import { breakpoints } from "../util/breakpoints";
import { colors } from "../util/colors";

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
  ${tw`flex flex-col flex-1 justify-center items-center relative bg-cover min-h-full`}
`;

export const Card = styled.div`
  ${tw`py-6 px-8 w-96 max-w-full rounded`}

  background: ${colors.lightBg};
  color: ${colors.bg};
`;

export const CenteredCard = styled(Card)``;

export const PrimaryButton = styled.button`
  ${tw`px-6 py-2 rounded shadow border-2 border-solid font-bold`}

  border-color: ${colors.text};
  background: ${colors.lightBg};
  color: ${colors.bg};
`;
export const SecondaryButton = styled(PrimaryButton)`
  border-color: ${colors.text};
  background: ${colors.bg};
  color: ${colors.text};
`;

export const LogCard = styled(Card)`
  color: ${colors.bg};

  * {
    color: ${colors.bg};
  }

  h2 {
    ${tw`text-2xl`}
  }

  p {
    ${tw`mb-6`}
  }

  table {
    ${tw`w-full`}
  }
  tr {
    ${tw`h-12`}
  }

  td {
    ${tw`text-center`}
  }

  td:first-child {
    ${tw`text-left font-bold`}
  }

  td:last-child {
    ${tw`text-right`}
  }
`;

export const StatusLabel = styled.span`
  ${tw`p-2 rounded`}

  ${({ allowed }) => {
    if (allowed) {
      return `background: ${colors.accent};`;
    } else {
      return `background: ${colors.error};`;
    }
  }}
`;
