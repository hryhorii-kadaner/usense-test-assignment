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

export interface SearchParams {
  q?: string;
  page?: number;
  pageSize?: number;
  language?: string;
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
  country?: string;
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  searchIn?: string;
}

export interface ArticlesResponse {
  articles: Article[];
  totalResults: number;
  page?: number;
  pageSize?: number;
}
