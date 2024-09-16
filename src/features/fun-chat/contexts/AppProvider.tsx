import { createContext, useState, ReactNode, useContext, useMemo } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore, {
  QueryCondition,
} from "../../../hooks/firebase/useFirestore";
import _ from "lodash";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextValue {
  isAddRoomModalOpen: boolean;
  setIsAddRoomModalOpen: (value: boolean) => void;
  isInviteMemberModalOpen: boolean;
  setIsInviteMemberModalOpen: (value: boolean) => void;
  selectedRoom: object;
  selectedRoomId: string;
  setSelectedRoomId: (value: string) => void;
  rooms: Array<object>;
  members: Array<object>;
}

export const AppContext = createContext<AppContextValue>({
  isAddRoomModalOpen: false,
  setIsAddRoomModalOpen: () => {},
  isInviteMemberModalOpen: false,
  setIsInviteMemberModalOpen: () => {},
  selectedRoom: {},
  selectedRoomId: "",
  setSelectedRoomId: () => {},
  rooms: [],
  members: [],
});

function AppProvider({ children }: AppProviderProps) {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState<boolean>(false);

  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] =
    useState<boolean>(false);

  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    } as QueryCondition;
  }, [uid]);

  console.log("uuid", uid);

  const rooms = useFirestore("rooms", roomsCondition);

  console.log("rooms", rooms);

  const selectedRoom = useMemo(
    () => rooms.find((room) => _.get(room, "id") === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: _.get(selectedRoom, "members"),
    } as QueryCondition;
  }, [_.get(selectedRoom, "members")]);

  const members = useFirestore("users", usersCondition);

  return (
    <>
      <AppContext.Provider
        value={{
          isAddRoomModalOpen,
          setIsAddRoomModalOpen,
          isInviteMemberModalOpen,
          setIsInviteMemberModalOpen,
          selectedRoom,
          selectedRoomId,
          setSelectedRoomId,
          rooms,
          members,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export default AppProvider;
