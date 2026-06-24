import { Award, Download, CheckCircle, CheckCircle2 } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Certifications() {
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userName = "Mukesh Karpagaraja";

  const certifications = [
    {
      id: 1,
      title: 'UGC NET Psychology Basics',
      date: 'May 12, 2026',
      badgeUrl: 'bg-gradient-to-br from-brand-gold to-brand-gold-dark',
      icon: <Award className="w-8 h-8 text-white drop-shadow-md" />,
      progress: 100
    },
    {
      id: 2,
      title: 'Advanced Research Methods',
      date: 'June 05, 2026',
      badgeUrl: 'bg-gradient-to-br from-brand-purple-light to-brand-purple-dark',
      icon: <CheckCircle className="w-8 h-8 text-white drop-shadow-md" />,
      progress: 100
    }
  ];

  const handleDownload = async (cert: typeof certifications[0]) => {
    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size for high quality
      canvas.width = 1200;
      canvas.height = 800;

      // Draw background
      ctx.fillStyle = '#150f1f'; // dark theme bg
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw a subtle border
      ctx.strokeStyle = '#c3a154';
      ctx.lineWidth = 10;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      ctx.strokeStyle = '#463464';
      ctx.lineWidth = 4;
      ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

      // Draw texts
      ctx.fillStyle = '#c3a154';
      ctx.font = 'bold 60px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 200);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '30px Inter, sans-serif';
      ctx.fillText('This certifies that', canvas.width / 2, 300);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic bold 50px Inter, sans-serif';
      ctx.fillText(userName, canvas.width / 2, 380);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '30px Inter, sans-serif';
      ctx.fillText('has successfully completed the course:', canvas.width / 2, 480);

      ctx.fillStyle = '#c3a154';
      ctx.font = 'bold 45px Inter, sans-serif';
      ctx.fillText(cert.title, canvas.width / 2, 560);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '25px Inter, sans-serif';
      ctx.fillText(`Issued on: ${cert.date}`, canvas.width / 2, 650);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.png`;
      link.href = dataUrl;
      link.click();

    } catch (error) {
      console.error('Failed to generate certificate', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="mt-8 relative">
      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-brand-gold" />
        Certifications & Badges
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {certifications.map(cert => (
          <div key={cert.id} className="glass-panel p-4 rounded-2xl border-white/5 hover:border-white/20 transition-all group flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-2 right-2">
              {cert.progress === 100 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </div>
            <div className={`w-20 h-20 rounded-full ${cert.badgeUrl} shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center mb-4 border-2 border-white/20 group-hover:scale-105 transition-transform duration-500`}>
              {cert.icon}
            </div>
            <h4 className="font-semibold text-sm text-white mb-1 leading-tight">{cert.title}</h4>
            <p className="text-xs text-gray-500 mb-4">Issued: {cert.date}</p>
            
            <button 
              onClick={() => handleDownload(cert)}
              disabled={isGenerating || cert.progress < 100}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 group-hover:text-brand-gold transition-colors mt-auto pt-3 border-t border-white/5 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              {isGenerating ? 'Generating...' : 'Download Certificate'}
            </button>
            
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white mix-blend-overlay opacity-0 group-hover:opacity-5 rounded-full filter blur-2xl transition-opacity pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
