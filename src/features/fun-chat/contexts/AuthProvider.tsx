import { createContext, useEffect, useState } from "react";

import { ReactNode } from "react";
import { auth } from "../../../configs/firebaseSetup";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<{ user: User }>({
  user: {
    uid: "",
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  displayName?: string;
  email?: string;
  uid: string;
  photoURL?: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    uid: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName: displayName || undefined,
          email: email || undefined,
          uid,
          photoURL: photoURL || undefined,
        });
        setIsLoading(false);
        navigate("/fun-chat");
        return;
      }
      setIsLoading(false);
      navigate("/fun-chat/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <AuthContext.Provider value={{ user }}>
        {isLoading ? <Spin /> : children}
      </AuthContext.Provider>
    </>
  );
}
