"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

export default function UserHomeHeader() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Array<{ id: any; created_at: any; total_amount: any }>>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select("id, created_at, total_amount")
      .eq("user_id", user.id)
      .then(({ data }) => setOrders(data || []));
  }, [user]);

  if (!user) return null;

  return (
    <div className="mt-15 bg-white dark:bg-gray-800 p-6 mb-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Welcome back, {user.email.split("@")[0]} 👋
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        You have {orders.length} previous {orders.length === 1 ? "order" : "orders"}.
      </p>
    </div>
  );
}
