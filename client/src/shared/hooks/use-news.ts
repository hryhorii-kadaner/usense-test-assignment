import { useInfiniteQuery } from '@tanstack/react-query';
import { 
  searchByKeywords, 
  getArticlesByCategory, 
  searchWithAdvancedFilters 
} from '../api';
import { baseQueryOptions, hasValidSearchParams, getNextPageParam } from '../utils';
import type { NewsCategory, SearchParams } from '../types';

export const useSearchArticles = (query: string, enabled = true) => {
  return useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: ({ pageParam = 1 }) => searchByKeywords(query, pageParam),
    getNextPageParam,
    enabled: enabled && query.length > 0,
    initialPageParam: 1,
    ...baseQueryOptions,
  });
};

export const useAdvancedSearch = (searchParams: SearchParams, enabled = true) => {
  return useInfiniteQuery({
    queryKey: ['advanced-search', searchParams],
    queryFn: ({ pageParam = 1 }) => searchWithAdvancedFilters({
      ...searchParams,
      page: pageParam,
    }),
    getNextPageParam,
    enabled: enabled && hasValidSearchParams(searchParams),
    initialPageParam: 1,
    ...baseQueryOptions,
  });
};

export const useArticlesByCategory = (category: NewsCategory) => {
  return useInfiniteQuery({
    queryKey: ['category', category],
    queryFn: ({ pageParam = 1 }) => getArticlesByCategory(category, pageParam),
    getNextPageParam,
    initialPageParam: 1,
    ...baseQueryOptions,
  });
};
