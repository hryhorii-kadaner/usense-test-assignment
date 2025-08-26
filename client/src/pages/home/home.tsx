import React, { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

import { Header, NewsList, Footer } from '../../widgets';
import { CategoryTabs } from '../../features/filter-news';
import type { NewsFilters } from '../../features/news-filters';
import { useAdvancedSearch, useArticlesByCategory } from '../../shared/hooks';
import { NewsCategory, Article } from '../../shared/types';
import { ArticleCard } from '../../entities/article';
import { ArticleCardSkeleton } from '../../shared/ui';
import { MainLayout } from '../../app/layouts';

export const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [filters, setFilters] = useState<NewsFilters>({});

  // Params combining query & filters
  const searchParams = useMemo(() => {
    const params = {
      ...filters,
      q: searchQuery || undefined,
      category: isSearchMode ? filters.category : activeCategory,
    };
    return params;
  }, [searchQuery, filters, isSearchMode, activeCategory]);

  // Queries
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
    fetchNextPage: fetchNextCategoryPage,
    hasNextPage: hasNextCategoryPage,
    isFetchingNextPage: isFetchingNextCategoryPage,
    refetch: refetchCategory
  } = useArticlesByCategory(activeCategory);

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
    refetch: refetchSearch
  } = useAdvancedSearch(searchParams, isSearchMode || Object.keys(filters).length > 0);

  const {
    data: popularData,
    isLoading: popularLoading
  } = useArticlesByCategory('general');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchMode(!!query || Object.keys(filters).length > 0);
  };

  const handleFiltersChange = (newFilters: NewsFilters) => {
    setFilters(newFilters);

    const hasActiveFilters = Object.entries(newFilters).some(([, value]) => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return value !== undefined && value !== null;
    });

    setIsSearchMode(!!searchQuery || hasActiveFilters);
  };

  const handleCategoryChange = (category: NewsCategory) => {
    setActiveCategory(category);
    // Check if we have search query or active filters
    const hasActiveFilters = Object.entries(filters).some(([, value]) => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return value !== undefined && value !== null;
    });

    if (!searchQuery && !hasActiveFilters) {
      setIsSearchMode(false);
    }
  };

  const handleLoadMore = () => {
    if (isSearchMode && hasNextSearchPage) {
      fetchNextSearchPage();
    } else if (!isSearchMode && hasNextCategoryPage) {
      fetchNextCategoryPage();
    }
  };

  const articles: Article[] = useMemo(() => {
    if (isSearchMode && searchData?.pages) {
      return searchData.pages.flatMap(page => page?.articles || []);
    } else if (!isSearchMode && categoryData?.pages) {
      return categoryData.pages.flatMap(page => page?.articles || []);
    }
    return [];
  }, [isSearchMode, searchData, categoryData]);

  const isLoading = isSearchMode ? searchLoading : categoryLoading;
  const error = isSearchMode ? searchError : categoryError;
  const hasNextPage = isSearchMode ? hasNextSearchPage : hasNextCategoryPage;
  const isFetchingNextPage = isSearchMode ? isFetchingNextSearchPage : isFetchingNextCategoryPage;
  const refetch = isSearchMode ? refetchSearch : refetchCategory;

  return (
    <MainLayout>
      <Header
        onSearch={handleSearch}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <main className="flex-1 sm:mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Popular Articles Section */}
        {!isSearchMode && (
          <section className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Популярні статті</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {popularLoading ? (
                // Show skeletons while loading
                Array.from({ length: 3 }).map((_, index) => (
                  <ArticleCardSkeleton key={index} />
                ))
              ) : popularData?.pages?.[0]?.articles ? (
                popularData.pages[0].articles.slice(0, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : null}
            </div>
          </section>
        )}

        {/* Category Tabs */}
        {!isSearchMode && (
          <div className="mb-4 sm:mb-6 overflow-x-auto">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        )}

        {/* Search Results Header */}
        {isSearchMode && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {searchQuery ? `Результати пошуку для "${searchQuery}"` : 'Результати фільтрації'}
            </h2>
            <p className="text-gray-600 text-sm">
              {searchData?.pages?.[0]?.totalResults || 0} статей знайдено
            </p>
          </div>
        )}

        {/* News List */}
        <NewsList
          articles={articles}
          isLoading={isLoading}
          error={error}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={handleLoadMore}
          onRetry={refetch}
          emptyTitle={isSearchMode ? 'Нічого не знайдено' : 'Немає новин'}
          emptyDescription={
            isSearchMode
              ? 'Спробуйте змінити пошуковий запит або фільтри'
              : 'Новини в цій категорії тимчасово недоступні'
          }
        />
      </main>

      <Footer />
    </MainLayout>
  );
};
