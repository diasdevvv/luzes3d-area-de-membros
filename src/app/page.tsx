'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Search, Flame, Award, ShieldCheck, KeyRound, Heart, Info, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';
import { BonusSection, BonusVIPSection } from '@/components/BonusSection';
import BasesSection from '@/components/BasesSection';
import OfflineWarning from '@/components/OfflineWarning';
import ModelCard, { ModelData } from '@/components/ModelCard';
import { useFavorites } from '@/hooks/useFavorites';
import modelsDataRaw from '@/data/models.json';

const modelsData = modelsDataRaw as ModelData[];

export default function HomeFeed() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const featuredScrollRef = useRef<HTMLDivElement>(null);

  const scrollFeaturedLeft = () => {
    if (featuredScrollRef.current) {
      featuredScrollRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollFeaturedRight = () => {
    if (featuredScrollRef.current) {
      featuredScrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  // Custom hook for favorites
  const { favorites, isFavorite, toggleFavorite, isLoaded: favoritesLoaded } = useFavorites();

  // Mock Authentication State
  const [accessCode, setAccessCode] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      setLoginError('Por favor, insira um e-mail válido.');
      return;
    }
    if (accessCode.trim() === 'LUZ3D2526') {
      setIsLoggedIn(true);
      setLoginError('');
      localStorage.setItem('aether_premium_user', 'true');
      localStorage.setItem('aether_user_email', emailInput.trim());
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('auth-change'));
      setShowLoginModal(false);
    } else {
      setLoginError('Código de acesso inválido. Utilize o código LUZ3D2526.');
    }
  };

  // Sync login status on mount
  useEffect(() => {
    const checkAuth = () => {
      const isPremium = localStorage.getItem('aether_premium_user');
      if (isPremium === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('aether_premium_user');
    localStorage.removeItem('aether_user_email');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('auth-change'));
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  // Debounce search query
  useEffect(() => {
    setIsTyping(true);
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setIsTyping(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset pagination when search changes
  useEffect(() => {
    setVisibleCount(12);
  }, [debouncedSearch]);

  // Filter models
  const filteredModels = useMemo(() => {
    return modelsData.filter((model) => {
      return (
        debouncedSearch.trim() === '' ||
        model.nome.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        model.descricao.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        model.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
      );
    });
  }, [debouncedSearch]);

  const displayedModels = useMemo(() => {
    return filteredModels.slice(0, visibleCount);
  }, [filteredModels, visibleCount]);

  const favoritedModelsList = useMemo(() => {
    return modelsData.filter(m => favorites.includes(m.id));
  }, [favorites]);

  const hasMore = filteredModels.length > visibleCount;

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setIsLoadingMore(false);
    }, 450);
  };

  const scrollToLogin = () => {
    setActiveTab('home');
    setTimeout(() => {
      const premiumSection = document.getElementById('premium-section');
      premiumSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="flex-1 w-full min-h-screen pb-32 bg-zinc-950 flex flex-col items-center select-none">

      {/* Main Layout Container */}
      <div className="w-full max-w-[375px] md:max-w-5xl flex-1 flex flex-col md:px-4">

        {/* Header */}
        <Header onOpenLoginModal={() => setShowLoginModal(true)} />

        <main className="flex-1 flex flex-col px-4 pt-4">

          {/* TAB 1: HOME CATALOG */}
          {activeTab === 'home' && (
            <div className="animate-[fadeIn_0.2s_ease-out]">
              {/* Hero Banner */}
              <div className="w-full relative aspect-[2.4/1] rounded-2xl overflow-hidden shadow-2xl border border-white/5 mb-6">
                <Image
                  src="/banner.png"
                  alt="LUZES 3D STL Banner"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Search Bar with Orange Focus Styling */}
              <div className="relative w-full mb-6">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Pesquisar luminárias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 bg-zinc-900/70 border border-white/5 rounded-xl pl-9 pr-4 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#ff7f1a]/55 transition-colors focus:ring-1 focus:ring-[#ff7f1a]/25"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-3 flex items-center text-xs text-zinc-500 hover:text-zinc-300"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Highlights section (only if not searching) */}
              {!debouncedSearch && (
                <div className="mb-6 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-[#ff7f1a] fill-[#ff7f1a]" />
                      <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
                        Modelos em Destaque
                      </h2>
                    </div>

                    {/* Scroll Nav Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={scrollFeaturedLeft}
                        className="w-7 h-7 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer shadow-sm"
                        aria-label="Navegar para a esquerda"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={scrollFeaturedRight}
                        className="w-7 h-7 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer shadow-sm"
                        aria-label="Navegar para a direita"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal slider of featured items */}
                  <div
                    ref={featuredScrollRef}
                    className="no-scrollbar flex overflow-x-auto gap-3 -mx-4 px-4 py-1 scroll-smooth"
                  >
                    {modelsData.filter(m => m.destaque).slice(0, 6).map((model) => (
                      <div key={model.id} className="w-[160px] flex-shrink-0">
                        <ModelCard
                          model={model}
                          isFavorite={isFavorite(model.id)}
                          onToggleFavorite={toggleFavorite}
                          isLoading={!favoritesLoaded}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Printable Lamp Bases Section (Right below Modelos em Destaque) */}
              {!debouncedSearch && (
                <BasesSection
                  isLoggedIn={isLoggedIn}
                  setShowLoginModal={() => scrollToLogin()}
                />
              )}

              {/* Section 1: Standard Bônus (E-books) */}
              {!debouncedSearch && (
                <BonusSection
                  isLoggedIn={isLoggedIn}
                  setShowLoginModal={() => scrollToLogin()}
                  hideHeader={true}
                  variant="carousel"
                />
              )}

              {/* Section 2: Bônus Exclusivos VIP */}
              {!debouncedSearch && (
                <BonusVIPSection
                  isLoggedIn={isLoggedIn}
                  setShowLoginModal={() => scrollToLogin()}
                  hideHeader={true}
                  variant="carousel"
                />
              )}

              {/* Grid List */}
              <div className="flex-1 flex flex-col mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[#ff7f1a]" />
                    Luminárias Mais Vendidas
                    <span className="text-[10px] text-zinc-500 lowercase font-normal">
                      ({filteredModels.length} {filteredModels.length === 1 ? 'modelo' : 'modelos'})
                    </span>
                  </h2>
                </div>

                {/* Grid 2-columns on mobile, 3-4 on desktop */}
                {isTyping ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <ModelCard key={`sk-${idx}`} isLoading={true} />
                    ))}
                  </div>
                ) : displayedModels.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-600 mb-3">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-xs font-bold text-zinc-400">Nenhum modelo encontrado</h3>
                    <p className="text-[10px] text-zinc-600 mt-1 max-w-[200px]">
                      Tente digitar palavras-chave diferentes.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {displayedModels.map((model) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        isFavorite={isFavorite(model.id)}
                        onToggleFavorite={toggleFavorite}
                        isLoading={!favoritesLoaded}
                      />
                    ))}
                    {isLoadingMore && (
                      Array.from({ length: 4 }).map((_, idx) => (
                        <ModelCard key={`sk-load-${idx}`} isLoading={true} />
                      ))
                    )}
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && !isTyping && !isLoadingMore && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={loadMore}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-[#ff7f1a] hover:bg-orange-400 active:scale-95 transition-all cursor-pointer shadow-lg shadow-orange-500/10"
                    >
                      Carregar Mais Modelos
                    </button>
                  </div>
                )}
              </div>

              {/* Mais Luminárias Section */}
              <div className="mt-8 mb-6 max-w-[343px] md:max-w-md mx-auto w-full">
                <div className="flex items-center gap-1.5 mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
                    Mais Luminárias
                  </h2>
                </div>

                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-2xl bg-gradient-to-br from-[#1b1712] to-[#0f0f10] border border-orange-500/10 p-5 space-y-3 hover:border-orange-500/20 active:scale-[0.99] transition-all shadow-xl relative overflow-hidden group/drive"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff7f1a]/5 rounded-full blur-xl pointer-events-none" />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff7f1a] bg-orange-950/40 border border-orange-500/20 px-2.5 py-1 rounded-lg">
                      ⚡ Acesso Externo
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Google Drive PRO</span>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-100 leading-tight group-hover/drive:text-[#ff7f1a] transition-colors">
                    +250 Luminárias Premium no Drive
                  </h3>

                  <p className="text-[10px] text-zinc-400 leading-relaxed font-normal">
                    Para garantir a velocidade de carregamento e o desempenho do aplicativo no seu celular, não listamos todo o catálogo de arquivos aqui no app (pois ficaria extremamente pesado). Você pode acessar nossa pasta exclusiva no Google Drive para baixar os demais modelos!
                  </p>

                  <div className="flex items-center gap-1 text-[10px] text-[#ff7f1a] font-bold pt-1">
                    Acessar Google Drive Premium →
                  </div>
                </a>
              </div>

            </div>
          )}

          {/* TAB 2: BONUS SECTION */}
          {activeTab === 'bonus' && (
            <div className="space-y-6 w-full">
              <BonusSection
                isLoggedIn={isLoggedIn}
                setShowLoginModal={() => setShowLoginModal(true)}
              />
              <BonusVIPSection
                isLoggedIn={isLoggedIn}
                setShowLoginModal={() => setShowLoginModal(true)}
              />
            </div>
          )}

          {/* TAB 3: FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="animate-[fadeIn_0.2s_ease-out] flex-1 flex flex-col mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  Minhas Luminárias Favoritas
                  <span className="text-[10px] text-zinc-500 font-normal">
                    ({favoritedModelsList.length})
                  </span>
                </h2>
              </div>

              {favoritedModelsList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-600 mb-3">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs font-bold text-zinc-300">Nenhum favorito salvo</h3>
                  <p className="text-[10px] text-zinc-500 max-w-[200px] mt-1">
                    Toque no ícone de coração nas luminárias para salvar seus modelos favoritos aqui.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {favoritedModelsList.map((model) => (
                    <ModelCard
                      key={model.id}
                      model={model}
                      isFavorite={isFavorite(model.id)}
                      onToggleFavorite={toggleFavorite}
                      isLoading={!favoritesLoaded}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ABOUT / SOBRE */}
          {activeTab === 'info' && (
            <div className="animate-[fadeIn_0.2s_ease-out] space-y-6 max-w-md mx-auto w-full pt-2">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff7f1a]/20 to-amber-500/10 border border-[#ff7f1a]/30 flex items-center justify-center mx-auto text-[#ff7f1a]">
                  <Info className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold text-zinc-100">LUZES 3D STL</h1>
                <p className="text-xs text-zinc-400">
                  Biblioteca Premium de Luminárias e Projetos 3D para Impressão FDM/SLA.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-5 space-y-3 border border-white/10 text-xs">
                <h3 className="font-bold text-zinc-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Recursos do Aplicativo
                </h3>
                <ul className="space-y-2 text-[11px] text-zinc-400 list-disc list-inside">
                  <li>Download direto dos arquivos empacotados em pacote ZIP.</li>
                  <li>Mais de 100 luminárias catalogadas em alta definição.</li>
                  <li>Bônus exclusivos com calculadoras e repositórios 3D.</li>
                  <li>Suporte a PWA para funcionamento offline.</li>
                </ul>
              </div>

              {/* Login box inside About tab */}
              <div className="glass-card rounded-2xl p-5 border border-[#ff7f1a]/30">
                <div className="flex items-center gap-2 mb-3">
                  <KeyRound className="w-4 h-4 text-[#ff7f1a]" />
                  <h3 className="text-xs font-bold uppercase text-zinc-200">Acesso Premium</h3>
                </div>
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <p className="text-xs text-emerald-400 font-bold">Status: Membro VIP Ativo</p>
                    <button
                      onClick={handleLogout}
                      className="text-xs text-zinc-500 hover:text-red-400 font-bold underline"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Código: AETHER2026"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="flex-1 h-10 bg-zinc-950 border border-white/10 rounded-xl px-3 text-xs text-zinc-200"
                      />
                      <button
                        type="submit"
                        className="bg-[#ff7f1a] text-zinc-950 text-xs font-bold px-4 rounded-xl"
                      >
                        Entrar
                      </button>
                    </div>
                    {loginError && <p className="text-[9px] text-red-400">{loginError}</p>}
                  </form>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Floating Navigation Bar */}
      <NavigationBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
      />

      {/* Floating CTA Orange Button on Home */}
      {activeTab === 'home' && !isLoggedIn && (
        <div className="fixed bottom-16 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-md border-t border-white/5 p-4 flex justify-center">
          <button
            onClick={() => setShowLoginModal(true)}
            className="w-full max-w-[343px] md:max-w-md h-12 rounded-xl bg-[#ff7f1a] text-zinc-950 text-xs font-black uppercase tracking-widest flex items-center justify-center shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-transform cursor-pointer"
          >
            Quero Meu Acesso
          </button>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-sm bg-zinc-900 border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 text-xs font-bold w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 mb-2">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                Área de Membros VIP
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Digite seu e-mail e o código de acesso para entrar.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  Seu E-mail
                </label>
                <input
                  type="email"
                  placeholder="exemplo@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full h-10 bg-zinc-950 border border-white/10 rounded-xl px-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  Código de Acesso
                </label>
                <input
                  type="text"
                  placeholder="Ex: LUZ3D2526"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full h-10 bg-zinc-950 border border-white/10 rounded-xl px-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {loginError && (
                <p className="text-[10px] text-red-400 font-medium text-center">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                Acessar Área VIP
              </button>

              <p className="text-[9px] text-zinc-500 font-mono text-center">
                * Código de acesso: <strong className="text-cyan-400">LUZ3D2526</strong>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Floating Offline Toast Warning */}
      <OfflineWarning />
    </div>
  );
}
