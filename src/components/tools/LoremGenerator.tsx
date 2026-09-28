import React, { useState } from 'react';
import { FileText, Copy, Check, Users, RefreshCw } from 'lucide-react';

export function LoremGenerator() {
  const [type, setType] = useState<'lorem' | 'users'>('lorem');
  const [count, setCount] = useState<number>(3);
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
    'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse',
    'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat'
  ];

  const FIRST_NAMES = ['Shahab', 'Aliyan', 'Zayn', 'Sara', 'Alex', 'Elena', 'Jordan', 'Maya'];
  const LAST_NAMES = ['Saeed', 'Khan', 'Smith', 'Vance', 'Chen', 'Miller', 'Davis', 'Patel'];
  const ROLES = ['Frontend Architect', 'Backend Developer', 'UI/UX Designer', 'DevOps Lead', 'Cloud Engineer'];
  const CITIES = ['San Francisco', 'London', 'Berlin', 'Tokyo', 'Toronto', 'Singapore', 'Lahore'];

  const generateData = () => {
    if (type === 'lorem') {
      const paragraphs: string[] = [];
      for (let p = 0; p < count; p++) {
        let wordsArr: string[] = [];
        const numWords = 50 + Math.floor(Math.random() * 25);
        for (let w = 0; w < numWords; w++) {
          wordsArr.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
        }
        const text = wordsArr.join(' ');
        paragraphs.push(text.charAt(0).toUpperCase() + text.slice(1) + '.');
      }
      setOutput(paragraphs.join('\n\n'));
    } else {
      const users = [];
      for (let i = 0; i < count; i++) {
        const fn = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
        const ln = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
        users.push({
          id: `usr_${1000 + i}`,
          name: `${fn} ${ln}`,
          email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
          role: ROLES[Math.floor(Math.random() * ROLES.length)],
          location: CITIES[Math.floor(Math.random() * CITIES.length)],
          verified: Math.random() > 0.3,
        });
      }
      setOutput(JSON.stringify(users, null, 2));
    }
  };

  React.useEffect(() => {
    generateData();
  }, [type, count]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/[0.08]">
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setType('lorem')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              type === 'lorem' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Lorem Ipsum Text
          </button>
          <button
            onClick={() => setType('users')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              type === 'users' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mock Users JSON
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>Count:</span>
            <input
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(Math.min(20, Math.max(1, Number(e.target.value))))}
              className="w-16 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-cyan-400 font-mono text-center focus:outline-none"
            />
          </div>

          <button
            onClick={generateData}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Regenerate"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-all shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Data'}</span>
          </button>
        </div>
      </div>

      {/* Output Display */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-5 shadow-2xl">
        <textarea
          readOnly
          value={output}
          rows={12}
          className="w-full bg-transparent font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed select-all"
        />
      </div>
    </div>
  );
}
