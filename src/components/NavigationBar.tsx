'use client';

import React from 'react';
import { Home, Gift, Heart, Info } from 'lucide-react';

interface NavigationBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
}

export default function NavigationBar({ activeTab, setActiveTab, favoritesCount }: NavigationBarProps) {
  const tabs = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'bonus', label: 'Bônus', icon: Gift },
    { id: 'favorites', label: 'Favoritos', icon: Heart, badge: favoritesCount },
    { id: 'info', label: 'Sobre', icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-t border-white/5 pb-safe px-4 shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
      <div className="mx-auto max-w-[375px] md:max-w-md h-14 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center w-14 h-full text-zinc-400 hover:text-zinc-200 active:scale-90 transition-all cursor-pointer group"
              aria-label={tab.label}
            >
              <div 
                className={`absolute top-0 w-8 h-0.5 rounded bg-[#ff7f1a] transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`} 
              />
              
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive 
                      ? 'text-[#ff7f1a] scale-110 drop-shadow-[0_0_8px_rgba(255,127,26,0.6)]' 
                      : 'group-hover:scale-105'
                  }`} 
                />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 text-[9px] font-bold text-zinc-950 bg-[#ff7f1a] w-4 h-4 rounded-full flex items-center justify-center border border-zinc-950 animate-pulse">
                    {tab.badge}
                  </span>
                ) : tab.isVIP ? (
                  <span className="absolute -top-1.5 -right-3 text-[7px] font-extrabold text-zinc-950 bg-amber-400 px-1 py-0.2 rounded-full border border-zinc-950 animate-bounce">
                    VIP
                  </span>
                ) : null}
              </div>
              
              <span className={`text-[9px] mt-1 tracking-wider transition-colors duration-300 font-medium ${
                isActive ? 'text-[#ff7f1a] font-semibold' : 'text-zinc-500'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
