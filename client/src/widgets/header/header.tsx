import React from 'react';
import { Newspaper, Search } from 'lucide-react';
import { SearchBar } from '../../features/search-news';
import { NewsFiltersModal } from '../../features/news-filters-modal';
import type { NewsFilters } from '../../features/news-filters';

interface HeaderProps {
  onSearch: (query: string) => void;
  filters: NewsFilters;
  onFiltersChange: (filters: NewsFilters) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, filters, onFiltersChange }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:py-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Newspaper className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold">UNews</h1>
              <p className="text-blue-100 text-xs sm:text-sm font-medium">Новини України та світу</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-6 text-blue-100">
            <div className="text-center">
              <div className="text-lg font-bold text-white">24/7</div>
              <div className="text-xs">Оновлення</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">100+</div>
              <div className="text-xs">Джерел</div>
            </div>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="pb-4 sm:pb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <Search className="h-5 w-5 text-blue-100" />
              <span className="text-blue-100 font-medium text-sm">Пошук новин</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <SearchBar 
                  onSearch={onSearch}
                  className="w-full"
                />
              </div>
              <div className="flex-shrink-0">
                <NewsFiltersModal
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                  className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
