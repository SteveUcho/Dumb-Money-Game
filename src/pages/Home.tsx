import { Link } from "react-router";
import { useSession } from "@/hooks/useSession";

const LandingPage = () => {
  const { session } = useSession();

  return (
    <div className="p-4">
      Hello {session?.identity?.traits.name.first || "Guest"}
      <div className="flex flex-col gap-2 py-2">
        {session ? (
          <Link
            to="/settings"
            className="border border-gray-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Settings
          </Link>
        ) : (
          <>
            <Link
              to="/auth/login"
              className="border border-gray-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-gray-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Register
            </Link>
          </>
        )}
        <Link
          to="/lobbies"
          className="border border-gray-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Show Lobbies
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
