import { withUser, NextApiRequestWithUser } from "../../util/withUser";

export default withUser((req: NextApiRequestWithUser, res) => {
  if (req.user) {
    const { id, display_name } = req.user;
    res.status(200).json({ twitchId: id, channelName: display_name });
  } else {
    res.status(401);
  }
});
