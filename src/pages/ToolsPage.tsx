import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  FileJson, 
  FileCode2, 
  Binary, 
  ShieldCheck, 
  Hash, 
  Layers, 
  Palette, 
  SearchCode, 
  QrCode, 
  KeyRound, 
  Fingerprint, 
  CaseSensitive, 
  ArrowLeftRight, 
  Share2, 
  Link2, 
  GitCompare, 
  FileText, 
  LayoutGrid, 
  Timer,
  SlidersHorizontal
} from 'lucide-react';
import { TOOLS_LIST, ToolMetadata } from '../data/toolsData';
import { SEOHead } from '../components/SEOHead';

interface ToolsPageProps {
  onSelectTool: (toolId: string) => void;
}

// Map string to Lucide icon component
const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap,
  FileJson,
  FileCode2,
  Binary,
  ShieldCheck,
  Hash,
  Layers,
  Palette,
  SearchCode,
  QrCode,
  KeyRound,
  Fingerprint,
  CaseSensitive,
  ArrowLeftRight,
  Share2,
  Link2,
  GitCompare,
  FileText,
  LayoutGrid,
  Timer
};

export function ToolsPage({ onSelectTool }: ToolsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Tools (20)' },
    { id: 'academic', label: 'Academic & Productivity' },
    { id: 'developer', label: 'Developer Utilities' },
    { id: 'formatters', label: 'Data & Formatters' },
    { id: 'crypto', label: 'Security & Hashes' },
    { id: 'css', label: 'CSS & Frontend' },
    { id: 'generators', label: 'Generators' },
  ];

  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      tool.name.toLowerCase().includes(q) ||
      tool.tagline.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'TechStack Online Developer & Academic Tools',
    'description': 'Collection of 20 high-performance, privacy-first web utilities for developers, students, and engineers.',
    'itemListElement': TOOLS_LIST.map((tool, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': tool.name,
      'description': tool.description
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fadeIn">
      <SEOHead
        title="20+ Free Online Developer & Academic Tools – TechStack"
        description="Explore 20+ privacy-first web utilities including 4.0 CGPA calculators, JSON formatters, JWT decoders, QR generators, CSS glassmorphism, and hash checkers."
        keywords={['developer tools', 'free online tools', 'cgpa calculator', 'json formatter', 'jwt inspector', 'css shadow generator']}
        schema={schemaData}
      />

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>20 Fully Client-Side Utilities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Modern Web & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">Developer Tools</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Zero data uploads, zero tracking, instant execution. Every tool runs directly inside your browser for maximum security, speed, and privacy.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 20 tools by name, keyword, or technology..."
            className="w-full bg-[#0a0f1d] pl-12 pr-4 py-3 rounded-2xl border border-white/[0.08] focus:border-cyan-500/50 text-white placeholder-slate-500 text-sm focus:outline-none shadow-xl transition-all"
          />
        </div>

        {/* Category Pills (Functional filter buttons) */}
        <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const IconComp = ICON_MAP[tool.icon] || Sparkles;
          return (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#090e1a]/80 hover:bg-[#0d1424] p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_15px_35px_-10px_rgba(6,182,212,0.2)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    {tool.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {tool.badge}
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-slate-500">
                      {tool.categoryLabel}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    {tool.tagline}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                  <span>#{tool.keywords[0]}</span>
                  <span>#{tool.keywords[1] || 'free'}</span>
                </div>
                <span className="text-cyan-400 flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                  Launch <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="py-20 text-center space-y-3">
          <p className="text-slate-400 text-base">No tools matched your search &quot;{searchQuery}&quot;</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
