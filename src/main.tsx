import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import { PageLayout } from "./components/PageLayout";
import Index from "./pages/Index";
import GamePage from "@/pages/Game";
import HomePage from "@/pages/Home";
import LobbiesPage from "@/pages/Lobbies";
import RegisterPage from "@/pages/Register";
import Lobby from "@/pages/Lobby";
import LoginPage from "./pages/Login";
import AuthSettings from "./pages/AuthSettings";
import { SessionProvider } from "@/contexts/sessionProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "registration",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "/settings",
        element: <AuthSettings />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/game",
        element: <GamePage />,
      },
      {
        path: "/lobbies",
        element: <LobbiesPage />,
      },
      {
        path: "/lobby/:lobbyId",
        element: <Lobby />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
);
