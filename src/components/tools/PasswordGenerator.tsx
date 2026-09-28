import React, { useState, useEffect } from 'react';
import { KeyRound, RefreshCw, Copy, Check, ShieldCheck, Zap, Sliders } from 'lucide-react';

export function PasswordGenerator() {
  const [mode, setMode] = useState<'password' | 'passphrase'>('password');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  // Passphrase word count
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');

  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const wordList = [
    'aurora', 'beacon', 'cipher', 'dynamo', 'echo', 'falcon', 'galaxy', 'horizon',
    'ignite', 'jupiter', 'kinetic', 'lunar', 'matrix', 'nebula', 'orbit', 'pulsar',
    'quantum', 'radar', 'stellar', 'titan', 'uranus', 'vertex', 'zenith', 'vortex',
    'vector', 'shield', 'shadow', 'crystal', 'cascade', 'comet', 'nebula', 'plasma'
  ];

  const generate = () => {
    if (mode === 'passphrase') {
      const words: string[] = [];
      const cryptoArr = new Uint32Array(wordCount);
      window.crypto.getRandomValues(cryptoArr);
      for (let i = 0; i < wordCount; i++) {
        const word = wordList[cryptoArr[i] % wordList.length];
        words.push(word);
      }
      setPassword(words.join(separator));
      return;
    }

    let charset = '';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (excludeAmbiguous) {
      charset = charset.replace(/[1lI0O]/g, '');
    }

    if (!charset) {
      setPassword('');
      return;
    }

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generate();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous, mode, wordCount, separator]);

  // Entropy calculation
  const calculateEntropy = () => {
    if (mode === 'passphrase') {
      return wordCount * Math.log2(wordList.length);
    }
    let poolSize = 0;
    if (includeLower) poolSize += 26;
    if (includeUpper) poolSize += 26;
    if (includeNumbers) poolSize += 10;
    if (includeSymbols) poolSize += 30;
    if (poolSize === 0) return 0;
    return Math.round(length * Math.log2(poolSize));
  };

  const entropy = calculateEntropy();

  const getStrengthTier = (bits: number) => {
    if (bits >= 80) return { label: 'Ultra-Secure / Uncrackable', color: 'text-emerald-400', bar: 'w-full bg-emerald-500' };
    if (bits >= 60) return { label: 'Strong Protection', color: 'text-cyan-400', bar: 'w-3/4 bg-cyan-500' };
    if (bits >= 45) return { label: 'Moderate Security', color: 'text-amber-400', bar: 'w-1/2 bg-amber-500' };
    return { label: 'Weak / Vulnerable', color: 'text-rose-400', bar: 'w-1/4 bg-rose-500' };
  };

  const strength = getStrengthTier(entropy);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/60 border border-white/[0.08] max-w-sm">
        <button
          onClick={() => setMode('password')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
            mode === 'password' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Random Password
        </button>
        <button
          onClick={() => setMode('passphrase')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
            mode === 'passphrase' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Memorable Passphrase
        </button>
      </div>

      {/* Generated Password Display Bar */}
      <div className="relative rounded-2xl border border-cyan-500/30 bg-[#070b13] p-5 shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="font-mono text-xl sm:text-2xl text-white font-bold tracking-wider select-all break-all">
          {password || 'Select options below'}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={generate}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Generate New"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Password'}</span>
          </button>
        </div>
      </div>

      {/* Strength & Entropy meter */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.08] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Entropy Strength:</span>
          <span className={`font-bold font-mono ${strength.color}`}>
            {entropy} bits • {strength.label}
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-300 ${strength.bar}`} />
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl space-y-5">
        {mode === 'password' ? (
          <>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-2">
                <span>Password Length</span>
                <span className="font-mono text-cyan-400 font-bold">{length} characters</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeUpper}
                  onChange={(e) => setIncludeUpper(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-xs text-slate-200">Uppercase Letters (A-Z)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeLower}
                  onChange={(e) => setIncludeLower(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-xs text-slate-200">Lowercase Letters (a-z)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-xs text-slate-200">Digits & Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-xs text-slate-200">Special Symbols (!@#$%)</span>
              </label>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-2">
                <span>Number of Words</span>
                <span className="font-mono text-cyan-400 font-bold">{wordCount} words</span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 mb-2 block">Word Separator Character</label>
              <div className="flex gap-2">
                {['-', '_', '.', ' ', '#'].map((sep) => (
                  <button
                    key={sep}
                    onClick={() => setSeparator(sep)}
                    className={`w-10 h-10 rounded-lg font-mono text-sm border flex items-center justify-center ${
                      separator === sep
                        ? 'bg-cyan-600 text-white border-cyan-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sep === ' ' ? '␣' : sep}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
