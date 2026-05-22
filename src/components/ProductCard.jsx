import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { formatPrice, truncateText } from '../utils/helpers';

export const ProductCard = ({ product, onBuyNow }) => {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden glass-card">
      {/* Product Image Area */}
      <div className="relative pt-[70%] bg-slate-950 overflow-hidden group">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700/30">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading font-bold text-base text-white line-clamp-1 group-hover:text-brand-400 transition-colors" title={product.title}>
            {product.title}
          </h3>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed flex-1">
          {truncateText(product.description, 120)}
        </p>

        {/* Stock Status Badge */}
        <div className="flex items-center justify-between py-1">
          <span className="text-lg font-extrabold font-heading text-white">
            {formatPrice(product.price)}
          </span>

          {isOutOfStock ? (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/40 border border-red-900/40 rounded-md">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-900/40 rounded-md">
              Only {product.stock} Left
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 rounded-md">
              {product.stock} In Stock
            </span>
          )}
        </div>

        {/* Buy Button */}
        <button
          type="button"
          onClick={() => onBuyNow(product)}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 font-bold rounded-xl transition-all cursor-pointer ${
            isOutOfStock
              ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed opacity-55'
              : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-950/10 active:scale-[0.98]'
          }`}
        >
          <ShoppingCart size={16} />
          {isOutOfStock ? 'Sold Out' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};
