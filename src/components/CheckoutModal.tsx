import { X, Lock, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 text-brand-neon font-semibold drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]">
            <Lock className="w-4 h-4" />
            Secure Checkout
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <div className="p-6">
            {/* Order Summary */}
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Order Summary</h3>
            <div className="flex gap-4 items-start mb-6 pb-6 border-b border-white/10">
               <div className="w-16 h-16 bg-brand-purple/20 border border-brand-purple/30 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  <span className="text-2xl">🎓</span>
               </div>
               <div>
                  <h4 className="font-bold text-white leading-tight mb-1">{product.title}</h4>
                  <p className="text-sm text-brand-neon">{product.type}</p>
               </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-8">
               <span className="text-gray-300 font-medium">Total</span>
               <div className="text-right">
                 <span className="text-xs text-gray-500 line-through mr-2">₹{product.originalPrice}</span>
                 <span className="text-2xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">₹{product.price}</span>
               </div>
            </div>

            {/* Mock Form */}
            <div className="space-y-4 mb-8">
               <div>
                 <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
                 <input type="email" placeholder="you@example.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all" />
               </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-brand-purple hover:bg-brand-purple-light text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                `Pay ₹${product.price} via Razorpay`
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
               Payments are securely processed. This is a mockup.
            </p>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)] rounded-full flex items-center justify-center text-green-400 mb-6 animate-in zoom-in">
               <CheckCircle className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
             <p className="text-gray-400 mb-8 leading-relaxed">
               Thank you for purchasing <strong className="text-white">{product.title}</strong>. Check your email for access instructions.
             </p>
             <button
                onClick={onClose}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-colors border border-white/10"
             >
               Return to Profile
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
