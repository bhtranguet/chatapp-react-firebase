import { useEffect } from "react";
import { auth } from "../configs/firebaseSetup";

export default function Home() {
  useEffect(() => {
    const user = auth.currentUser;
    console.log("Home", user);
  });
  return <>Home</>;
}
