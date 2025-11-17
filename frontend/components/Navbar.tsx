"use client";

import { useContext } from "react";
import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="w-full bg-blue-200 dark:bg-gray-900 shadow-md py-4 mb-0">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          X-Commex
        </Link>
      </div>
    </nav>
  );
}
