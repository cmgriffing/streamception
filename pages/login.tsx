import Link from "next/link";
import { CenteredContainer, CenteredCard } from "../components/common";

export default function Login() {
  let redirectUrl = process.env.TWITCH_REDIRECT_URL;

  redirectUrl = `https://608ca76ef64537545408abd4--gracious-agnesi-9a6325.netlify.app/callback`;

  return (
    <CenteredContainer>
      <CenteredCard>
        <h1 className="text-5xl z-10">Login or Signup</h1>
        <p>Either way just click the button below.</p>
        <Link
          href={`https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=token&scope=user_read`}
        >
          Login
        </Link>
      </CenteredCard>
    </CenteredContainer>
  );
}
