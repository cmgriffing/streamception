import { DB_COLLECTION_INVITATIONS } from "../../util/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { withUser, NextApiRequestWithUser } from "../../util/withUser";
import { DBInvitation } from "../../util/types";
import faunadb from "faunadb";
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });

export default withUser(async function handler(
  req: NextApiRequestWithUser,
  res: NextApiResponse
) {
  if (req.user) {
    const { twitchId, allowed } = req.body;
    const { display_name, id } = req.user;

    const invitation: DBInvitation = {
      hostId: twitchId,
      guestId: id,
      allowed: allowed,
      createdDate: Date.now(),
      channelName: display_name,
    };

    await client
      .query(
        q.Create(q.Collection(DB_COLLECTION_INVITATIONS), { data: invitation })
      )
      .catch();

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
});
