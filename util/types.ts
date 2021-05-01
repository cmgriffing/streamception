export interface DBInvitation {
  hostId: number;
  hostChannelName: string;
  guestId: number;
  guestChannelName: string;
  createdDate: number;
  allowed: boolean;
}

export interface TwitchUserResponse {
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
