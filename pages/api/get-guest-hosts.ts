import { DB_INDEX_GUEST_HOSTS } from "./../../util/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { withUser, NextApiRequestWithUser } from "../../util/withUser";
import faunadb from "faunadb";
import { getTwitchDetails } from "../../util/getTwitchDetails";
const q = faunadb.query;

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
});

export default withUser(async function handler(
  req: NextApiRequestWithUser,
  res: NextApiResponse
) {
  if (req.user) {
    const hostsArrays: { data: any[][] } = await faunaClient.query(
      q.Paginate(q.Match(q.Index(DB_INDEX_GUEST_HOSTS), req.user.id))
    );
    const hosts = hostsArrays.data.map(
      ([channelName, allowed, hostId, createdDate]) => ({
        channelName,
        hostId,
        createdDate,
        allowed,
      })
    );

    res.status(200).json(hosts);
  } else {
    res.status(401);
  }
});
