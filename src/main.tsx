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
import NotFound from "./pages/404";
import { SessionProvider } from "@/contexts/sessionProvider";
import { SWRConfig } from "swr";

const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: NotFound,
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
        path: "/game/:gameId",
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
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
        }}
      >
        <RouterProvider router={router} />
      </SWRConfig>
    </SessionProvider>
  </StrictMode>,
);
