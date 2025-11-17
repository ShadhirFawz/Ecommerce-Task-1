"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">

          {/* Header */}
          <div className="flex items-center gap-6 mb-6">
            {/* Default Avatar */}
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account information
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-4 mt-6">

            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400">Email</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.email || "Unknown"}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400">Name</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.name || "Unknown"}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400">Created At</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.created_at
                  ? new Date(user.created_at).toLocaleString()
                  : "Unknown"}
              </span>
            </div>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
