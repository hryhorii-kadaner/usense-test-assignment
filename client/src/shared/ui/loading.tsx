import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${sizeClasses[size]}`}
        role="status"
        aria-label="Завантаження..."
      >
        <span className="sr-only">Завантаження...</span>
      </div>
    </div>
  );
};

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 6, 
  className = '' 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="w-full h-48 bg-gray-300"></div>
          <div className="p-4">
            <div className="flex gap-2 mb-2">
              <div className="h-5 bg-gray-300 rounded w-16"></div>
              <div className="h-5 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
