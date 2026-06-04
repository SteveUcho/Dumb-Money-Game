import { Link } from "react-router";
import { useSession } from "@/hooks/useSession";

const buttons = [
  {
    name: "Settings",
    to: "/settings",
    type: "auth",
  },
  {
    name: "Login",
    to: "/auth/login",
    type: "guest",
  },
  {
    name: "Register",
    to: "/register",
    type: "guest",
  },
  {
    name: "Show Lobbies",
    to: "/lobbies",
    type: "all",
  },
];

const LandingPage = () => {
  const { session } = useSession();

  const isLoggedIn = !!session;

  return (
    <div className="p-4">
      <div className="pb-4 text-3xl font-bold">
        Hello{" "}
        <span className={isLoggedIn ? "text-rh-green" : "text-rh-red"}>
          {isLoggedIn ? session?.identity?.traits.name.first : "Guest"}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {buttons.map((button) => {
          if (
            (button.type === "auth" && isLoggedIn) ||
            (button.type === "guest" && !isLoggedIn) ||
            button.type === "all"
          ) {
            return (
              <Link
                key={button.to}
                to={button.to}
                className={[
                  "border border-gray-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                  "h-20",
                  "flex items-center justify-center",
                  button.type === "all" ? "col-span-1 sm:col-span-2" : "",
                ].join(" ")}
              >
                {button.name}
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default LandingPage;
