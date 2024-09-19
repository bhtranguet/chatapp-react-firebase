import { createContext, useState, ReactNode, useContext, useMemo } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../../../hooks/firebase/useFirestore";
import _ from "lodash";
import { RoomEntity, RoomType, UserEntity } from "../types/types";
import { where } from "firebase/firestore";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextValue {
  isAddRoomModalOpen: boolean;
  setIsAddRoomModalOpen: (value: boolean) => void;
  isInviteMemberModalOpen: boolean;
  setIsInviteMemberModalOpen: (value: boolean) => void;
  addDirectMessageModalOpen: boolean;
  setAddDirectMessageModalOpen: (value: boolean) => void;
  selectedRoom?: RoomEntity;
  selectedRoomId: string;
  setSelectedRoomId: (value: string) => void;
  rooms: Array<RoomEntity>;
  directMessages: Array<RoomEntity>;
  roomMembers: Array<UserEntity>;
}

export const AppContext = createContext<AppContextValue>({
  isAddRoomModalOpen: false,
  setIsAddRoomModalOpen: () => {},
  isInviteMemberModalOpen: false,
  setIsInviteMemberModalOpen: () => {},
  addDirectMessageModalOpen: false,
  setAddDirectMessageModalOpen: () => {},
  selectedRoom: undefined,
  selectedRoomId: "",
  setSelectedRoomId: () => {},
  rooms: [],
  directMessages: [],
  roomMembers: [],
});

function AppProvider({ children }: AppProviderProps) {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState<boolean>(false);

  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] =
    useState<boolean>(false);

  const [addDirectMessageModalOpen, setAddDirectMessageModalOpen] =
    useState<boolean>(false);

  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  const {
    user: { uid },
  } = useContext(AuthContext);

  const rooms = useFirestore<RoomEntity>(
    "rooms",
    useMemo(
      () => [
        where("type", "==", RoomType.ROOM),
        where("memberIds", "array-contains", uid),
      ],
      [uid]
    )
  );

  const directMessages = useFirestore<RoomEntity>(
    "rooms",
    useMemo(
      () => [
        where("type", "==", RoomType.DIRECT_MESSAGE),
        where("memberIds", "array-contains", uid),
      ],
      [uid]
    )
  );

  const selectedRoom = useMemo(
    () =>
      [...directMessages, ...rooms].find(
        (room) => _.get(room, "id") === selectedRoomId
      ) || undefined,
    [directMessages, rooms, selectedRoomId]
  );

  const roomMembers = useFirestore<UserEntity>(
    "users",
    useMemo(
      () => [where("uid", "in", selectedRoom?.memberIds)],
      [selectedRoom?.memberIds]
    ),
    [],
    _.isEmpty(selectedRoom?.memberIds)
  );

  return (
    <>
      <AppContext.Provider
        value={{
          isAddRoomModalOpen,
          setIsAddRoomModalOpen,
          isInviteMemberModalOpen,
          setIsInviteMemberModalOpen,
          addDirectMessageModalOpen,
          setAddDirectMessageModalOpen,
          selectedRoom,
          selectedRoomId,
          setSelectedRoomId,
          rooms,
          directMessages,
          roomMembers,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export default AppProvider;
