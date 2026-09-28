import React, { useState } from 'react';
import { Layers, Copy, Check, Sliders, Sparkles } from 'lucide-react';

export function BoxShadowStudio() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(14);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState('#06b6d4');
  const [opacity, setOpacity] = useState(25);
  const [isInset, setIsInset] = useState(false);

  // Glassmorphism controls
  const [backdropBlur, setBackdropBlur] = useState(16);
  const [bgOpacity, setBgOpacity] = useState(50);
  const [borderOpacity, setBorderOpacity] = useState(15);

  const [copied, setCopied] = useState(false);

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(char => char + char).join('');
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha / 100})`;
  };

  const shadowRgba = hexToRgba(color, opacity);
  const cssShadow = `${isInset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowRgba}`;

  const generatedCss = `/* Box Shadow & Glassmorphism */
box-shadow: ${cssShadow};
backdrop-filter: blur(${backdropBlur}px);
background: rgba(15, 23, 42, ${bgOpacity / 100});
border: 1px solid rgba(255, 255, 255, ${borderOpacity / 100});
border-radius: 16px;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Visual Interactive Preview */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#050811] p-12 min-h-[300px] flex items-center justify-center overflow-hidden">
        {/* Ambient background light grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl" />

        {/* The generated Preview Box */}
        <div
          style={{
            boxShadow: cssShadow,
            backdropFilter: `blur(${backdropBlur}px)`,
            backgroundColor: `rgba(15, 23, 42, ${bgOpacity / 100})`,
            border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
            borderRadius: '20px',
          }}
          className="relative w-80 h-52 p-6 flex flex-col justify-between transition-all duration-150 z-10"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400">Glass Preview</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">Interactive Glass Card</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Silky multi-layered depth with real-time blur and ambient reflection.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
            TechStack UI Studio
          </div>
        </div>
      </div>

      {/* Sliders & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl">
        {/* Left Column: Shadow Offsets */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Shadow Dimensions
          </h4>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Horizontal Offset (X)</span>
              <span className="font-mono text-cyan-400">{offsetX}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Vertical Offset (Y)</span>
              <span className="font-mono text-cyan-400">{offsetY}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Blur Radius</span>
              <span className="font-mono text-cyan-400">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Spread Radius</span>
              <span className="font-mono text-cyan-400">{spread}px</span>
            </div>
            <input
              type="range"
              min="-30"
              max="50"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>
        </div>

        {/* Right Column: Colors & Glass Backdrop */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-400" />
            Color & Frosted Glass
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Shadow Color</label>
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-white">{color.toUpperCase()}</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Shadow Opacity ({opacity}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full mt-2 accent-cyan-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Backdrop Blur Filter</span>
              <span className="font-mono text-cyan-400">{backdropBlur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={backdropBlur}
              onChange={(e) => setBackdropBlur(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div className="pt-2 flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={isInset}
                onChange={(e) => setIsInset(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>Inset Shadow</span>
            </label>
          </div>
        </div>
      </div>

      {/* Generated CSS Code snippet */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
          <span className="font-semibold text-white uppercase tracking-wider font-mono">
            Generated CSS Snippet
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'CSS Copied!' : 'Copy CSS'}</span>
          </button>
        </div>
        <pre className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed border border-slate-850">
          {generatedCss}
        </pre>
      </div>
    </div>
  );
}
