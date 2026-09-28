import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Menu, 
  X, 
  Terminal,
  ExternalLink
} from 'lucide-react';
import { 
  GithubIcon, 
  LinkedinIcon, 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon 
} from './SocialIcons';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, toolId?: string) => void;
  onOpenSearch: () => void;
}

export function Header({ currentTab, onNavigate, onOpenSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'All Tools', badge: '20' },
    { id: 'cgpa-calc', label: 'CGPA Calc', isTool: true },
    { id: 'about', label: 'About & Portfolio' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isTool) {
      onNavigate('tool', link.id);
    } else {
      onNavigate(link.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#06090f]/80 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Tech<span className="text-cyan-400">Stack</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 -mt-1 font-mono">
                  Dev Portal & Tools
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id || (link.isTool && currentTab === 'tool');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side: Quick Search & Socials */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Search trigger button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/40 text-slate-400 hover:text-slate-200 text-xs transition-all shadow-inner group"
              title="Search all 20 tools (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span>Search tools...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            <div className="h-5 w-[1px] bg-slate-800" />

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 text-slate-400">
              <a
                href="https://github.com/Shahab-1663"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800/80 transition-colors"
                title="Shahab's GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/shahab-saeed/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:text-[#0a66c2] hover:bg-slate-800/80 transition-colors"
                title="Shahab's LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/shahabk.7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:text-pink-400 hover:bg-slate-800/80 transition-colors"
                title="Shahab's Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/shahabk.74"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:text-blue-400 hover:bg-slate-800/80 transition-colors"
                title="Shahab's Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/shahabk_7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:text-cyan-300 hover:bg-slate-800/80 transition-colors"
                title="Shahab's X profile"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile Menu & Search Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
              aria-label="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#090e1a]/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium text-slate-200 hover:bg-slate-800/60"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-around text-slate-300">
            <a
              href="https://github.com/Shahab-1663"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/shahab-saeed/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#0a66c2]"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href="https://www.instagram.com/shahabk.7"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 flex items-center gap-1.5 text-xs text-slate-400 hover:text-pink-400"
            >
              <InstagramIcon className="w-4 h-4" /> Instagram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
