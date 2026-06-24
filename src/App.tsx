/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProductCard from './components/ProductCard';
import Testimonials from './components/Testimonials';
import AboutMe from './components/AboutMe';
import CheckoutModal from './components/CheckoutModal';
import { ProductSkeleton } from './components/Skeletons';
import { products, testimonials } from './data';
import { Product } from './types';
import { Search } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const bundles = filteredProducts.filter(p => p.type === 'Bundle');
  const courses = filteredProducts.filter(p => p.type === 'Course');
  const digitalProducts = filteredProducts.filter(p => p.type === 'Digital Product');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-neon selection:text-black">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/10 px-6 py-4 flex justify-center gap-8 text-sm font-medium backdrop-blur-2xl">
        <button onClick={() => scrollToSection('courses')} className="text-gray-300 hover:text-brand-neon transition-colors">Courses</button>
        <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-brand-neon transition-colors">Testimonials</button>
        <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-brand-neon transition-colors">About</button>
      </nav>

      {/* Header Profile Section */}
      <div className="pt-14">
        <ProfileHeader />
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16" id="courses">
        
        {/* Search and Filters */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search courses, notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
             {['All', 'Bundle', 'Course', 'Digital Product'].map(cat => (
               <button 
                 key={cat}
                 onClick={() => setSelectedCategory(cat)}
                 className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                   selectedCategory === cat 
                   ? 'bg-brand-neon/20 text-brand-neon border border-brand-neon/50' 
                   : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                 }`}
               >
                 {cat === 'Digital Product' ? 'Notes' : cat}
               </button>
             ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {[1, 2, 3, 4, 5, 6].map(i => <ProductSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {bundles.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-neon/20 text-brand-neon flex items-center justify-center border border-brand-neon/30">📦</span>
                  Packages & Bundles
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {bundles.map(product => (
                    <ProductCard key={product.id} product={product} onBuy={setSelectedProduct} />
                  ))}
                </div>
              </section>
            )}

            {courses.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-purple/20 text-brand-neon-purple flex items-center justify-center border border-brand-purple/30">🎓</span>
                  Courses
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {courses.map(product => (
                    <ProductCard key={product.id} product={product} onBuy={setSelectedProduct} />
                  ))}
                </div>
              </section>
            )}

            {digitalProducts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">📝</span>
                  Digital Products & Notes
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {digitalProducts.map(product => (
                    <ProductCard key={product.id} product={product} onBuy={setSelectedProduct} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Testimonials Section */}
      <div id="testimonials">
        <Testimonials testimonials={testimonials} isLoading={isLoading} />
      </div>

      {/* About Me Section */}
      <div id="about">
        <AboutMe />
      </div>

      {/* Footer */}
      <footer className="glass-panel py-8 border-t border-white/10 mt-auto relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Mind and Keys. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-brand-neon transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-brand-neon transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
