import React from 'react';
import { ProductCard } from './ProductCard';
import { RefreshCw, AlertTriangle, Inbox } from 'lucide-react';

export const ProductGrid = ({
  products,
  loading,
  error,
  onRetry,
  onBuyNow,
}) => {
  // Renders beautiful glassmorphic skeleton cards during loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col h-full rounded-2xl overflow-hidden glass border border-slate-800">
            {/* Image Placeholder */}
            <div className="pt-[70%] skeleton bg-slate-800" />
            {/* Body Placeholder */}
            <div className="p-5 space-y-4 flex-1 flex flex-col">
              <div className="h-5 skeleton bg-slate-800 rounded-md w-3/4" />
              <div className="space-y-2 flex-1">
                <div className="h-3.5 skeleton bg-slate-800 rounded-md w-full" />
                <div className="h-3.5 skeleton bg-slate-800 rounded-md w-5/6" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="h-6 skeleton bg-slate-800 rounded-md w-1/4" />
                <div className="h-5 skeleton bg-slate-800 rounded-md w-1/4" />
              </div>
              <div className="h-10 skeleton bg-slate-800 rounded-xl w-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Renders a premium, user-friendly error card if database retrieval fails
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 glass rounded-2xl border border-red-500/20 max-w-lg mx-auto shadow-lg my-8">
        <div className="p-4 bg-red-950/40 rounded-full border border-red-800/40 text-red-400 mb-4">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-bold font-heading text-white mb-2">Failed to Load Products</h3>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">{error}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl shadow-lg shadow-red-950/20 transition-all active:scale-95 cursor-pointer"
        >
          <RefreshCw size={18} />
          Retry Request
        </button>
      </div>
    );
  }

  // Renders an empty catalog notice
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-16 glass rounded-2xl border border-slate-850 max-w-lg mx-auto shadow-md my-8">
        <div className="p-4 bg-slate-900/60 rounded-full border border-slate-800 text-slate-400 mb-4">
          <Inbox size={32} />
        </div>
        <h3 className="text-lg font-bold font-heading text-white mb-1">No Products Found</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          We couldn't find any products matching your current search criteria. Try modifying your search query or selecting a different category.
        </p>
      </div>
    );
  }

  // Renders the actual product grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  );
};
