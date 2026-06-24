export function ProductSkeleton() {
  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col h-full animate-pulse border-white/5">
       <div className="flex justify-between mb-4">
          <div className="w-24 h-7 bg-white/10 rounded-md"></div>
          <div className="w-12 h-6 bg-white/10 rounded-md"></div>
       </div>
       <div className="w-3/4 h-6 bg-white/10 rounded-md mb-3"></div>
       <div className="w-full h-4 bg-white/10 rounded-md mb-2"></div>
       <div className="w-5/6 h-4 bg-white/10 rounded-md mb-6"></div>
       <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="w-16 h-8 bg-white/10 rounded-md"></div>
          <div className="w-24 h-10 bg-white/10 rounded-xl"></div>
       </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="glass-panel rounded-2xl p-6 animate-pulse border-white/5">
       <div className="w-24 h-4 bg-white/10 rounded-md mb-5"></div>
       <div className="w-full h-4 bg-white/10 rounded-md mb-2"></div>
       <div className="w-full h-4 bg-white/10 rounded-md mb-2"></div>
       <div className="w-2/3 h-4 bg-white/10 rounded-md mb-8"></div>
       <div className="w-32 h-4 bg-white/10 rounded-md mb-1.5"></div>
       <div className="w-20 h-3 bg-white/10 rounded-md"></div>
    </div>
  );
}
