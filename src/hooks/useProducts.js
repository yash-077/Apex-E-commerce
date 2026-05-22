import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

/**
 * Custom hook to fetch all products from the backend.
 * Handles loading state, error catching, and manual refetching.
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/products');
      // Map _id to id for frontend compatibility
      const mappedProducts = response.data.map(product => ({
        ...product,
        id: product._id || product.id,
        imageUrl: product.imageUrl || 'https://via.placeholder.com/300?text=No+Image',
        image: product.imageUrl || 'https://via.placeholder.com/300?text=No+Image',
      }));
      setProducts(mappedProducts);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unable to load products. Please check your connection and try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};
