import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CommandPalette } from './components/CommandPalette';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { AboutPage } from './pages/AboutPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { TOOLS_LIST } from './data/toolsData';

export function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'tools' | 'about' | 'tool'>('home');
  const [activeToolId, setActiveToolId] = useState<string>('cgpa-calc');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync with URL Hash for seamless deep linking and browser history navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === 'home') {
        setCurrentTab('home');
      } else if (hash === 'tools') {
        setCurrentTab('tools');
      } else if (hash === 'about') {
        setCurrentTab('about');
      } else if (hash.startsWith('tool/')) {
        const id = hash.replace('tool/', '');
        if (TOOLS_LIST.some((t) => t.id === id)) {
          setActiveToolId(id);
          setCurrentTab('tool');
        } else {
          setCurrentTab('tools');
        }
      } else if (TOOLS_LIST.some((t) => t.id === hash)) {
        setActiveToolId(hash);
        setCurrentTab('tool');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (tab: string, toolId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tab === 'tool' && toolId) {
      setActiveToolId(toolId);
      setCurrentTab('tool');
      window.location.hash = `tool/${toolId}`;
    } else {
      setCurrentTab(tab as any);
      window.location.hash = tab === 'home' ? '' : tab;
    }
  };

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-100 flex flex-col relative font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient background lighting and artifacts */}
      <BackgroundEffects />

      {/* Persistent App Header */}
      <Header
        currentTab={currentTab === 'tool' ? activeToolId : currentTab}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-1 relative z-10">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}
        {currentTab === 'tools' && (
          <ToolsPage
            onSelectTool={(id) => navigateTo('tool', id)}
          />
        )}
        {currentTab === 'about' && (
          <AboutPage />
        )}
        {currentTab === 'tool' && (
          <ToolDetailPage
            toolId={activeToolId}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Global Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={(id) => navigateTo('tool', id)}
      />

      {/* Modern Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
