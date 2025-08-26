import { api } from '../../config/api';
import { cleanParams, hasSearchRequiredParams, hasSearchOnlyFilters } from '../../utils';
import type { ArticlesResponse, SearchParams } from '../../types';

export const searchArticles = async (params: SearchParams): Promise<ArticlesResponse> => {
  const response = await api.get('/news/search', { params });
  return response.data;
};

export const getTopHeadlines = async (params: SearchParams): Promise<ArticlesResponse> => {
  const response = await api.get('/news/top-headlines', { params });
  return response.data;
};

export const searchByKeywords = async (
  query: string, 
  page = 1, 
  additionalParams?: Partial<SearchParams>
): Promise<ArticlesResponse> => {
  return searchArticles({
    q: query,
    page,
    pageSize: 20,
    language: 'en',
    ...additionalParams
  });
};

export const getArticlesByCategory = async (
  category: string, 
  page = 1,
  country = 'us'
): Promise<ArticlesResponse> => {
  const params = {
    category: category === 'general' ? undefined : category,
    country,
    page,
    pageSize: 20
  };

  return getTopHeadlines(cleanParams(params));
};

export const searchWithAdvancedFilters = async (params: SearchParams): Promise<ArticlesResponse> => {
  const hasRequired = hasSearchRequiredParams(params);
  
  const searchOnly = hasSearchOnlyFilters(params);

  if (searchOnly && !hasRequired) {
    return {
      articles: [],
      totalResults: 0,
      page: params.page || 1,
      pageSize: params.pageSize || 20
    };
  }

  if (hasRequired || searchOnly) {
    return searchArticles(params);
  }
  
  const topHeadlinesParams = {
    country: params.country,
    category: params.category,
    sources: params.sources,
    q: params.q,
    page: params.page,
    pageSize: params.pageSize
  };
  
  return getTopHeadlines(cleanParams(topHeadlinesParams));
};
