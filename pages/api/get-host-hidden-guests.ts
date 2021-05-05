import { DB_INDEX_HIDDEN_GUESTS } from "./../../util/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { withUser, NextApiRequestWithUser } from "../../util/withUser";
import faunadb from "faunadb";
const q = faunadb.query;

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
});

export default withUser(async function handler(
  req: NextApiRequestWithUser,
  res: NextApiResponse
) {
  if (req.user) {
    const guestsArrays: { data: any[][] } = await faunaClient.query(
      q.Paginate(q.Match(q.Index(DB_INDEX_HIDDEN_GUESTS), req.user.id))
    );
    const guests = guestsArrays.data.map(([guestId, hidden]) => ({
      guestId,
      hidden,
    }));

    res.status(200).json(guests);
  } else {
    res.status(401);
  }
});
