import React from 'react';
import { 
  Terminal, 
  Heart, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Code2
} from 'lucide-react';
import { 
  GithubIcon, 
  LinkedinIcon, 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon 
} from './SocialIcons';
import { TOOLS_LIST } from '../data/toolsData';

interface FooterProps {
  onNavigate: (tab: string, toolId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#05080e] pt-14 pb-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Tech<span className="text-cyan-400">Stack</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              High-performance web portal built by <strong className="text-slate-200">Shahab Saeed</strong>. 
              Featuring 20+ privacy-first developer utilities, university calculators, and client-side web tools.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-emerald-400/90 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Client-Side Execution • Zero Data Tracking</span>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com/Shahab-1663"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/shahab-saeed/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#0a66c2] hover:border-blue-500/40 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/shahabk.7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/shahabk.74"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/shahabk_7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                title="X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:shahabsaeed1663@gmail.com"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-sm">
              {TOOLS_LIST.slice(0, 5).map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => onNavigate('tool', tool.id)}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Dev & Security
            </h4>
            <ul className="space-y-2 text-sm">
              {TOOLS_LIST.slice(5, 10).map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => onNavigate('tool', tool.id)}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Creator & Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Creator & Network
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Shahab Saeed Portfolio
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/Shahab-1663/techstack-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  Source Repository <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:shahabsaeed1663@gmail.com"
                  className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  Hire & Inquire <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-slate-500 block">Collaborator:</span>
                <span className="text-xs text-slate-400 font-medium">Aliyan Khalid (Backend)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TechStack by Shahab Saeed. Open source under MIT.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> in React & TypeScript
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
