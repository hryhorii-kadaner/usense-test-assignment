import { Request, Response, NextFunction } from 'express';
import { newsApiService } from '../services';
import { getCurrentTimestamp } from '../utils';
import { SearchParams } from '../types';

class NewsController {
  /**
   * Search articles with advanced filters
   */
  async searchArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const searchParams: SearchParams = {
        q: req.query.q as string,
        pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 20,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        language: req.query.language as string || 'en',
        sortBy: (req.query.sortBy as 'relevancy' | 'popularity' | 'publishedAt') || 'publishedAt',

        // Advanced search filters
        domains: req.query.domains as string,
        excludeDomains: req.query.excludeDomains as string,
        from: req.query.from as string,
        to: req.query.to as string,
        searchIn: req.query.searchIn as string
      };

      const hasRequiredParams = searchParams.q || searchParams.domains;

      if (!hasRequiredParams) {
        const hasSearchFilters = searchParams.language !== 'en' ||
          searchParams.from ||
          searchParams.to ||
          searchParams.excludeDomains ||
          searchParams.searchIn;

        if (hasSearchFilters) {
          searchParams.q = '*'; // Wildcard поиск
        } else {
          return res.status(400).json({
            error: 'Missing required parameters',
            message: 'At least one of the following parameters is required: q (search query) or domains',
            timestamp: getCurrentTimestamp(),
            path: req.path
          });
        }
      }

      const articles = await newsApiService.searchNews(searchParams);

      res.json({
        articles,
        totalResults: articles.length,
        page: searchParams.page,
        pageSize: searchParams.pageSize
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get top headlines with category filters
   */
  async getTopHeadlines(req: Request, res: Response, next: NextFunction) {
    try {
      const searchParams: SearchParams = {
        category: req.query.category as 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology',
        pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 20,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1
      };

      const articles = await newsApiService.getTopHeadlines(searchParams);

      res.json({
        articles,
        totalResults: articles.length
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NewsController();
