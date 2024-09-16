import { createBrowserRouter } from "react-router-dom";
import Root from "../routes/Root";
import { ChatApp, FunChatRoot, Login } from "../features/fun-chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "fun-chat",
        element: <FunChatRoot />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            index: true,
            element: <ChatApp />,
          },
        ],
      },
    ],
  },
]);

export default router;
