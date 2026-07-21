'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, LogOut, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenLoginModal?: () => void;
}

export default function Header({ onOpenLoginModal }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const checkAuth = () => {
    const isPremium = localStorage.getItem('aether_premium_user');
    const email = localStorage.getItem('aether_user_email');
    if (isPremium === 'true') {
      setIsLoggedIn(true);
      setUserEmail(email || 'Membro VIP');
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  };

  useEffect(() => {
    checkAuth();
    const handleStorage = () => checkAuth();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('auth-change', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('auth-change', handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('aether_premium_user');
    localStorage.removeItem('aether_user_email');
    setIsLoggedIn(false);
    setUserEmail('');
    setShowDropdown(false);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-white/5 pt-safe px-4 pb-3 flex items-center justify-between">
      {/* Brand Logo & Name */}
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

      {/* Profile Section */}
      <div className="relative">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            {/* User Email Pill */}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer shadow-sm group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-zinc-200 font-mono font-medium max-w-[110px] md:max-w-[160px] truncate">
                {userEmail}
              </span>
              <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-white transition-transform duration-200" />
            </button>
          </div>
        ) : (
          <button 
            onClick={onOpenLoginModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-300 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            Entrar
          </button>
        )}

        {/* Dropdown Menu for Logout */}
        {isLoggedIn && showDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-2xl p-3 shadow-2xl z-50 space-y-3 animate-[fadeIn_0.15s_ease-out]">
            <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 space-y-1">
              <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                Membro VIP Ativo
              </div>
              <p className="text-[10px] text-zinc-300 font-mono truncate">
                {userEmail}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              Sair da Conta
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
