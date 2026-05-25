import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter, redirect } from "react-router";
import { PageLayout } from "./components/PageLayout";
import Index from "./pages/Index";
import GamePage from "@/pages/Game";
import HomePage from "@/pages/Home";
import LobbiesPage from "@/pages/Lobbies";
import RegisterPage from "@/pages/Register";
import Lobby from "@/pages/Lobby";
import LoginPage from "./pages/Login";

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
        ],
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        loader: async () => {
          // return data from here
          const username = localStorage.getItem("username");
          if (username) {
            return redirect("/home");
          }
        },
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
    <RouterProvider router={router} />
  </StrictMode>,
);
