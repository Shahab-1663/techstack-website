import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  CheckCircle2, 
  QrCode, 
  Layers, 
  FileJson,
  Star,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { TOOLS_LIST } from '../data/toolsData';
import { SEOHead } from '../components/SEOHead';

interface HomePageProps {
  onNavigate: (tab: string, toolId?: string) => void;
  onOpenSearch: () => void;
}

export function HomePage({ onNavigate, onOpenSearch }: HomePageProps) {
  const featuredTools = TOOLS_LIST.filter(t => 
    ['cgpa-calc', 'json-formatter', 'jwt-decoder', 'qr-generator', 'box-shadow-studio', 'password-gen'].includes(t.id)
  );

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'TechStack',
    'url': 'https://techstack.dev',
    'description': 'Advanced developer workspace and educational utilities hub featuring university GPA calculators, JSON tools, and privacy-first web utilities.',
    'author': {
      '@type': 'Person',
      'name': 'Shahab Saeed',
      'url': 'https://github.com/Shahab-1663'
    }
  };

  return (
    <div className="space-y-20 pb-16 animate-fadeIn">
      <SEOHead
        title="TechStack – Modern Developer Workspace & 20+ Free Web Tools"
        description="Explore TechStack: A modern, privacy-first web portal with 20+ developer utilities, 4.0 university CGPA calculators, and code generators crafted by Shahab Saeed."
        keywords={['TechStack', 'developer portal', 'cgpa calculator', 'free online tools', 'react web utilities']}
        schema={homeSchema}
      />

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TechStack 2.0 • 20 High-Performance Client Tools</span>
        </div>

        {/* Main Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Next-Gen Tools for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
              Developers & Students
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            A high-speed suite of 20 privacy-first utilities. Compute university GPAs, inspect JSON & JWTs, craft CSS glassmorphism, generate QR codes, and debug code—zero data uploads, zero wait.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('tool', 'cgpa-calc')}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all hover:scale-105 active:scale-95"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Launch CGPA Calculator</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => onNavigate('tools')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 hover:border-slate-500 transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <span>Explore All 20 Tools</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">20+</div>
            <div className="text-xs text-slate-400 mt-1">Interactive Tools</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1">Client-Side Safe</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">0 ms</div>
            <div className="text-xs text-slate-400 mt-1">Server Lag / Cloud Free</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">4.0</div>
            <div className="text-xs text-slate-400 mt-1">Standard Academic Scale</div>
          </div>
        </div>
      </section>

      {/* Signature Highlight: CGPA Calculator Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-[#0a0f1d] to-[#070b13] p-8 sm:p-12 shadow-[0_0_50px_rgba(6,182,212,0.12)] overflow-hidden">
          {/* Ambient light glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Featured University Tool</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                4.0 Scale University <br />
                <span className="text-cyan-400">CGPA & GPA Calculator</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The flagship utility of TechStack. Designed with multi-semester support, letter grade credit conversions (A to F), Dean&apos;s list tier predictions, and instant academic report export.
              </p>

              <div className="space-y-2 text-xs font-mono text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Supports multi-semester cumulative grading & weighted credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Official Dean&apos;s List & Honors Tier Classification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Downloadable Academic PDF/JSON Performance Reports</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('tool', 'cgpa-calc')}
                  className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                >
                  <span>Open Full Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual interactive preview widget */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">Grade Simulation</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">Summa Cum Laude</span>
              </div>

              <div className="flex items-center justify-around py-3">
                <div className="text-center">
                  <div className="text-5xl font-black font-mono text-white">3.92</div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">Cumulative CGPA</div>
                </div>
                <div className="h-12 w-[1px] bg-slate-800" />
                <div className="text-center">
                  <div className="text-5xl font-black font-mono text-cyan-400">4.00</div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">Current Semester</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono">
                  <span className="text-slate-200">Data Structures & Algo (3 Cr)</span>
                  <span className="text-cyan-400 font-bold">A (4.0)</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono">
                  <span className="text-slate-200">Computer Architecture (3 Cr)</span>
                  <span className="text-cyan-400 font-bold">A- (3.7)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Essential Arsenal</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Popular Daily Utilities
            </h2>
          </div>
          <button
            onClick={() => onNavigate('tools')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View All 20 Utilities</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigate('tool', tool.id)}
              className="group p-6 rounded-2xl border border-white/[0.08] bg-[#090e1a]/80 hover:bg-[#0d1424] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.18)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">
                    {tool.categoryLabel}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tool.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-mono">100% Client-Side</span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Launch <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Author & Creator Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/[0.08] bg-slate-900/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 shrink-0 bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face"
                alt="Shahab Saeed"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/me2.JPG';
                }}
              />
            </div>
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                Architect & Engineer
              </span>
              <h3 className="text-lg font-bold text-white">Shahab Saeed (Shahab Khan)</h3>
              <p className="text-xs text-slate-400 mt-0.5 max-w-md">
                Full-stack developer building robust, open-source productivity utilities and performant web systems.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('about')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              View Full Portfolio & Socials
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
