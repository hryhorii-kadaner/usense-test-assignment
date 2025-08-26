import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Пошук новин...", 
  className = "" 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white text-gray-900 placeholder-gray-500 transition-all duration-200 text-sm sm:text-base"
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
            </button>
          )}
        </div>
      </form>
      
      <button
        type="button"
        onClick={handleSubmit}
        className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium transform hover:scale-105 whitespace-nowrap border border-gray-200 shadow-sm"
      >
        Пошук
      </button>
    </div>
  );
};
