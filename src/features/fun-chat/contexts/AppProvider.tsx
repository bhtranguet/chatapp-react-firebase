import { createContext, useState, ReactNode, useContext, useMemo } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore, {
  QueryCondition,
} from "../../../hooks/firebase/useFirestore";
import _ from "lodash";
import { Room, User } from "../types/types";
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
  selectedRoom?: Room;
  selectedRoomId: string;
  setSelectedRoomId: (value: string) => void;
  rooms: Array<Room>;
  directMessages: Array<Room>;
  members: Array<User>;
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
  members: [],
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

  const rooms = useFirestore<Room>(
    "rooms",
    useMemo(() => [where("members", "array-contains", uid)], [uid])
  );

  const selectedRoom = useMemo(
    () =>
      rooms.find((room) => _.get(room, "id") === selectedRoomId) || undefined,
    [rooms, selectedRoomId]
  );

  const members = useFirestore<User>(
    "users",
    useMemo(
      () => [where("uid", "in", selectedRoom?.memberIds)],
      [selectedRoom?.memberIds]
    )
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
          members,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export default AppProvider;
