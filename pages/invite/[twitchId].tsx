import dynamic from "next/dynamic";
import { CenteredCard, CenteredContainer } from "../../components/common";

const InviteContent = dynamic(
  () => import("../../components/invite/InviteContent"),
  { ssr: false }
);

export default function Invite() {
  return (
    <div>
      <CenteredContainer>
        <CenteredCard>
          <InviteContent />
        </CenteredCard>
      </CenteredContainer>
    </div>
  );
}
