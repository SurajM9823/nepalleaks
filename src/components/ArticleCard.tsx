import React from 'react';
import { Clock, Bookmark, Share2 } from 'lucide-react';
import { Article } from '../types';
import { useAuth } from '../context/AuthContext';

interface ArticleCardProps {
  article: Article;
  variant?: 'small' | 'medium' | 'large';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'medium' }) => {
  const { title, excerpt, author, date, imageUrl, category, readTime, slug } = article;
  const { isAuthenticated, toggleBookmark, isBookmarked } = useAuth();
  
  const bookmarked = isBookmarked(article.id);
  
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      toggleBookmark(article.id);
    }
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: `/${slug}`
      }).catch(err => console.error('Error sharing', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.origin + '/' + slug)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy link', err));
    }
  };
  
  if (variant === 'small') {
    return (
      <div className="flex items-start space-x-3 mb-4 group">
        <div className="w-24 h-20 flex-shrink-0 rounded-md overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
        <div className="flex-1">
          <p className="text-xs text-maroon-500 dark:text-gold-400 font-semibold mb-1">{category}</p>
          <h3 className="text-sm font-semibold leading-tight group-hover:text-maroon-700 dark:group-hover:text-gold-300 mb-1 transition-colors">
            <a href={`/article/${slug}`}>{title}</a>
          </h3>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span>{date}</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'large') {
    return (
      <div className="mb-8 group">
        <div className="mb-3 overflow-hidden rounded-lg relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute top-0 right-0 p-2 flex space-x-2">
            {isAuthenticated && (
              <button 
                onClick={handleBookmark}
                className="p-1.5 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label={bookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
              >
                <Bookmark size={16} className={`${bookmarked ? 'fill-maroon-500 text-maroon-500' : 'text-gray-700 dark:text-gray-300'}`} />
              </button>
            )}
            <button 
              onClick={handleShare}
              className="p-1.5 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Share article"
            >
              <Share2 size={16} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
        <div>
          <p className="text-sm text-maroon-500 dark:text-gold-400 font-semibold mb-2">{category}</p>
          <h2 className="text-2xl font-bold leading-tight group-hover:text-maroon-700 dark:group-hover:text-gold-300 mb-3 transition-colors">
            <a href={`/article/${slug}`}>{title}</a>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">{author}</span>
              <span className="mx-2">•</span>
              <span>{date}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock size={14} className="mr-1" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Default: medium
  return (
    <div className="mb-6 group">
      <div className="mb-3 overflow-hidden rounded-lg relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute top-0 right-0 p-2 flex space-x-2">
          {isAuthenticated && (
            <button 
              onClick={handleBookmark}
              className="p-1.5 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label={bookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
            >
              <Bookmark size={16} className={`${bookmarked ? 'fill-maroon-500 text-maroon-500' : 'text-gray-700 dark:text-gray-300'}`} />
            </button>
          )}
          <button 
            onClick={handleShare}
            className="p-1.5 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Share article"
          >
            <Share2 size={16} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
      <div>
        <p className="text-xs text-maroon-500 dark:text-gold-400 font-semibold mb-1">{category}</p>
        <h3 className="text-lg font-semibold leading-tight group-hover:text-maroon-700 dark:group-hover:text-gold-300 mb-2 transition-colors">
          <a href={`/article/${slug}`}>{title}</a>
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">{author}</span>
            <span className="mx-1.5">•</span>
            <span>{date}</span>
          </div>
          {readTime && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock size={14} className="mr-1" />
              <span>{readTime} min read</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;