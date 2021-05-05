import {
  DB_COLLECTION_HIDDEN_GUESTS,
  DB_INDEX_HIDDEN_GUEST,
} from "./../../util/constants";
import { DB_COLLECTION_INVITATIONS } from "../../util/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { withUser, NextApiRequestWithUser } from "../../util/withUser";
import { DBInvitation } from "../../util/types";
import faunadb from "faunadb";
import { getTwitchDetails } from "../../util/getTwitchDetails";
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });

export default withUser(async function handler(
  req: NextApiRequestWithUser,
  res: NextApiResponse
) {
  if (req.user) {
    const { twitchId, hidden } = req.body;
    const { display_name, id } = req.user;
    const [_, token] = req.headers["authorization"]?.split(" ");

    const hiddenGuestQuery = q.Match(q.Index(DB_INDEX_HIDDEN_GUEST), [
      id,
      twitchId,
    ]);

    await client.query(
      q.If(
        q.Exists(hiddenGuestQuery),
        q.Update(q.Select("ref", q.Get(hiddenGuestQuery)), {
          data: {
            hidden,
          },
        }),
        q.Create(q.Collection(DB_COLLECTION_HIDDEN_GUESTS), {
          data: {
            hostId: id,
            guestId: twitchId,
            hidden,
          },
        })
      )
    );

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
});
