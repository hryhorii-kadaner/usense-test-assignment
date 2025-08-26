import { api } from '../../config/api';
import { 
  cleanParams, 
  shouldUseSearchEndpoint 
} from '../../utils';
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
  page = 1
): Promise<ArticlesResponse> => {
  const params = {
    category: category === 'general' ? undefined : category,
    page,
    pageSize: 20
  };

  return getTopHeadlines(cleanParams(params));
};

export const searchWithAdvancedFilters = async (params: SearchParams): Promise<ArticlesResponse> => {
  const useSearchEndpoint = shouldUseSearchEndpoint(params);

  if (useSearchEndpoint) {
    const searchParams = {
      q: params.q || '*',
      pageSize: params.pageSize,
      page: params.page,
      language: params.language,
      domains: params.domains,
      excludeDomains: params.excludeDomains,
      from: params.from,
      to: params.to,
      searchIn: params.searchIn
      // category НЕ поддерживается в search endpoint
    };
    
    return searchArticles(cleanParams(searchParams));
  } else {
    const topHeadlinesParams = {
      category: params.category,
      page: params.page,
      pageSize: params.pageSize
      // language, from, to, excludeDomains, searchIn НЕ поддерживаются в top-headlines
    };
    
    return getTopHeadlines(cleanParams(topHeadlinesParams));
  }
};
