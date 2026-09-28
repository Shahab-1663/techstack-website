import React, { useState } from 'react';
import { Copy, Check, Download, RefreshCw, AlertTriangle, FileJson, Sparkles } from 'lucide-react';

export function JsonFormatter() {
  const sampleJson = JSON.stringify(
    {
      appName: "TechStack",
      version: "2.0.0",
      author: {
        name: "Shahab Saeed",
        role: "Full Stack Engineer",
        github: "https://github.com/Shahab-1663"
      },
      toolsCount: 20,
      features: ["Client-side privacy", "Real-time validation", "High performance"],
      active: true
    },
    null,
    2
  );

  const [input, setInput] = useState(sampleJson);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState<number>(2);

  const formatJson = (spaces = indentSize) => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([input], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Stats
  let stats = { valid: false, keysCount: 0, byteSize: 0 };
  try {
    const parsed = JSON.parse(input);
    stats.valid = true;
    stats.byteSize = new Blob([input]).size;
    stats.keysCount = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 1;
  } catch {
    stats.valid = false;
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/60 border border-white/[0.08]">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => formatJson(2)}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium shadow-sm transition-all"
          >
            Prettify (2 Spaces)
          </button>
          <button
            onClick={() => formatJson(4)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all"
          >
            Prettify (4 Spaces)
          </button>
          <button
            onClick={minifyJson}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all"
          >
            Minify (1 Line)
          </button>
          <button
            onClick={() => {
              setInput('{\n  \n}');
              setError(null);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-all"
          >
            Clear
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={downloadJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Error alert if any */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">JSON Validation Error:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Editor Pane */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#070b13] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4 text-cyan-400" />
            <span>payload.json</span>
            {stats.valid ? (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-sans">
                Valid JSON
              </span>
            ) : (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-sans">
                Syntax Error
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span>Size: {stats.byteSize} bytes</span>
            <span>Keys: {stats.keysCount}</span>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            try {
              JSON.parse(e.target.value);
              setError(null);
            } catch (err: any) {
              setError(err.message);
            }
          }}
          rows={16}
          spellCheck={false}
          className="w-full bg-transparent p-4 font-mono text-sm text-slate-200 focus:outline-none resize-y leading-relaxed"
          placeholder="Paste unformatted or invalid JSON here..."
        />
      </div>
    </div>
  );
}
