import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./configs/routerConfig.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>
);
