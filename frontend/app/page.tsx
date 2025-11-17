import { supabase } from "@/lib/supabaseClient";

export default async function HomePage() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Products (Test Fetch)</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
