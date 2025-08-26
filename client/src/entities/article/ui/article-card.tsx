import React from 'react';
import { Article } from '../../../shared/types';
import { formatDate } from '../../../shared/utils';
import { Calendar, User, ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, className = '' }) => {
  return (
    <article 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full ${className}`}
    >
      {article.imageUrl ? (
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <ExternalLink size={32} className="mx-auto mb-2" />
            <span className="text-sm">Без зображення</span>
          </div>
        </div>
      )}
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded transition-colors duration-200">
            {article.source}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
          {article.snippet}
        </p>

        <div className="flex flex-col gap-3 mt-auto">
          {/* Desktop metadata */}
          <div className="hidden sm:flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(article.publishedDate)}</span>
              </div>
              
              {article.author && (
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span className="truncate max-w-32">{article.author}</span>
                </div>
              )}
            </div>

            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
            >
              <ExternalLink size={14} />
              <span>Читати</span>
            </a>
          </div>

          {/* Mobile metadata and button */}
          <div className="sm:hidden space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
                
                {article.author && (
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span className="truncate max-w-20">{article.author}</span>
                  </div>
                )}
              </div>
            </div>
            
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <ExternalLink size={16} />
                Читати статтю
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
