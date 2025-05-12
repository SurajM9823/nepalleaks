import React from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';

interface CategorySectionProps {
  title: string;
  articles: Article[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, articles }) => {
  if (articles.length === 0) return null;
  
  return (
    <section className="py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-maroon-900 dark:text-gold-300">
            {title}
          </h2>
          <a 
            href={`/category/${title.toLowerCase()}`} 
            className="text-sm font-medium text-maroon-600 dark:text-maroon-400 hover:text-maroon-800 dark:hover:text-maroon-300 transition-colors"
          >
            View All
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;