import React, { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, Share2, Facebook, Twitter, Linkedin, Clock } from 'lucide-react';
import { Article } from '../types';
import { useAuth } from '../context/AuthContext';
import RelatedArticles from './RelatedArticles';
import { format } from 'date-fns';

interface ArticleDetailProps {
  article: Article;
  relatedArticles: Article[];
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, relatedArticles, onBack }) => {
  const { isAuthenticated, toggleBookmark, isBookmarked } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);
  
  const bookmarked = isBookmarked(article.id);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Calculate estimated read time
    const wordsPerMinute = 200;
    const wordCount = article.content.split(/\s+/).length;
    setEstimatedReadTime(Math.ceil(wordCount / wordsPerMinute));
  }, [article.content]);
  
  const handleBookmark = () => {
    if (isAuthenticated) {
      toggleBookmark(article.id);
    }
  };
  
  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const text = article.title;
    
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    } else if (navigator.share) {
      navigator.share({
        title: text,
        text: article.excerpt,
        url: url
      }).catch(err => console.error('Error sharing', err));
    } else {
      navigator.clipboard.writeText(url)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy link', err));
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Article Header Bar */}
      <div className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center text-maroon-700 dark:text-gold-400 hover:text-maroon-900 dark:hover:text-gold-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated && (
              <button 
                onClick={handleBookmark}
                className={`p-2 rounded-full ${
                  bookmarked 
                    ? 'bg-maroon-100 dark:bg-maroon-900 text-maroon-700 dark:text-maroon-300' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                } hover:bg-maroon-200 dark:hover:bg-maroon-800 transition-colors`}
                aria-label={bookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
              >
                <Bookmark size={18} className={bookmarked ? 'fill-maroon-500 text-maroon-500 dark:fill-maroon-400 dark:text-maroon-400' : ''} />
              </button>
            )}
            <button 
              onClick={() => handleShare()}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Share article"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose dark:prose-invert lg:prose-lg mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span>{format(new Date(article.date), 'MMMM d, yyyy')}</span>
              <span>•</span>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{estimatedReadTime} min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {article.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {article.excerpt}
            </p>
            
            <div className="flex items-center space-x-4">
              {article.authorImage && (
                <img 
                  src={article.authorImage} 
                  alt={article.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{article.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{article.category}</p>
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          <figure className="mb-8">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </figure>
          
          {/* Article Body */}
          <div className="article-content">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <a 
                    key={tag} 
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>
        
        {/* Share Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => handleShare('facebook')}
              className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook size={20} />
            </button>
            <button 
              onClick={() => handleShare('twitter')}
              className="p-3 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-500 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter size={20} />
            </button>
            <button 
              onClick={() => handleShare('linkedin')}
              className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={20} />
            </button>
          </div>
        </div>
        
        {/* Author Box */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start space-x-4">
            {article.authorImage && (
              <img 
                src={article.authorImage} 
                alt={article.author}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                About {article.author}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Experienced journalist covering {article.category.toLowerCase()} and related topics.
                Previously worked with international news agencies focusing on investigative journalism.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-gray-600 dark: text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Articles */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map(article => (
              <div key={article.id} className="group">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-sm text-maroon-600 dark:text-maroon-400 font-semibold mb-2">
                  {article.category}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-maroon-600 dark:group-hover:text-maroon-400">
                  <a href={`/article/${article.slug}`}>{article.title}</a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{format(new Date(article.date), 'MMM d, yyyy')}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;