import { withUser, NextApiRequestWithUser } from "../../util/withUser";

export default withUser((req: NextApiRequestWithUser, res) => {
  if (req.user) {
    const { id, name } = req.user;
    res.status(200).json({ twitchId: id, channelName: name });
  } else {
    res.status(401);
  }
});
