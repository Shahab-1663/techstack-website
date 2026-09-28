import React, { useState } from 'react';
import { GitCompare, Copy, Check, RefreshCw } from 'lucide-react';

export function DiffChecker() {
  const sampleOriginal = `// TechStack v1.0.0
const app = {
  author: "Shahab",
  tools: 4,
  performance: "standard",
  privacy: "basic"
};`;

  const sampleModified = `// TechStack v2.0.0
const app = {
  author: "Shahab Saeed",
  role: "Full Stack Engineer",
  tools: 20,
  performance: "ultra-fast",
  privacy: "100% client-side",
  responsive: true
};`;

  const [original, setOriginal] = useState(sampleOriginal);
  const [modified, setModified] = useState(sampleModified);

  // Line by line diff algorithm
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');

  let additions = 0;
  let deletions = 0;

  // Simple visual diff list
  const diffItems: Array<{ type: 'same' | 'added' | 'removed'; text: string }> = [];

  const maxLines = Math.max(originalLines.length, modifiedLines.length);
  for (let i = 0; i < maxLines; i++) {
    const orig = originalLines[i];
    const mod = modifiedLines[i];

    if (orig === mod) {
      if (orig !== undefined) diffItems.push({ type: 'same', text: orig });
    } else {
      if (orig !== undefined && mod !== undefined) {
        diffItems.push({ type: 'removed', text: orig });
        diffItems.push({ type: 'added', text: mod });
        deletions++;
        additions++;
      } else if (orig !== undefined) {
        diffItems.push({ type: 'removed', text: orig });
        deletions++;
      } else if (mod !== undefined) {
        diffItems.push({ type: 'added', text: mod });
        additions++;
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-white/[0.08]">
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            +{additions} Additions
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            -{deletions} Deletions
          </span>
        </div>

        <button
          onClick={() => {
            setOriginal(sampleOriginal);
            setModified(sampleModified);
          }}
          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Samples
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 mb-2 border-b border-slate-800">
            Original Text
          </span>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            rows={8}
            className="w-full bg-transparent font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 mb-2 border-b border-slate-800">
            Modified Text
          </span>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            rows={8}
            className="w-full bg-transparent font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Visual Difference Highlights */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block pb-2 mb-2 border-b border-slate-800">
          Diff Comparison Output
        </span>
        <div className="font-mono text-xs space-y-1 p-2 bg-slate-950/80 rounded-xl max-h-72 overflow-y-auto">
          {diffItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-1.5 rounded flex items-start gap-2 ${
                item.type === 'added'
                  ? 'bg-emerald-500/15 text-emerald-300 border-l-2 border-emerald-500'
                  : item.type === 'removed'
                  ? 'bg-rose-500/15 text-rose-300 border-l-2 border-rose-500'
                  : 'text-slate-400'
              }`}
            >
              <span className="w-5 text-slate-600 select-none text-right">
                {item.type === 'added' ? '+' : item.type === 'removed' ? '-' : ' '}
              </span>
              <span className="whitespace-pre-wrap select-all">{item.text || ' '}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
