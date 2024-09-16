import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts";
import AppProvider from "./contexts/AppProvider";
import AddRoomModal from "./modals/AddRoomModal";
import InviteMemberModal from "./modals/InviteMemberModal";

export function FunChatRoot() {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <Outlet />
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </>
  );
}
