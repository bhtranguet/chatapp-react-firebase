import { createContext, useState, ReactNode } from "react";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextValue {
  isAddRoomModalOpen: boolean;
  setIsAddRoomModalOpen: (value: boolean) => void;
}

export const AppContext = createContext<AppContextValue>({
  isAddRoomModalOpen: false,
  setIsAddRoomModalOpen: () => {},
});

function AppProvider({ children }: AppProviderProps) {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState<boolean>(false);
  return (
    <>
      <AppContext.Provider
        value={{
          isAddRoomModalOpen,
          setIsAddRoomModalOpen,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export default AppProvider;
