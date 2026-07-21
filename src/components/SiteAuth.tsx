'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { KeyRound, Mail, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SiteAuthProps {
  children: React.ReactNode;
}

export default function SiteAuth({ children }: SiteAuthProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('luzes3d_site_auth') === 'true';
    setIsAuth(auth);
    setLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (password.trim() === 'LUZSTL26') {
      localStorage.setItem('luzes3d_site_auth', 'true');
      localStorage.setItem('luzes3d_email', email.trim());
      localStorage.setItem('aether_premium_user', 'true');
      
      setIsAuth(true);
      setError('');
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#ff7f1a', '#00e676', '#ffffff']
      });
      
      window.dispatchEvent(new Event('storage'));
    } else {
      setError('Código de acesso incorreto. Use LUZSTL26.');
    }
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-t-[#ff7f1a] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 select-none">
        <div className="w-full max-w-[340px] glass-card rounded-3xl p-6 border border-white/5 space-y-6 shadow-2xl relative">
          
          <div className="text-center space-y-3">
            {/* Site Logo */}
            <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden shadow-lg relative bg-zinc-900 mx-auto">
              <Image 
                src="/logo.png" 
                alt="LUZES 3D STL Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-base font-black tracking-widest text-zinc-100 font-mono">
                LUZES 3D STL
              </h2>
              <span className="text-[9px] text-[#ff7f1a] tracking-widest font-mono block uppercase">
                Área do Assinante
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed max-w-[260px] mx-auto">
              Para acessar o catálogo premium de arquivos STL e 3MF, insira o seu e-mail e o código de acesso recebido na compra.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 bg-zinc-950 border border-white/10 rounded-xl pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#ff7f1a]"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                placeholder="Senha / Código de Acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 bg-zinc-950 border border-white/10 rounded-xl pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#ff7f1a]"
              />
            </div>

            {error && (
              <div className="flex items-center gap-1 text-[9px] text-red-400 font-semibold justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#ff7f1a] text-zinc-950 text-xs font-black uppercase tracking-wider hover:bg-orange-400 transition-colors active:scale-95 cursor-pointer shadow-lg shadow-orange-500/10"
            >
              Entrar na Biblioteca
            </button>
          </form>

          <div className="text-[8px] text-zinc-500 text-center font-mono pt-1">
            * Dica de teste: Senha é <strong className="text-[#ff7f1a]">LUZSTL26</strong>.
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
