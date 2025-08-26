import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { Modal } from '../../../shared/ui';
import { AdvancedFilters } from '../../news-filters';
import type { NewsFilters } from '../../news-filters';

interface NewsFiltersModalProps {
  filters: NewsFilters;
  onFiltersChange: (filters: NewsFilters) => void;
  className?: string;
}

export const NewsFiltersModal: React.FC<NewsFiltersModalProps> = ({
  filters,
  onFiltersChange,
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<NewsFilters>(filters);

  useEffect(() => {
    if (!isModalOpen) {
      setTempFilters(filters);
    }
  }, [filters, isModalOpen]);

  const handleOpenModal = () => {
    setTempFilters(filters);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters: NewsFilters = {};
    setTempFilters(resetFilters);
    onFiltersChange(resetFilters);
    setIsModalOpen(false);
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== '');

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`inline-flex justify-center items-center gap-2 px-4 py-3.5 border rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
          hasActiveFilters 
            ? 'bg-white/30 border-white/40 text-white hover:bg-white/40' 
            : 'border-white/30 text-white hover:bg-white/20'
        } ${className}`}
      >
        <Filter className="h-4 w-4" />
        Фільтри
        {hasActiveFilters && (
          <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all duration-200">
            {Object.values(filters).filter(value => value && value !== '').length}
          </span>
        )}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Налаштування фільтрів"
        className="mx-4"
      >
        <div className="space-y-6">
          <AdvancedFilters
            filters={tempFilters}
            onFiltersChange={setTempFilters}
          />
          
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              Скинути все
            </button>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              Скасувати
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              Застосувати
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
