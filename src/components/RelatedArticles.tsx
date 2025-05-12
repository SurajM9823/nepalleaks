import React from 'react';
import { Article } from '../types';

interface RelatedArticlesProps {
  articles: Article[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-maroon-900 dark:text-gold-300 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
        Related Articles
      </h2>
      
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="group">
            <div className="flex flex-col space-y-2">
              <div className="w-full h-40 overflow-hidden rounded-lg">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div>
                <p className="text-xs text-maroon-500 dark:text-maroon-400 font-semibold mb-1">{article.category}</p>
                <h3 className="font-medium text-base leading-tight mb-1 group-hover:text-maroon-700 dark:group-hover:text-gold-300 transition-colors">
                  <a href={`/article/${article.slug}`}>{article.title}</a>
                </h3>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;