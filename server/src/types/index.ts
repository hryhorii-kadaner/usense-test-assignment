export interface SearchParams {
  q?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
  searchIn?: string; // title, description, content
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

export interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface Article {
  id: string;
  title: string;
  snippet: string;
  url: string;
  publishedDate: string;
  source: string;
  imageUrl?: string;
  content?: string;
  author?: string;
}

export interface ApiError {
  error: string;
  message?: string;
  status?: number;
}
