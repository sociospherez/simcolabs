
import React from 'react';
import { PromptAnalysis, PromptComponent } from '../types';
import FingerprintChart from './FingerprintChart';
import StructureHeatmap from './StructureHeatmap';

interface AnalysisDisplayProps {
  analysis: PromptAnalysis;
}

const getComponentIcon = (category: PromptComponent | null) => {
  switch (category) {
    case PromptComponent.SUBJECT: return (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    );
    case PromptComponent.ACTION: return (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    );
    case PromptComponent.CAMERA: return (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
    );
    case PromptComponent.STYLE: return (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.828 2.828a2 2 0 010 2.828l-8.486 8.486L5 19l2.343-2.343" /></svg>
    );
    case PromptComponent.LIGHTING: return (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    );
    case PromptComponent.CONSTRAINT: return (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    );
    case PromptComponent.ENVIRONMENT: return (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5V14M16 4.46a9 9 0 00-11.41 2.346l1.24 1.24a3 3 0 011.17 2.42V11m11.5 5.5A9 9 0 1111 3.055V5" /></svg>
    );
    default: return null;
  }
};

const getCategoryColor = (category: PromptComponent | null) => {
  switch (category) {
    case PromptComponent.SUBJECT: return 'bg-blue-100 text-blue-700 border-blue-200';
    case PromptComponent.ACTION: return 'bg-green-100 text-green-700 border-green-200';
    case PromptComponent.CAMERA: return 'bg-purple-100 text-purple-700 border-purple-200';
    case PromptComponent.STYLE: return 'bg-orange-100 text-orange-700 border-orange-200';
    case PromptComponent.LIGHTING: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case PromptComponent.CONSTRAINT: return 'bg-red-100 text-red-700 border-red-200';
    case PromptComponent.ENVIRONMENT: return 'bg-teal-100 text-teal-700 border-teal-200';
    default: return 'text-slate-400';
  }
};

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Left Column: Interpreter */}
      <div className="theme-surface-strong rounded-2xl shadow-sm border border-[var(--border-subtle)] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Interpreter</h2>
          <span className="text-xs font-mono px-2 py-1 bg-slate-100 theme-text-muted rounded uppercase tracking-wider">Structure Map</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 p-4 bg-slate-50 rounded-xl min-h-[120px] leading-relaxed">
          {analysis.tokens.map((token, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center px-1.5 py-0.5 rounded transition-all duration-300 ${token.category ? getCategoryColor(token.category) + ' border' : ''}`}
            >
              {token.category && getComponentIcon(token.category)}
              {token.text}
            </span>
          ))}
        </div>

        <div className="mb-8">
          <StructureHeatmap tokens={analysis.tokens} />
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-semibold theme-text-muted uppercase tracking-widest">Thinking Fingerprint</h3>
          <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center border border-slate-100">
            <FingerprintChart data={analysis.stats} />
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold text-indigo-600 block">{analysis.fingerprint}</span>
              <p className="theme-text-muted text-sm mt-1">{analysis.summary}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Scorer */}
      <div className="space-y-6">
        <div className="theme-surface-strong rounded-2xl shadow-sm border border-[var(--border-subtle)] p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Scorer</h2>
            <span className="text-xs font-mono px-2 py-1 bg-slate-100 theme-text-muted rounded uppercase tracking-wider">Metrics</span>
          </div>

          <div className="space-y-8">
            <ScoreItem label="Fidelity" score={analysis.scores.fidelity} description="Precision and specificity of the instruction set." />
            <ScoreItem label="Continuity" score={analysis.scores.continuity} description="Structural logic and lack of conflicting cues." />
            <ScoreItem label="Density" score={analysis.scores.density} description="Information efficiency (Signal vs Noise ratio)." />
          </div>
        </div>

        <div className="theme-surface-strong rounded-2xl shadow-sm border border-[var(--border-subtle)] p-8">
          <h3 className="text-sm font-semibold theme-text-muted uppercase tracking-widest mb-4">Structural Gaps</h3>
          <div className="flex flex-wrap gap-3">
            {analysis.missing.length > 0 ? (
              analysis.missing.map((comp) => (
                <div key={comp} className="flex items-center space-x-2 px-3 py-2 bg-amber-50 border border-amber-100 text-amber-700 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm font-medium">{comp} missing</span>
                </div>
              ))
            ) : (
              <div className="text-green-600 font-medium flex items-center space-x-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                <span>Structure complete</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ScoreItem = ({ label, score, description }: { label: string; score: number; description: string }) => {
  const getScoreColor = (s: number) => {
    if (s > 80) return 'text-green-600';
    if (s > 50) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="font-bold text-slate-700">{label}</span>
        <span className={`text-2xl font-mono font-bold ${getScoreColor(score)}`}>{score}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-out ${score > 80 ? 'bg-green-500' : score > 50 ? 'bg-amber-400' : 'bg-red-400'}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
};

export default AnalysisDisplay;
