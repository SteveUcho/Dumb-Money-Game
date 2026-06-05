import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { NavBar } from "@/components/NavBar";
import { borderButton } from "@/utils/classNames";

function NotFound() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-dvh flex flex-col overflow-clip relative">
        <NavBar />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <div className="text-center text-3xl font-bold">
            <h1>{error.status}</h1>
            <p>{error.statusText}</p>
          </div>
          <Link to="/" className={[borderButton, "text-rh-green px-8"].join(" ")}>
            Home
          </Link>
        </div>
      </div>
    );
  }

  return <div>404</div>;
}

export default NotFound;
