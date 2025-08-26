import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  rounded = 'md'
}) => {
  const roundedClass = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }[rounded];

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`animate-pulse bg-gray-200 ${roundedClass} ${className}`}
      style={style}
    />
  );
};

// Скелетон для карточки статьи
export const ArticleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <Skeleton height="200px" rounded="none" />
      
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton height="20px" className="w-full" />
          <Skeleton height="20px" className="w-3/4" />
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton height="16px" className="w-full" />
          <Skeleton height="16px" className="w-5/6" />
          <Skeleton height="16px" className="w-4/6" />
        </div>
        
        {/* Footer skeleton */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton height="14px" className="w-20" />
          <Skeleton height="14px" className="w-24" />
        </div>
      </div>
    </div>
  );
};
