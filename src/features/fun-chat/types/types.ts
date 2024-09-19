export enum RoomType {
  DIRECT_MESSAGE = "direct_message",
  ROOM = "room",
}

export type RoomEntity = {
  id: string;
  type: RoomType;
  name?: string;
  description?: string;
  memberIds: string[];
};

export type UserEntity = {
  id: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid: string;
  providerId?: string;
  keywords?: string[];
};

export type MessageEntity = {
  id: string;
  userId: string;
  roomId: string;
  text: string;
  photoURL?: string;
  displayName?: string;
};

export type CreateMessageEntity = Partial<MessageEntity>;
