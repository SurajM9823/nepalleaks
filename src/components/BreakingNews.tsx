import React, { useEffect, useRef, useState } from 'react';
import { Article } from '../types';

interface BreakingNewsProps {
  articles: Article[];
}

const BreakingNews: React.FC<BreakingNewsProps> = ({ articles }) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Pause animation on hover
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', () => setIsPaused(true));
      container.addEventListener('mouseleave', () => setIsPaused(false));
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mouseenter', () => setIsPaused(true));
        container.removeEventListener('mouseleave', () => setIsPaused(false));
      }
    };
  }, []);
  
  return (
    <div className="bg-maroon-900 text-white py-2 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 z-10">
            <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-sm flex items-center">
              BREAKING
            </span>
          </div>
          
          <div className="overflow-hidden ml-4 flex-1" ref={containerRef}>
            <div 
              className={`whitespace-nowrap inline-block animate-marquee ${isPaused ? 'pause-animation' : ''}`}
              style={{ animation: isPaused ? 'none' : 'marquee 25s linear infinite' }}
            >
              {articles.map((article, index) => (
                <React.Fragment key={article.id}>
                  <a 
                    href={`/article/${article.slug}`} 
                    className="text-gold-200 hover:text-gold-400 inline-block mr-8"
                  >
                    {article.title}
                  </a>
                  {index < articles.length - 1 && (
                    <span className="text-maroon-400 mr-8">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Clone for seamless looping */}
            <div 
              className={`whitespace-nowrap inline-block animate-marquee2 ${isPaused ? 'pause-animation' : ''}`}
              style={{ animation: isPaused ? 'none' : 'marquee2 25s linear infinite' }}
            >
              {articles.map((article, index) => (
                <React.Fragment key={`clone-${article.id}`}>
                  <a 
                    href={`/article/${article.slug}`} 
                    className="text-gold-200 hover:text-gold-400 inline-block mr-8"
                  >
                    {article.title}
                  </a>
                  {index < articles.length - 1 && (
                    <span className="text-maroon-400 mr-8">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Fade effect on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-maroon-900 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-maroon-900 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;