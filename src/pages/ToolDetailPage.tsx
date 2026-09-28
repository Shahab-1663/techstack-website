import React from 'react';
import { ArrowLeft, Sparkles, Share2, ExternalLink, ShieldCheck, Tag } from 'lucide-react';
import { TOOLS_LIST, ToolMetadata } from '../data/toolsData';
import { SEOHead } from '../components/SEOHead';

// Import all 20 tools
import { CgpaCalculator } from '../components/tools/CgpaCalculator';
import { JsonFormatter } from '../components/tools/JsonFormatter';
import { MarkdownEditor } from '../components/tools/MarkdownEditor';
import { Base64Converter } from '../components/tools/Base64Converter';
import { JwtDecoder } from '../components/tools/JwtDecoder';
import { HashGenerator } from '../components/tools/HashGenerator';
import { BoxShadowStudio } from '../components/tools/BoxShadowStudio';
import { ColorStudio } from '../components/tools/ColorStudio';
import { RegexPlayground } from '../components/tools/RegexPlayground';
import { QrCodeGenerator } from '../components/tools/QrCodeGenerator';
import { PasswordGenerator } from '../components/tools/PasswordGenerator';
import { UuidGenerator } from '../components/tools/UuidGenerator';
import { StringConverter } from '../components/tools/StringConverter';
import { UnitConverter } from '../components/tools/UnitConverter';
import { MetaPreviewer } from '../components/tools/MetaPreviewer';
import { UrlEncoder } from '../components/tools/UrlEncoder';
import { DiffChecker } from '../components/tools/DiffChecker';
import { LoremGenerator } from '../components/tools/LoremGenerator';
import { FlexboxStudio } from '../components/tools/FlexboxStudio';
import { PomodoroTimer } from '../components/tools/PomodoroTimer';

interface ToolDetailPageProps {
  toolId: string;
  onNavigate: (tab: string, toolId?: string) => void;
}

export function ToolDetailPage({ toolId, onNavigate }: ToolDetailPageProps) {
  const tool = TOOLS_LIST.find((t) => t.id === toolId) || TOOLS_LIST[0];

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'cgpa-calc': return <CgpaCalculator />;
      case 'json-formatter': return <JsonFormatter />;
      case 'markdown-editor': return <MarkdownEditor />;
      case 'base64-converter': return <Base64Converter />;
      case 'jwt-decoder': return <JwtDecoder />;
      case 'hash-generator': return <HashGenerator />;
      case 'box-shadow-studio': return <BoxShadowStudio />;
      case 'color-palette': return <ColorStudio />;
      case 'regex-tester': return <RegexPlayground />;
      case 'qr-generator': return <QrCodeGenerator />;
      case 'password-gen': return <PasswordGenerator />;
      case 'uuid-gen': return <UuidGenerator />;
      case 'string-converter': return <StringConverter />;
      case 'unit-converter': return <UnitConverter />;
      case 'meta-preview': return <MetaPreviewer />;
      case 'url-encoder': return <UrlEncoder />;
      case 'diff-checker': return <DiffChecker />;
      case 'lorem-generator': return <LoremGenerator />;
      case 'flexbox-grid-studio': return <FlexboxStudio />;
      case 'pomodoro-timer': return <PomodoroTimer />;
      default: return <CgpaCalculator />;
    }
  };

  const relatedTools = TOOLS_LIST.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  ).slice(0, 3);

  // Schema.org structured data for this tool
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': tool.name,
    'description': tool.description,
    'applicationCategory': tool.categoryLabel,
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'author': {
      '@type': 'Person',
      'name': 'Shahab Saeed',
      'url': 'https://github.com/Shahab-1663'
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* SEO Engine */}
      <SEOHead
        title={tool.seoTitle}
        description={tool.seoDescription}
        keywords={tool.keywords}
        schema={schemaData}
      />

      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => onNavigate('tools')}
          className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tools</span>
        </button>

        <div className="flex items-center gap-2 font-mono">
          <span>Tools</span>
          <span>/</span>
          <span className="text-cyan-400">{tool.categoryLabel}</span>
          <span>/</span>
          <span className="text-white truncate max-w-[150px]">{tool.name}</span>
        </div>
      </div>

      {/* Tool Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#0a0f1d] to-slate-900/90 border border-white/[0.08] shadow-[0_0_50px_rgba(6,182,212,0.08)] relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {tool.categoryLabel}
              </span>
              {tool.badge && (
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {tool.badge}
                </span>
              )}
              <span className="text-xs text-emerald-400/90 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Client-Side Safe
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {tool.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {tool.tagline}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: tool.seoTitle, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tool link copied to clipboard!');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4" /> Share Tool
            </button>
          </div>
        </div>
      </div>

      {/* The Active Tool Component */}
      <div className="relative z-10">
        {renderToolComponent()}
      </div>

      {/* SEO & Tool Overview Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-800">
        <div className="md:col-span-2 space-y-4 text-slate-300 text-sm leading-relaxed">
          <h3 className="text-lg font-bold text-white tracking-tight">
            About {tool.name}
          </h3>
          <p>{tool.description}</p>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/[0.06] space-y-2">
            <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider">
              Privacy & Security Guarantee
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All computations, parsing, cryptography, and calculations run 100% locally inside your browser via web standard APIs. No inputs, keys, tokens, or files are sent to external backends.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {tool.keywords.map((kw) => (
              <span key={kw} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Related Tools suggestions */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Related in {tool.categoryLabel}
          </h3>
          <div className="space-y-3">
            {relatedTools.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onNavigate('tool', rel.id)}
                className="w-full text-left p-3 rounded-xl bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/80 transition-all group"
              >
                <div className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {rel.name}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {rel.tagline}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
