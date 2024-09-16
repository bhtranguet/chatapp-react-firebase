import { useEffect } from "react";
import { auth } from "../configs/firebaseSetup";

export default function Home() {
  useEffect(() => {
    const user = auth.currentUser;
  });
  return <>Home</>;
}
