import axios from "axios";

export async function getTwitchDetails(token, twitchUserId) {
  const userResponse: any = await axios
    .get(`https://api.twitch.tv/helix/users?id=${twitchUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
      },
    })
    .catch((error) => {
      console.log({ error });
    });
  const user = userResponse?.data?.data[0];
  return user;
}
