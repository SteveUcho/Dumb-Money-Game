import { sdk, sdkError } from "@/ory-sdk";
import { useNavigate } from "react-router";

export default function LogOutButton() {
  const navigate = useNavigate();
  const sdkErrorHandler = sdkError(undefined, undefined, navigate, "/login");

  const createLogoutFlow = async () => {
    // here we create a new logout URL which we can use to log the user out
    try {
      const res = await sdk.createBrowserLogoutFlow();
      console.log(res);
      return res.logout_url;
    } catch (error) {
      sdkErrorHandler(error);
    }
    return "/";
  };

  const handleLogout = async () => {
    const logoutUrl = await createLogoutFlow();
    globalThis.location.href = logoutUrl;
  };

  return (
    <button
      className="p-2 hover:bg-gray-200 hover:dark:bg-gray-800 text-nowrap border-b border-gray-800"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
