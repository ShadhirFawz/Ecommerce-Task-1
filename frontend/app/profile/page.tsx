"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { supabase } from "@/lib/supabaseClient";

interface Order {
  id: string;
  created_at: string;
  total: number;
}

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id, created_at, total")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching orders:", error);
          return;
        }

        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            {/* Header */}
            <div className="flex items-center gap-6 mb-6">
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

          {/* Orders Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Order History
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400">No orders found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Order #{String(order.id).slice(-8)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        ${order.total}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Status: Completed</span>
                      <span>Order #{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}