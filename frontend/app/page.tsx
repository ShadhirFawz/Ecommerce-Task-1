import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  description?: string;
  created_at?: string;
}

export default async function HomePage() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h1>
          <pre className="text-sm text-gray-600 dark:text-gray-400 max-w-md overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Our Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing products at great prices
          </p>
        </div>

        {products?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
              No products found
            </h2>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Check back later for new products!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}