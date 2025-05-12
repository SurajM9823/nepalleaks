import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 1200);
  };
  
  return (
    <section className="py-10 bg-maroon-50 dark:bg-maroon-900/30 transition-colors">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-maroon-100 dark:bg-maroon-800 text-maroon-600 dark:text-maroon-400 mb-4">
            {subscribed ? <Check size={24} /> : <Mail size={24} />}
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-maroon-900 dark:text-gold-300">
            {subscribed ? 'Thank you for subscribing!' : 'Subscribe to Our Newsletter'}
          </h2>
          
          {subscribed ? (
            <div className="animate-fade-in">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You've been added to our newsletter. We'll send you the latest news and updates.
              </p>
              <button 
                onClick={() => {
                  setSubscribed(false);
                  setEmail('');
                }}
                className="text-maroon-600 dark:text-maroon-400 font-medium hover:text-maroon-800 dark:hover:text-maroon-300"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get the latest news delivered directly to your inbox
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-300 dark:focus:ring-maroon-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                  {error && <p className="text-red-500 text-xs mt-1 text-left">{error}</p>}
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading 
                      ? 'bg-maroon-500 cursor-not-allowed' 
                      : 'bg-maroon-700 hover:bg-maroon-800 dark:bg-maroon-800 dark:hover:bg-maroon-700'
                  } text-white font-medium py-3 px-6 rounded-md transition duration-200 whitespace-nowrap`}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;