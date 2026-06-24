import { Bot, Send, X, Sparkles, FileText, Paperclip } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AILearningAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('ai_chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    } else {
      setMessages([{ role: 'assistant', content: 'Hi! I am the Mind and Keys AI Assistant. How can I help you with your UGC NET Psychology preparation today?' }]);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg, 
          context: { 
            currentView: 'Dashboard',
            attachedContext: selectedFile ? `User is asking in context of: ${selectedFile}` : null
          } 
        }),
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.reply || "I'm sorry, I couldn't process that request right now." 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Network error. Please make sure the server is running and GEMINI_API_KEY is configured." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setMessages(prev => [...prev, { role: 'assistant', content: `I see you attached ${file.name}. What would you like to know about this module?` }]);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-6 right-6 z-50 glass-panel w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] border-brand-purple-light/30 group"
      >
        <div className="absolute inset-0 bg-brand-purple rounded-full opacity-20 group-hover:animate-ping"></div>
        <Bot className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] relative z-10" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 glass-panel rounded-3xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.6)] border-brand-purple-light/20 flex flex-col h-[500px] animate-in slide-in-from-bottom-10">
      {/* Header */}
      <div className="bg-[#2a1f3c] p-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-purple/30 flex items-center justify-center border border-brand-purple/50">
            <Sparkles className="w-5 h-5 text-brand-gold" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">AI Learning Assistant</h3>
            <p className="text-xs text-brand-gold">Mind and Keys</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-black/20">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-brand-purple text-white rounded-br-sm' 
                : 'bg-white/10 text-gray-200 border border-white/5 rounded-bl-sm backdrop-blur-md'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-sm p-4 flex gap-1.5 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {selectedFile && (
        <div className="px-4 py-2 bg-brand-purple/10 border-t border-brand-purple/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <FileText className="w-3.5 h-3.5 text-brand-gold" />
            <span className="truncate max-w-[200px]">Context: {selectedFile}</span>
          </div>
          <button onClick={() => setSelectedFile(null)} className="text-gray-500 hover:text-red-400">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-[#2a1f3c]/80 border-t border-white/10">
        <div className="relative flex items-center gap-2">
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
            title="Attach Course Material"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          
          <div className="relative flex-grow">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about UGC NET..."
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-brand-purple hover:bg-brand-purple-light text-white transition-colors disabled:opacity-50 disabled:hover:bg-brand-purple"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
