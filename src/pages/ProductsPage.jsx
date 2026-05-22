import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { SearchFilter } from '../components/SearchFilter';
import { ProductGrid } from '../components/ProductGrid';
import { LoginModal } from '../components/LoginModal';
import { SignupModal } from '../components/SignupModal';
import { PurchaseModal } from '../components/PurchaseModal';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const ProductsPage = () => {
  const { products, loading, error, refetch } = useProducts();
  const { isAuthenticated } = useAuth();

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal States
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Dynamically extract categories from product list
  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
  }, [products]);

  // Client-side filtering logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  // Handle Buy Now Click
  const handleBuyNow = (product) => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
    } else {
      setSelectedProduct(product);
      setIsPurchaseOpen(true);
    }
  };

  // Switch Modal Helpers
  const handleSwitchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Top Navigation */}
      <Navbar 
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenSignup={() => setIsSignupOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Banner / Hero Section */}
        <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br from-brand-900/60 to-slate-900/60 border border-slate-800 shadow-xl">
          {/* Decorative blur elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-brand-400 bg-brand-950/40 border border-brand-800/40 rounded-full">
              <ShoppingBag size={12} />
              Limited-Time Offers
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Upgrade Your Setup with Premium Gear
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-lg">
              Discover top-rated tech accessories, acoustic hardware, and footwear. Log in now to enjoy express ordering and free nationwide shipping.
            </p>
            {!isAuthenticated && (
              <button
                onClick={() => setIsSignupOpen(true)}
                className="flex items-center gap-1.5 px-6 py-2.5 font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-all shadow-lg shadow-brand-950/20 active:scale-95 cursor-pointer"
              >
                Get Started
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </section>

        {/* Search & Filter section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-white">Explore Catalog</h2>
            <span className="text-xs text-slate-400 font-semibold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        </section>

        {/* Products Listing Grid */}
        <section>
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            onRetry={refetch}
            onBuyNow={handleBuyNow}
          />
        </section>
      </main>

      {/* Auth & Checkout Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <PurchaseModal
        isOpen={isPurchaseOpen}
        onClose={() => {
          setIsPurchaseOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSuccess={refetch}
      />
    </div>
  );
};
