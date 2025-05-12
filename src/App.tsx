import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel'; // Import AdminPanel
import BreakingNews from './components/BreakingNews';
import FeaturedArticles from './components/FeaturedArticles';
import LatestNews from './components/LatestNews';
import CategorySection from './components/CategorySection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ArticleDetail from './components/ArticleDetail';
import SearchResults from './components/SearchResults';
import AuthModal from './components/AuthModal';
import BookmarksList from './components/BookmarksList';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { articles as initialArticles, featuredArticles, latestArticles } from './data/articles';
import { Article } from './types';

const AppContent: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAdminPanel, setIsAdminPanel] = useState(false); // State for AdminPanel
  const [articles, setArticles] = useState<Article[]>(initialArticles); // Dynamic articles state
  const { isAuthenticated, user } = useAuth();

  const breakingNews = latestArticles.slice(0, 5);

  const getArticlesByCategory = (category: string) => {
    return articles.filter((article) => article.category === category).slice(0, 3);
  };

  // Handle saving an article (for AdminPanel)
  const handleSave = (article: Article) => {
    setArticles((prev) =>
      prev.some((a) => a.id === article.id)
        ? prev.map((a) => (a.id === article.id ? article : a))
        : [...prev, article]
    );
  };

  // Handle deleting an article (for AdminPanel)
  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  useEffect(() => {
    // Update document title and handle admin panel
    if (window.location.pathname === '/admin') {
      setIsAdminPanel(true);
      setSelectedArticle(null);
      document.title = 'Admin Panel | NepalLeaks';
    } else if (selectedArticle) {
      setIsAdminPanel(false);
      document.title = `${selectedArticle.title} | NepalLeaks`;
    } else {
      setIsAdminPanel(false);
      document.title = 'NepalLeaks | Independent Journalism';
    }

    // Update related articles when an article is selected
    if (selectedArticle) {
      const related = articles
        .filter(
          (article) =>
            article.id !== selectedArticle.id &&
            (article.category === selectedArticle.category ||
              (selectedArticle.tags &&
                article.tags &&
                article.tags.some((tag) => selectedArticle.tags?.includes(tag))))
        )
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [selectedArticle, articles]);

  // Handle article selection and admin panel from URL
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setIsAdminPanel(true);
        setSelectedArticle(null);
      } else {
        setIsAdminPanel(false);
        const slug = path.split('/').pop();
        if (slug && slug !== '' && path.startsWith('/article/')) {
          const article = articles.find((a) => a.slug === slug);
          if (article) {
            setSelectedArticle(article);
          } else {
            setSelectedArticle(null);
          }
        } else {
          setSelectedArticle(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Initialize

    return () => window.removeEventListener('popstate', handlePopState);
  }, [articles]);

  // Simulate URL change when selecting an article
  useEffect(() => {
    const captureLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link) {
        const href = link.getAttribute('href');
        if (href?.startsWith('/article/')) {
          e.preventDefault();
          const slug = href.split('/').pop();
          const article = articles.find((a) => a.slug === slug);
          if (article) {
            setSelectedArticle(article);
            setIsAdminPanel(false);
            window.history.pushState({}, '', href);
          }
        } else if (href === '/admin') {
          e.preventDefault();
          setIsAdminPanel(true);
          setSelectedArticle(null);
          window.history.pushState({}, '', '/admin');
        }
      }
    };

    document.addEventListener('click', captureLinks);
    return () => document.removeEventListener('click', captureLinks);
  }, [articles]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchLoading(true);
    setIsSearchOpen(true);

    // Simulate search delay
    setTimeout(() => {
      const results = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          article.category.toLowerCase().includes(query.toLowerCase()) ||
          (article.tags &&
            article.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())))
      );
      setSearchResults(results);
      setSearchLoading(false);
    }, 500);
  };

  const handleBackFromArticle = () => {
    setSelectedArticle(null);
    setIsAdminPanel(false);
    window.history.pushState({}, '', '/');
    document.title = 'NepalLeaks | Independent Journalism';
  };

  const closeSearchResults = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Get bookmarked articles for user
  const bookmarkedArticles = React.useMemo(() => {
    if (!isAuthenticated || !user) return [];
    return articles.filter((article) => user.bookmarks.includes(article.id));
  }, [isAuthenticated, user, articles]);

  // Render AdminPanel if /admin
  if (isAdminPanel) {
    return <AdminPanel articles={articles} onSave={handleSave} onDelete={handleDelete} />;
  }

  // If an article is selected, show article detail page
  if (selectedArticle) {
    return (
      <>
        <ArticleDetail
          article={selectedArticle}
          relatedArticles={relatedArticles}
          onBack={handleBackFromArticle}
        />
        <Footer />
      </>
    );
  }

  // Default home page
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onSearch={handleSearch}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />
      <BreakingNews articles={breakingNews} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Content Area - 8 columns */}
            <div className="lg:col-span-8">
              {/* Featured Stories */}
              <FeaturedArticles articles={featuredArticles} />
              {/* Category Sections */}
              <div className="space-y-12">
                <CategorySection title="Politics" articles={getArticlesByCategory('Politics')} />
                <CategorySection title="Economy" articles={getArticlesByCategory('Economy')} />
                <CategorySection title="Rights" articles={getArticlesByCategory('Rights')} />
                <CategorySection title="World" articles={getArticlesByCategory('World')} />
              </div>
            </div>
            {/* Sidebar - 4 columns */}
            <div className="lg:col-span-4">
              {/* Latest News Sidebar */}
              <div className="sticky top-24">
                <LatestNews articles={latestArticles} />
                {/* Ad Space */}
                <div className="mt-8 p-4 bg-maroon-50 dark:bg-maroon-900/20 text-center rounded-lg">
                  <p className="text-xs text-maroon-500 dark:text-maroon-400 mb-2">ADVERTISEMENT</p>
                  <div className="h-60 bg-maroon-100 dark:bg-maroon-900/40 flex items-center justify-center">
                    <p className="text-maroon-400 dark:text-maroon-300">Ad Space</p>
                  </div>
                </div>
                {/* Opinion Articles */}
                <div className="mt-8 bg-maroon-50 dark:bg-maroon-900/20 p-4 rounded-lg">
                  <h2 className="text-lg font-bold border-b border-maroon-200 dark:border-maroon-800 pb-2 mb-4 text-maroon-900 dark:text-gold-300">
                    Opinion
                  </h2>
                  <div className="space-y-4">
                    {articles
                      .filter((article) => article.category === 'Opinion')
                      .slice(0, 3)
                      .map((article) => (
                        <div
                          key={article.id}
                          className="pb-4 border-b border-maroon-100 dark:border-maroon-800 last:border-0"
                        >
                          <h3 className="font-medium text-base mb-1 hover:text-maroon-700 dark:hover:text-gold-300 transition-colors">
                            <a href={`/article/${article.slug}`}>{article.title}</a>
                          </h3>
                          <p className="text-sm text-maroon-500 dark:text-maroon-400">
                            By {article.author}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Newsletter Section */}
        <Newsletter />
      </main>
      <Footer />
      {/* Modals */}
      <SearchResults
        isOpen={isSearchOpen}
        onClose={closeSearchResults}
        query={searchQuery}
        results={searchResults}
        loading={searchLoading}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <BookmarksList
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}