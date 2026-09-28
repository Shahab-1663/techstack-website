import React, { useState } from 'react';
import { Palette, Copy, Check, Eye, CheckCircle2, XCircle } from 'lucide-react';

export function ColorStudio() {
  const [fgColor, setFgColor] = useState('#06b6d4');
  const [bgColor, setBgColor] = useState('#0f172a');
  const [copied, setCopied] = useState<string | null>(null);

  // Convert Hex to RGB
  const hexToRgb = (hex: string) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Calculate Relative Luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const rgbFg = hexToRgb(fgColor);
  const rgbBg = hexToRgb(bgColor);
  const hslFg = rgbToHsl(rgbFg.r, rgbFg.g, rgbFg.b);

  const lumFg = getLuminance(rgbFg.r, rgbFg.g, rgbFg.b);
  const lumBg = getLuminance(rgbBg.r, rgbBg.g, rgbBg.b);

  const brightest = Math.max(lumFg, lumBg);
  const darkest = Math.min(lumFg, lumBg);
  const contrastRatio = ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
  const ratioNum = parseFloat(contrastRatio);

  // WCAG Criteria
  const aaNormal = ratioNum >= 4.5;
  const aaLarge = ratioNum >= 3.0;
  const aaaNormal = ratioNum >= 7.0;
  const aaaLarge = ratioNum >= 4.5;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Visual Contrast Showcase Card */}
      <div
        style={{ backgroundColor: bgColor }}
        className="rounded-2xl border border-white/10 p-8 min-h-[220px] flex flex-col justify-between transition-colors shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <span style={{ color: fgColor }} className="text-xs font-mono font-bold tracking-wider uppercase">
            Live Preview Card
          </span>
          <span style={{ color: fgColor, borderColor: fgColor }} className="text-xs font-mono px-2 py-0.5 rounded border">
            {contrastRatio} : 1 Ratio
          </span>
        </div>

        <div>
          <h3 style={{ color: fgColor }} className="text-2xl sm:text-3xl font-bold tracking-tight">
            High Contrast Typography Sample
          </h3>
          <p style={{ color: fgColor }} className="text-sm mt-2 max-w-xl opacity-90 leading-relaxed">
            Accessible design ensures your products can be clearly read and navigated by all users across every lighting condition.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <button
            style={{ backgroundColor: fgColor, color: bgColor }}
            className="px-4 py-2 rounded-xl text-xs font-bold font-mono transition-transform active:scale-95"
          >
            Sample Button
          </button>
          <span style={{ color: fgColor }} className="text-xs">
            Secondary descriptive text
          </span>
        </div>
      </div>

      {/* WCAG Compliance Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`p-4 rounded-xl border flex items-center justify-between ${aaNormal ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
          <div>
            <div className="text-xs font-mono uppercase">WCAG AA Normal</div>
            <div className="text-xs font-bold mt-1">4.5:1 Target</div>
          </div>
          {aaNormal ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
        </div>

        <div className={`p-4 rounded-xl border flex items-center justify-between ${aaLarge ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
          <div>
            <div className="text-xs font-mono uppercase">WCAG AA Large</div>
            <div className="text-xs font-bold mt-1">3.0:1 Target</div>
          </div>
          {aaLarge ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
        </div>

        <div className={`p-4 rounded-xl border flex items-center justify-between ${aaaNormal ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
          <div>
            <div className="text-xs font-mono uppercase">WCAG AAA Normal</div>
            <div className="text-xs font-bold mt-1">7.0:1 Target</div>
          </div>
          {aaaNormal ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
        </div>

        <div className={`p-4 rounded-xl border flex items-center justify-between ${aaaLarge ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
          <div>
            <div className="text-xs font-mono uppercase">WCAG AAA Large</div>
            <div className="text-xs font-bold mt-1">4.5:1 Target</div>
          </div>
          {aaaLarge ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
        </div>
      </div>

      {/* Pickers & Format Conversions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl">
        {/* Foreground Picker */}
        <div className="space-y-4">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Text / Foreground Color
          </label>
          <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <div className="flex-1 font-mono text-sm text-white">
              {fgColor.toUpperCase()}
            </div>
            <button
              onClick={() => handleCopy(fgColor, 'fg-hex')}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white"
            >
              {copied === 'fg-hex' ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="space-y-2 text-xs font-mono text-slate-400">
            <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span>RGB:</span>
              <span className="text-white">rgb({rgbFg.r}, {rgbFg.g}, {rgbFg.b})</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span>HSL:</span>
              <span className="text-white">hsl({hslFg.h}, {hslFg.s}%, {hslFg.l}%)</span>
            </div>
          </div>
        </div>

        {/* Background Picker */}
        <div className="space-y-4">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Background Color
          </label>
          <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <div className="flex-1 font-mono text-sm text-white">
              {bgColor.toUpperCase()}
            </div>
            <button
              onClick={() => handleCopy(bgColor, 'bg-hex')}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white"
            >
              {copied === 'bg-hex' ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="space-y-2 text-xs font-mono text-slate-400">
            <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span>RGB:</span>
              <span className="text-white">rgb({rgbBg.r}, {rgbBg.g}, {rgbBg.b})</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span>HSL:</span>
              <span className="text-white">hsl({rgbToHsl(rgbBg.r, rgbBg.g, rgbBg.b).h}, {rgbToHsl(rgbBg.r, rgbBg.g, rgbBg.b).s}%, {rgbToHsl(rgbBg.r, rgbBg.g, rgbBg.b).l}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
