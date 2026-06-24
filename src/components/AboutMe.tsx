import { Instagram, Linkedin } from 'lucide-react';

export default function AboutMe() {
  return (
    <section className="py-20 relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-brand-purple/20 text-brand-purple flex items-center justify-center border border-brand-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
             👋
          </span>
          About Me
        </h2>
        
        <div className="glass-panel p-5 sm:p-8 rounded-3xl">
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4 sm:space-y-5 leading-relaxed text-base sm:text-lg">
            <p>
              A psychologist and assistant professor who has cleared UGC NET 3 times. 
              Founder of <strong className="text-brand-neon font-semibold">Mind and Keys</strong> — an education platform for psychology 
              students across India preparing for UGC NET and PG entrance exams.
            </p>
            <p>
              My mission is to provide high-quality, precise, and affordable study materials 
              to help students crack their exams with confidence.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-4">
            <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-brand-neon transition-colors bg-white/5 px-5 py-2.5 rounded-xl font-medium text-sm border border-white/10 hover:border-brand-neon/50">
               <Instagram className="w-5 h-5" />
               @mkthepsychologist
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors bg-white/5 px-5 py-2.5 rounded-xl font-medium text-sm border border-white/10 hover:border-blue-400/50">
               <Linkedin className="w-5 h-5" />
               LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
