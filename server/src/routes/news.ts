import { Router } from 'express';
import { newsController } from '../controllers';
import { validateQueryParams } from '../middleware';

const router = Router();

// Search articles with advanced filters
router.get('/search', 
  validateQueryParams(['q', 'pageSize', 'page', 'language', 'sortBy', 'domains', 'excludeDomains', 'from', 'to', 'searchIn']),
  newsController.searchArticles
);

// Top headlines with filters
router.get('/top-headlines',
  validateQueryParams(['category', 'pageSize', 'page']),
  newsController.getTopHeadlines
);

export default router;
