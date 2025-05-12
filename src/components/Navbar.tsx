import React, { useState, useEffect } from 'react';
import { Menu, Search, X, User, Bookmark, LogOut, Sun, Moon } from 'lucide-react';
import { categories } from '../data/categories';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { format } from 'date-fns';

interface NavbarProps {
  onOpenAuth: () => void;
  onSearch: (query: string) => void;
  onOpenBookmarks: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onSearch, onOpenBookmarks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', `/nepalleaks${path}`);
    window.dispatchEvent(new PopStateEvent('popstate')); // Trigger App.tsx routing
    closeMenus();
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-maroon-900/95 backdrop-blur-sm shadow-md' : 'bg-maroon-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="md:hidden mr-4 text-gold-200 hover:text-gold-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-gold-400">
              <a href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center">
                NepalLeaks
              </a>
            </h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-gold-200 text-sm">
              <span>{format(currentTime, 'EEEE')}</span>
              <span>{format(currentTime, 'dd MMMM yyyy')}</span>
              <span>{format(currentTime, 'HH:mm:ss')}</span>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 sm:w-48 md:w-64 p-2 pl-4 pr-10 bg-maroon-800 text-gold-50 rounded-lg border border-maroon-600 focus:outline-none focus:border-gold-400 transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-200 hover:text-gold-100"
                aria-label="Search"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </form>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-maroon-800 text-gold-200 hover:text-gold-100 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 text-gold-200 hover:text-gold-100"
                  aria-label="User menu"
                >
                  <span className="hidden md:inline-block text-sm font-medium">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <User size={20} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 animate-fade-in-down">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenBookmarks();
                        closeMenus();
                      }}
                    >
                      <Bookmark size={16} className="mr-2" />
                      Saved Articles
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        closeMenus();
                      }}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-bold py-1 px-4 rounded text-sm transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <nav className="hidden md:block border-t border-maroon-700">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center space-x-6">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`/category/${category.slug}`}
                  onClick={(e) => handleNavClick(e, `/category/${category.slug}`)}
                  className="block px-3 py-3 text-gold-200 hover:text-gold-400 hover:bg-maroon-800 transition text-sm"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {isMenuOpen && (
        <nav className="md:hidden bg-maroon-900 border-t border-maroon-700 animate-fade-in-down">
          <div className="px-4">
            <ul className="flex flex-col">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`/category/${category.slug}`}
                    onClick={(e) => handleNavClick(e, `/category/${category.slug}`)}
                    className="block px-4 py-3 text-gold-200 hover:text-gold-400 border-b border-maroon-700"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;