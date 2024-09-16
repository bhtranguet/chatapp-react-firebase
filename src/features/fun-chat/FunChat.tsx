import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts";
import AppProvider from "./contexts/AppProvider";
import AddRoomModal from "./modals/AddRoomModal";

export function FunChatRoot() {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <Outlet />
          <AddRoomModal />
        </AuthProvider>
      </AppProvider>
    </>
  );
}
