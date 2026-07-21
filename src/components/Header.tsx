'use client';

import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-white/5 pt-safe px-4 pb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden shadow-lg relative bg-zinc-900">
          <Image 
            src="/logo.png" 
            alt="LUZES 3D STL Logo" 
            fill 
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wider bg-gradient-to-r from-white via-zinc-200 to-cyan-400 bg-clip-text text-transparent">
            LUZES 3D STL
          </h1>
          <span className="text-[9px] text-cyan-500/80 tracking-widest font-mono block -mt-0.5">
            COLEÇÃO PREMIUM
          </span>
        </div>
      </div>

      <button 
        aria-label="Profile"
        className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <User className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
        <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950" />
      </button>
    </header>
  );
}
