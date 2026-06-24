import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, Variants } from 'motion/react';
import { products } from '../data';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/Skeletons';
import CheckoutModal from '../components/CheckoutModal';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Courses() {
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

  return (
    <div className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-24 md:pb-16 space-y-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">All Courses & Materials</h1>
        <p className="text-gray-400">Everything you need to master psychology and crack UGC NET.</p>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search courses, notes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/[0.02] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-gold/50 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['All', 'Bundle', 'Course', 'Digital Product'].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                  ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' 
                  : 'bg-white/[0.02] text-gray-400 hover:bg-white/[0.05] border border-white/[0.02]'
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
                <span className="w-8 h-8 rounded-lg bg-brand-gold/20 text-brand-gold flex items-center justify-center border border-brand-gold/30">📦</span>
                Packages & Bundles
              </h2>
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bundles.map(product => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} onBuy={setSelectedProduct} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {courses.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-purple/20 text-brand-purple-light flex items-center justify-center border border-brand-purple/30">🎓</span>
                Courses
              </h2>
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map(product => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} onBuy={setSelectedProduct} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {digitalProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">📝</span>
                Digital Products & Notes
              </h2>
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {digitalProducts.map(product => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} onBuy={setSelectedProduct} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}
        </div>
      )}

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
