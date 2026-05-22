import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductsPage } from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import OrderConfirmation from './pages/OrderConfirmation';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Products Page */}
          <Route path="/" element={<ProductsPage />} />
          {/* Profile page for signed-in users */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Order confirmation page */}
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          
          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      {/* Styled Notifications Toast Handler */}
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: 'rgba(30, 41, 59, 0.9)', // Slate-800 backdrop-blur
            color: '#f8fafc',                    // Slate-50
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '14px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
          },
          success: {
            iconTheme: {
              primary: '#8b5cf6', // Brand color
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444', // Red-500
              secondary: '#fff',
            },
          },
        }} 
      />
    </AuthProvider>
  );
}

export default App;
