import React from 'react';
import { Article } from '../../shared/types';
import { ArticleCard } from '../../entities/article';
import { LoadingSkeleton } from '../../shared/ui';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface NewsListProps {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export const NewsList: React.FC<NewsListProps> = ({
  articles,
  isLoading,
  error,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  onRetry,
  emptyTitle = 'Немає новин',
  emptyDescription = 'Новини тимчасово недоступні'
}) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Помилка завантаження</h3>
          <p className="text-gray-600 mb-4">Не вдалося завантажити новини. Спробуйте ще раз.</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              Спробувати знову
            </button>
          )}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{emptyTitle}</h3>
          <p className="text-gray-600">{emptyDescription}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {articles.map((article) => (
          <ArticleCard 
            key={article.id}
            article={article}
          />
        ))}
      </div>

      {hasNextPage && onLoadMore && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base transition-all duration-200"
          >
            {isFetchingNextPage ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Загрузка...
              </>
            ) : (
              'Загрузить еще'
            )}
          </button>
        </div>
      )}
    </>
  );
};
