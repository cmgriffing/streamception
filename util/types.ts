export interface DBInvitation {
  hostId: number;
  guestId: number;
  createdDate: number;
  allowed: boolean;
  channelName: string;
}
