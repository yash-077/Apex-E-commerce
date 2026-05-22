import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Loader2, Check } from 'lucide-react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

export const PurchaseModal = ({ isOpen, onClose, product, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Reset quantity when modal opens for a new product
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else {
      toast.error(`Only ${product.stock} items left in stock.`);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value <= 0) {
      setQuantity(1);
    } else if (value > product.stock) {
      setQuantity(product.stock);
      toast.error(`Only ${product.stock} items left in stock.`);
    } else {
      setQuantity(value);
    }
  };

  const handleConfirmPurchase = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/purchase', {
        productId: product._id || product.id,
        quantity: quantity,
      });

      if (response.data && response.data.success) {
        const order = response.data.data || response.data;
        toast.success(`Successfully purchased ${quantity} x ${product.title}!`);
        if (onSuccess) {
          onSuccess(); // Triggers re-fetch of products to update stock quantities
        }
        onClose();
        // Redirect to order confirmation page with order data
        try {
          if (order && order._id) {
            navigate(`/order-confirmation/${order._id}`, { state: { order } });
            return;
          }
        } catch (e) {
          // ignore navigation errors
        }
      } else {
        const order = response.data;
        toast.success(`Successfully purchased ${quantity} x ${product.title}!`);
        if (onSuccess) {
          onSuccess();
        }
        onClose();
        try {
          if (order && order._id) {
            navigate(`/order-confirmation/${order._id}`, { state: { order } });
            return;
          }
        } catch (e) {}
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Purchase transaction failed.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div 
        className="w-full max-w-lg overflow-hidden transition-all transform glass rounded-2xl shadow-2xl border border-slate-700/50 animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-brand-500" size={24} />
            <h3 className="text-xl font-bold font-heading text-white">Confirm Purchase</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Product Summary */}
          <div className="flex gap-4 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-20 h-20 object-cover rounded-lg border border-slate-700/50"
            />
            <div className="flex-1 min-w-0">
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-brand-400 bg-brand-950/40 border border-brand-800/40 rounded-full mb-1">
                {product.category}
              </span>
              <h4 className="text-base font-bold text-white truncate">{product.title}</h4>
              <p className="text-sm text-slate-400 font-semibold mt-1">{formatPrice(product.price)} each</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between py-2">
            <div>
              <span className="block text-sm font-semibold text-slate-200">Select Quantity</span>
              <span className="text-xs text-slate-400">{product.stock} items available in stock</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1 || loading}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors disabled:opacity-40"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                disabled={loading}
                className="w-12 text-center bg-transparent border-0 font-bold text-white text-base focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={handleIncrement}
                disabled={quantity >= product.stock || loading}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="pt-4 border-t border-slate-700/50 space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Subtotal</span>
              <span>{formatPrice(product.price * quantity)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Shipping & Taxes</span>
              <span className="text-emerald-400 font-semibold">Free</span>
            </div>
            <div className="flex justify-between items-end pt-2 text-base font-bold text-white border-t border-dashed border-slate-800">
              <span className="font-heading">Total Due</span>
              <span className="text-xl text-brand-400 font-heading">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-slate-900/40 border-t border-slate-700/30">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmPurchase}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-950/20 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check size={18} />
                Confirm Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
