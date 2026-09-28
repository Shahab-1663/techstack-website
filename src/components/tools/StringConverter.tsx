import React, { useState } from 'react';
import { CaseSensitive, Copy, Check, Type, Sparkles } from 'lucide-react';

export function StringConverter() {
  const [input, setInput] = useState('Build scalable full stack applications with TechStack');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Formatting helpers
  const toWords = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_\-]+/g, ' ')
      .replace(/[^\w\s]/g, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  };

  const words = toWords(input);

  const formats: Record<string, string> = {
    'camelCase': words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''),
    'PascalCase': words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''),
    'snake_case': words.map(w => w.toLowerCase()).join('_'),
    'kebab-case': words.map(w => w.toLowerCase()).join('-'),
    'CONSTANT_CASE': words.map(w => w.toUpperCase()).join('_'),
    'Title Case': words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
    'Sentence case': words.length > 0 ? (words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase() + ' ' + words.slice(1).map(w => w.toLowerCase()).join(' ')) : '',
    'SEO URL Slug': input.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''),
    'dot.case': words.map(w => w.toLowerCase()).join('.'),
  };

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const charCount = input.length;
  const charCountNoSpaces = input.replace(/\s/g, '').length;

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Input Text Box */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <CaseSensitive className="w-4 h-4 text-cyan-400" />
            Input Text
          </span>
          <div className="flex items-center gap-3 font-mono">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{charCount} chars ({charCountNoSpaces} no spaces)</span>
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Enter text to convert..."
          className="w-full bg-transparent font-sans text-base text-white focus:outline-none resize-none leading-relaxed"
        />
      </div>

      {/* Case conversions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(formats).map(([label, value]) => (
          <div
            key={label}
            className="p-3.5 rounded-xl border border-white/[0.08] bg-slate-900/60 hover:bg-slate-900 transition-colors flex items-center justify-between gap-3 group"
          >
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-mono text-cyan-400 block mb-0.5 uppercase tracking-wider">
                {label}
              </span>
              <div className="font-mono text-xs text-slate-200 truncate select-all">
                {value || '–'}
              </div>
            </div>

            <button
              onClick={() => handleCopy(label, value)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 transition-colors"
              title={`Copy ${label}`}
            >
              {copiedKey === label ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
