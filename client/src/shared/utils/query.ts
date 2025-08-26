import type { ArticlesResponse, SearchParams } from '../types';

/**
 * Утилиты для работы с React Query
 */

// Конфигурация для запросов
export const STALE_TIME = 5 * 60 * 1000; // 5 min
export const MAX_RETRIES = 2;
export const RETRY_DELAY = (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000);

export const baseQueryOptions = {
  staleTime: STALE_TIME,
  retry: MAX_RETRIES,
  retryDelay: RETRY_DELAY,
};

/**
 * Проверяет наличие значимых параметров поиска
 */
export const hasValidSearchParams = (params: SearchParams): boolean => {
  return Boolean(
    params.q ||
    params.sources ||
    params.domains ||
    params.excludeDomains ||
    params.from ||
    params.to ||
    params.language ||
    params.searchIn ||
    params.category ||
    params.country
  );
};

/**
 * Определяет следующую страницу для бесконечной пагинации
 */
export const getNextPageParam = (lastPage: ArticlesResponse, allPages: ArticlesResponse[]) => {
  if (!lastPage?.totalResults) return undefined;
  const currentResults = allPages.reduce((total, page) => total + page.articles.length, 0);
  return currentResults < lastPage.totalResults ? (lastPage.page || 1) + 1 : undefined;
};
