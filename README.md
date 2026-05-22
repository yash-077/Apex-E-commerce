# Frontend (User)

This is the user-facing React app (Vite).

TECH STACK:
- React.jsx (Vite)
- React Router DOM v6
- Axios for API calls
- Context API for auth state (JWT token management)
- CSS Modules or Tailwind CSS for styling


4. FOLDER STRUCTURE:
src/
├── api/
│   └── axios.js               # Axios instance with baseURL and interceptors
├── context/
│   └── AuthContext.jsx        # Auth state, login, logout, user
├── components/
│   ├── Navbar.jsx             # Logo, login/logout button, user name
│   ├── ProductCard.jsx        # Individual product card
│   ├── ProductGrid.jsx        # Maps over products, shows skeletons
│   ├── LoginModal.jsx         # Login form in modal
│   ├── SignupModal.jsx        # Signup form in modal
│   ├── PurchaseModal.jsx      # Confirm purchase modal
│   └── SearchFilter.jsx       # Search input + category dropdown
├── pages/
│   └── ProductsPage.jsx       # Main page combining all components
├── hooks/
│   └── useProducts.js         # Custom hook: fetch, loading, error, refetch
├── utils/
│   └── helpers.js             # formatPrice, truncateText
├── App.jsx
└── main.jsx