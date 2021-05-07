import { useContext } from "react";
import styled from "styled-components";
import { TokenContext } from "../context/token";
import useTwitchId from "../hooks/useTwitchId";
import { PrimaryButton } from "./common";

const InviteButtonElement = styled(PrimaryButton)``;

export default function InviteButton() {
  const [token] = useContext(TokenContext);
  const [twitchId] = useTwitchId();
  if (token) {
    return (
      <InviteButtonElement
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.protocol}//${window.location.host}/invite/${twitchId}`
          );
        }}
      >
        Copy Invite Link
      </InviteButtonElement>
    );
  } else {
    return <></>;
  }
}
