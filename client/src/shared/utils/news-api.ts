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
  return Boolean(params.q || params.domains);
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
 * Проверяет, есть ли фильтры, работающие только с top-headlines endpoint
 */
export const hasTopHeadlinesOnlyFilters = (params: SearchParams): boolean => {
  return Boolean(params.category);
};

/**
 * Определяет, какой endpoint использовать для запроса
 */
export const shouldUseSearchEndpoint = (params: SearchParams): boolean => {
  const hasRequired = hasSearchRequiredParams(params);
  const hasSearchOnly = hasSearchOnlyFilters(params);
  const hasTopHeadlinesOnly = hasTopHeadlinesOnlyFilters(params);
  
  // Если есть обязательные параметры для search или search-only фильтры, используем search
  if (hasRequired || hasSearchOnly || params.q) {
    return true;
  }
  
  // Если есть только top-headlines фильтры (category) без search-only фильтров
  if (hasTopHeadlinesOnly && !hasSearchOnly) {
    return false;
  }
  
  // По умолчанию используем top-headlines для базовых запросов
  return false;
};
