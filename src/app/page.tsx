import Link from "next/link";
import { borderButton } from "@/utils/classNames";

export default function Home() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1>Welcome to Dumb Money Game</h1>
      <Link href="/home" className={[borderButton, "border-rh-green"].join(" ")}>
        Go to Home
      </Link>
    </div>
  );
}
