import React, { useState } from 'react';
import { Share2, Copy, Check, Globe, Eye } from 'lucide-react';
import { TwitterIcon } from '../SocialIcons';

export function MetaPreviewer() {
  const [title, setTitle] = useState('TechStack – Modern Developer Workspace & 20+ Free Tools');
  const [description, setDescription] = useState(
    'A high-performance developer portal and student utility hub featuring 4.0 scale CGPA calculators, JSON formatters, JWT decoders, and privacy-first web tools.'
  );
  const [url, setUrl] = useState('https://techstack.dev');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop');
  const [copied, setCopied] = useState(false);

  const generatedTags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${imageUrl}">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Editor Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl border border-white/[0.08] bg-slate-900/50">
        <div>
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
            Page Title ({title.length} chars)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
            Canonical Page URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-cyan-400 font-mono text-sm focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
            Meta Description ({description.length} chars, recommended 120-160)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500/50 leading-relaxed"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
            Social Share Image URL (1200x630 recommended)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-cyan-400 font-mono text-sm focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Live Social Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google SERP Preview */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-5 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-400" />
            Google Search Preview (SERP)
          </span>

          <div className="p-4 rounded-xl bg-white text-slate-900 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-600 truncate">
              <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">🌐</span>
              <span className="truncate">{url}</span>
            </div>
            <h4 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer truncate">
              {title}
            </h4>
            <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Twitter Card Preview */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-5 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <TwitterIcon className="w-4 h-4 text-cyan-400" />
            Twitter / X Social Card Preview
          </span>

          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-md">
            <div className="h-40 w-full overflow-hidden bg-slate-900">
              <img src={imageUrl} alt="Social Card" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 space-y-1">
              <span className="text-[11px] text-slate-500 font-mono block uppercase">
                {url.replace(/^https?:\/\//, '')}
              </span>
              <h4 className="text-sm font-bold text-white truncate">{title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Meta Tags Code */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] p-4">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider font-mono">
            HTML &lt;head&gt; Meta Tags
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Tags'}</span>
          </button>
        </div>
        <pre className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed border border-slate-850">
          {generatedTags}
        </pre>
      </div>
    </div>
  );
}
