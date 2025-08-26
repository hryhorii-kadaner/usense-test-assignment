import type { SearchParams } from '../types';

/**
 * Утилиты для работы с NewsAPI
 */

/**
 * Очищает параметры от undefined значений
 */
export const cleanParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  );
};

/**
 * Проверяет, есть ли обязательные параметры для search endpoint
 */
export const hasSearchRequiredParams = (params: SearchParams): boolean => {
  return Boolean(params.q || params.sources || params.domains);
};

/**
 * Проверяет, есть ли фильтры, работающие только с search endpoint
 */
export const hasSearchOnlyFilters = (params: SearchParams): boolean => {
  return Boolean(
    params.language || 
    params.searchIn || 
    params.excludeDomains || 
    params.from || 
    params.to
  );
};

/**
 * Определяет, какой endpoint использовать для запроса
 */
export const shouldUseSearchEndpoint = (params: SearchParams): boolean => {
  const hasRequired = hasSearchRequiredParams(params);
  const hasSearchOnly = hasSearchOnlyFilters(params);
  
  return hasRequired && (hasSearchOnly || Boolean(params.q));
};
