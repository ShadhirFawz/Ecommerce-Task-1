import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard";
import CartSummary from "@/components/CartSummary";
import StickyHeader from "@/components/StickyHeader";
import UserHomeHeader from "@/components/UserHomeHeader";

interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  description?: string;
  created_at?: string;
}

interface HomePageProps {
  searchParams: {
    sort?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // Get sort parameter from URL, default to 'default'
  const sortBy = searchParams.sort || 'default';
  
  let query = supabase.from("products").select("*");
  
  // Apply sorting based on URL parameter
  switch (sortBy) {
    case 'price_low':
      query = query.order('price', { ascending: true });
      break;
    case 'price_high':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      // Default sorting (by created_at descending for newest first)
      query = query.order('created_at', { ascending: false });
  }

  const { data: products, error } = await query;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">
            Unable to Load Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We're having trouble loading our products. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Cart Summary Header */}
      <CartSummary />
      
      {/* Sticky Header with Products Count */}
      <StickyHeader productsCount={products?.length || 0} />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
        <UserHomeHeader />
        {/* Hero Section */}
        <section className="bg-linear-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Welcome to Our Store
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Discover premium quality products with exceptional value. 
              Shop with confidence and enjoy fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🚚 Free shipping on orders over $50
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                ⭐ 4.8/5 Customer Rating
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🔄 30-day return policy
              </span>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-4 -mt-8 relative z-10">
          {/* Stats Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Featured Products
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {products?.length || 0} products available
                </p>
              </div>
              
              {/* Sorting and Filtering */}
              <div className="flex gap-3">
                <form>
                  <select 
                    name="sort"
                    defaultValue={sortBy}
                    onChange={(e) => {
                      // This will trigger a page reload with the new sort parameter
                      const form = e.target.form;
                      if (form) form.submit();
                    }}
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <option value="default">Sort by: Default</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </form>
                
                <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {products?.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  No Products Available
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We're currently updating our inventory. Please check back soon for new arrivals!
                </p>
                <div className="flex gap-3 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Notify Me
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {products?.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Features Section */}
        <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">30-day money back guarantee on all products</p>
              </div>
              
              <div className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Payment</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Your payment information is always protected</p>
              </div>
              
              <div className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Returns</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Simple and hassle-free return process</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}