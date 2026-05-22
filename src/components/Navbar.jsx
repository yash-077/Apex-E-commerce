import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, LogOut, User, Menu, X, LogIn } from 'lucide-react';

export const Navbar = ({ onOpenLogin, onOpenSignup }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Branding */}
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-brand-600 to-blue-600 rounded-xl shadow-md shadow-brand-950/20 text-white">
              <ShoppingBag size={20} />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent">
              Apex
            </span>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {/* User Card */}
                <div
                  role="button"
                  onClick={() => window.location.href = '/profile'}
                  className="flex items-center gap-2.5 py-1.5 pl-2 pr-3 bg-slate-900/60 rounded-full border border-slate-800 cursor-pointer hover:shadow-md transition-all"
                  title="View profile"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold font-heading">
                    {getInitials(user?.name)}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-semibold text-slate-400">Signed in as</span>
                    <span className="block text-xs font-bold text-white truncate max-w-[120px]">{user?.name}</span>
                  </div>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-850 border border-slate-700/30 rounded-xl transition-all cursor-pointer"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-4.5 py-2 text-sm font-bold text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <LogIn size={16} />
                  Login
                </button>
                <button
                  onClick={onOpenSignup}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-950/10 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Collapsible Menu) */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-slate-800 px-4 pt-3 pb-4 space-y-3 shadow-inner animate-fade-in">
          {isAuthenticated ? (
            <div className="space-y-3">
              {/* User Profiling */}
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 border border-slate-800 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold">
                  {getInitials(user?.name)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none mb-1">{user?.name}</h4>
                  <p className="text-xs text-slate-400 leading-none">{user?.email}</p>
                </div>
              </div>
              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-950/20 hover:bg-red-950/40 text-red-400 font-semibold border border-red-900/30 rounded-xl transition-all cursor-pointer"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 font-bold text-slate-200 hover:text-white hover:bg-slate-800/40 border border-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignup();
                }}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
