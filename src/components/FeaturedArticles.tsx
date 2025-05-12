import React from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';

interface FeaturedArticlesProps {
  articles: Article[];
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ articles }) => {
  if (articles.length === 0) return null;
  
  const mainArticle = articles[0];
  const secondaryArticles = articles.slice(1);
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold border-b-2 border-maroon-700 dark:border-maroon-600 pb-2 mb-6 text-maroon-900 dark:text-gold-300">
        Featured Stories
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src={mainArticle.imageUrl} 
              alt={mainArticle.title}
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-gold-400 font-semibold mb-2">{mainArticle.category}</p>
                <h3 className="text-3xl font-bold mb-3 group-hover:text-gold-300 transition-colors">
                  <a href={`/article/${mainArticle.slug}`}>{mainArticle.title}</a>
                </h3>
                <p className="text-gray-200 mb-3 line-clamp-2">{mainArticle.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="font-medium">{mainArticle.author}</span>
                    <span className="mx-2">•</span>
                    <span>{mainArticle.date}</span>
                  </div>
                  {mainArticle.readTime && (
                    <div className="text-sm text-gray-300">
                      {mainArticle.readTime} min read
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Secondary Featured Articles */}
        <div className="grid md:grid-cols-2 gap-6">
          {secondaryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;