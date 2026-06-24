import { Star, ShoppingBag, BookOpen, Package, Check, Users, PlayCircle, Lock } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const isBundle = product.type === 'Bundle';
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-panel rounded-2xl overflow-hidden flex flex-col transition-all duration-300 relative group
        ${product.isLocked ? 'opacity-80 saturate-50' : 'hover:shadow-[0_0_20px_rgba(195,161,84,0.15)] hover:border-brand-gold/30 hover:-translate-y-1'}
      `}
      onMouseEnter={() => !product.isLocked && setIsHovered(true)}
      onMouseLeave={() => !product.isLocked && setIsHovered(false)}
    >
      {/* Locked Overlay */}
      {product.isLocked && (
        <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px] flex items-center justify-center rounded-2xl">
          <div className="bg-[#2a1f3c] border border-white/10 p-4 rounded-xl text-center shadow-2xl max-w-[200px] flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center mb-2 border border-white/10">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm font-bold text-white mb-1">Locked</p>
            <p className="text-xs text-gray-400 leading-tight">{product.prerequisite}</p>
          </div>
        </div>
      )}

      {/* Video Preview Overlay */}
      <AnimatePresence>
        {isHovered && product.type === 'Course' && !product.isLocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-none"
          >
            <div className="text-center p-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-3 border border-brand-gold/50 shadow-[0_0_15px_rgba(195,161,84,0.5)]">
                  <PlayCircle className="w-8 h-8 text-brand-gold ml-1" />
                </div>
                <p className="text-sm font-bold text-white mb-1">Preview Course Trailer</p>
                <p className="text-xs text-gray-400">Sneak peek playing...</p>
              </motion.div>
            </div>
            
            {/* Fake video background effect */}
            <div className="absolute inset-0 z-[-1] opacity-30 mix-blend-screen bg-gradient-to-tr from-brand-purple to-brand-gold"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top section with badge and highlights */}
      <div className="p-5 pb-0 flex justify-between items-start mb-3 relative z-0">
        <div className="flex flex-col gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md w-fit flex items-center gap-1.5
            ${product.type === 'Digital Product' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
              product.type === 'Course' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
              'bg-brand-purple-light/10 text-brand-purple-light border border-brand-purple-light/20'}`}
          >
            {product.type === 'Digital Product' && <BookOpen className="w-3.5 h-3.5" />}
            {product.type === 'Course' && <ShoppingBag className="w-3.5 h-3.5" />}
            {product.type === 'Bundle' && <Package className="w-3.5 h-3.5" />}
            {product.type}
          </span>
          
          {product.badge && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-md w-fit bg-gradient-to-r from-brand-gold to-brand-gold-light text-black flex items-center gap-1 shadow-[0_0_10px_rgba(195,161,84,0.3)]">
              {product.badge === 'Best Seller' ? '🏆' : '🏷️'} {product.badge}
            </span>
          )}
        </div>
        
        {product.rating && (
          <div className="flex items-center gap-1 text-sm font-medium text-gray-200 bg-white/10 border border-white/5 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 fill-brand-gold text-brand-gold drop-shadow-[0_0_5px_rgba(195,161,84,0.5)]" />
            <span>{product.rating}</span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-5 flex-grow flex flex-col relative z-0">
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-brand-gold-light transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        {isBundle && product.itemsIncluded && (
          <div className="mb-4 bg-black/40 rounded-lg p-3 text-sm border border-white/5">
            <p className="font-medium text-gray-200 mb-1 flex items-center gap-1.5">
               <Package className="w-4 h-4 text-brand-gold" />
               Includes {product.itemsIncluded} items:
            </p>
            <ul className="text-gray-400 space-y-1 mt-2">
              <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 mt-0.5 text-brand-gold shrink-0"/> Unit-Wise PYQs</li>
              <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 mt-0.5 text-brand-gold shrink-0"/> Notes (10 units)</li>
              <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 mt-0.5 text-brand-gold shrink-0"/> Handwritten Notes</li>
            </ul>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-xs text-gray-500 line-through font-medium">₹{product.originalPrice}</span>
             <span className="text-xl font-black text-white flex items-center gap-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                ₹{product.price}
             </span>
          </div>
          <button 
            onClick={() => onBuy(product)}
            disabled={product.isLocked}
            className={`font-semibold py-2.5 px-5 rounded-xl transition-all relative z-20 ${
              product.isLocked 
                ? 'bg-white/10 text-gray-500 cursor-not-allowed' 
                : 'bg-brand-purple hover:bg-brand-purple-light hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] text-white'
            }`}
          >
            {product.isLocked ? 'Locked' : 'Buy Now'}
          </button>
        </div>
        
        {product.sales && product.sales > 0 && (
          <div className="mt-3 text-xs font-medium text-gray-500 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-gold/70" />
            {product.sales} people bought this
          </div>
        )}
      </div>
    </div>
  );
}
