"use client";

import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <nav className="fixed w-full top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          X-Commex
        </Link>

        <div className="flex items-center gap-5">

          {/* Auth links */}
          {user ? (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Hi, {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 dark:text-red-400 border border-red-400 px-3 py-1 cursor-pointer rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 dark:text-blue-400 border border-blue-400 px-3 py-1 cursor-pointer rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
