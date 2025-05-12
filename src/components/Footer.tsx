import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { categories } from '../data/categories';

const Footer: React.FC = () => {
  return (
    <footer className="bg-maroon-900 text-gold-50 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-gold-400 mb-4">NepalLeaks</h2>
            <p className="text-gold-200 mb-4 text-sm">
              नेपाललिक्स एउटा पृथक पहिचान बाेकेकाे अनलाइन अभियान हो । यसले समाजका सबै क्षेत्रका भ्रष्ट्राचार, बेथिति र विसंगतिलाई सार्वजनिक गरेर पारदर्शिता र जवाफदेहिताकाे माग गर्दछ ।
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gold-300 hover:text-gold-100 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gold-300 hover:text-gold-100 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gold-300 hover:text-gold-100 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gold-300 hover:text-gold-100 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gold-400 mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <a
                    href={`/category/${category.slug}`}
                    className="text-gold-200 hover:text-gold-100 text-sm transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gold-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gold-200 hover:text-gold-100 text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gold-200 hover:text-gold-100 text-sm transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gold-200 hover:text-gold-100 text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gold-200 hover:text-gold-100 text-sm transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/advertise" className="text-gold-200 hover:text-gold-100 text-sm transition-colors">
                  Advertise
                </a>
              </li>
              <li>
                <a href="/support" className="text-gold-200 hover:text-gold-100 text-sm transition-colors">
                  Support Us
                </a>
              </li>
              <li>
                <a href="/admin" className="text-gold-200 hover:text-gold-100 text-sm transition-colors">
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gold-400 mb-4">Support Independent Journalism</h3>
            <p className="text-gold-200 mb-4 text-sm">
              तपाईंको सहयोगले स्वतन्त्र पत्रकारिता र सत्य खोजी कार्यलाई निरन्तरता दिन मद्दत गर्नेछ।
            </p>
            <button className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-bold py-2 px-4 rounded text-sm transition-colors">
              सहयोग गर्नुहोस्
            </button>
          </div>
        </div>

        <div className="border-t border-maroon-700 mt-8 pt-6 text-center text-gold-300 text-sm">
          <p>© {new Date().getFullYear()} NepalLeaks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;