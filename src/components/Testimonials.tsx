import { Star, MessageSquareQuote } from 'lucide-react';
import { Testimonial } from '../types';
import { TestimonialSkeleton } from './Skeletons';

interface TestimonialsProps {
  testimonials: Testimonial[];
  isLoading?: boolean;
}

export default function Testimonials({ testimonials, isLoading = false }: TestimonialsProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-full bg-brand-neon-purple mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex items-center justify-center gap-1 mb-3">
             {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-brand-gold text-brand-gold drop-shadow-[0_0_8px_rgba(195,161,84,0.6)]" />
             ))}
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">5.0 Overall Rating</h2>
          <p className="text-gray-400 mt-2 text-lg">Based on 9 ratings & testimonials</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {isLoading ? (
            <>
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className="glass-panel p-6 rounded-2xl relative hover:border-brand-neon/30 transition-colors">
                <MessageSquareQuote className="w-10 h-10 text-brand-neon-purple opacity-20 absolute top-4 right-4" />
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.content}"</p>
                <div className="mt-auto">
                  <p className="font-semibold text-sm text-white">{t.author}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
           <button className="glass-panel px-6 py-2.5 rounded-full text-brand-neon font-medium hover:bg-brand-neon/10 transition-colors border-brand-neon/20 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
             Show all reviews
           </button>
        </div>
      </div>
    </section>
  );
}
