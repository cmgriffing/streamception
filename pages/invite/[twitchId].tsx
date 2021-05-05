import dynamic from "next/dynamic";
import { CenteredCard, CenteredContainer } from "../../components/common";

const InviteContent = dynamic(
  () => import("../../components/invite/InviteContent"),
  { ssr: false }
);

export default function Invite(props) {
  return (
    <div>
      <CenteredContainer>
        <h2 className="text-3xl mt-12 mb-8">Allow Host</h2>
        <CenteredCard>
          <InviteContent {...props} />
        </CenteredCard>
      </CenteredContainer>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      clientId: process.env.TWITCH_CLIENT_ID,
      redirectUrl: process.env.TWITCH_REDIRECT_URL,
    },
  };
}
