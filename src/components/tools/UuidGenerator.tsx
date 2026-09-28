import React, { useState, useEffect } from 'react';
import { Fingerprint, RefreshCw, Copy, Check, Sliders } from 'lucide-react';

export function UuidGenerator() {
  const [format, setFormat] = useState<'uuid' | 'nanoid'>('uuid');
  const [quantity, setQuantity] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [includeHyphens, setIncludeHyphens] = useState(true);
  const [includeBraces, setIncludeBraces] = useState(false);
  
  const [results, setResults] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedItem, setCopiedItem] = useState<number | null>(null);

  const generateUuidV4 = () => {
    // Native crypto.randomUUID or fallback
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateNanoId = (size = 21) => {
    const urlAlphabet = 'useandom-26T1983_40STOpBlfqhkIvNoSuchIndFoxr';
    let id = '';
    const bytes = new Uint8Array(size);
    window.crypto.getRandomValues(bytes);
    for (let i = 0; i < size; i++) {
      id += urlAlphabet[bytes[i] & 63];
    }
    return id;
  };

  const generateBatch = () => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      if (format === 'nanoid') {
        list.push(generateNanoId(21));
      } else {
        let u = generateUuidV4();
        if (!includeHyphens) u = u.replace(/-/g, '');
        if (uppercase) u = u.toUpperCase();
        if (includeBraces) u = `{${u}}`;
        list.push(u);
      }
    }
    setResults(list);
  };

  useEffect(() => {
    generateBatch();
  }, [format, quantity, uppercase, includeHyphens, includeBraces]);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(results.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (val: string, idx: number) => {
    navigator.clipboard.writeText(val);
    setCopiedItem(idx);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Settings Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setFormat('uuid')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                format === 'uuid' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              UUID v4 (RFC4122)
            </button>
            <button
              onClick={() => setFormat('nanoid')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                format === 'nanoid' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              NanoID (21 chars)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>Count:</span>
            <input
              type="number"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(50, Math.max(1, Number(e.target.value))))}
              className="w-16 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-cyan-400 font-mono text-center focus:outline-none"
            />
          </div>

          {format === 'uuid' && (
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>UPPERCASE</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHyphens}
                  onChange={(e) => setIncludeHyphens(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Hyphens</span>
              </label>
            </div>
          )}

          <button
            onClick={generateBatch}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Regenerate"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Generated Results List */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider">
            Generated Identifiers ({results.length})
          </span>
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-sm transition-all"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAll ? 'All Copied' : 'Copy All'}</span>
          </button>
        </div>

        <div className="space-y-2">
          {results.map((id, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 group hover:border-cyan-500/30 transition-colors"
            >
              <span className="font-mono text-xs text-cyan-300 select-all break-all">
                {id}
              </span>
              <button
                onClick={() => handleCopySingle(id, idx)}
                className="text-slate-500 hover:text-white p-1 rounded-md transition-colors shrink-0"
                title="Copy single ID"
              >
                {copiedItem === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
