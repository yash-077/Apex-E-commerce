import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

export const OrderConfirmation = () => {
  const location = useLocation();
  const { id } = useParams();
  const order = location.state?.order || null;
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/30 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-all"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h2 className="text-2xl font-bold">Order Confirmation</h2>
        </div>
        {order ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src={order.productId?.imageUrl || order.productId?.image || ''} alt={order.productId?.title} className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-white">{order.productId?.title}</h3>
                <p className="text-sm text-slate-400">Quantity: {order.quantity}</p>
                <p className="text-sm text-slate-400">Total: {formatPrice(order.totalPrice)}</p>
                <p className="text-sm text-slate-400">Order ID: {order._id || id}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-800/40 rounded-lg">
              <h4 className="font-semibold text-white">Customer</h4>
              <p className="text-sm text-slate-400">{order.userId?.name} — {order.userId?.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-slate-400">Order details not available. Order ID: {id}</p>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
