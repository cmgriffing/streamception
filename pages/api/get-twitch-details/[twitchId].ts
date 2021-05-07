import axios from "axios";
import { withUser, NextApiRequestWithUser } from "../../../util/withUser";

export default withUser(async (req: NextApiRequestWithUser, res) => {
  const { twitchId } = req.query;

  const userResponse: any = await axios
    .get(`https://api.twitch.tv/helix/users?id=${twitchId}`, {
      headers: {
        Authorization: `Bearer ${req.token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
      },
    })
    .catch((error) => {
      console.log({ error });
    });

  const { display_name } = userResponse?.data?.data[0];

  res.status(200).json({ twitchId, channelName: display_name });
});
