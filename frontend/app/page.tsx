'use client';

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import CartSummary from '@/components/CartSummary';
import StickyHeader from '@/components/StickyHeader';
import UserHomeHeader from '@/components/UserHomeHeader';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  description?: string;
  created_at?: string;
  category?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        throw error;
      }

      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters whenever search, sort, or price range changes
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        switch (priceRange) {
          case 'under25':
            return product.price < 25;
          case '25to50':
            return product.price >= 25 && product.price <= 50;
          case 'over50':
            return product.price > 50;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.created_at || '').getTime() -
            new Date(a.created_at || '').getTime()
        );
        break;
      case 'featured':
      default:
        // Keep original order or any default sorting
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, sortBy, priceRange, products]);

  const handleRefresh = () => {
    fetchProducts();
    // Reset filters
    setSearchTerm('');
    setSortBy('featured');
    setPriceRange('all');
  };

  if (error && products.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='text-center max-w-md mx-auto p-6'>
          <div className='w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-red-600 dark:text-red-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h1 className='text-2xl font-bold text-red-600 dark:text-red-400 mb-3'>
            Unable to Load Products
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mb-4'>
            We're having trouble loading our products. Please try again later.
          </p>
          <button
            onClick={handleRefresh}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors'
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
      <StickyHeader productsCount={filteredProducts.length} />

      <main className='min-h-screen bg-gray-50 dark:bg-gray-900 pb-16'>
        <UserHomeHeader />

        {/* Hero Section with Cart CTA */}
        <section className='bg-linear-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white py-16 relative overflow-hidden'>
          {/* Background Pattern */}
          <div className='absolute inset-0 opacity-10'>
            <div className='absolute top-10 left-10 w-20 h-20 bg-white rounded-full'></div>
            <div className='absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full'></div>
            <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full'></div>
          </div>

          <div className='container mx-auto px-4 text-center relative z-10'>
            <h1 className='text-5xl font-bold mb-4 tracking-tight'>
              Welcome to Our Store
            </h1>
            <p className='text-xl mb-8 opacity-90 max-w-2xl mx-auto'>
              Discover premium quality products with exceptional value. Shop
              with confidence and enjoy fast delivery.
            </p>

            {/* Hero CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'>
              <Link
                href='/cart'
                className='bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                View Cart & Checkout
              </Link>

              <Link
                href='#products'
                className='border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105'
              >
                Browse Products
              </Link>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <span className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium'>
                🚚 Free shipping on orders over $50
              </span>
              <span className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium'>
                ⭐ 4.8/5 Customer Rating
              </span>
              <span className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium'>
                🔄 30-day return policy
              </span>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section
          id='products'
          className='container mx-auto px-4 py-8 relative z-10'
        >
          {/* Stats Bar */}
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Featured Products
                </h2>
                <p className='text-gray-600 dark:text-gray-400 mt-1'>
                  {filteredProducts.length} of {products.length} products
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>

              <div className='flex items-center gap-4'>
                {/* Quick Cart Navigation */}
                <Link
                  href='/cart'
                  className='hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  Go to Cart
                </Link>
              </div>
            </div>

            {/* Filters Row */}
            <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
              {/* Search Input */}
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search products...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pl-10 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <svg
                  className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>

              {/* Price Range Filter */}
              <select
                value={priceRange}
                onChange={e => setPriceRange(e.target.value)}
                className='bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='all'>All Prices</option>
                <option value='under25'>Under $25</option>
                <option value='25to50'>$25 - $50</option>
                <option value='over50'>Over $50</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className='bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='featured'>Sort by: Featured</option>
                <option value='price-low'>Price: Low to High</option>
                <option value='price-high'>Price: High to Low</option>
                <option value='newest'>Newest First</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || priceRange !== 'all' || sortBy !== 'featured') && (
              <div className='mt-4 flex justify-end'>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange('all');
                    setSortBy('featured');
                  }}
                  className='text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer font-medium flex items-center gap-1'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className='flex justify-center items-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && filteredProducts.length === 0 ? (
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center'>
              <div className='max-w-md mx-auto'>
                <div className='w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-12 h-12 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                    />
                  </svg>
                </div>
                <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                  No Products Found
                </h2>
                <p className='text-gray-600 dark:text-gray-400 mb-6'>
                  {searchTerm
                    ? `No products found matching "${searchTerm}". Try adjusting your search terms.`
                    : 'No products match your current filters. Try adjusting your filters.'}
                </p>
                <div className='flex gap-3 justify-center'>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setPriceRange('all');
                      setSortBy('featured');
                    }}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2'
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={handleRefresh}
                    className='border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors'
                  >
                    Refresh Products
                  </button>
                </div>
              </div>
            </div>
          ) : (
            !loading && (
              <>
                {/* Products Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
                  {filteredProducts.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Bottom Cart CTA */}
                <div className='bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center mb-8'>
                  <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                    Ready to Complete Your Order?
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto'>
                    Review your cart items and proceed to secure checkout with
                    multiple payment options available.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link
                      href='/cart'
                      className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3 text-lg'
                    >
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                        />
                      </svg>
                      View Cart & Checkout
                    </Link>

                    <Link
                      href='/checkout'
                      className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg'
                    >
                      Direct Checkout
                    </Link>
                  </div>
                </div>
              </>
            )
          )}
        </section>

        {/* Features Section */}
        <section className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
              <div className='p-6'>
                <div className='w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-green-600 dark:text-green-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                  Quality Guaranteed
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  30-day money back guarantee on all products
                </p>
              </div>

              <div className='p-6'>
                <div className='w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-blue-600 dark:text-blue-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                    />
                  </svg>
                </div>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                  Secure Payment
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Your payment information is always protected
                </p>
              </div>

              <div className='p-6'>
                <div className='w-12 h-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-purple-600 dark:text-purple-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                  Easy Returns
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Simple and hassle-free return process
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
