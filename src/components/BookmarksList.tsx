import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { Article } from '../types';
import { useAuth } from '../context/AuthContext';
import ArticleCard from './ArticleCard';

interface BookmarksListProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
}

const BookmarksList: React.FC<BookmarksListProps> = ({ 
  isOpen, 
  onClose, 
  bookmarkedArticles 
}) => {
  const { toggleBookmark } = useAuth();
  
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleRemoveBookmark = (articleId: string) => {
    toggleBookmark(articleId);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-auto">
      <div className="min-h-screen container mx-auto p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-5xl mx-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Saved Articles
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            {bookmarkedArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {bookmarkedArticles.map(article => (
                  <div key={article.id} className="relative group">
                    <ArticleCard article={article} variant="medium" />
                    <button
                      onClick={() => handleRemoveBookmark(article.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove bookmark"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No saved articles</p>
                <p className="text-gray-500 dark:text-gray-500">
                  You haven't saved any articles yet. Click the bookmark icon on articles to save them for later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarksList;