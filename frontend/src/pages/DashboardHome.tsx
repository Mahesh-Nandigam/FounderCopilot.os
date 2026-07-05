import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { processMasterCommand } from '../lib/masterAgent';
import { Send, Bot, User, Command } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
}

export const DashboardHome: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  
  const globalState = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent, directPrompt?: string) => {
    e?.preventDefault();
    const userPrompt = (directPrompt || input).trim();
    if (!userPrompt || isProcessing) return;

    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userPrompt }]);
    
    // FAST-PATH: If user clicked a suggestion, instantly route them without waiting for the LLM
    if (userPrompt === 'Review Candidates') {
      setTimeout(() => setMessages(prev => [...prev, { id: Date.now().toString(), role: 'agent', content: "Redirecting you to Hirepanel.ai to review candidates..." }]), 100);
      setTimeout(() => navigate('/dashboard/hirepanel'), 600);
      return;
    }
    if (userPrompt === 'Check Legal Contracts') {
      setTimeout(() => setMessages(prev => [...prev, { id: Date.now().toString(), role: 'agent', content: "Opening your Legal Advisor workspace..." }]), 100);
      setTimeout(() => navigate('/dashboard/legal'), 600);
      return;
    }
    if (userPrompt === 'Launch Campaign') {
      setTimeout(() => setMessages(prev => [...prev, { id: Date.now().toString(), role: 'agent', content: "Taking you to the GTM Cross-Poster to launch your campaign..." }]), 100);
      setTimeout(() => navigate('/dashboard/gtm'), 600);
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare the sanitized state
      const sanitizedState = {
        hirepanel: globalState.hirepanel,
        legalAdvisor: globalState.legalAdvisor,
        gtm: globalState.gtm
      };

      // Call the Master Agent
      const response = await processMasterCommand(userPrompt, sanitizedState, messages);

      // Add Agent's response message
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'agent', 
        content: response.message 
      }]);

      if (response.action === 'route' && response.workspace) {
        setTimeout(() => {
          navigate(response.workspace!);
        }, 400);
      }
      
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'agent', 
        content: `Error: ${error.message || "Failed to process command."}` 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderInputForm = () => (
    <form onSubmit={(e) => handleSubmit(e)} style={{ position: 'relative', width: '100%' }}>
      <div style={{
        position: 'absolute',
        inset: -1,
        background: 'linear-gradient(90deg, #06b6d4, #ec4899, #f59e0b, #06b6d4)',
        borderRadius: '25px',
        filter: 'blur(8px)',
        opacity: 0.5,
        zIndex: 0,
        backgroundSize: '200% auto',
        animation: 'gradient-xy 3s linear infinite'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', background: '#0a0a0a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', padding: '8px' }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Master Agent..."
          disabled={isProcessing}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            padding: '12px 16px',
            outline: 'none'
          }}
        />

        <button
          type="submit"
          disabled={!input.trim() || isProcessing}
          style={{
            background: input.trim() ? 'white' : 'rgba(255,255,255,0.1)',
            color: input.trim() ? 'black' : 'rgba(255,255,255,0.4)',
            border: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: input.trim() && !isProcessing ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            marginRight: '4px'
          }}
        >
          <Send size={18} style={{ transform: 'translateX(1px)' }} />
        </button>
      </div>
    </form>
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Colorful background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(236, 72, 153, 0.08) 40%, rgba(245, 158, 11, 0.05) 70%, transparent 100%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }} />

      {messages.length === 0 ? (
        // CLAUDE-STYLE EMPTY STATE
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
          <h1 style={{ 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontFamily: '"Playfair Display", Georgia, serif', 
            fontWeight: 500, 
            color: 'white', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <span style={{ color: '#ec4899' }}>*</span> Hey CEO, How's <span style={{ fontStyle: 'italic' }}>Dhanda</span> going?
          </h1>

          <div style={{ width: '100%', maxWidth: '700px' }}>
            {renderInputForm()}
          </div>

          {/* Suggested Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Review Candidates', 'Check Legal Contracts', 'Launch Campaign'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSubmit(undefined, suggestion)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  padding: '8px 16px',
                  borderRadius: '100px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // ACTIVE CHAT STATE
        <>
          <div style={{ flex: 1, padding: '40px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ 
                display: 'flex', 
                gap: '16px', 
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' 
              }}>
                {msg.role === 'agent' && (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                    <Bot size={20} className="text-pink-400" />
                  </div>
                )}
                
                <div style={{ 
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'rgba(20, 20, 22, 0.7)', 
                  padding: '16px 24px', 
                  borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                  border: msg.role === 'agent' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  backdropFilter: 'blur(20px)',
                  maxWidth: '80%',
                  color: 'white',
                  fontSize: '16px',
                  lineHeight: 1.6
                }}>
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                    <User size={20} className="text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
            
            {isProcessing && (
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                  <Bot size={20} className="text-pink-400 animate-pulse" />
                </div>
                <div style={{ background: 'rgba(20, 20, 22, 0.7)', padding: '16px 24px', borderRadius: '24px 24px 24px 4px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '0 20px 40px 20px' }}>
            {renderInputForm()}
          </div>
        </>
      )}
    </div>
  );
};
