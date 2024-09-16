import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { auth } from "../../../configs/firebaseSetup";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            navigate("/");
            // ...
          })
          .catch((error) => {
            window.alert(error.message);
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="block"
          name="username"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="username"
        />
        <div>
          <input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </>
  );
};
