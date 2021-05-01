import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { TwitchUserResponse } from "./types";

export type NextApiRequestWithUser = NextApiRequest & {
  user: TwitchUserResponse;
};

type RawNextHandler = (req: NextApiRequest, res: NextApiResponse) => void;
type UserRestHandler = (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => void;

export function withUser(handler: RawNextHandler) {
  return async function (req: NextApiRequestWithUser, res: NextApiResponse) {
    const [_, token] = req.headers["authorization"]?.split(" ");
    if (token) {
      res.status(401);
    }

    const userResponse: any = await axios
      .get(`https://api.twitch.tv/helix/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      })
      .catch((error) => {
        console.log({ error });
      });
    req.user = userResponse?.data?.data[0];
    return (handler as UserRestHandler)(req, res);
  };
}
