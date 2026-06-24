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
import GameLobby from "@/pages/GameLobby";
import LoginPage from "./pages/Login";
import AuthSettings from "./pages/AuthSettings";
import NotFound from "./pages/404";
import { SessionProvider } from "@/contexts/sessionProvider";
import { SWRConfig } from "swr";
import GameWrapper from "./pages/GameWrapper";

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
        element: <GameWrapper />,
        children: [
          {
            index: true,
            element: <GameLobby />,
          },
          {
            path: "game",
            element: <GamePage />,
          },
        ],
      },
    ],
  },
]);

const fetcher = async (url: string, init: any) => {
  const res = await fetch(url, init);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    (error as any).info = await res.json();
    (error as any).status = res.status;
    throw error;
  }
  return res.json();
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <SWRConfig value={{ fetcher }}>
        <RouterProvider router={router} />
      </SWRConfig>
    </SessionProvider>
  </StrictMode>,
);
