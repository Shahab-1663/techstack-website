import React, { useState } from 'react';
import { LayoutGrid, Copy, Check, Plus, Trash2 } from 'lucide-react';

export function FlexboxStudio() {
  const [layoutMode, setLayoutMode] = useState<'flex' | 'grid'>('flex');
  const [flexDirection, setFlexDirection] = useState<'row' | 'column' | 'row-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<string>('space-between');
  const [alignItems, setAlignItems] = useState<string>('center');
  const [flexWrap, setFlexWrap] = useState<string>('wrap');
  const [gap, setGap] = useState<number>(16);

  // Grid
  const [gridCols, setGridCols] = useState<number>(3);

  const [itemCount, setItemCount] = useState<number>(5);
  const [copied, setCopied] = useState(false);

  const generatedCss = layoutMode === 'flex'
    ? `/* CSS Flexbox */
display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
flex-wrap: ${flexWrap};
gap: ${gap}px;`
    : `/* CSS Grid */
display: grid;
grid-template-columns: repeat(${gridCols}, minmax(0, 1fr));
gap: ${gap}px;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl text-xs">
        <div>
          <label className="text-slate-400 mb-1.5 block font-semibold uppercase">Layout Mode</label>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setLayoutMode('flex')}
              className={`flex-1 py-1 rounded text-xs font-medium ${layoutMode === 'flex' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
            >
              Flexbox
            </button>
            <button
              onClick={() => setLayoutMode('grid')}
              className={`flex-1 py-1 rounded text-xs font-medium ${layoutMode === 'grid' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
            >
              CSS Grid
            </button>
          </div>
        </div>

        {layoutMode === 'flex' ? (
          <>
            <div>
              <label className="text-slate-400 mb-1.5 block font-semibold uppercase">Direction</label>
              <select
                value={flexDirection}
                onChange={(e) => setFlexDirection(e.target.value as any)}
                className="w-full bg-slate-950 py-1.5 px-2.5 rounded-lg border border-slate-800 text-white"
              >
                <option value="row">row</option>
                <option value="column">column</option>
                <option value="row-reverse">row-reverse</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 mb-1.5 block font-semibold uppercase">Justify Content</label>
              <select
                value={justifyContent}
                onChange={(e) => setJustifyContent(e.target.value)}
                className="w-full bg-slate-950 py-1.5 px-2.5 rounded-lg border border-slate-800 text-white"
              >
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 mb-1.5 block font-semibold uppercase">Align Items</label>
              <select
                value={alignItems}
                onChange={(e) => setAlignItems(e.target.value)}
                className="w-full bg-slate-950 py-1.5 px-2.5 rounded-lg border border-slate-800 text-white"
              >
                <option value="stretch">stretch</option>
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
              </select>
            </div>
          </>
        ) : (
          <div>
            <label className="text-slate-400 mb-1.5 block font-semibold uppercase">Columns ({gridCols})</label>
            <input
              type="range"
              min="1"
              max="6"
              value={gridCols}
              onChange={(e) => setGridCols(Number(e.target.value))}
              className="w-full accent-cyan-500 mt-2"
            />
          </div>
        )}

        <div>
          <label className="text-slate-400 mb-1.5 block font-semibold uppercase">Gap ({gap}px)</label>
          <input
            type="range"
            min="0"
            max="40"
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            className="w-full accent-cyan-500 mt-2"
          />
        </div>
      </div>

      {/* Interactive Visual Stage */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-6 min-h-[320px] flex flex-col justify-between shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-4">
          <span className="font-semibold text-slate-200 uppercase tracking-wider">
            Live Container Canvas
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setItemCount(Math.max(1, itemCount - 1))}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              - Remove
            </button>
            <span className="font-mono text-cyan-400">{itemCount} Items</span>
            <button
              onClick={() => setItemCount(Math.min(12, itemCount + 1))}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              + Add
            </button>
          </div>
        </div>

        {/* The Live Container */}
        <div
          style={{
            display: layoutMode === 'flex' ? 'flex' : 'grid',
            flexDirection: layoutMode === 'flex' ? flexDirection : undefined,
            justifyContent: layoutMode === 'flex' ? justifyContent : undefined,
            alignItems: layoutMode === 'flex' ? alignItems : undefined,
            flexWrap: layoutMode === 'flex' ? (flexWrap as any) : undefined,
            gridTemplateColumns: layoutMode === 'grid' ? `repeat(${gridCols}, minmax(0, 1fr))` : undefined,
            gap: `${gap}px`,
          }}
          className="w-full min-h-[200px] p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/60"
        >
          {Array.from({ length: itemCount }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-white font-mono text-xs flex items-center justify-center font-bold shadow-sm min-w-[70px] min-h-[50px] transition-all hover:scale-105"
            >
              Item {idx + 1}
            </div>
          ))}
        </div>

        {/* Code Snippet Box */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <pre className="font-mono text-xs text-cyan-300 truncate">
            {layoutMode === 'flex' ? `display: flex; gap: ${gap}px;` : `display: grid; cols: ${gridCols}; gap: ${gap}px;`}
          </pre>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy CSS'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
