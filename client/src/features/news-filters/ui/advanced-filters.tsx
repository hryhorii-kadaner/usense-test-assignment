import React from 'react';
import { formatDate } from '../../../shared/utils';

export interface NewsFilters {
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  language?: string;
  searchIn?: string;
  country?: string;
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
}

interface AdvancedFiltersProps {
  filters: NewsFilters;
  onFiltersChange: (filters: NewsFilters) => void;
  className?: string;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  className = ''
}) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'uk', name: 'Українська' },
    { code: 'ru', name: 'Русский' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' },
  ];

  const countries = [
    { code: 'us', name: 'США' },
    { code: 'ua', name: 'Україна' },
    { code: 'gb', name: 'Великобританія' },
    { code: 'de', name: 'Німеччина' },
    { code: 'fr', name: 'Франція' },
    { code: 'ca', name: 'Канада' },
  ];

  const categories = [
    { code: 'general', name: 'Загальні' },
    { code: 'business', name: 'Бізнес' },
    { code: 'entertainment', name: 'Розваги' },
    { code: 'health', name: "Здоров'я" },
    { code: 'science', name: 'Наука' },
    { code: 'sports', name: 'Спорт' },
    { code: 'technology', name: 'Технології' },
  ];

  const searchInOptions = [
    { code: 'title,description,content', name: 'Усюди' },
    { code: 'title', name: 'Тільки в заголовках' },
    { code: 'description', name: 'Тільки в описі' },
    { code: 'content', name: 'Тільки в контенті' },
  ];

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200";
  
  const handleFilterChange = (key: keyof NewsFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Основные фильтры */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2 col-span-full">
          <label className="text-sm font-medium text-gray-700">Період</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Від</label>
              <input
                type="date"
                value={filters.from || ''}
                onChange={(e) => handleFilterChange('from', e.target.value)}
                className={inputClassName}
                placeholder="Від"
              />
              {filters.from && (
                <div className="mt-1 text-xs text-blue-600">
                  Обрано: {formatDate(filters.from)}
                </div>
              )}
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">До</label>
              <input
                type="date"
                value={filters.to || ''}
                onChange={(e) => handleFilterChange('to', e.target.value)}
                className={inputClassName}
                placeholder="До"
              />
              {filters.to && (
                <div className="mt-1 text-xs text-blue-600">
                  Обрано: {formatDate(filters.to)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Мова</label>
          <select
            value={filters.language || ''}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className={inputClassName}
          >
            <option value="">Всі мови</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          {filters.language && (
            <div className="text-xs text-blue-600">
              Обрано: {languages.find(l => l.code === filters.language)?.name}
            </div>
          )}
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Країна</label>
          <select
            value={filters.country || ''}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className={inputClassName}
          >
            <option value="">Всі країни</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {filters.country && (
            <div className="text-xs text-blue-600">
              Обрано: {countries.find(c => c.code === filters.country)?.name}
            </div>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Категорія</label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={inputClassName}
          >
            <option value="">Всі категорії</option>
            {categories.map((category) => (
              <option key={category.code} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
          {filters.category && (
            <div className="text-xs text-blue-600">
              Обрано: {categories.find(c => c.code === filters.category)?.name}
            </div>
          )}
        </div>

        {/* Search In */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Шукати в</label>
          <select
            value={filters.searchIn || ''}
            onChange={(e) => handleFilterChange('searchIn', e.target.value)}
            className={inputClassName}
          >
            {searchInOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
          {filters.searchIn && (
            <div className="text-xs text-blue-600">
              Обрано: {searchInOptions.find(s => s.code === filters.searchIn)?.name}
            </div>
          )}
        </div>
      </div>

      {/* Дополнительные фильтры */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
          Додаткові фільтри
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Sources */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Джерела
              <span className="text-xs text-gray-500 ml-1">(розділені комами)</span>
            </label>
            <input
              type="text"
              value={filters.sources || ''}
              onChange={(e) => handleFilterChange('sources', e.target.value)}
              placeholder="Наприклад: bbc-news,cnn,reuters"
              className={inputClassName}
            />
            {filters.sources && (
              <div className="text-xs text-blue-600">
                Джерела: {filters.sources.split(',').map(s => s.trim()).join(', ')}
              </div>
            )}
          </div>

          {/* Domains */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Домени
              <span className="text-xs text-gray-500 ml-1">(розділені комами)</span>
            </label>
            <input
              type="text"
              value={filters.domains || ''}
              onChange={(e) => handleFilterChange('domains', e.target.value)}
              placeholder="Наприклад: bbc.co.uk,cnn.com,reuters.com"
              className={inputClassName}
            />
            {filters.domains && (
              <div className="text-xs text-blue-600">
                Домени: {filters.domains.split(',').map(d => d.trim()).join(', ')}
              </div>
            )}
          </div>

          {/* Exclude Domains */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Виключити домени
              <span className="text-xs text-gray-500 ml-1">(розділені комами)</span>
            </label>
            <input
              type="text"
              value={filters.excludeDomains || ''}
              onChange={(e) => handleFilterChange('excludeDomains', e.target.value)}
              placeholder="Наприклад: example.com,spam.com"
              className={inputClassName}
            />
            {filters.excludeDomains && (
              <div className="text-xs text-blue-600">
                Виключені: {filters.excludeDomains.split(',').map(d => d.trim()).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
