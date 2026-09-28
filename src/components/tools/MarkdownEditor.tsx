import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Bold, 
  Italic, 
  Heading, 
  Code, 
  Link as LinkIcon, 
  List, 
  FileCode2, 
  Eye 
} from 'lucide-react';

export function MarkdownEditor() {
  const initialMarkdown = `# TechStack Developer Workspace

Welcome to **TechStack** Markdown Live Editor. Write, edit, and preview with instant typography rendering.

## Key Highlights
- **Real-time Rendering**: Instantly converts GitHub Flavored Markdown
- **Client-Side Privacy**: Runs 100% locally in your browser
- **Quick Shortcuts**: Use toolbar buttons to insert elements

### Code Example
\`\`\`javascript
const author = "Shahab Saeed";
console.log(\`Crafted with passion by \${author}!\`);
\`\`\`

> "Simplicity is prerequisite for reliability." – Edsger W. Dijkstra

| Feature | Status | Speed |
| :--- | :--- | :--- |
| GPA Calc | Live | Instant |
| Security | Protected | 100% Client-Side |
| SEO | Optimized | SSR-Ready |

[Visit Portfolio](#about)
`;

  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [copied, setCopied] = useState(false);

  // Simple Markdown parser for live safe preview without heavy dependencies
  const parseMarkdown = (md: string) => {
    let html = md
      // Escaping
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Code blocks
      .replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre class="bg-slate-950 p-4 rounded-xl my-4 overflow-x-auto text-cyan-300 font-mono text-xs border border-slate-800"><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 text-xs font-mono">$1</code>')
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-white mt-5 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-white mt-6 mb-3 border-b border-slate-800 pb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-cyan-400 mt-4 mb-4">$1</h1>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-cyan-500 pl-4 py-1 italic text-slate-400 my-3 bg-slate-900/40 rounded-r-lg">$1</blockquote>')
      // Bold & Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic text-slate-300">$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-cyan-400 underline hover:text-cyan-300" target="_blank" rel="noopener noreferrer">$1</a>')
      // Unordered lists
      .replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-300">$1</li>')
      // Paragraph line breaks
      .replace(/\n\n/gim, '<br/><br/>');

    return html;
  };

  const insertSnippet = (prefix: string, suffix = '') => {
    setMarkdown(prev => prev + '\n' + prefix + 'text' + suffix);
  };

  const wordCount = markdown.trim().split(/\s+/).filter(Boolean).length;
  const charCount = markdown.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(parseMarkdown(markdown));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/[0.08]">
        {/* Formatting buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => insertSnippet('**', '**')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('*', '*')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('## ')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Heading"
          >
            <Heading className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('```typescript\n', '\n```')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('- ')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Bullet list"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('> ')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono px-2"
            title="Quote"
          >
            &quot; Quote
          </button>
        </div>

        {/* Stats & Exports */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 font-mono hidden sm:flex items-center gap-3">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>~{readTimeMinutes} min read</span>
          </div>

          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'HTML Copied' : 'Copy HTML'}</span>
          </button>

          <button
            onClick={downloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save .md</span>
          </button>
        </div>
      </div>

      {/* Split Pane Editor & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Markdown Input */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#070b13] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              Editor (Raw Markdown)
            </span>
            <span>{charCount} chars</span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={18}
            className="w-full h-full min-h-[400px] bg-transparent p-4 font-mono text-sm text-slate-200 focus:outline-none resize-none leading-relaxed"
            placeholder="Type your markdown here..."
          />
        </div>

        {/* Live Preview */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#080d1a] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              Live HTML Render
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Sync
            </span>
          </div>
          <div 
            className="p-5 overflow-y-auto max-h-[500px] text-slate-300 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>
    </div>
  );
}
