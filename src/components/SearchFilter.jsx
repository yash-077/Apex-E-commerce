import React from 'react';
import { Search, Filter } from 'lucide-react';

export const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = []
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-5 glass rounded-2xl border border-slate-800 shadow-md">
      {/* Search Input */}
      <div className="relative w-full md:max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products by title..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative w-full md:w-56">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
          <Filter size={16} />
        </span>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full pl-10 pr-8 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white appearance-none focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* Custom Chevron Indicator */}
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </span>
      </div>
    </div>
  );
};
