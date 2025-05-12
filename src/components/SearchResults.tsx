import React from 'react';
import { X } from 'lucide-react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  results: Article[];
  loading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  isOpen, 
  onClose, 
  query, 
  results, 
  loading 
}) => {
  
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
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-auto">
      <div className="min-h-screen container mx-auto p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-5xl mx-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {query ? `Search results for "${query}"` : 'Search Articles'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-maroon-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Searching articles...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {results.map(article => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    variant="medium" 
                  />
                ))}
              </div>
            ) : query ? (
              <div className="py-12 text-center">
                <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No results found</p>
                <p className="text-gray-500 dark:text-gray-500">
                  We couldn't find any articles matching "{query}". Please try different keywords.
                </p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">Enter a search term to find articles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;