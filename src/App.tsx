import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
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
import CategoryPage from './components/CategorySection'; // New component
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
  const [isAdminPanel, setIsAdminPanel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const { isAuthenticated, user } = useAuth();

  const breakingNews = latestArticles.slice(0, 5);

  const getArticlesByCategory = (category: string) => {
    return articles.filter((article) => article.category === category).slice(0, 3);
  };

  const handleSave = (article: Article) => {
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setArticles((prev) =>
      prev.some((a) => a.id === article.id)
        ? prev.map((a) => (a.id === article.id ? { ...article, slug } : a))
        : [...prev, { ...article, slug }]
    );
  };

  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleRouting = () => {
    let path = window.location.pathname;
    // Handle redirects from 404.html
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      path = redirectPath;
      sessionStorage.removeItem('redirectPath');
    }

    // Remove base path for internal routing
    const cleanPath = path.replace('/nepalleaks', '');
    if (cleanPath === '/admin') {
      setIsAdminPanel(true);
      setSelectedArticle(null);
      setSelectedCategory(null);
      document.title = 'Admin Panel | NepalLeaks';
    } else if (cleanPath.startsWith('/category/')) {
      setIsAdminPanel(false);
      setSelectedArticle(null);
      const categorySlug = cleanPath.split('/').pop();
      setSelectedCategory(categorySlug || null);
      document.title = `${categorySlug
        ?.split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')} | NepalLeaks`;
    } else if (cleanPath.startsWith('/article/')) {
      setIsAdminPanel(false);
      setSelectedCategory(null);
      const slug = cleanPath.split('/').pop();
      if (slug && slug !== '') {
        const article = articles.find((a) => a.slug === slug);
        if (article) {
          setSelectedArticle(article);
          document.title = `${article.title} | NepalLeaks`;
        } else {
          setSelectedArticle(null);
          document.title = 'Not Found | NepalLeaks';
        }
      } else {
        setSelectedArticle(null);
      }
    } else {
      setIsAdminPanel(false);
      setSelectedArticle(null);
      setSelectedCategory(null);
      document.title = 'NepalLeaks | Independent Journalism';
    }
  };

  useEffect(() => {
    handleRouting();
    window.addEventListener('popstate', handleRouting);
    return () => window.removeEventListener('popstate', handleRouting);
  }, [articles]);

  useEffect(() => {
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

  useEffect(() => {
    const captureLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (
          href &&
          (href.startsWith('/article/') ||
            href.startsWith('/category/') ||
            href === '/admin' ||
            href === '/')
        ) {
          e.preventDefault();
          window.history.pushState({}, '', `/nepalleaks${href}`);
          handleRouting();
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
    setSelectedCategory(null);
    window.history.pushState({}, '', '/nepalleaks/');
    document.title = 'NepalLeaks | Independent Journalism';
  };

  const closeSearchResults = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const bookmarkedArticles = React.useMemo(() => {
    if (!isAuthenticated || !user) return [];
    return articles.filter((article) => user.bookmarks.includes(article.id));
  }, [isAuthenticated, user, articles]);

  if (isAdminPanel) {
    return <AdminPanel articles={articles} onSave={handleSave} onDelete={handleDelete} />;
  }

  if (selectedCategory) {
    return (
      <>
        <CategoryPage
          categorySlug={selectedCategory}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />
        <Footer />
      </>
    );
  }

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
            <div className="lg:col-span-8">
              <FeaturedArticles articles={featuredArticles} />
              <div className="space-y-12">
                <CategorySection title="Politics" articles={getArticlesByCategory('Politics')} />
                <CategorySection title="Economy" articles={getArticlesByCategory('Economy')} />
                <CategorySection title="Rights" articles={getArticlesByCategory('Rights')} />
                <CategorySection title="World" articles={getArticlesByCategory('World')} />
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <LatestNews articles={latestArticles} />
                <div className="mt-8 p-4 bg-maroon-50 dark:bg-maroon-900/20 text-center rounded-lg">
                  <p className="text-xs text-maroon-500 dark:text-maroon-400 mb-2">ADVERTISEMENT</p>
                  <div className="h-60 bg-maroon-100 dark:bg-maroon-900/40 flex items-center justify-center">
                    <p className="text-maroon-400 dark:text-maroon-300">Ad Space</p>
                  </div>
                </div>
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
        <Newsletter />
      </main>
      <Footer />
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