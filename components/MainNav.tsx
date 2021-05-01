import tw from "twin.macro";
import styled from "styled-components";
import { colors } from "../util/colors";
import Link from "next/link";
import useToken from "../hooks/useToken";
import useTwitchId from "../hooks/useTwitchId";
import dynamic from "next/dynamic";
import useChannelName from "../hooks/useChannelName";

const NavList = styled.ul`
  ${tw`flex flex-row list-none p-0`}
`;

export default function MainNav() {
  const [token] = useToken();
  const [twitchId] = useTwitchId();
  const [channelName] = useChannelName();
  console.log({ token });
  return (
    <nav>
      <NavList>
        {!token && (
          <li>
            <Link href="/login">Login/Signup</Link>
          </li>
        )}
        {token && (
          <>
            <li>
              <Link href="/dashboard/host">Host</Link>
            </li>
            <li>
              <Link href="/dashboard/guest">Guest</Link>
            </li>
            <li>
              <Link href={`/invite/${twitchId}`}>Invite</Link>
            </li>
          </>
        )}
      </NavList>
    </nav>
  );
}
