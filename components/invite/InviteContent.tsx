import { useRouter } from "next/router";
import useAxios from "../../hooks/useAxios";
import { LOCALSTORAGE_PREVIOUS_ROUTE_KEY } from "../../hooks/usePreviousRoute";
import useToken from "../../hooks/useToken";

export default function InviteContent() {
  const router = useRouter();
  const [token] = useToken();
  const axios = useAxios(token);

  const { twitchId } = router.query;

  function handleAcceptanceClick() {
    if (token) {
      axios
        .post("/api/add-invitation", {
          twitchId,
          allowed: true,
        })
        .then(() => {
          router.push("/dashboard/guest");
        });
    } else {
      window.localStorage.setItem(
        LOCALSTORAGE_PREVIOUS_ROUTE_KEY,
        `/invite/twitchId`
      );

      const url = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_REDIRECT_URL}&response_type=token&scope=user_read`;

      window.location.href = url;
    }
  }
  return (
    <>
      <h2>Allow Host</h2>
      <p>
        Would you like to allow [[USERNAME]] to watch your stream on their own?
      </p>

      <button
        className=""
        onClick={() => {
          handleAcceptanceClick();
        }}
      >
        Proceed
      </button>
    </>
  );
}
