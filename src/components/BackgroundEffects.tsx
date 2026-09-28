import React from 'react';

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Ambient Lighting Orbs */}
      {/* Top Left Cyan/Blue Glow */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/15 blur-[120px] animate-pulse-slow" 
      />

      {/* Top Right Indigo/Purple Glow */}
      <div 
        className="absolute top-10 -right-20 w-[450px] h-[450px] rounded-full bg-indigo-600/15 blur-[140px] animate-float-slow" 
      />

      {/* Center Subtle Emerald Highlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[180px] pointer-events-none" 
      />

      {/* Bottom Center Blue/Violet Glow */}
      <div 
        className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[150px] animate-pulse-slow" 
      />

      {/* Subtle Floating Code/Tech Artifacts */}
      <div className="absolute top-24 left-[15%] w-2 h-2 rounded-full bg-cyan-400/40 animate-ping opacity-75" />
      <div className="absolute top-[40%] right-[12%] w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-pulse" />
      <div className="absolute bottom-[25%] left-[8%] w-2 h-2 rounded-full bg-indigo-400/40 animate-pulse" />
      <div className="absolute top-[65%] right-[22%] w-1 h-1 rounded-full bg-sky-400/40" />

      {/* Radial vignette mask for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,9,15,0.7)_80%,rgba(6,9,15,1)_100%)]" />
    </div>
  );
}
