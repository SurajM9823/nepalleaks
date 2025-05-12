import React from 'react';
import { Article } from '../types';

interface LatestNewsProps {
  articles: Article[];
}

const LatestNews: React.FC<LatestNewsProps> = ({ articles }) => {
  return (
    <div className="bg-maroon-50 dark:bg-maroon-900/20 p-4 rounded-lg">
      <h2 className="text-xl font-bold border-b-2 border-maroon-300 dark:border-maroon-700 pb-2 mb-4 text-maroon-900 dark:text-gold-300">
        Latest News
      </h2>
      
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="flex gap-3 group">
            <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-maroon-600 dark:text-maroon-400 font-semibold mb-1">{article.category}</p>
              <h3 className="font-medium text-sm leading-tight mb-1 group-hover:text-maroon-700 dark:group-hover:text-gold-300 line-clamp-2 transition-colors">
                <a href={`/article/${article.slug}`}>{article.title}</a>
              </h3>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium truncate">{article.author}</span>
                <span className="mx-1.5">•</span>
                <span className="truncate">{article.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2.5 text-center text-sm bg-maroon-700 text-white hover:bg-maroon-800 dark:bg-maroon-800 dark:hover:bg-maroon-700 font-medium rounded-lg transition duration-200">
        View All Latest
      </button>
    </div>
  );
};

export default LatestNews;