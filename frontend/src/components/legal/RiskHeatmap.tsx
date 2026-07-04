import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import type { RiskClause } from '../../lib/llm';

export const RiskHeatmap: React.FC<{ clauses: RiskClause[] }> = ({ clauses }) => {
  if (!clauses || clauses.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {clauses.map((item, idx) => {
        let colors = '';
        let Icon = CheckCircle;
        
        if (item.category === 'High') {
          colors = 'border-red-500/50 bg-red-950/30 text-red-400';
          Icon = AlertCircle;
        } else if (item.category === 'Medium') {
          colors = 'border-amber-500/50 bg-amber-950/30 text-amber-400';
          Icon = AlertTriangle;
        } else {
          colors = 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400';
          Icon = CheckCircle;
        }

        return (
          <div key={idx} className={`p-4 border rounded-xl flex gap-4 items-start ${colors}`}>
            <div className="mt-1">
              <Icon size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-sm uppercase tracking-wider">{item.category} RISK</h4>
              </div>
              <p className="text-slate-200 font-medium mb-3">"{item.clause}"</p>
              <div className="bg-black/40 p-3 rounded-lg border border-black/20 text-sm opacity-90">
                <span className="font-semibold">AI Reasoning:</span> {item.reasoning}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
