import { newsApiClient, buildQueryParams, isAxiosError } from '../config/api';
import { SearchParams, NewsApiResponse, Article } from '../types';

class NewsApiService {
  /**
   * Search news through NewsAPI with advanced filters
   */
  async searchNews(params: SearchParams): Promise<Article[]> {
    try {
      const queryParams = buildQueryParams({
        q: params.q,
        pageSize: params.pageSize,
        page: params.page,
        language: params.language,
        sortBy: params.sortBy,
        domains: params.domains,
        excludeDomains: params.excludeDomains,
        from: params.from,
        to: params.to,
        searchIn: params.searchIn
      });

      console.log('Searching news with advanced filters:', {
        q: params.q,
        pageSize: params.pageSize || 20,
        page: params.page || 1,
        filters: {
          domains: params.domains,
          excludeDomains: params.excludeDomains,
          from: params.from,
          to: params.to,
          searchIn: params.searchIn
        }
      });
      
      const response = await newsApiClient.get('/everything', { params: queryParams });
      const data: NewsApiResponse = response.data;

      if (!data.articles || data.articles.length === 0) {
        console.log('No articles found in response');
        return [];
      }

      const articles = data.articles.map((item, index) => ({
        id: `${Date.now()}-${index}`,
        title: item.title,
        snippet: item.description || '',
        url: item.url,
        publishedDate: item.publishedAt,
        source: item.source.name,
        imageUrl: item.urlToImage || undefined,
        content: item.content || undefined,
        author: item.author || undefined
      }));

      console.log(`Converted ${articles.length} articles`);
      return articles;

    } catch (error) {
      console.error('Error searching news with NewsAPI:', error);
      if (isAxiosError(error) && error.response) {
        console.error('NewsAPI error response:', error.response.data);
      }
      throw new Error('Failed to fetch news from NewsAPI');
    }
  }

  /**
   * Получение топовых новостей
   */
  async getTopHeadlines(params: SearchParams = {}): Promise<Article[]> {
    try {
      const queryParams = buildQueryParams({
        country: 'us', // Фиксированная страна для стабильности
        category: params.category,
        q: params.q,
        pageSize: params.pageSize,
        page: params.page
      });

      console.log('Fetching top headlines:', {
        country: 'us',
        category: params.category,
        pageSize: params.pageSize || 20
      });
      
      const response = await newsApiClient.get('/top-headlines', { params: queryParams });
      const data: NewsApiResponse = response.data;

      if (!data.articles || data.articles.length === 0) {
        console.log('No top headlines found in response');
        return [];
      }

      const articles = data.articles.map((item, index) => ({
        id: `top-${Date.now()}-${index}`,
        title: item.title,
        snippet: item.description || '',
        url: item.url,
        publishedDate: item.publishedAt,
        source: item.source.name,
        imageUrl: item.urlToImage || undefined,
        content: item.content || undefined,
        author: item.author || undefined
      }));

      console.log(`Converted ${articles.length} top headlines`);
      return articles;

    } catch (error) {
      console.error('Error fetching top headlines from NewsAPI:', error);
      if (isAxiosError(error) && error.response) {
        console.error('NewsAPI error response:', error.response.data);
      }
      throw new Error('Failed to fetch top headlines from NewsAPI');
    }
  }
}

export const newsApiService = new NewsApiService();
