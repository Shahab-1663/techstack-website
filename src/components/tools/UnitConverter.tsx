import React, { useState } from 'react';
import { ArrowLeftRight, Clock, HardDrive, Ruler, Copy, Check } from 'lucide-react';

export function UnitConverter() {
  const [tab, setTab] = useState<'css' | 'storage' | 'epoch'>('css');

  // CSS Units
  const [pxValue, setPxValue] = useState<number>(24);
  const [baseFontSize, setBaseFontSize] = useState<number>(16);

  // Storage
  const [bytesInput, setBytesInput] = useState<number>(1048576); // 1 MB

  // Epoch
  const [epochInput, setEpochInput] = useState<number>(Math.floor(Date.now() / 1000));
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  // Conversions
  const remValue = (pxValue / baseFontSize).toFixed(4).replace(/\.?0+$/, '');
  const emValue = remValue;
  const ptValue = (pxValue * 0.75).toFixed(2).replace(/\.?0+$/, '');

  // Storage units
  const kb = (bytesInput / 1024).toFixed(3);
  const mb = (bytesInput / (1024 * 1024)).toFixed(4);
  const gb = (bytesInput / (1024 * 1024 * 1024)).toFixed(6);
  const tb = (bytesInput / (1024 * 1024 * 1024 * 1024)).toFixed(8);

  // Epoch conversion
  const epochDate = new Date(epochInput * 1000);
  const isValidDate = !isNaN(epochDate.getTime());

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/60 border border-white/[0.08] max-w-md">
        <button
          onClick={() => setTab('css')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            tab === 'css' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>PX to REM / CSS</span>
        </button>
        <button
          onClick={() => setTab('storage')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            tab === 'storage' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5" />
          <span>Data Storage</span>
        </button>
        <button
          onClick={() => setTab('epoch')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            tab === 'epoch' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Unix Epoch</span>
        </button>
      </div>

      {tab === 'css' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl border border-white/[0.08] bg-slate-900/50">
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Pixels (PX) Value
              </label>
              <input
                type="number"
                value={pxValue}
                onChange={(e) => setPxValue(Number(e.target.value))}
                className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-cyan-400 font-mono text-lg focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Root Base Font Size (Default 16px)
              </label>
              <input
                type="number"
                value={baseFontSize}
                onChange={(e) => setBaseFontSize(Number(e.target.value))}
                className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white font-mono text-lg focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070b13] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">REM</span>
                <div className="text-2xl font-bold font-mono text-white mt-1">{remValue}rem</div>
              </div>
              <button
                onClick={() => handleCopy(`${remValue}rem`, 'rem')}
                className="p-2 text-slate-400 hover:text-white"
              >
                {copied === 'rem' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070b13] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase">EM</span>
                <div className="text-2xl font-bold font-mono text-white mt-1">{emValue}em</div>
              </div>
              <button
                onClick={() => handleCopy(`${emValue}em`, 'em')}
                className="p-2 text-slate-400 hover:text-white"
              >
                {copied === 'em' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070b13] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase">Points (PT)</span>
                <div className="text-2xl font-bold font-mono text-white mt-1">{ptValue}pt</div>
              </div>
              <button
                onClick={() => handleCopy(`${ptValue}pt`, 'pt')}
                className="p-2 text-slate-400 hover:text-white"
              >
                {copied === 'pt' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'storage' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-slate-900/50">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Size in Bytes (B)
            </label>
            <input
              type="number"
              value={bytesInput}
              onChange={(e) => setBytesInput(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-cyan-400 font-mono text-lg focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070b13]">
              <span className="text-xs font-mono text-cyan-400">Kilobytes (KB)</span>
              <div className="text-xl font-bold font-mono text-white mt-1">{kb} KB</div>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070b13]">
              <span className="text-xs font-mono text-emerald-400">Megabytes (MB)</span>
              <div className="text-xl font-bold font-mono text-white mt-1">{mb} MB</div>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070b13]">
              <span className="text-xs font-mono text-purple-400">Gigabytes (GB)</span>
              <div className="text-xl font-bold font-mono text-white mt-1">{gb} GB</div>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070b13]">
              <span className="text-xs font-mono text-pink-400">Terabytes (TB)</span>
              <div className="text-xl font-bold font-mono text-white mt-1">{tb} TB</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'epoch' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Unix Timestamp (Seconds)
              </label>
              <input
                type="number"
                value={epochInput}
                onChange={(e) => setEpochInput(Number(e.target.value))}
                className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-cyan-400 font-mono text-lg focus:outline-none"
              />
            </div>
            <button
              onClick={() => setEpochInput(Math.floor(Date.now() / 1000))}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium shrink-0 transition-colors"
            >
              Set Current Time
            </button>
          </div>

          {isValidDate ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070b13]">
                <span className="text-xs font-mono text-cyan-400 uppercase">UTC Date Time</span>
                <div className="text-sm font-bold font-mono text-white mt-1 select-all">
                  {epochDate.toUTCString()}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070b13]">
                <span className="text-xs font-mono text-emerald-400 uppercase">ISO 8601 Format</span>
                <div className="text-sm font-bold font-mono text-white mt-1 select-all">
                  {epochDate.toISOString()}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-rose-400 text-xs font-mono p-4 rounded-xl bg-rose-500/10">
              Invalid Timestamp provided
            </div>
          )}
        </div>
      )}
    </div>
  );
}
