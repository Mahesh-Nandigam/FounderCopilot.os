import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface Props {
  onContractExtracted: (text: string, filename: string) => void;
}

export const ContractDropzone: React.FC<Props> = ({ onContractExtracted }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== 'text/plain') {
      alert("For the MVP, please upload a .txt file containing the contract text.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onContractExtracted(text, file.name);
      
      // Play satisfying snap sound
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    };
    reader.readAsText(file);
  };

  return (
    <div 
      className={`w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
        isDragging ? 'border-primary bg-primary/10 scale-105' : 'border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800/50'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        accept=".txt" 
        ref={fileInputRef} 
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
      />
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 shadow-lg border border-slate-700">
        <UploadCloud size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Contract</h3>
      <p className="text-sm text-slate-400">Supports .txt files for instant LLM processing</p>
    </div>
  );
};
