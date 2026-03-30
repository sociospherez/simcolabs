
import React from 'react';
import { AnalysisToken, PromptComponent } from '../types';

interface StructureHeatmapProps {
  tokens: AnalysisToken[];
}

const getCategoryColor = (category: PromptComponent | null) => {
  switch (category) {
    case PromptComponent.SUBJECT: return 'bg-blue-500';
    case PromptComponent.ACTION: return 'bg-green-500';
    case PromptComponent.CAMERA: return 'bg-purple-500';
    case PromptComponent.STYLE: return 'bg-orange-500';
    case PromptComponent.LIGHTING: return 'bg-yellow-400';
    case PromptComponent.CONSTRAINT: return 'bg-red-500';
    case PromptComponent.ENVIRONMENT: return 'bg-teal-500';
    default: return 'bg-slate-200';
  }
};

const StructureHeatmap: React.FC<StructureHeatmapProps> = ({ tokens }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-semibold theme-text-muted uppercase tracking-widest">Structure Heatmap</h3>
        <div className="text-[10px] text-slate-400 font-mono">FLOW SEQUENCE</div>
      </div>
      <div className="h-4 w-full flex rounded-full overflow-hidden shadow-inner bg-slate-100">
        {tokens.map((token, idx) => (
          <div
            key={idx}
            className={`h-full flex-grow transition-all duration-500 ${getCategoryColor(token.category)}`}
            title={`${token.text}${token.category ? ` (${token.category})` : ''}`}
            style={{ minWidth: '2px' }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
        <span>START</span>
        <span>END</span>
      </div>
    </div>
  );
};

export default StructureHeatmap;
