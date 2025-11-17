import { supabase } from "@/lib/supabaseClient";
import ProductDetails from "@/components/ProductDetails";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  // Await the params since Next.js 14+ uses Promise for params
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Product not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error?.message || "The product you're looking for doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}

// Generate static params if you want (optional)
export async function generateStaticParams() {
  const { data: products } = await supabase.from("products").select("id");
  
  return products?.map((product) => ({
    id: product.id.toString(),
  })) || [];
}