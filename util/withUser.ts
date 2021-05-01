import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface TwitchUserResponse {
  id: number;
  bio: string;
  created_at: string;
  display_name: string;
  email: string;
  email_verified: boolean;
  logo: string;
  name: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  partnered: boolean;
  twitter_connected: boolean;
  type: string;
  updated_at: string;
}

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
