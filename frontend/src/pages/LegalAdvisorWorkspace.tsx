import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, ArrowRight, Loader2, Bot, User, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { parseFile } from '../lib/fileParser';
import { analyzeContractRisk, chatWithContract } from '../lib/llm';
import type { RiskClause } from '../lib/llm';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useAppStore } from '../store';
import './LegalAdvisorWorkspace.css';

interface Message {
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
}

export const LegalAdvisorWorkspace: React.FC = () => {
  const { legalAdvisor, setLegalAdvisor } = useAppStore();
  const { messages, input, contractText } = legalAdvisor;

  const setMessages = (updater: any) => {
    const currentMessages = useAppStore.getState().legalAdvisor.messages;
    setLegalAdvisor({ messages: typeof updater === 'function' ? updater(currentMessages) : updater });
  };
  const setInput = (val: string) => setLegalAdvisor({ input: val });
  const setContractText = (val: string | null) => setLegalAdvisor({ contractText: val });

  const [isTyping, setIsTyping] = useState(false);
  const [typingMode, setTypingMode] = useState<'auditing' | 'chatting' | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleFileAttach = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFile(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachedFile) || isTyping) return;
    
    setIsTyping(true);
    const currentInput = input;
    const currentFile = attachedFile;
    
    setInput('');
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    let extractedText = contractText;

    if (currentFile && !contractText) {
      setTypingMode('auditing');
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: `Attached Document: ${currentFile.name}${currentInput ? `\n\n${currentInput}` : ''}` 
      }]);
      
      try {
        extractedText = await parseFile(currentFile);
        setContractText(extractedText);
        
        const result = await analyzeContractRisk(extractedText);
        
        const HeatmapMessage = () => {
          const exportPDF = async () => {
            const element = document.getElementById('risk-report-container');
            if (element) {
              const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#111' });
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF('p', 'mm', 'a4');
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
              pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
              pdf.save('Legal_Risk_Report.pdf');
            }
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', width: '100%', maxWidth: '100%' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <p style={{ color: '#e5e7eb', margin: 0 }}>I have analyzed the document. Here is the risk assessment:</p>
              </div>
              
              <div id="risk-report-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '16px', background: '#111', borderRadius: '12px' }}>
                <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '12px', marginTop: 0 }}>Contract Risk Report</h2>
                {result.clauses.map((item: RiskClause, idx: number) => (
                  <div key={idx} className={`la-risk-card ${
                    item.category === 'High' ? 'la-risk-high' :
                    item.category === 'Medium' ? 'la-risk-medium' :
                    'la-risk-low'
                  }`}>
                    <div style={{ marginTop: '0.125rem', flexShrink: 0 }}>
                      {item.category === 'High' ? <AlertCircle size={20} /> : 
                       item.category === 'Medium' ? <AlertTriangle size={20} /> : 
                       <CheckCircle size={20} />}
                    </div>
                    <div>
                      <div className="la-risk-title">{item.category} RISK</div>
                      <div className="la-risk-clause">"{item.clause}"</div>
                      <div className="la-risk-reason">{item.reasoning}</div>
                    </div>
                  </div>
                ))}
                
                {/* Dynamic Final Recommendation */}
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '0.75rem', color: '#e5e7eb' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#60a5fa' }}>Final Recommendation</div>
                  <div style={{ fontSize: '0.9375rem', lineHeight: '1.5' }}>{result.recommendation}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button 
                  onClick={exportPDF} 
                  style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Download Report
                </button>
              </div>
            </div>
          );
        };

        setMessages(prev => [...prev, { role: 'assistant', content: <HeatmapMessage /> }]);
        
      } catch (error: any) {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Error parsing or analyzing file: ${error.message}` }]);
      }
    } 
    else if (currentInput.trim()) {
      setTypingMode('chatting');
      setMessages(prev => [...prev, { role: 'user', content: currentInput }]);
      try {
        const history = messages
          .filter(m => typeof m.content === 'string')
          .map(m => ({ role: m.role, content: m.content as string }));
          
        const response = await chatWithContract(extractedText || "No contract uploaded. Just answer generally.", history, currentInput);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      } catch (error: any) {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Error: ${error.message}` }]);
      }
    }

    setIsTyping(false);
  };

  const isInitialState = messages.length === 0 && !isTyping;

  return (
    <div className="la-container">
      
      {!isInitialState && (
        <div className="la-chat-area">
          {messages.map((msg, i) => (
            <div key={i} className="la-message">
              <div className={`la-avatar ${msg.role}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`la-content ${msg.role}`}>
                {typeof msg.content === 'string' ? (
                  <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="la-message">
                <div className="la-avatar bot">
                  <Bot size={16} />
                </div>
                <div className="la-content bot" style={{ padding: '12px 16px', background: 'transparent' }}>
                  {typingMode === 'auditing' ? (
                    <div className="la-auditing-container">
                      <div className="la-auditing-text">
                        <Loader2 size={16} style={{ animation: 'spin 2s linear infinite' }} /> 
                        Auditing Contract...
                      </div>
                      <div className="la-scanner-box">
                        <div className="la-scanner-bar"></div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.9375rem' }}>
                      <Loader2 size={16} style={{ animation: 'spin 2s linear infinite' }} /> 
                      Formulating strategic advice...
                    </div>
                  )}
                </div>
             </div>
          )}
          <div ref={endRef} />
        </div>
      )}

      {isInitialState && (
        <div className="la-initial-state relative w-full flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" style={{ animation: 'float 8s infinite alternate' }}></div>
          <h1 className="la-title relative z-10">Hey Founder, need a legal vibe check?</h1>
          <p className="text-slate-400 font-medium text-lg mt-2 relative z-10">Upload a contract. Get instant risk analysis.</p>
        </div>
      )}

      <div className={`la-input-wrapper ${isInitialState ? 'centered' : 'bottom'}`}>
        <div className="la-input-box">
          
          <textarea 
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask for strategic legal advice, or attach a contract for review..."
            className="la-textarea"
          />
          
          <div className="la-action-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileAttach}
                style={{ display: 'none' }}
                accept=".txt,.pdf,.doc,.docx" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className={`la-attach-btn ${attachedFile ? 'has-file' : ''}`}
              >
                <Paperclip size={18} />
                {attachedFile && <span style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{attachedFile.name}</span>}
                {!attachedFile && <span>Attach</span>}
              </button>
            </div>
            
            <button 
              onClick={handleSend}
              disabled={(!input.trim() && !attachedFile) || isTyping}
              className="la-send-btn"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        
        <div className="la-disclaimer">
          Legal Advisor can make mistakes. Always consult a real human attorney for final decisions.
        </div>
      </div>

    </div>
  );
};
