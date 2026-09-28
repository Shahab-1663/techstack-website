import React, { useState, useEffect } from 'react';
import { Link2, Copy, Check, ArrowRightLeft } from 'lucide-react';

export function UrlEncoder() {
  const [mode, setMode] = useState<'url' | 'html'>('url');
  const [action, setAction] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('https://techstack.dev/search?q=developer tools&category=web 2.0');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (mode === 'url') {
        if (action === 'encode') {
          setOutput(encodeURIComponent(input));
        } else {
          setOutput(decodeURIComponent(input));
        }
      } else {
        if (action === 'encode') {
          setOutput(
            input
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;')
          );
        } else {
          const doc = new DOMParser().parseFromString(input, 'text/html');
          setOutput(doc.documentElement.textContent || '');
        }
      }
    } catch (e: any) {
      setOutput('Error: ' + e.message);
    }
  }, [input, mode, action]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Control Switchers */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setMode('url')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                mode === 'url' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              URI / URL Component
            </button>
            <button
              onClick={() => setMode('html')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                mode === 'html' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              HTML Entities
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAction(action === 'encode' ? 'decode' : 'encode')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium transition-all"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Switch to {action === 'encode' ? 'Decode' : 'Encode'}</span>
          </button>
        </div>
      </div>

      {/* Inputs / Outputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider pb-2 mb-2 border-b border-slate-800">
            {action === 'encode' ? 'Raw Input' : 'Encoded Input'}
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Type or paste input..."
            className="w-full bg-transparent font-mono text-sm text-slate-200 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-slate-200 uppercase tracking-wider">
              {action === 'encode' ? 'Encoded Output' : 'Decoded Result'}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full bg-transparent font-mono text-sm text-cyan-300 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
