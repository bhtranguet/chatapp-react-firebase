export enum RoomType {
  DIRECT_MESSAGE = "direct_message",
  ROOM = "room",
}

export type Room = {
  id?: string;
  type: RoomType;
  name?: string;
  description?: string;
  memberIds?: string[];
};

export type User = {
  id?: string;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  providerId: string;
  keywords: string[];
};
