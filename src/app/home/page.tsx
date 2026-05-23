import * as motion from "motion/react-client";
import Link from "next/link";

function HomePage() {

    return (
        <div>
            Hello
            <div className="flex flex-col gap-2 p-2">
                <Link
                    href="/register"
                    className="border border-gray-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    Register
                </Link>
                <motion.button
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-gray-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                >
                    Logout
                </motion.button>
                <Link
                    href="/lobbies"
                    className="border border-gray-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    Show Lobbies
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
