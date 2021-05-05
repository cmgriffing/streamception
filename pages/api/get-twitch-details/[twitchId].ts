import { withUser, NextApiRequestWithUser } from "../../../util/withUser";

export default withUser((req: NextApiRequestWithUser, res) => {
  if (req.user) {
    const { display_name } = req.user;
    const { twitchId } = req.query;
    res.status(200).json({ twitchId, channelName: display_name });
  } else {
    res.status(401);
  }
});
