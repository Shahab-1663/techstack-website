import React, { useState, useMemo } from 'react';
import { SearchCode, AlertTriangle, Check, Copy, Sparkles, BookOpen } from 'lucide-react';

export function RegexPlayground() {
  const [pattern, setPattern] = useState<string>('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [flags, setFlags] = useState({ g: true, i: true, m: false, s: false });
  const [testText, setTestText] = useState(
    'Contact Shahab Saeed at shahabsaeed1663@gmail.com or support@techstack.dev for inquiries.'
  );

  const presets = [
    { label: 'Email Address', regex: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})' },
    { label: 'URL / Web Link', regex: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
    { label: 'IPv4 Address', regex: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' },
    { label: 'HEX Color', regex: '#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})' },
    { label: 'Digits Only', regex: '\\d+' },
  ];

  const flagString = Object.entries(flags)
    .filter(([_, val]) => val)
    .map(([key]) => key)
    .join('');

  const { matches, error, highlightedHtml } = useMemo(() => {
    try {
      if (!pattern) return { matches: [], error: null, highlightedHtml: testText };
      const regex = new RegExp(pattern, flagString);
      const allMatches: Array<{ match: string; index: number; groups: string[] }> = [];

      if (flags.g) {
        let m;
        // Avoid infinite loop on zero-length matches
        let lastIndex = -1;
        while ((m = regex.exec(testText)) !== null) {
          if (m.index === lastIndex) {
            regex.lastIndex++;
            continue;
          }
          lastIndex = m.index;
          allMatches.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      } else {
        const m = regex.exec(testText);
        if (m) {
          allMatches.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      }

      // Generate HTML highlight
      let html = '';
      let cursor = 0;
      allMatches.forEach((m) => {
        html += escapeHtml(testText.slice(cursor, m.index));
        html += `<mark class="bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 rounded px-1">${escapeHtml(m.match)}</mark>`;
        cursor = m.index + m.match.length;
      });
      html += escapeHtml(testText.slice(cursor));

      return { matches: allMatches, error: null, highlightedHtml: html };
    } catch (e: any) {
      return { matches: [], error: e.message, highlightedHtml: testText };
    }
  }, [pattern, flagString, testText, flags.g]);

  function escapeHtml(str: string) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return (
    <div className="space-y-6">
      {/* Pattern Input & Flags */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
          <span className="font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <SearchCode className="w-4 h-4 text-cyan-400" />
            Regular Expression Pattern
          </span>
          <div className="flex items-center gap-2">
            {(['g', 'i', 'm', 's'] as const).map((flag) => (
              <label key={flag} className="flex items-center gap-1 cursor-pointer font-mono select-none">
                <input
                  type="checkbox"
                  checked={flags[flag]}
                  onChange={(e) => setFlags({ ...flags, [flag]: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className={flags[flag] ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                  {flag}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-sm bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
          <span className="text-slate-500">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Type regex pattern..."
            className="flex-1 bg-transparent text-cyan-300 focus:outline-none"
          />
          <span className="text-slate-500">/{flagString}</span>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs text-slate-500 mr-1">Presets:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setPattern(preset.regex)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Test String and Match Highlight Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Test String input */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider pb-2 mb-2 border-b border-slate-800">
            Test String
          </span>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={8}
            placeholder="Paste text to test against regex..."
            className="w-full bg-transparent font-mono text-sm text-slate-200 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Highlighted Results */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-slate-200 uppercase tracking-wider">
              Matched Highlights
            </span>
            <span className="text-cyan-400 font-mono">
              {matches.length} Match{matches.length !== 1 ? 'es' : ''}
            </span>
          </div>
          <div
            className="w-full font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-56 p-2 rounded-xl bg-slate-950/60 border border-slate-850"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      </div>

      {/* Captured Groups breakdown */}
      {matches.length > 0 && (
        <div className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-4">
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
            Capture Groups & Match Details ({matches.length})
          </h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {matches.map((m, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">#{idx + 1}</span>
                  <span className="text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    &quot;{m.match}&quot;
                  </span>
                  <span className="text-slate-500">at index {m.index}</span>
                </div>
                {m.groups.length > 0 && (
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <span>Groups:</span>
                    {m.groups.map((g, gIdx) => (
                      <span key={gIdx} className="text-purple-300 bg-purple-950/50 px-1.5 py-0.5 rounded border border-purple-800/40">
                        ${gIdx + 1}: &quot;{g}&quot;
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
