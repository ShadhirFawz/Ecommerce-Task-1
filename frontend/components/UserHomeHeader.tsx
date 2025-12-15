"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

interface Order {
  id: string;
  created_at: string;
  total: number;
}

export default function UserHomeHeader() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);

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
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return null;

  return (
    <div className="mt-15 bg-white dark:bg-gray-800 p-6 mb-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Welcome back, {user.email?.split("@")[0]} 👋
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        You have {orders.length} previous {orders.length === 1 ? "order" : "orders"}.
      </p>
      
      {/* Optional: Debug info - remove in production */}
      {orders.length > 0 && (
        <div className="mt-2 text-sm text-gray-500">
          Latest order: ${orders[0].total} on {new Date(orders[0].created_at).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}