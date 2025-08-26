import React from 'react';
import { NewsCategory } from '../../../shared';


interface CategoryTabsProps {
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
}

const categories: { key: NewsCategory; label: string }[] = [
  { key: 'general', label: 'Головні' },
  { key: 'business', label: 'Бізнес' },
  { key: 'technology', label: 'Технології' },
  { key: 'science', label: 'Наука' },
  { key: 'health', label: 'Здоров\'я' },
  { key: 'sports', label: 'Спорт' },
  { key: 'entertainment', label: 'Розваги' },
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 pb-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`
              flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap
              ${activeCategory === category.key
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};
