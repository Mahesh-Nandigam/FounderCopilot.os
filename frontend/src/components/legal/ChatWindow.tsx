import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { chatWithContract } from '../../lib/llm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatWindow: React.FC<{ contractText: string }> = ({ contractText }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "I've analyzed the contract. What specific clauses or risks would you like me to clarify?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await chatWithContract(contractText, history, userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Sorry, I encountered an error connecting to the NVIDIA API. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-3">
        <Bot className="text-primary" />
        <h3 className="font-bold text-white">Chat with Contract</h3>
        <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/30">NVIDIA NIM Active</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 animate-slide-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-slate-700 text-slate-300'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-4 rounded-2xl bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-primary" />
              <span className="text-xs text-slate-400">Analyzing clauses...</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-700">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about non-competes, vesting, etc..."
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2 bg-primary hover:bg-primary/90 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
