import styled from "styled-components";
import useToken from "../hooks/useToken";
import useTwitchId from "../hooks/useTwitchId";
import { PrimaryButton } from "./common";

const InviteButtonElement = styled(PrimaryButton)``;

export default function InviteButton() {
  const [token] = useToken();
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
