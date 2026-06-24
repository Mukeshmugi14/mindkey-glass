import { Star, ShoppingBag, BookOpen, Package, Check, Users } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const isBundle = product.type === 'Bundle';
  
  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:border-brand-neon/30 hover:-translate-y-1 group">
      {/* Top section with badge and highlights */}
      <div className="p-5 pb-0 flex justify-between items-start mb-3">
        <div className="flex flex-col gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md w-fit flex items-center gap-1.5
            ${product.type === 'Digital Product' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
              product.type === 'Course' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
              'bg-brand-neon-purple/10 text-brand-neon-purple border border-brand-neon-purple/20'}`}
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
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-brand-neon transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        {isBundle && product.itemsIncluded && (
          <div className="mb-4 bg-black/40 rounded-lg p-3 text-sm border border-white/5">
            <p className="font-medium text-gray-200 mb-1 flex items-center gap-1.5">
               <Package className="w-4 h-4 text-brand-neon-purple" />
               Includes {product.itemsIncluded} items:
            </p>
            <ul className="text-gray-400 space-y-1 mt-2">
              <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 mt-0.5 text-brand-neon shrink-0"/> Unit-Wise PYQs</li>
              <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 mt-0.5 text-brand-neon shrink-0"/> Notes (10 units)</li>
              <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 mt-0.5 text-brand-neon shrink-0"/> Handwritten Notes</li>
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
            className="bg-brand-purple hover:bg-brand-purple-light hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] text-white font-semibold py-2.5 px-5 rounded-xl transition-all"
          >
            Buy Now
          </button>
        </div>
        
        {product.sales && product.sales > 0 && (
          <div className="mt-3 text-xs font-medium text-gray-500 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-neon/70" />
            {product.sales} people bought this
          </div>
        )}
      </div>
    </div>
  );
}
